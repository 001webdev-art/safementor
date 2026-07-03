"""
SafeMentor v12 — Backend (FastAPI)
===================================
3-Layer classifier pipeline via {ACTIVE_PROVIDER}:
  Layer 1 (parallel): SAFETY_CRITICAL (Mistral 24B) + SEXUAL_SAFETY (Mistral 24B)
  Layer 2 (short-circuit): EDUCATION_SIMPLE (Mistral 24B) — only if Layers 1+2 all-clear

Priority routing:
  1. self_harm  2. prohibited  3. sexual_safety  4. interpersonal (means_plan)
  5. interpersonal (low/active)  6. education/likely_submission  7. safe

Models:
  - Mistral Small 3.2 24B → "mistral-small-3.2-24b"   (safety + sexual + education/homework + responses + refusals)

Provider: configurable via ACTIVE_PROVIDER (see PROVIDERS dict)
Prompt Caching: Mistral caches stable system prompts automatically.
"""

import os
import logging
import unicodedata
import re
import json
import time
import random
import traceback
import asyncio
import contextvars
import httpx
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from openai import AsyncOpenAI, RateLimitError
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel as PydanticBaseModel, Field
from typing import Dict, Any, List, Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("safementor-v12")

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# ─────────────────────────────────────────────
# PROVIDER CONFIG — change only here to switch providers
# ─────────────────────────────────────────────

from prompts.models import PROVIDERS, MODELS, get_extra_body

ACTIVE_PROVIDER  = os.getenv("ACTIVE_PROVIDER", "openrouter_mistral")

_provider        = PROVIDERS[ACTIVE_PROVIDER]
MODEL_CLASSIFIER = MODELS["model_classifier"]
MODEL_RESPONSE   = MODELS["model_response"]
MODEL_REFUSE     = MODELS["model_refuse"]
PROVIDER_URL     = _provider["base_url"]
API_KEY_ENV      = _provider["api_key_env"]
EXTRA_BODY       = get_extra_body(_provider)


def _get_api_key() -> str:
    """Load API key from st.secrets (Streamlit Cloud) or .env."""
    try:
        import streamlit as st
        key = st.secrets.get(API_KEY_ENV)
        if key:
            return key
    except Exception:
        pass
    return os.getenv(API_KEY_ENV) or ""

# ─────────────────────────────────────────────
# GLOBALS
# ─────────────────────────────────────────────

async_llm_client: Optional[AsyncOpenAI] = None   # Classifier + refusal client
async_response_client: Optional[AsyncOpenAI] = None   # Response model client (may differ)

api_calls_tracker = contextvars.ContextVar("api_calls_tracker", default=None)


# ─────────────────────────────────────────────
# REQUEST MODELS
# ─────────────────────────────────────────────

class MentorRequest(PydanticBaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: Optional[str] = Field(default=None, max_length=128)
    child_age: int = Field(default=10, ge=8, le=15)
    child_country: str = Field(default="Germany", max_length=64)
    child_language: str = Field(default="german", max_length=128)
    chat_history: List[Dict[str, str]] = Field(default_factory=list)
    summary_context: str = Field(default="", max_length=8000)

    @classmethod
    def validate_chat_history(cls, v):
        if v and len(v) > 100:
            v = v[-20:]
        return v


# ─────────────────────────────────────────────
# SESSION STATE
# ─────────────────────────────────────────────

from threading import RLock

try:
    from cachetools import TTLCache
    session_emotion_state: Dict[str, Dict] = TTLCache(maxsize=10000, ttl=3600)
except ImportError:
    logger.warning("cachetools not installed — session state will not auto-expire.")
    session_emotion_state: Dict[str, Dict] = {}

_session_locks: Dict[str, RLock] = {}
_global_lock = RLock()


def _get_session_lock(session_id: str) -> RLock:
    with _global_lock:
        if session_id not in _session_locks:
            _session_locks[session_id] = RLock()
        return _session_locks[session_id]


def _init_session(session_id: str) -> Dict:
    if session_id not in session_emotion_state:
        session_emotion_state[session_id] = {
            "moderate_count": 0,
            "severe_count": 0,
            "emotions_log": [],
            "alert_triggered": False,
            "active_path": {"path": None, "topic": None, "turns": 0},
        }
    else:
        s = session_emotion_state[session_id]
        s.setdefault("moderate_count", 0)
        s.setdefault("severe_count", 0)
        s.setdefault("emotions_log", [])
        s.setdefault("alert_triggered", False)
        s.setdefault("active_path", {"path": None, "topic": None, "turns": 0})
    return session_emotion_state[session_id]


def get_emotion_state(session_id: str) -> Dict:
    lock = _get_session_lock(session_id)
    with lock:
        return _init_session(session_id)


# ─────────────────────────────────────────────
# ACTIVE PATH / STICKY ROUTING
# ─────────────────────────────────────────────

_STICKY_PATHS = {"homework", "safe", "education_refusal"}
_ALWAYS_RECLASSIFY = {"self_harm", "sexual_safety", "prohibited", "interpersonal_harm"}


def get_active_path(session_id: str) -> Dict:
    lock = _get_session_lock(session_id)
    with lock:
        return _init_session(session_id)["active_path"]


def set_active_path(session_id: str, path: str, topic: str = None) -> None:
    lock = _get_session_lock(session_id)
    with lock:
        state = _init_session(session_id)
        current = state["active_path"]
        state["active_path"] = {
            "path": path,
            "topic": topic or current.get("topic"),
            "turns": current.get("turns", 0) + 1 if current.get("path") == path else 1,
        }


def clear_active_path(session_id: str) -> None:
    lock = _get_session_lock(session_id)
    with lock:
        _init_session(session_id)["active_path"] = {"path": None, "topic": None, "turns": 0}


def resolve_path_from_session(session_id: str, new_routing: Dict, classifier_results: Dict) -> Dict:
    active = get_active_path(session_id)
    new_path = new_routing.get("path", "safe")
    any_safety_signal = any(
        classifier_results.get(p, {}).get("detected", False)
        for p in _ALWAYS_RECLASSIFY
    )
    if any_safety_signal:
        clear_active_path(session_id)
        return new_routing

    # ── Education-Refusal Sticky: max 3 turns, switchable to homework ──
    if active.get("path") == "education_refusal":
        turns = active.get("turns", 0)
        new_edu_mode = classifier_results.get("education", {}).get("mode", "none")

        # Child switches to genuine learning → promote to homework path
        if new_edu_mode == "collaborative_learning":
            clear_active_path(session_id)
            return {
                "path": "homework",
                "alert": "none",
                "response_type": "70b_homework",
                "category": "collaborative_learning",
                "level": "none", "role": "none",
                "_from_refusal": True,
            }

        # After 3 turns in refusal → release, reclassify fresh
        if turns >= 3:
            clear_active_path(session_id)
            return new_routing

        # Stay in refusal; response_type may shift between submission/hidden
        set_active_path(session_id, "education_refusal", new_routing.get("category"))
        return {
            **new_routing,
            "_sticky": True,
            "_turns": turns + 1,
        }

    if new_path in _STICKY_PATHS:
        topic = new_routing.get("category") or active.get("topic")
        set_active_path(session_id, new_path, topic)
        return new_routing
    if active.get("path") in _STICKY_PATHS:
        return {
            "path": active["path"],
            "alert": "none",
            "response_type": "70b_homework" if active["path"] == "homework" else "70b_safe",
            "category": active.get("topic", "none"),
            "level": "none",
            "role": "none",
            "_sticky": True,
            "_turns": active.get("turns", 0),
        }
    return new_routing


# ─────────────────────────────────────────────
# STARTUP / LIFESPAN
# ─────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    global async_llm_client, async_response_client

    logger.info(f"Initializing SafeMentor v12 (provider={ACTIVE_PROVIDER}, classifier={MODEL_CLASSIFIER}, response={MODEL_RESPONSE})...")

    api_key = _get_api_key()
    if not api_key:
        logger.error(f"{API_KEY_ENV} not set in .env — classifiers will fail.")
    else:
        async_llm_client = AsyncOpenAI(api_key=api_key, base_url=PROVIDER_URL)
        logger.info(f"LLM client initialized ({ACTIVE_PROVIDER} @ {PROVIDER_URL})")

    # Response client: same endpoint, separate ref for clarity
    async_response_client = AsyncOpenAI(api_key=api_key, base_url=PROVIDER_URL)
    logger.info(f"Response client initialized ({ACTIVE_PROVIDER}, classifier={MODEL_CLASSIFIER}, response={MODEL_RESPONSE})")

    yield

    logger.info("Shutting down SafeMentor v12.")


app = FastAPI(title="SafeMentor v12", lifespan=lifespan)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─────────────────────────────────────────────
# TEXT NORMALIZATION + PRE-FILTERING
# ─────────────────────────────────────────────

try:
    import emoji
    HAS_EMOJI = True
except ImportError:
    HAS_EMOJI = False

SAFETY_EMOJI_MAP = {
    "😭": "[DISTRESS: sadness]", "😱": "[FEAR: terrified]", "😡": "[ANGER: frustration]",
    "🆘": "[DISTRESS: worried]", "💔": "[GRIEF: emotional pain]", "🥺": "[DISTRESS: pleading]",
    "😞": "[SADNESS: disappointed]", "😰": "[FEAR: anxious]", "😔": "[SADNESS: pensive]",
    "😢": "[SADNESS: crying]", "😤": "[ANGER: frustrated]", "🤬": "[ANGER: rage]",
}


def normalize_child_input(text: str) -> str:
    text = unicodedata.normalize("NFKC", text)
    text = re.sub(r'([^\w\s])\1+', r'\1', text)
    for char, label in SAFETY_EMOJI_MAP.items():
        text = text.replace(char, f" {label} ")
    if HAS_EMOJI:
        text = emoji.demojize(text, delimiters=(" [", "] "))
    text = text.replace("_", " ").replace(":", "")
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def _extract_usage(response) -> dict:
    if response and hasattr(response, "model_dump"):
        try:
            try:
                dumped = response.model_dump(mode="json")
            except TypeError:
                dumped = response.model_dump()
            usage = dumped.get("usage")
            if usage:
                return usage
        except Exception:
            pass
    if response and hasattr(response, "usage") and response.usage:
        try:
            if hasattr(response.usage, "model_dump"):
                try:
                    return response.usage.model_dump(mode="json")
                except TypeError:
                    return response.usage.model_dump()
            return dict(response.usage)
        except Exception:
            return {
                "prompt_tokens": getattr(response.usage, "prompt_tokens", 0),
                "completion_tokens": getattr(response.usage, "completion_tokens", 0),
                "total_tokens": getattr(response.usage, "total_tokens", 0),
            }
    return {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}


def route_if_trivial(normalized_text: str) -> bool:
    text = normalized_text.strip()
    if not text:
        return True
    return len(text.split()) <= 2


def preprocess_input(text: str) -> dict:
    from pii_filter import redact_pii, sanitize_injection
    from safety_prefilter import check_safety_keywords

    redacted_text, pii_findings = redact_pii(text)
    sanitized_text, injection_findings = sanitize_injection(redacted_text)
    is_injection = bool(injection_findings)
    prefilter_result = check_safety_keywords(text)
    normalized = normalize_child_input(sanitized_text)

    return {
        "normalized": normalized,
        "is_injection": is_injection,
        "injection_findings": [f._asdict() for f in injection_findings] if injection_findings else [],
        "pii_findings": [f._asdict() for f in pii_findings] if pii_findings else [],
        "prefilter": prefilter_result._asdict() if prefilter_result else None,
    }


# ─────────────────────────────────────────────
# CORE CLASSIFIER RUNNER
# ─────────────────────────────────────────────

_RETRY_REMINDER = "\nCRITICAL: Your previous response was not valid JSON. Output ONLY a single JSON object starting with { and ending with }. Nothing else."


async def run_model(
    model: str,
    system_prompt: str,
    user_prompt: str,
    max_tokens: int = 120,
    max_retries: int = 1,
    label: str = "classifier",
) -> tuple:
    """
    Single async call to the active LLM provider. Model is passed explicitly.
    Prompt caching: Mistral caches stable system prompts server-side automatically —
    no extra headers needed with the OpenAI-compatible SDK path.
    Returns tuple: (parsed dict, usage dict)
    """
    default_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if not async_llm_client:
        return {"detected": False, "error": True, "error_reason": "client_not_initialized"}, default_usage

    for attempt in range(1 + max_retries):
        try:
            invoke_user = user_prompt if attempt == 0 else user_prompt + _RETRY_REMINDER
            t0 = time.time()

            response = await asyncio.wait_for(
                async_llm_client.chat.completions.create(
                    model=model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user",   "content": invoke_user},
                    ],
                    temperature=0,
                    max_tokens=max_tokens,
                    **({"extra_body": EXTRA_BODY} if EXTRA_BODY else {}),
                ),
                timeout=25.0,
            )
            elapsed = time.time() - t0
            raw = response.choices[0].message.content.strip()
            usage_dict = _extract_usage(response)
            
            tracker = api_calls_tracker.get()
            if tracker is not None:
                tracker.append({
                    "id": len(tracker) + 1,
                    "label": label,
                    "usage": usage_dict
                })
            
            # Strip markdown code blocks (```json ... ```)
            if raw.startswith("```"):
                raw = re.sub(r"^```(?:json)?\s*", "", raw)
                raw = re.sub(r"\s*```$", "", raw)
                raw = raw.strip()
            
            logger.info(f"  [{label}] {elapsed:.2f}s | raw: {raw[:160]}")

            # Parse: direct → nested-braces fallback → aggressive cleanup
            try:
                parsed = json.loads(raw)
            except json.JSONDecodeError:
                # Try to extract JSON with nested braces
                m = re.search(r"\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}", raw, re.DOTALL)
                if m:
                    try:
                        parsed = json.loads(m.group())
                    except json.JSONDecodeError:
                        # Last resort: log and fail with helpful info
                        logger.error(f"  [{label}] could not parse extracted JSON: {m.group()[:100]}")
                        raise
                else:
                    logger.error(f"  [{label}] no JSON braces found in response")
                    raise
            return parsed, usage_dict

        except (json.JSONDecodeError, KeyError, ValueError) as e:
            if attempt < max_retries:
                logger.warning(f"  [{label}] parse error attempt {attempt}, retrying: {e}")
                logger.warning(f"  [{label}] raw content was: {raw[:200]}")
                continue
            logger.error(f"  [{label}] parse failed after {attempt+1} attempts: {e}")
            logger.error(f"  [{label}] raw content was: {raw[:200]}")
            return {"detected": False, "error": True, "error_reason": f"parse: {e}"}, default_usage
        except asyncio.TimeoutError:
            logger.warning(f"  [{label}] timeout — returning default")
            return {"detected": False, "error": True, "error_reason": "timeout"}, default_usage
        except RateLimitError as e:
            if attempt < max_retries:
                wait = (2 ** attempt) + random.uniform(0, 1)
                logger.warning(f"  [{label}] rate limit, retry in {wait:.2f}s")
                await asyncio.sleep(wait)
                continue
            return {"detected": False, "error": True, "error_reason": str(e)}, default_usage
        except Exception as e:
            logger.error(f"  [{label}] unexpected: {e}")
            return {"detected": False, "error": True, "error_reason": str(e)}, default_usage


# ─────────────────────────────────────────────
# CLASSIFIER PIPELINE
# ─────────────────────────────────────────────

async def run_all_classifiers_async(text: str, child_age: str, child_language: str) -> tuple:
    """
    3-Layer cascaded pipeline:

    Layer 1 (parallel, both Mistral 24B):
      A. SAFETY_CRITICAL_UNIFIED → self_harm + prohibited + interpersonal
      B. SEXUAL_SAFETY_STANDALONE → grooming + sexual_abuse

    Short-circuit: if any safety flag fires → skip education classifier.

    Layer 2 (Mistral 24B, only if all-clear):
      C. EDUCATION_SIMPLE → likely_submission yes/no

    Priority resolution is handled by route_response().
    Returns tuple: (results_dict, token_usage_dict)
    """
    from prompts.classifiers import (
        SAFETY_CRITICAL_UNIFIED_SYSTEM, SAFETY_CRITICAL_UNIFIED_USER,
        SEXUAL_SAFETY_STANDALONE_SYSTEM, SEXUAL_SAFETY_STANDALONE_USER,
        CLASSIFIER_EDUCATION_SYSTEM, EDUCATION_USER,
    )

    # Neutral defaults
    results: Dict[str, dict] = {
        "self_harm":          {"detected": False, "level": "none", "role": "none", "category": "none"},
        "prohibited":         {"detected": False, "category": "none"},
        "sexual_safety":      {"detected": False, "category": "none", "role": "none"},
        "interpersonal_harm": {"detected": False, "category": "none", "role": "none", "severity": "none"},
        "education":          {"detected": False, "mode": "none"},
    }

    t_start = time.time()

    # ── Layer 1: parallel (Mistral 24B × 2) ─────────────────────────────────
    logger.info(f"[classifiers] Layer 1 parallel (safety_critical + sexual_safety): {text[:60]}...")

    safety_user = SAFETY_CRITICAL_UNIFIED_USER.format(
        text=text, child_age=child_age, child_language=child_language
    )
    sexual_user = SEXUAL_SAFETY_STANDALONE_USER.format(
        text=text, child_age=child_age, child_language=child_language
    )

    safety_raw_res, sexual_raw_res = await asyncio.gather(
        run_model(MODEL_CLASSIFIER, SAFETY_CRITICAL_UNIFIED_SYSTEM, safety_user,
                  max_tokens=200, label="safety_critical"),
        run_model(MODEL_CLASSIFIER, SEXUAL_SAFETY_STANDALONE_SYSTEM, sexual_user,
                  max_tokens=80,  label="sexual_safety"),
        return_exceptions=True,
    )

    safety_raw = {}
    safety_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if isinstance(safety_raw_res, Exception):
        logger.error(f"  [safety_critical] exception: {safety_raw_res}")
    elif isinstance(safety_raw_res, tuple):
        safety_raw, safety_usage = safety_raw_res

    sexual_raw = {}
    sexual_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if isinstance(sexual_raw_res, Exception):
        logger.error(f"  [sexual_safety] exception: {sexual_raw_res}")
    elif isinstance(sexual_raw_res, tuple):
        sexual_raw, sexual_usage = sexual_raw_res

    # Unpack safety_critical (unified response has 3 sub-keys)
    sh = safety_raw.get("self_harm", {})
    pb = safety_raw.get("prohibited", {})
    ip = safety_raw.get("interpersonal", {})

    if sh:
        results["self_harm"].update(sh)
        logger.info(f"  [self_harm] detected={sh.get('detected')}, level={sh.get('level')}")
    if pb:
        results["prohibited"].update(pb)
        logger.info(f"  [prohibited] detected={pb.get('detected')}, category={pb.get('category')}")
    if ip:
        results["interpersonal_harm"].update(ip)
        logger.info(f"  [interpersonal] detected={ip.get('detected')}, severity={ip.get('severity')}")

    # Unpack sexual_safety
    results["sexual_safety"].update(sexual_raw)
    logger.info(f"  [sexual_safety] detected={sexual_raw.get('detected')}, category={sexual_raw.get('category')}")

    edu_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}

    # Short-circuit: any safety flag → skip education
    any_safety = (
        results["self_harm"].get("detected")
        or results["prohibited"].get("detected")
        or results["sexual_safety"].get("detected")
        or results["interpersonal_harm"].get("detected")
    )
    if any_safety:
        logger.info(f"[classifiers] Safety flag → skipping education. ({time.time()-t_start:.2f}s)")
        classifiers_total = {
            "prompt_tokens": safety_usage["prompt_tokens"] + sexual_usage["prompt_tokens"],
            "completion_tokens": safety_usage["completion_tokens"] + sexual_usage["completion_tokens"],
            "total_tokens": safety_usage["total_tokens"] + sexual_usage["total_tokens"],
        }
        token_usage = {
            "safety_critical": safety_usage,
            "sexual_safety": sexual_usage,
            "education": edu_usage,
            "classifiers_total": classifiers_total,
        }
        return results, token_usage

    # ── Layer 2: Education (Mistral 24B) ─────────────────────────────
    logger.info(f"[classifiers] Layer 2: education (Mistral 24B)...")
    edu_user = EDUCATION_USER.format(
        text=text, child_age=child_age, child_language=child_language
    )
    edu_raw_res = await run_model(MODEL_CLASSIFIER, CLASSIFIER_EDUCATION_SYSTEM, edu_user,
                                  max_tokens=60, label="education")

    edu_raw = {}
    if isinstance(edu_raw_res, Exception):
        logger.error(f"  [education] exception: {edu_raw_res}")
    elif isinstance(edu_raw_res, tuple):
        edu_raw, edu_usage = edu_raw_res

    # Consistency guard: detected=true requires mode != none
    if edu_raw.get("detected") is True and edu_raw.get("mode") == "none":
        logger.warning("  [education] detected=true but mode=none — correcting to false")
        edu_raw["detected"] = False
    results["education"].update(edu_raw)
    logger.info(f"  [education] detected={edu_raw.get('detected')}, mode={edu_raw.get('mode')}")

    logger.info(f"[classifiers] All done in {time.time()-t_start:.2f}s")
    
    classifiers_total = {
        "prompt_tokens": safety_usage["prompt_tokens"] + sexual_usage["prompt_tokens"] + edu_usage["prompt_tokens"],
        "completion_tokens": safety_usage["completion_tokens"] + sexual_usage["completion_tokens"] + edu_usage["completion_tokens"],
        "total_tokens": safety_usage["total_tokens"] + sexual_usage["total_tokens"] + edu_usage["total_tokens"],
    }
    token_usage = {
        "safety_critical": safety_usage,
        "sexual_safety": sexual_usage,
        "education": edu_usage,
        "classifiers_total": classifiers_total,
    }
    return results, token_usage


# ─────────────────────────────────────────────
# PRIORITY ROUTER
# ─────────────────────────────────────────────

def route_response(
    classifier_results: Dict[str, dict],
    session_id: str = "default",
    prefilter: dict = None,
) -> Dict[str, Any]:
    """
    Priority order:
      1. self_harm       → rot (acute/means_plan) or gelb
      2. prohibited      → refusal (medical=gelb, rest=none)
      3. sexual_safety   → rot
      4. interpersonal/means_plan → rot
      5. interpersonal/low        → gelb
      6. education/likely_submission → homework path
      7. safe (default)
    """
    r_sh  = classifier_results.get("self_harm", {})
    r_sx  = classifier_results.get("sexual_safety", {})
    r_pb  = classifier_results.get("prohibited", {})
    r_ip  = classifier_results.get("interpersonal_harm", {})
    r_edu = classifier_results.get("education", {})

    # ── Prefilter safety net ──
    if prefilter and prefilter.get("triggered"):
        pf_cat = prefilter.get("category", "none")
        if pf_cat == "self_harm" and (r_sh.get("error") or not r_sh.get("detected")):
            logger.warning(f"PREFILTER OVERRIDE (self_harm): {prefilter.get('matched')}")
            pf_conf = prefilter.get("confidence", "medium")
            level = "active" if pf_conf == "high" else "passive"
            pf_detail = prefilter.get("category_detail", "self_harm")
            alert = "rot" if (level in ("means_plan", "acute") or pf_detail == "suicide") else "gelb"
            return {
                "path": "self_harm", "alert": alert, "response_type": "70b_shared",
                "category": pf_detail, "level": level, "role": "victim",
                "prefilter_override": True,
            }
        elif pf_cat == "violence" and (r_ip.get("error") or not r_ip.get("detected")):
            logger.warning(f"PREFILTER OVERRIDE (violence): {prefilter.get('matched')}")
            return {
                "path": "interpersonal_harm", "alert": "rot", "response_type": "70b_shared",
                "category": "threat_violence", "level": "high", "role": "perpetrator",
                "prefilter_override": True,
            }

    # ── Priority 1: Self-Harm ──
    if r_sh.get("detected") is True:
        level    = r_sh.get("level", "passive")
        category = r_sh.get("category", "self_harm")
        if level in ("means_plan", "acute"):
            alert = "rot"
        elif category == "suicide" and level == "passive":
            alert = "gelb"
        elif category == "suicide":
            alert = "rot"
        else:
            alert = "gelb"
        response_type = "template" if level in ("means_plan", "acute") else "70b_shared"
        return {
            "path": "self_harm", "alert": alert, "response_type": response_type,
            "category": category, "level": level, "role": r_sh.get("role", "victim"),
        }

    # ── Priority 2: Prohibited ──
    if r_pb.get("detected") is True:
        category = r_pb.get("category", "illegal")
        if category == "medical":
            return {
                "path": "prohibited", "alert": "gelb", "response_type": "llm_medical_refusal",
                "category": category, "level": "none", "role": "none",
            }
        return {
            "path": "prohibited", "alert": "none", "response_type": "llm_refusal",
            "category": category, "level": "none", "role": "none",
        }

    # ── Priority 3: Sexual Safety ──
    if r_sx.get("detected") is True:
        role = r_sx.get("role", "victim")
        response_type = "70b_bystander" if role == "bystander" else "template_sexual"
        return {
            "path": "sexual_safety", "alert": "rot", "response_type": response_type,
            "category": r_sx.get("category", "grooming"), "level": "none", "role": role,
        }

    # ── Priority 4: Interpersonal / means_plan ──
    if r_ip.get("detected") is True and r_ip.get("severity") == "means_plan":
        return {
            "path": "interpersonal_harm", "alert": "rot", "response_type": "template",
            "category": r_ip.get("category", "threat_violence"),
            "level": "means_plan", "role": r_ip.get("role", "victim"),
        }

    # ── Priority 5: Interpersonal / low or active ──
    if r_ip.get("detected") is True:
        return {
            "path": "interpersonal_harm", "alert": "gelb", "response_type": "70b_shared",
            "category": r_ip.get("category", "bullying"),
            "level": r_ip.get("severity", "low"), "role": r_ip.get("role", "victim"),
        }

    # ── Priority 6: Education ──
    if r_edu.get("detected") is True:
        mode = r_edu.get("mode", "none")

        if mode == "likely_submission":
            return {
                "path": "education_refusal", "alert": "none",
                "response_type": "llm_submission_refusal",
                "category": "likely_submission", "level": "none", "role": "none",
            }

        elif mode == "hidden_outsourcing":
            return {
                "path": "education_refusal", "alert": "none",
                "response_type": "llm_hidden_refusal",
                "category": "hidden_outsourcing", "level": "none", "role": "none",
            }

        elif mode == "collaborative_learning":
            return {
                "path": "homework", "alert": "none", "response_type": "70b_homework",
                "category": "collaborative_learning", "level": "none", "role": "none",
            }

    # ── Default: Safe ──
    return {
        "path": "safe", "alert": "none", "response_type": "70b_safe",
        "category": "none", "level": "none", "role": "none",
    }


# ─────────────────────────────────────────────
# RESPONSE GENERATORS
# ─────────────────────────────────────────────

async def generate_8b_refusal(text: str, category: str, child_age: str, locale: str) -> tuple:
    default_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if not async_llm_client:
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage

    from prompts.classifiers import REFUSAL_SYSTEM, REFUSAL_USER
    user_msg = REFUSAL_USER.format(category=category, locale=locale, child_age=child_age)
    t0 = time.time()
    try:
        response = await async_llm_client.chat.completions.create(
            model=MODEL_REFUSE,
            messages=[
                {"role": "system", "content": REFUSAL_SYSTEM},
                {"role": "user",   "content": user_msg},
            ],
            temperature=0.3, max_tokens=80,
        )
        result = response.choices[0].message.content.strip()
        usage = _extract_usage(response)
        tracker = api_calls_tracker.get()
        if tracker is not None:
            tracker.append({
                "id": len(tracker) + 1,
                "label": "refusal",
                "usage": usage
            })
        logger.info(f"  [refusal] {time.time()-t0:.2f}s")
        return result, usage
    except Exception as e:
        logger.error(f"Refusal generation failed: {e}")
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage


async def generate_medical_refusal(child_age: str, locale: str, child_language: str, child_country: str) -> tuple:
    default_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if not async_llm_client:
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage

    from prompts.responses import MEDICAL_REFUSAL_SYSTEM, MEDICAL_REFUSAL_USER
    from prompts.hotlines import HOTLINES

    # Get hotline data from child_country
    hotline_data = HOTLINES.get(child_country, {})
    youth_name   = hotline_data.get("youth_name", "")
    youth_number = hotline_data.get("youth", "116 111")
    helpline = f"{youth_name} {youth_number}".strip() if youth_name else "116 111 (free, anonymous)"

    system  = MEDICAL_REFUSAL_SYSTEM.format(child_age=child_age, child_language=child_language)
    user_msg = MEDICAL_REFUSAL_USER.format(
        child_language=child_language, child_age=child_age, helpline=helpline
    )
    t0 = time.time()
    try:
        response = await async_llm_client.chat.completions.create(
            model=MODEL_REFUSE,
            messages=[
                {"role": "system", "content": system},
                {"role": "user",   "content": user_msg},
            ],
            temperature=0.3, max_tokens=120,
        )
        result = response.choices[0].message.content.strip()
        usage = _extract_usage(response)
        tracker = api_calls_tracker.get()
        if tracker is not None:
            tracker.append({
                "id": len(tracker) + 1,
                "label": "medical_refusal",
                "usage": usage
            })
        logger.info(f"  [medical_refusal] {time.time()-t0:.2f}s")
        return result, usage
    except Exception as e:
        logger.error(f"Medical refusal generation failed: {e}")
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage


async def generate_submission_refusal(child_age: str, locale: str, child_language: str, category: str) -> tuple:
    """For likely_submission: hard refusal, clear boundary, pivot to learning."""
    default_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if not async_llm_client:
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage

    from prompts.responses import SUBMISSION_REFUSAL_PROMPT, STYLE_VAR
    system = SUBMISSION_REFUSAL_PROMPT.format(
        child_age=child_age, child_language=child_language, STYLE_VAR=STYLE_VAR
    )
    t0 = time.time()
    try:
        response = await async_llm_client.chat.completions.create(
            model=MODEL_REFUSE,
            messages=[
                {"role": "system", "content": system},
                {"role": "user",   "content": f"Category: {category}\nLanguage: {child_language}\nRespond now:"},
            ],
            temperature=0.3, max_tokens=100,
        )
        result = response.choices[0].message.content.strip()
        usage = _extract_usage(response)
        tracker = api_calls_tracker.get()
        if tracker is not None:
            tracker.append({
                "id": len(tracker) + 1,
                "label": "submission_refusal",
                "usage": usage
            })
        logger.info(f"  [submission_refusal] {time.time()-t0:.2f}s")
        return result, usage
    except Exception as e:
        logger.error(f"Submission refusal generation failed: {e}")
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage


async def generate_hidden_refusal(child_age: str, locale: str, child_language: str, category: str) -> tuple:
    """For hidden_outsourcing: redirect child to their own thinking."""
    default_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if not async_llm_client:
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage

    from prompts.responses import HIDDEN_OUTSOURCING_REFUSAL_PROMPT, STYLE_VAR
    system = HIDDEN_OUTSOURCING_REFUSAL_PROMPT.format(
        child_age=child_age, child_language=child_language, STYLE_VAR=STYLE_VAR
    )
    t0 = time.time()
    try:
        response = await async_llm_client.chat.completions.create(
            model=MODEL_REFUSE,
            messages=[
                {"role": "system", "content": system},
                {"role": "user",   "content": f"Category: {category}\nLanguage: {child_language}\nRespond now:"},
            ],
            temperature=0.3, max_tokens=100,
        )
        result = response.choices[0].message.content.strip()
        usage = _extract_usage(response)
        tracker = api_calls_tracker.get()
        if tracker is not None:
            tracker.append({
                "id": len(tracker) + 1,
                "label": "hidden_refusal",
                "usage": usage
            })
        logger.info(f"  [hidden_refusal] {time.time()-t0:.2f}s")
        return result, usage
    except Exception as e:
        logger.error(f"Hidden refusal generation failed: {e}")
        from prompts.templates import get_fallback_refusal
        return get_fallback_refusal(locale), default_usage


def build_response_messages(
    system_prompt: str,
    user_message: str,
    chat_history: List[Dict[str, str]] = None,
    summary_context: str = "",
) -> List[Dict[str, str]]:
    messages = [{"role": "system", "content": system_prompt}]
    if summary_context:
        messages.append({"role": "system", "content": f"Long-term context: {summary_context}"})
    history_window = (chat_history or [])[-14:]
    for msg in history_window:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": user_message})
    return messages


_KHAN_BASES = {
    "german":     "https://de.khanacademy.org/search?page_search_query=",
    "deutsch":    "https://de.khanacademy.org/search?page_search_query=",
    "spanish":    "https://es.khanacademy.org/search?page_search_query=",
    "español":    "https://es.khanacademy.org/search?page_search_query=",
    "french":     "https://fr.khanacademy.org/search?page_search_query=",
    "français":   "https://fr.khanacademy.org/search?page_search_query=",
    "portuguese": "https://pt.khanacademy.org/search?page_search_query=",
    "português":  "https://pt.khanacademy.org/search?page_search_query=",
}
_KHAN_DEFAULT = "https://www.khanacademy.org/search?page_search_query="
_KHAN_YES = re.compile(
    r"\b(yes|ja|oui|sí|si|sim|ok|okay|sure|gerne|bitte|yep|yeah|klar|absolut|natürlich|"
    r"bitte schick|schick mir|send me|manda|envoie|claro|por favor)\b",
    re.IGNORECASE,
)


def build_khan_link(topic: str, child_language: str) -> str:
    import urllib.parse
    base = _KHAN_BASES.get(child_language.lower(), _KHAN_DEFAULT)
    return base + urllib.parse.quote(topic.strip())


def extract_topic_from_message(text: str) -> str:
    text = re.sub(
        r"(schreib mir|löse|berechne|erkläre mir|write me|solve|calculate|"
        r"help me with|hilf mir bei|make me|erstelle|translate|übersetze|"
        r"complete|mein|my|für mich|for me|please|bitte)",
        "", text, flags=re.IGNORECASE
    ).strip()
    words = text.split()[:5]
    return " ".join(words) if words else text


def get_system_prompt(routing: Dict, child_age: str, child_language: str) -> str:
    from prompts.responses import (
        SHARED_SAFETY_RESPONSE_PROMPT, SEXUAL_SAFETY_BYSTANDER_PROMPT,
        SAFE_PATH_PROMPT, HOMEWORK_PROMPT, STYLE_VAR
    )
    response_type = routing["response_type"]
    if response_type == "70b_shared":
        return SHARED_SAFETY_RESPONSE_PROMPT.format(
            child_age=child_age, child_language=child_language, STYLE_VAR=STYLE_VAR,
            category=routing.get("category", "none"), role=routing.get("role", "none"),
            level=routing.get("level", "none"), emotion=routing.get("emotion", "none"),
        )
    elif response_type == "70b_bystander":
        return SEXUAL_SAFETY_BYSTANDER_PROMPT.format(
            child_age=child_age, child_language=child_language, STYLE_VAR=STYLE_VAR,
            category=routing.get("category", "grooming"),
        )
    elif response_type == "70b_homework":
        turns = routing.get("_turns", 1)
        return HOMEWORK_PROMPT.format(
            child_age=child_age, child_language=child_language, STYLE_VAR=STYLE_VAR,
        ) + f"\n[Conversation turn in this homework session: {turns}. Offer Khan Academy if turns >= 3 and no progress, or on success.]"
    elif response_type == "70b_safe":
        edu_mode = routing.get("category", "none")
        edu_hint = ""
        if edu_mode == "curiosity":
            edu_hint = "\n[Mode: curiosity — use Feynman method: plain language, concrete examples.]"
        elif edu_mode == "tutoring":
            edu_hint = "\n[Mode: tutoring — scaffold the explanation, guide step by step.]"
        elif edu_mode == "collaborative_work":
            edu_hint = "\n[Mode: collaborative — give specific feedback, never replace their thinking.]"
        return SAFE_PATH_PROMPT.format(
            child_age=child_age, child_language=child_language, STYLE_VAR=STYLE_VAR,
        ) + edu_hint
    return SAFE_PATH_PROMPT.format(child_age=child_age, child_language=child_language, STYLE_VAR=STYLE_VAR)


# ─────────────────────────────────────────────
# PARENT SUMMARY GENERATOR (Rot-alerts only)
# ─────────────────────────────────────────────

async def generate_parent_summary(
    child_message: str,
    routing: Dict,
    child_language: str = "German",
    child_age: str = "10",
) -> tuple:
    """Generate a structured 3-line parent summary for Rot-alerts."""
    default_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    if not async_llm_client:
        return "", default_usage
    try:
        from prompts.responses import PARENT_SUMMARY_SYSTEM, PARENT_SUMMARY_USER
        system = PARENT_SUMMARY_SYSTEM.format(child_language=child_language)
        user = PARENT_SUMMARY_USER.format(
            child_age=child_age,
            child_message=child_message[:300],
            path=routing.get("path", "unknown"),
            category=routing.get("category", "none"),
            role=routing.get("role", "none"),
            level=routing.get("level", "none"),
            child_language=child_language,
        )
        response = await async_llm_client.chat.completions.create(
            model=MODEL_REFUSE,
            messages=[
                {"role": "system", "content": system},
                {"role": "user",   "content": user},
            ],
            temperature=0.2, max_tokens=120,
        )
        result = response.choices[0].message.content.strip()
        usage = _extract_usage(response)
        
        tracker = api_calls_tracker.get()
        if tracker is not None:
            tracker.append({
                "id": len(tracker) + 1,
                "label": "parent_summary",
                "usage": usage
            })
            
        return result, usage
    except Exception as e:
        logger.error(f"Parent summary generation failed: {e}")
        return "", default_usage


def build_audit_result(routing: Dict, session_id: str, locale: str, parent_summary: str = "") -> Optional[Dict]:
    if routing["alert"] == "none":
        return None
    result = {
        "alert_level":    routing["alert"],
        "timestamp":      time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "path":           routing["path"],
        "category":       routing["category"],
        "role":           routing.get("role", "none"),
        "level":          routing.get("level", "none"),
        "session_id":     session_id,
        "locale":         locale,
    }
    if parent_summary:
        result["parent_summary"] = parent_summary
    return result


# ─────────────────────────────────────────────
# LOCALE HELPER
# ─────────────────────────────────────────────

def detect_locale(child_language: str, child_country: str) -> str:
    lang_lower = child_language.lower()
    if any(w in lang_lower for w in ("deutsch", "german")):     return "de"
    if any(w in lang_lower for w in ("español", "spanish")):    return "es"
    if any(w in lang_lower for w in ("français", "french")):    return "fr"
    if any(w in lang_lower for w in ("italiano", "italian")):   return "it"
    if any(w in lang_lower for w in ("português", "portuguese")): return "pt"
    if any(w in lang_lower for w in ("english", "englisch")):   return "en"
    country_map = {
        "Germany": "de", "Austria": "de", "Switzerland": "de",
        "Spain": "es", "France": "fr", "Italy": "it", "Portugal": "pt",
    }
    return country_map.get(child_country, "en")


# ─────────────────────────────────────────────
# ENDPOINTS
# ─────────────────────────────────────────────

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "v12", "models": {"classifier": MODEL_CLASSIFIER, "response": MODEL_RESPONSE, "refuse": MODEL_REFUSE}}


@app.post("/analyze_only")
async def analyze_only(req: MentorRequest):
    api_calls = []
    token = api_calls_tracker.set(api_calls)
    try:
        from starlette.concurrency import run_in_threadpool
        start = time.time()
        logger.info(f"[analyze_only] START: {req.message[:80]}...")
        pp = await run_in_threadpool(preprocess_input, req.message)
        if pp["is_injection"]:
            return {"injection_detected": True, "injection_findings": pp["injection_findings"],
                    "metrics": {"analysis_time": f"{time.time() - start:.4f}s"}}
        results, token_usage = await run_all_classifiers_async(pp["normalized"], str(req.child_age), req.child_language)
        session_id = req.session_id or "default"
        routing = route_response(results, session_id, pp["prefilter"])
        total_time = time.time() - start
        logger.info(f"[analyze_only] DONE in {total_time:.2f}s — route={routing.get('path')}")
        
        total_tokens_usage = {
            "classifiers": token_usage,
            "classifiers_total": token_usage.get("classifiers_total", {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}),
            "response": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
            "parent_summary": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
            "total": token_usage.get("classifiers_total", {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}),
            "calls": api_calls,
        }
        
        return {
            "classifiers": results, "routing": routing,
            "prefilter": pp["prefilter"], "pii_findings": pp["pii_findings"],
            "normalized": pp["normalized"],
            "metrics": {"analysis_time": f"{total_time:.4f}s"},
            "token_usage": total_tokens_usage,
        }
    finally:
        api_calls_tracker.reset(token)


@app.post("/mentor")
async def mentor_chat(req: MentorRequest):
    api_calls = []
    token = api_calls_tracker.set(api_calls)
    try:
        from starlette.concurrency import run_in_threadpool
        start_total = time.time()
        logger.info(f"[mentor] START: {req.message[:80]}...")

        if not async_response_client:
            raise HTTPException(status_code=500, detail="API client not initialized.")
    
        pp = await run_in_threadpool(preprocess_input, req.message)
        t_norm = time.time() - start_total
        logger.info(f"[mentor] Preprocessing done in {t_norm:.3f}s")
    
        if pp["is_injection"]:
            def gen_injection():
                yield json.dumps({"type": "injection", "data": pp["injection_findings"]}) + "\n"
                yield json.dumps({"type": "content", "content": "Hey! 😊 What would you like to talk about or learn today?"}) + "\n"
                yield json.dumps({"type": "model", "content": "injection-blocked"}) + "\n"
            return StreamingResponse(gen_injection(), media_type="application/x-ndjson")
    
        t_clf = 0.0
        _trivial_safe = route_if_trivial(pp["normalized"])
        if _trivial_safe:
            logger.info("[mentor] Trivial message — skipping classifiers")
            classifier_results = {
                "self_harm":          {"detected": False, "level": "none", "role": "none", "category": "none"},
                "prohibited":         {"detected": False, "category": "none"},
                "sexual_safety":      {"detected": False, "category": "none", "role": "none"},
                "interpersonal_harm": {"detected": False, "category": "none", "role": "none", "severity": "none"},
                "education":          {"detected": False, "mode": "none"},
            }
            token_usage = {
                "safety_critical": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
                "sexual_safety": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
                "education": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
                "classifiers_total": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
            }
        else:
            t_clf_start = time.time()
            classifier_results, token_usage = await run_all_classifiers_async(
                pp["normalized"], str(req.child_age), req.child_language
            )
            t_clf = time.time() - t_clf_start
            logger.info(f"[mentor] Classifiers done in {t_clf:.2f}s")
    
        session_id = req.session_id or "default"
        routing = route_response(classifier_results, session_id, pp["prefilter"])
        routing = resolve_path_from_session(session_id, routing, classifier_results)
        if routing.get("_sticky"):
            logger.info(f"[mentor] Sticky path: {routing['path']} (turn {routing.get('_turns')})")
    
        locale = detect_locale(req.child_language, req.child_country)
    
        # Generate parent summary for all Rot-alerts
        parent_summary = ""
        parent_summary_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
        if routing.get("alert") == "rot":
            parent_summary, parent_summary_usage = await generate_parent_summary(
                child_message=pp["normalized"],
                routing=routing,
                child_language=req.child_language,
                child_age=str(req.child_age),
            )
    
        audit = build_audit_result(routing, session_id, locale, parent_summary)
    
        async def generate():
            generator_token = api_calls_tracker.set(api_calls)
            try:
                logger.info(f"[mentor] Stream START — route={routing.get('path')}, type={routing.get('response_type')}")
    
                yield json.dumps({"type": "classifiers", "data": classifier_results}) + "\n"
                yield json.dumps({"type": "routing",     "data": routing}) + "\n"
                if pp["pii_findings"]:
                    yield json.dumps({"type": "pii_redacted", "data": pp["pii_findings"]}) + "\n"
                if pp["prefilter"]:
                    yield json.dumps({"type": "prefilter", "data": pp["prefilter"]}) + "\n"
                if audit:
                    yield json.dumps({"type": "alert", "data": audit}) + "\n"
    
                t_gen_start  = time.time()
                response_type = routing["response_type"]
                resp_usage = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
    
                # A. Hardcoded template (self_harm acute/means_plan)
                if response_type == "template":
                    from prompts.templates import build_acute_template
                    tmpl = build_acute_template(
                        category=routing["category"], level=routing["level"],
                        role=routing["role"], locale=locale, country=req.child_country,
                    )
                    yield json.dumps({"type": "content", "content": tmpl}) + "\n"
                    yield json.dumps({"type": "model",   "content": "hardcoded-template"}) + "\n"
    
                # B. Hardcoded template (sexual safety victim)
                elif response_type == "template_sexual":
                    from prompts.templates import get_sexual_safety_template
                    tmpl = get_sexual_safety_template(
                        category=routing["category"], role=routing["role"], locale=locale,
                    )
                    yield json.dumps({"type": "content", "content": tmpl}) + "\n"
                    yield json.dumps({"type": "model",   "content": "hardcoded-template"}) + "\n"
    
                # C. Refusal (prohibited)
                elif response_type == "llm_refusal":
                    refusal, resp_usage = await generate_8b_refusal(
                        pp["normalized"], routing["category"], str(req.child_age), locale
                    )
                    yield json.dumps({"type": "content", "content": refusal}) + "\n"
                    yield json.dumps({"type": "model",   "content": f'{MODEL_REFUSE} (refusal)'}) + "\n"
    
                # D. Medical refusal
                elif response_type == "llm_medical_refusal":
                    refusal, resp_usage = await generate_medical_refusal(str(req.child_age), locale, req.child_language, req.child_country)
                    yield json.dumps({"type": "content", "content": refusal}) + "\n"
                    yield json.dumps({"type": "model",   "content": f'{MODEL_REFUSE} (medical)'}) + "\n"
    
                # E. Submission refusal (likely_submission)
                elif response_type == "llm_submission_refusal":
                    refusal, resp_usage = await generate_submission_refusal(
                        str(req.child_age), locale, req.child_language, routing["category"]
                    )
                    yield json.dumps({"type": "content", "content": refusal}) + "\n"
                    yield json.dumps({"type": "model",   "content": f'{MODEL_REFUSE} (submission_refusal)'}) + "\n"
    
                # F. Hidden outsourcing refusal (hidden_outsourcing)
                elif response_type == "llm_hidden_refusal":
                    refusal, resp_usage = await generate_hidden_refusal(
                        str(req.child_age), locale, req.child_language, routing["category"]
                    )
                    yield json.dumps({"type": "content", "content": refusal}) + "\n"
                    yield json.dumps({"type": "model",   "content": f'{MODEL_REFUSE} (hidden_refusal)'}) + "\n"
    
                # E. Streaming response (all other paths)
                else:
                    if not async_response_client:
                        logger.error("[mentor] Response client not initialized!")
                        yield json.dumps({"type": "content", "content": "Server ist nicht vollständig initialisiert. Versuche es in ein paar Sekunden nochmal."}) + "\n"
                        return
                        
                    system_prompt = get_system_prompt(routing, str(req.child_age), req.child_language)
                    messages = build_response_messages(
                        system_prompt, pp["normalized"], req.chat_history, req.summary_context
                    )
                    model = MODEL_RESPONSE
                    is_homework = (response_type == "70b_homework")
                    logger.info(f"[mentor] Streaming response (model={model}, homework={is_homework})...")
                    try:
                        stream = await async_response_client.chat.completions.create(
                            model=model, messages=messages,
                            stream=True, max_tokens=400, temperature=0.7,
                            stream_options={"include_usage": True},
                        )
                        chunk_count  = 0
                        full_response = []
                        first_chunk  = True
                        async for chunk in stream:
                            content = chunk.choices[0].delta.content if chunk.choices else None
                            if content:
                                if first_chunk:
                                    logger.info("[mentor] First chunk received")
                                    first_chunk = False
                                yield json.dumps({"type": "content", "content": content}) + "\n"
                                if is_homework:
                                    full_response.append(content)
                                chunk_count += 1
                            if hasattr(chunk, "usage") and chunk.usage:
                                resp_usage = _extract_usage(chunk)
                                tracker = api_calls_tracker.get()
                                if tracker is not None:
                                    existing = next((c for c in tracker if c["label"] == "response"), None)
                                    if existing:
                                        existing["usage"] = resp_usage
                                    else:
                                        tracker.append({
                                            "id": len(tracker) + 1,
                                            "label": "response",
                                            "usage": resp_usage
                                        })
    
                        if is_homework and _KHAN_YES.search(pp["normalized"]):
                            topic = extract_topic_from_message(req.message)
                            if topic:
                                khan_url = build_khan_link(topic, req.child_language)
                                yield json.dumps({"type": "content", "content": f"\n\n🎓 Khan Academy: {khan_url}"}) + "\n"
                                logger.info(f"[mentor] Khan link: {khan_url}")
    
                        logger.info(f"[mentor] Stream complete ({chunk_count} chunks)")
                        yield json.dumps({"type": "model", "content": model}) + "\n"
    
                    except Exception as e:
                        logger.error(f"[mentor] Stream error: {type(e).__name__}: {e}")
                        logger.error(f"[mentor] Traceback: {traceback.format_exc()}")
                        yield json.dumps({"type": "content", "content": "Ich brauche gerade einen Moment — versuch es bitte nochmal."}) + "\n"
    
                t_gen = time.time() - t_gen_start
                total_time = time.time() - start_total
                
                # Yield unified token usage
                overall_total = {
                    "prompt_tokens": token_usage["classifiers_total"]["prompt_tokens"] + resp_usage["prompt_tokens"] + parent_summary_usage["prompt_tokens"],
                    "completion_tokens": token_usage["classifiers_total"]["completion_tokens"] + resp_usage["completion_tokens"] + parent_summary_usage["completion_tokens"],
                    "total_tokens": token_usage["classifiers_total"]["total_tokens"] + resp_usage["total_tokens"] + parent_summary_usage["total_tokens"],
                }
                overall_usage = {
                    "classifiers": token_usage,
                    "classifiers_total": token_usage["classifiers_total"],
                    "response": resp_usage,
                    "parent_summary": parent_summary_usage,
                    "total": overall_total,
                    "calls": api_calls,
                }
                yield json.dumps({"type": "token_usage", "data": overall_usage}) + "\n"
    
                yield json.dumps({"type": "metrics", "data": {
                    "normalization": f"{t_norm:.4f}s",
                    "classifiers":   f"{t_clf:.4f}s",
                    "generation":    f"{t_gen:.4f}s",
                    "total":         f"{total_time:.4f}s",
                }}) + "\n"
                logger.info(f"[mentor] DONE total={total_time:.2f}s")
    
            except Exception as e:
                logger.error(f"[mentor] Generator error: {e}\n{traceback.format_exc()}")
                yield json.dumps({"type": "error", "content": "An unexpected error occurred."}) + "\n"
            finally:
                api_calls_tracker.reset(generator_token)

        return StreamingResponse(generate(), media_type="application/x-ndjson")
    finally:
        api_calls_tracker.reset(token)


# ─────────────────────────────────────────────
# FEEDBACK ENDPOINT
# ─────────────────────────────────────────────

class FeedbackRequest(PydanticBaseModel):
    query:       str  = Field(..., max_length=4000)
    classifiers: dict = Field(default_factory=dict)
    routing:     dict = Field(default_factory=dict)
    prefilter:   Optional[dict] = None
    comment:     str  = Field(default="", max_length=1000)

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL", "")
FEEDBACK_LOG_PATH   = os.getenv("FEEDBACK_LOG_PATH", "feedback.jsonl")


def send_discord_feedback(feedback_data: dict) -> bool:
    if not DISCORD_WEBHOOK_URL:
        return False
    try:
        import requests as req_lib
        routing  = feedback_data.get("routing", {})
        path     = routing.get("path",  "?")
        alert    = routing.get("alert", "?")
        category = routing.get("category", "?")
        role     = routing.get("role",  "?")
        query    = feedback_data.get("query", "?")[:500]
        comment  = feedback_data.get("comment", "")
        alert_emoji = {"rot": "🔴", "gelb": "🟡", "none": "⚪"}.get(alert, "❓")
        embed = {
            "title": f"{alert_emoji} Bad Classification Report",
            "color": {"rot": 0xFF0000, "gelb": 0xFFAA00, "none": 0x888888}.get(alert, 0x888888),
            "fields": [
                {"name": "Query",    "value": f"```{query}```", "inline": False},
                {"name": "Path",     "value": path,     "inline": True},
                {"name": "Alert",    "value": alert,    "inline": True},
                {"name": "Category", "value": category, "inline": True},
                {"name": "Role",     "value": role,     "inline": True},
            ],
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
        if comment:
            embed["fields"].append({"name": "Parent Comment", "value": comment, "inline": False})
        classifiers = feedback_data.get("classifiers", {})
        clf_lines = []
        for name, data in classifiers.items():
            if data.get("detected"):
                details = {k: v for k, v in data.items() if k not in ("detected", "error", "error_reason") and v != "none"}
                clf_lines.append(f"**{name}**: {details}")
        if clf_lines:
            embed["fields"].append({"name": "Classifiers (detected)", "value": "\n".join(clf_lines)[:1000], "inline": False})
        resp = req_lib.post(DISCORD_WEBHOOK_URL, json={"embeds": [embed]}, timeout=5)
        return resp.status_code in (200, 204)
    except Exception as e:
        logger.error(f"Discord webhook failed: {e}")
        return False


@app.post("/feedback")
async def submit_feedback(req: FeedbackRequest):
    feedback_data = {
        "timestamp":   time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "query":       req.query,
        "classifiers": req.classifiers,
        "routing":     req.routing,
        "prefilter":   req.prefilter,
        "comment":     req.comment,
    }
    try:
        with open(FEEDBACK_LOG_PATH, "a", encoding="utf-8") as f:
            f.write(json.dumps(feedback_data, ensure_ascii=False) + "\n")
        logger.info(f"Feedback logged: {req.query[:80]}...")
    except Exception as e:
        logger.error(f"Failed to write feedback log: {e}")

    discord_sent = send_discord_feedback(feedback_data)
    return {"status": "received", "discord_sent": discord_sent, "logged": True}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

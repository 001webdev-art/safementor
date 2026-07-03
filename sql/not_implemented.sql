CREATE TABLE usage_log (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at  timestamptz DEFAULT now(),
    user_id     text NOT NULL,        -- aus Flutter App
    session_id  text NOT NULL,
    call_type   text NOT NULL,        -- 'classifier' | 'response' | 'refusal' | 'parent_summary'
    model       text NOT NULL,
    prompt_tokens      int DEFAULT 0,
    completion_tokens  int DEFAULT 0,
    cached_tokens      int DEFAULT 0,
    cost_usd    numeric(10,6) DEFAULT 0,
    alert_level text DEFAULT 'none'   -- für Korrelation: kostet ein Rot-Alert mehr?
);

-- Index für Dashboard-Queries
CREATE INDEX ON usage_log (user_id, created_at);
Admin Dashboard Query:
sqlSELECT 
    user_id,
    date_trunc('day', created_at) AS day,
    SUM(cost_usd)           AS total_cost,
    SUM(prompt_tokens)      AS prompt_tokens,
    SUM(completion_tokens)  AS completion_tokens,
    SUM(cached_tokens)      AS cached_tokens,
    COUNT(*)                AS api_calls
FROM usage_log
GROUP BY user_id, day
ORDER BY day DESC;
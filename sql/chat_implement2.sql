-- 1. Create chat_messages table

-- updated the public.chat_messages to add some pilot fields to store feeligs static

alter table public.chat_messages add column user_intent_intensity float default 0.0;
alter table public.chat_messages add column user_intent_valence float default 0.0;
alter table public.chat_messages add column user_intent_flag varchar(100);  
alter table public.chat_messages add column user_intent_means boolean default false;
alter table public.chat_messages add column user_intent_actionable boolean default false;
alter table public.chat_messages add column user_intent_prob float default 0.0;
alter table public.chat_messages add column user_intent_summary varchar(150);


--"intent_analysis": {
--        "intensity": 10.0,
--        "valence": -5.0,
--        "flag": "self_harm",
--        "means": true,
--        "actionable": true,
--        "prob": 100.0,
--        "summary": "kill cat"
    },

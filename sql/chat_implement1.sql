create table public.chat_messages (
  id uuid not null default gen_random_uuid (),
  child_id uuid not null,
  message_type text not null,
  content text not null,
  timestamp timestamp with time zone null default now(),
  parent_message_id uuid null,
  is_synced boolean null default true,
  local_id text null,
  device_id text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  user_intent_intensity double precision null default 0.0,
  user_intent_valence double precision null default 0.0,
  user_intent_flag character varying(100) null,
  user_intent_means boolean null default false,
  user_intent_actionable boolean null default false,
  user_intent_prob double precision null default 0.0,
  user_intent_summary character varying(150) null,
  parent_reviewed boolean null default false,
  user_intent_level public.alert_level null default 'none'::alert_level,
  prompt_tokens integer null default 0,
  completion_tokens integer null default 0,
  total_tokens integer null default 0,
  model_used text null default 'gpt-3.5-turbo'::text,
  total_cost numeric(10, 6) null default 0.0,
  constraint chat_messages_pkey primary key (id),
  constraint chat_messages_child_id_fkey foreign KEY (child_id) references children (id) on delete CASCADE,
  constraint chat_messages_parent_message_id_fkey foreign KEY (parent_message_id) references chat_messages (id),
  constraint chat_messages_message_type_check check (
    (
      message_type = any (array['user'::text, 'assistant'::text])
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_chat_messages_child_id on public.chat_messages using btree (child_id) TABLESPACE pg_default;

create index IF not exists idx_chat_messages_timestamp on public.chat_messages using btree ("timestamp") TABLESPACE pg_default;

create index IF not exists idx_chat_messages_sync_status on public.chat_messages using btree (is_synced) TABLESPACE pg_default
where
  (not is_synced);

create index IF not exists idx_chat_messages_tokens on public.chat_messages using btree (total_tokens) TABLESPACE pg_default;

create index IF not exists idx_chat_messages_model on public.chat_messages using btree (model_used) TABLESPACE pg_default;

create index IF not exists idx_chat_messages_cost on public.chat_messages using btree (total_cost) TABLESPACE pg_default;
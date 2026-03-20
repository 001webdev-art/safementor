-- 1. Create chat_messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  message_type TEXT NOT NULL CHECK (message_type IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  parent_message_id UUID REFERENCES chat_messages(id),
  is_synced BOOLEAN DEFAULT true,
  local_id TEXT, -- For tracking local-only messages
  device_id TEXT, -- For multi-device conflict resolution
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add RLS policies
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Parents can only see their children's messages
CREATE POLICY "Parents can view their children's messages"
  ON chat_messages FOR SELECT
  USING (
    child_id IN (
      SELECT id FROM children 
      WHERE parent_id = auth.uid()
    )
  );

-- Parents can insert messages for their children
CREATE POLICY "Parents can insert messages for their children"
  ON chat_messages FOR INSERT
  WITH CHECK (
    child_id IN (
      SELECT id FROM children 
      WHERE parent_id = auth.uid()
    )
  );

-- 3. Create indexes
CREATE INDEX idx_chat_messages_child_id ON chat_messages(child_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);
CREATE INDEX idx_chat_messages_sync_status ON chat_messages(is_synced) WHERE NOT is_synced;
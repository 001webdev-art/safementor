-- Add RLS policy for parents to update chat messages (e.g. for parent_reviewed)
CREATE POLICY "Parents can update their children's messages"
  ON chat_messages FOR UPDATE
  USING (
    child_id IN (
      SELECT id FROM children 
      WHERE parent_id = auth.uid()
    )
  )
  WITH CHECK (
    child_id IN (
      SELECT id FROM children 
      WHERE parent_id = auth.uid()
    )
  );

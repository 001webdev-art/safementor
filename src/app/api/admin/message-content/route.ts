import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/admin/message-content
 *
 * Fetch the full content of a specific alert message.
 * Only accessible to admin users after password verification.
 *
 * Query params:
 * - messageId: The ID of the chat message to retrieve
 *
 * Response:
 * - { content: string } on success
 * - { error: string } on failure or if not authorized
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify admin access
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('admin')
    .eq('id', session.user.id)
    .maybeSingle()

  if (profileError || !profile?.admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Get the message ID from query params
  const messageId = request.nextUrl.searchParams.get('messageId')

  if (!messageId) {
    return NextResponse.json({ error: 'Missing messageId parameter' }, { status: 400 })
  }

  // Fetch the message content from the database
  const { data: message, error: fetchError } = await supabase
    .from('chat_messages')
    .select('id, content')
    .eq('id', messageId)
    .maybeSingle()

  if (fetchError || !message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 })
  }

  return NextResponse.json({
    content: message.content || 'No content available',
  })
}

import chatDb, { LocalMessage } from './pouchdb';
import { createClient } from '@/lib/supabase/client';
import { Message, SyncStatus } from '../types/chat';

class SyncManager {
    private supabase: any = null;
    private isSyncing = false;
    private retrySync = false;

    constructor() {
        if (typeof window !== 'undefined') {
            this.supabase = createClient();
            window.addEventListener('online', () => this.sync());
        }
    }

    async sync() {
        if (!this.supabase || !navigator.onLine) return;

        if (this.isSyncing) {
            this.retrySync = true;
            return;
        }
        this.isSyncing = true;
        this.retrySync = false;

        try {
            do {
                this.retrySync = false;
                const unsynced = await chatDb.getUnsyncedMessages();

                for (const localMsg of unsynced) {
                    await this.syncMessage(localMsg);
                }
            } while (this.retrySync || (await chatDb.getUnsyncedMessages()).length > 0);
        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            this.isSyncing = false;
            this.retrySync = false;
        }
    }

    private async syncMessage(localMsg: LocalMessage) {
        try {
            let parentId = localMsg.parent_message_id;

            // If we have a parent_message_id, check if it's a local ID that needs resolving
            if (parentId && !this.isUUID(parentId)) {
                const parentMsg = await chatDb.getMessageByLocalId(parentId);
                if (parentMsg && parentMsg.is_synced && parentMsg.id) {
                    parentId = parentMsg.id; // Resolve to Supabase UUID
                } else if (!parentMsg) {
                    // Parent message not found locally - maybe deleted? 
                    // Or maybe it was already a UUID but didn't pass regex? 
                    // Let's assume it's lost and proceed without parent linkage if we can't find it.
                    parentId = undefined;
                } else {
                    // Parent exists but not yet synced - defer this message sync
                    console.log(`Deferring sync for message ${localMsg.id} until parent ${parentId} is synced.`);
                    return;
                }
            }

            const { data, error } = await this.supabase
                .from('chat_messages')
                .insert({
                    child_id: localMsg.child_id,
                    message_type: localMsg.message_type,
                    content: localMsg.content,
                    timestamp: localMsg.timestamp,
                    parent_message_id: parentId,
                    is_synced: true,
                    local_id: localMsg.local_id || localMsg.id,
                })
                .select()
                .single();

            if (error) throw error;

            if (data) {
                await chatDb.updateMessageSyncStatus(localMsg.local_id || localMsg.id, 'synced', data.id);
            }
        } catch (error) {
            console.error(`Failed to sync message ${localMsg.id}:`, error);
        }
    }

    private isUUID(id: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }

    async fetchNewMessages(childId: string) {
        if (!this.supabase || !navigator.onLine) return;

        try {
            // Get last synced timestamp for this child
            const localMessages = await chatDb.getMessages(childId);
            // Local messages are sorted newest first (descending). 
            // So index 0 is the newest.
            const lastTimestamp = localMessages.length > 0
                ? localMessages[0].timestamp
                : new Date(0).toISOString();

            // Join with children to get nickname
            const { data, error } = await this.supabase
                .from('chat_messages')
                .select('*, children(nickname)')
                .eq('child_id', childId)
                .gt('timestamp', lastTimestamp)
                .order('timestamp', { ascending: true });

            if (error) throw error;

            if (data) {
                for (const remoteMsg of data) {
                    // Check if we already have this message (by UUID) to avoid partial duplicates
                    // The remoteMsg.id is the UUID.
                    // We might have it as `id` or `local_id` if it was just synced.
                    // But simpler: just check if a doc with this _id (if we used UUID as _id) or `id` field exists.
                    // Our saveMessage uses `local_id` or `id` as _id. 
                    // If we synced it, we updated the doc to have `id` = UUID.
                    // So we can try to find by that ID.

                    // Actually, let's use a simpler check: 
                    // If we find a message with this UUID in our DB, skip it.
                    // But we don't have a direct "getByUUID" efficiently without index, 
                    // though we can use `chatDb.getMessages` (which we just did) to check in memory? 
                    // `localMessages` has all messages for this child.

                    const exists = localMessages.some(m => m.id === remoteMsg.id);
                    if (exists) {
                        continue;
                    }

                    await chatDb.saveMessage({
                        id: remoteMsg.id,
                        child_id: remoteMsg.child_id,
                        message_type: remoteMsg.message_type,
                        content: remoteMsg.content,
                        timestamp: remoteMsg.timestamp,
                        parent_message_id: remoteMsg.parent_message_id,
                        is_synced: true,
                        sync_status: 'synced',
                        date: remoteMsg.timestamp.split('T')[0],
                        time: remoteMsg.timestamp.split('T')[1].split('.')[0],
                        nickname: (remoteMsg.children as any)?.nickname
                    });
                }
            }
        } catch (error) {
            console.error('Fetch new messages failed:', error);
        }
    }
}

const syncManager = new SyncManager();
export default syncManager;

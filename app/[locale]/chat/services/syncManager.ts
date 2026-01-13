import chatDb, { LocalMessage } from './pouchdb';
import { createClient } from '@/lib/supabase/client';
import { Message, SyncStatus } from '../types/chat';

class SyncManager {
    private supabase: any = null;
    private isSyncing = false;

    constructor() {
        if (typeof window !== 'undefined') {
            this.supabase = createClient();
            window.addEventListener('online', () => this.sync());
        }
    }

    async sync() {
        if (!this.supabase || this.isSyncing || !navigator.onLine) return;
        this.isSyncing = true;

        try {
            const unsynced = await chatDb.getUnsyncedMessages();
            for (const localMsg of unsynced) {
                await this.syncMessage(localMsg);
            }
        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            this.isSyncing = false;
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
            const lastTimestamp = localMessages.length > 0
                ? localMessages[localMessages.length - 1].timestamp
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

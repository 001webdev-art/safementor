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
        if (!navigator.onLine) {
            console.log('Sync skipped: Offline');
            return;
        }

        if (!this.supabase) {
            this.supabase = createClient();
        }

        if (!this.supabase) {
            console.error('Sync failed: Supabase client not initialized');
            return;
        }

        if (this.isSyncing) {
            this.retrySync = true;
            return;
        }
        this.isSyncing = true;
        this.retrySync = false;

        try {
            console.log('Starting sync...');
            do {
                this.retrySync = false;
                const unsynced = await chatDb.getUnsyncedMessages();
                console.log(`Found ${unsynced.length} unsynced messages`);

                for (const localMsg of unsynced) {
                    await this.syncMessage(localMsg);
                }
            } while (this.retrySync || (await chatDb.getUnsyncedMessages()).length > 0);
        } catch (error) {
            console.error('Sync failed with error:', error);
        } finally {
            this.isSyncing = false;
            this.retrySync = false;
            console.log('Sync finished');
        }
    }

    private async syncMessage(localMsg: LocalMessage) {
        try {
            console.log(`Syncing message ${localMsg.id} for child ${localMsg.child_id}`);
            let parentId = localMsg.parent_message_id;

            // If we have a parent_message_id, check if it's a local ID that needs resolving
            if (parentId && !this.isUUID(parentId)) {
                const parentMsg = await chatDb.getMessageByLocalId(parentId);
                if (parentMsg && parentMsg.is_synced && parentMsg.id) {
                    parentId = parentMsg.id; // Resolve to Supabase UUID
                } else if (!parentMsg) {
                    parentId = undefined;
                } else {
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
                    user_intent_intensity: localMsg.user_intent_intensity,
                    user_intent_valence: localMsg.user_intent_valence,
                    user_intent_flag: localMsg.user_intent_flag,
                    user_intent_means: localMsg.user_intent_means,
                    user_intent_actionable: localMsg.user_intent_actionable,
                    user_intent_prob: localMsg.user_intent_prob,
                    user_intent_summary: localMsg.user_intent_summary,
                })
                .select()
                .single();

            if (error) {
                console.error(`Supabase Insert Error for ID ${localMsg.id}:`, error);
                throw error;
            }

            if (data) {
                console.log(`Successfully synced message ${localMsg.id}. Supabase ID: ${data.id}`);
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
        if (!navigator.onLine) return;

        if (!this.supabase) {
            this.supabase = createClient();
        }

        if (!this.supabase) return;

        try {
            console.log(`Fetching new messages for child ${childId}...`);
            // Get last synced timestamp for this child
            const localMessages = await chatDb.getMessages(childId, 100);
            const lastTimestamp = localMessages.length > 0
                ? localMessages[0].timestamp
                : new Date(0).toISOString();

            console.log(`Last local timestamp: ${lastTimestamp}`);

            // Join with children to get nickname
            const { data, error } = await this.supabase
                .from('chat_messages')
                .select('*, children(nickname)')
                .eq('child_id', childId)
                .gt('timestamp', lastTimestamp)
                .order('timestamp', { ascending: true });

            if (error) {
                console.error('Supabase fetch error:', error);
                throw error;
            }

            if (data && data.length > 0) {
                console.log(`Fetched ${data.length} new messages from server`);
                for (const remoteMsg of data) {
                    const exists = localMessages.some(m => m.id === remoteMsg.id);
                    if (exists) continue;

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
                        nickname: (remoteMsg.children as any)?.nickname,
                        user_intent_intensity: remoteMsg.user_intent_intensity,
                        user_intent_valence: remoteMsg.user_intent_valence,
                        user_intent_flag: remoteMsg.user_intent_flag,
                        user_intent_means: remoteMsg.user_intent_means,
                        user_intent_actionable: remoteMsg.user_intent_actionable,
                        user_intent_prob: remoteMsg.user_intent_prob,
                        user_intent_summary: remoteMsg.user_intent_summary,
                    });
                }
            } else {
                console.log('No new messages on server');
            }
        } catch (error) {
            console.error('Fetch new messages failed:', error);
        }
    }
}

const syncManager = new SyncManager();
export default syncManager;

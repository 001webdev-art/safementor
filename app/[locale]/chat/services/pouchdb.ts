export interface LocalMessage {
    _id?: string;
    _rev?: string;
    id: string; // Supabase UUID
    child_id: string;
    message_type: 'user' | 'assistant';
    content: string;
    timestamp: string; // ISO string
    parent_message_id?: string;
    is_synced: boolean;
    local_id?: string;
    device_id?: string;
    sync_status: 'pending' | 'synced' | 'failed';
    date: string; // YYYY-MM-DD
    time: string; // HH:MM:SS
    nickname?: string;
}

class ChatDatabase {
    private db: any = null;
    private initialized = false;

    private async init() {
        if (this.initialized || typeof window === 'undefined') return;

        try {
            const PouchDB = (await import('pouchdb-browser')).default;
            const PouchDBFind = (await import('pouchdb-find')).default;

            PouchDB.plugin(PouchDBFind);
            this.db = new PouchDB('chat_v1');

            await this.db.createIndex({
                index: {
                    fields: ['child_id', 'timestamp']
                }
            });
            await this.db.createIndex({
                index: {
                    fields: ['sync_status']
                }
            });

            this.initialized = true;
        } catch (err) {
            console.error('PouchDB initialization failed:', err);
        }
    }

    async saveMessage(message: LocalMessage) {
        await this.init();
        if (!this.db) return;

        const doc = {
            ...message,
            _id: message.local_id || message.id
        };
        try {
            return await this.db.put(doc);
        } catch (err: any) {
            if (err.name === 'conflict') {
                const existing = await this.db.get(doc._id);
                return await this.db.put({ ...doc, _rev: existing._rev });
            }
            throw err;
        }
    }

    async getMessages(child_id: string): Promise<LocalMessage[]> {
        await this.init();
        if (!this.db) return [];
        try {
            const result = await this.db.find({
                selector: { child_id: child_id },
                sort: [{ child_id: 'desc' }, { timestamp: 'desc' }]
            });
            return (result.docs as LocalMessage[]).sort((a, b) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
        } catch (err) {
            console.error('Error getting messages:', err);
            return [];
        }
    }

    async getUnsyncedMessages(): Promise<LocalMessage[]> {
        await this.init();
        if (!this.db) return [];
        try {
            const result = await this.db.find({
                selector: { sync_status: 'pending' }
            });
            return result.docs as LocalMessage[];
        } catch (err) {
            console.error('Error getting unsynced messages:', err);
            return [];
        }
    }

    async getMessageByLocalId(localId: string): Promise<LocalMessage | null> {
        await this.init();
        if (!this.db) return null;
        try {
            const result = await this.db.get(localId);
            return result as LocalMessage;
        } catch (err: any) {
            if (err.status === 404) return null;
            console.error('Error getting message by local ID:', err);
            return null;
        }
    }

    async updateMessageSyncStatus(id: string, status: 'synced' | 'failed', supabaseId?: string) {
        await this.init();
        if (!this.db) return;
        try {
            const doc = await this.db.get(id);
            doc.sync_status = status;
            doc.is_synced = status === 'synced';
            if (supabaseId) doc.id = supabaseId;
            return await this.db.put(doc);
        } catch (err) {
            console.error('Error updating sync status:', err);
        }
    }

    async deleteMessage(id: string) {
        await this.init();
        if (!this.db) return;
        try {
            const doc = await this.db.get(id);
            return await this.db.remove(doc);
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    }

    async getAllMessages(): Promise<LocalMessage[]> {
        await this.init();
        if (!this.db) return [];
        try {
            const result = await this.db.allDocs({
                include_docs: true,
                descending: true
            });
            return (result.rows.map(row => row.doc) as LocalMessage[])
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        } catch (err) {
            console.error('Error getting all messages:', err);
            return [];
        }
    }
}

const chatDb = new ChatDatabase();
export default chatDb;

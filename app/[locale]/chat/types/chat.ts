export type LLMProvider = 'gemini' | 'gpt' | 'groq';
export type SyncStatus = 'pending' | 'synced' | 'failed';

export interface Message {
    id: string; // Supabase ID or local ID
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    provider?: LLMProvider;
    child_id: string;
    sync_status: SyncStatus;
    local_id?: string;
    parent_message_id?: string;
    nickname?: string;
}

export interface ChatState {
    messages: Message[];
    provider: LLMProvider;
    isLoading: boolean;
    error: string | null;
    activeChildId: string | null;
    activeChildNickname?: string;
    addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'child_id' | 'sync_status'>) => Promise<string | undefined>;
    setProvider: (provider: LLMProvider) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setActiveChildId: (childId: string | null) => void;
    setMessages: (messages: Message[]) => void;
    updateMessageStatus: (id: string, status: SyncStatus, supabaseId?: string) => void;
    clearMessages: () => void;
}

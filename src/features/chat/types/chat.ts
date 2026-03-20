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
    user_intent_intensity?: number;
    user_intent_valence?: number;
    user_intent_flag?: string;
    user_intent_means?: boolean;
    user_intent_actionable?: boolean;
    user_intent_prob?: number;
    user_intent_summary?: string;
}

export interface ChatState {
    messages: Message[];
    provider: LLMProvider;
    isLoading: boolean;
    error: string | null;
    activeChildId: string | null;
    activeChildNickname?: string;
    activeChildData?: {
        birth_month: number;
        birth_year: number;
        language: string;
    };
    streamingStatus: 'idle' | 'analyzing' | 'streaming' | 'completed' | 'error';
    lastIntent: import('./mentor').IntentAnalysis | null;
    streamingContent: string;
    lastModel?: string;
    lastMetrics?: Record<string, string>;

    sendMessage: (content: string) => Promise<void>;
    stopStreaming: () => void;

    addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'child_id' | 'sync_status'>) => Promise<string | undefined>;
    setProvider: (provider: LLMProvider) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setActiveChildId: (childId: string | null) => Promise<void>;
    setMessages: (messages: Message[]) => void;
    updateMessageStatus: (id: string, status: SyncStatus, supabaseId?: string) => void;
    clearMessages: () => void;
}

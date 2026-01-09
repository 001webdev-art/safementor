export type LLMProvider = 'gemini' | 'gpt' | 'groq';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    provider?: LLMProvider;
}

export interface ChatState {
    messages: Message[];
    provider: LLMProvider;
    isLoading: boolean;
    error: string | null;
    addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
    setProvider: (provider: LLMProvider) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    clearMessages: () => void;
}

<<<<<<< HEAD
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
=======
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
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

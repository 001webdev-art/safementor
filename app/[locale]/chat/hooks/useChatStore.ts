import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Message, LLMProvider } from '../types/chat';

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            messages: [],
            provider: 'gemini',
            isLoading: false,
            error: null,

            addMessage: (message) => {
                const newMessage: Message = {
                    ...message,
                    id: Math.random().toString(36).substring(7),
                    timestamp: new Date(),
                };
                set((state) => ({
                    messages: [...state.messages, newMessage],
                }));
            },

            setProvider: (provider: LLMProvider) => set({ provider }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
            setError: (error: string | null) => set({ error }),
            clearMessages: () => set({ messages: [] }),
        }),
        {
            name: 'chat-storage',
            //@ts-ignore
            partialize: (state) => ({ messages: state.messages, provider: state.provider }),
        }
    )
);

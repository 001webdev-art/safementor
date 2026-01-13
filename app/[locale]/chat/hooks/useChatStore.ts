import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Message, LLMProvider, SyncStatus } from '../types/chat';
import chatDb from '../services/pouchdb';
import syncManager from '../services/syncManager';

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            messages: [],
            provider: 'gemini',
            isLoading: false,
            error: null,
            activeChildId: null,
            activeChildNickname: undefined,

            addMessage: async (msgData) => {
                const { activeChildId, activeChildNickname, provider } = get();
                if (!activeChildId) {
                    set({ error: 'No active child selected' });
                    return;
                }

                const localId = Math.random().toString(36).substring(7);
                const timestamp = new Date();

                const newMessage: Message = {
                    ...msgData,
                    id: localId,
                    local_id: localId,
                    timestamp,
                    child_id: activeChildId,
                    nickname: activeChildNickname,
                    sync_status: 'pending',
                    provider,
                };

                // Save to local DB
                await chatDb.saveMessage({
                    id: localId,
                    local_id: localId,
                    child_id: activeChildId,
                    message_type: msgData.role,
                    content: msgData.content,
                    timestamp: timestamp.toISOString(),
                    sync_status: 'pending',
                    is_synced: false,
                    date: timestamp.toISOString().split('T')[0],
                    time: timestamp.toISOString().split('T')[1].split('.')[0],
                    nickname: activeChildNickname,
                    parent_message_id: msgData.parent_message_id
                });

                set((state) => ({
                    messages: [...state.messages, newMessage],
                }));

                // Trigger sync
                syncManager.sync();
                return localId;
            },

            setProvider: (provider: LLMProvider) => set({ provider }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
            setError: (error: string | null) => set({ error }),

            setActiveChildId: async (childId: string | null) => {
                set({ activeChildId: childId });
                if (childId) {
                    // Fetch nickname from Supabase (or local if we wanted to cache it elsewhere)
                    const { createClient } = await import('@/lib/supabase/client');
                    const supabase = createClient();
                    const { data: childData } = await supabase
                        .from('children')
                        .select('nickname')
                        .eq('id', childId)
                        .single();

                    const nickname = childData?.nickname;
                    set({ activeChildNickname: nickname });

                    const localMessages = await chatDb.getMessages(childId);
                    const formattedMessages: Message[] = localMessages.map(m => ({
                        id: m.id,
                        role: m.message_type,
                        content: m.content,
                        timestamp: new Date(m.timestamp),
                        child_id: m.child_id,
                        sync_status: m.sync_status,
                        nickname: m.nickname
                    }));
                    set({ messages: formattedMessages });

                    // Fetch new messages from server
                    await syncManager.fetchNewMessages(childId);
                    // Refresh local view after fetch
                    const updatedMessages = await chatDb.getMessages(childId);
                    set({
                        messages: updatedMessages.map(m => ({
                            id: m.id,
                            role: m.message_type,
                            content: m.content,
                            timestamp: new Date(m.timestamp),
                            child_id: m.child_id,
                            sync_status: m.sync_status,
                            nickname: m.nickname
                        }))
                    });
                } else {
                    set({ messages: [], activeChildNickname: undefined });
                }
            },

            setMessages: (messages: Message[]) => set({ messages }),

            updateMessageStatus: (id: string, status: SyncStatus, supabaseId?: string) => {
                set((state) => ({
                    messages: state.messages.map(m =>
                        (m.id === id || m.local_id === id)
                            ? { ...m, sync_status: status, id: supabaseId || m.id }
                            : m
                    )
                }));
            },

            clearMessages: () => set({ messages: [] }),
        }),
        {
            name: 'chat-storage-v2',
            //@ts-ignore
            partialize: (state) => ({
                provider: state.provider,
                activeChildId: state.activeChildId
            }),
        }
    )
);

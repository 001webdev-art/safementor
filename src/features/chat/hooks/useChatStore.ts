import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Message, LLMProvider, SyncStatus } from '../types/chat';
import chatDb from '../services/pouchdb';
import syncManager from '../services/syncManager';
import { streamMentorResponse } from '../services/mentor-client';
import { IntentAnalysis } from '../types/mentor';

let abortController: AbortController | null = null;

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            messages: [],
            provider: 'gemini',
            isLoading: false,
            error: null,
            activeChildId: null,
            activeChildNickname: undefined,
            activeChildData: undefined,
            streamingStatus: 'idle',
            lastIntent: null,
            streamingContent: '',
            lastModel: undefined,
            lastMetrics: undefined,

            sendMessage: async (content: string) => {
                const { activeChildId, addMessage, messages } = get();
                if (!activeChildId) {
                    set({ error: 'No active child selected' });
                    return;
                }

                // 1. Add User Message
                const userMessageId = await addMessage({
                    role: 'user',
                    content
                });

                // 2. Prepare for Streaming
                if (abortController) abortController.abort();
                abortController = new AbortController();

                set({
                    streamingStatus: 'analyzing',
                    streamingContent: '',
                    lastIntent: null,
                    error: null,
                    isLoading: true
                });

                try {
                    // 1. Calculate Age
                    const { activeChildData } = get();
                    let calculatedAge = "10"; // Default
                    let childLanguage = "en"; // Default

                    if (activeChildData) {
                        const today = new Date();
                        const currentYear = today.getFullYear();
                        const currentMonth = today.getMonth() + 1; // 1-indexed

                        const { birth_year, birth_month, language } = activeChildData;

                        let age = currentYear - birth_year;
                        // If current month is before birth month, subtract 1 from age
                        if (currentMonth < birth_month) {
                            age--;
                        }
                        calculatedAge = age.toString();
                        childLanguage = language || "en";
                    }

                    // 2. Prepare Chat History (Last 5 messages)
                    const chatHistory = messages
                        .filter(m => m.role === 'user' || m.role === 'assistant')
                        .slice(-5)
                        .map(m => ({
                            role: m.role,
                            content: m.content
                        }));

                    let fullContent = '';
                    let finalIntent: any = null;
                    let finalModel = '';
                    let finalMetrics: Record<string, string> | undefined = undefined;

                    await streamMentorResponse(
                        {
                            message: content,
                            chat_history: chatHistory,
                            child_age: calculatedAge,
                            child_country: "Germany", // Still hardcoded as per instructions? Or should imply from language? Leaving hardcoded for now as user didn't specify.
                            child_language: childLanguage,
                        },
                        (chunk) => {
                            switch (chunk.type) {
                                case 'intent':
                                    finalIntent = chunk.data;
                                    set({ lastIntent: chunk.data, streamingStatus: 'streaming' });
                                    break;
                                case 'content':
                                    fullContent += chunk.content;
                                    set({ streamingContent: fullContent });
                                    break;
                                case 'model':
                                    finalModel = chunk.content;
                                    set({ lastModel: chunk.content });
                                    break;
                                case 'metrics':
                                    finalMetrics = chunk.data;
                                    set({ lastMetrics: chunk.data });
                                    break;
                                case 'error':
                                    set({ error: chunk.content, streamingStatus: 'error' });
                                    break;
                            }
                        },
                        abortController.signal
                    );

                    // 3. Finalize Assistant Message
                    if (fullContent) {
                        const intentFields = finalIntent ? {
                            user_intent_intensity: finalIntent.intensity,
                            user_intent_valence: finalIntent.valence,
                            user_intent_flag: finalIntent.flag,
                            user_intent_means: finalIntent.means,
                            user_intent_actionable: finalIntent.actionable,
                            user_intent_prob: finalIntent.prob,
                            user_intent_summary: finalIntent.summary,
                        } : {};

                        await addMessage({
                            role: 'assistant',
                            content: fullContent,
                            parent_message_id: userMessageId,
                            ...intentFields
                        } as any);
                    }

                    set({ streamingStatus: 'idle', isLoading: false });
                } catch (err: any) {
                    if (err.name !== 'AbortError') {
                        set({ error: err.message, streamingStatus: 'idle', isLoading: false });
                    }
                } finally {
                    abortController = null;
                }
            },

            stopStreaming: () => {
                if (abortController) {
                    abortController.abort();
                    abortController = null;
                    set({ streamingStatus: 'idle', isLoading: false });
                }
            },

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
                    user_intent_intensity: (msgData as any).user_intent_intensity,
                    user_intent_valence: (msgData as any).user_intent_valence,
                    user_intent_flag: (msgData as any).user_intent_flag,
                    user_intent_means: (msgData as any).user_intent_means,
                    user_intent_actionable: (msgData as any).user_intent_actionable,
                    user_intent_prob: (msgData as any).user_intent_prob,
                    user_intent_summary: (msgData as any).user_intent_summary,
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
                    parent_message_id: msgData.parent_message_id,
                    user_intent_intensity: (msgData as any).user_intent_intensity,
                    user_intent_valence: (msgData as any).user_intent_valence,
                    user_intent_flag: (msgData as any).user_intent_flag,
                    user_intent_means: (msgData as any).user_intent_means,
                    user_intent_actionable: (msgData as any).user_intent_actionable,
                    user_intent_prob: (msgData as any).user_intent_prob,
                    user_intent_summary: (msgData as any).user_intent_summary,
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
                    localStorage.setItem('chat_selected_child', childId);
                    // Fetch nickname from Supabase (or local if we wanted to cache it elsewhere)
                    const { createClient } = await import('@/lib/supabase/client');
                    const supabase = createClient();
                    const { data: childData } = await supabase
                        .from('children')
                        .select('nickname, birth_month, birth_year, language')
                        .eq('id', childId)
                        .single();

                    const nickname = childData?.nickname;

                    const newChildData = childData ? {
                        birth_month: childData.birth_month,
                        birth_year: childData.birth_year,
                        language: childData.language
                    } : undefined;

                    set({
                        activeChildNickname: nickname,
                        activeChildData: newChildData
                    });

                    const localMessages = await chatDb.getMessages(childId);
                    const formattedMessages: Message[] = localMessages.map(m => ({
                        id: m.id,
                        role: m.message_type,
                        content: m.content,
                        timestamp: new Date(m.timestamp),
                        child_id: m.child_id,
                        sync_status: m.sync_status,
                        nickname: m.nickname,
                        user_intent_intensity: m.user_intent_intensity,
                        user_intent_valence: m.user_intent_valence,
                        user_intent_flag: m.user_intent_flag,
                        user_intent_means: m.user_intent_means,
                        user_intent_actionable: m.user_intent_actionable,
                        user_intent_prob: m.user_intent_prob,
                        user_intent_summary: m.user_intent_summary,
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
                            nickname: m.nickname,
                            user_intent_intensity: m.user_intent_intensity,
                            user_intent_valence: m.user_intent_valence,
                            user_intent_flag: m.user_intent_flag,
                            user_intent_means: m.user_intent_means,
                            user_intent_actionable: m.user_intent_actionable,
                            user_intent_prob: m.user_intent_prob,
                            user_intent_summary: m.user_intent_summary,
                        }))
                    });
                } else {
                    localStorage.removeItem('chat_selected_child');
                    set({ messages: [], activeChildNickname: undefined, activeChildData: undefined });
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

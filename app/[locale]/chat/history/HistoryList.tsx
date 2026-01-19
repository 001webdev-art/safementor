'use client';

import React, { useRef, useEffect } from 'react';
import { LocalMessage } from '../services/pouchdb';
import MessageBubble from '../components/MessageBubble';
import { Spinner } from '@nextui-org/react';

interface HistoryListProps {
    messages: LocalMessage[];
    hasMore: boolean;
    isLoadingMore: boolean;
    onLoadMore: () => void;
}

export default function HistoryList({ messages, hasMore, isLoadingMore, onLoadMore }: HistoryListProps) {
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    onLoadMore();
                }
            },
            { threshold: 1.0 }
        );

        const currentElement = observerTarget.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [hasMore, isLoadingMore, onLoadMore]);

    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full opacity-50">
                <div className="bg-white dark:bg-[#111b21] rounded-lg p-4 text-center max-w-sm shadow-sm">
                    <p className="text-sm font-medium">No archived messages.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#e5ddd5] dark:bg-[#0b141a] relative">
            {/* Background Pattern (WhatsApp style) */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
                style={{
                    //backgroundImage: `url("https://wweb.dev/assets/whatsapp-chat-background-light.png")`,
                    backgroundSize: '400px'
                }}
            />

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id || message.local_id}
                            message={{
                                ...message,
                                role: message.message_type === 'user' ? 'user' : 'assistant',
                                timestamp: new Date(message.timestamp)
                            }}
                        />
                    ))}

                    <div ref={observerTarget} className="h-4 w-full flex justify-center py-4">
                        {isLoadingMore && <Spinner size="sm" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

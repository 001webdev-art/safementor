<<<<<<< HEAD
'use client';

import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../hooks/useChatStore';
import MessageBubble from './MessageBubble';

export default function MessageList() {
    const { messages, isLoading } = useChatStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
            {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full opacity-50">
                    <div className="bg-white dark:bg-[#111b21] rounded-lg p-4 text-center max-w-sm shadow-sm">
                        <p className="text-sm font-medium">No messages yet.</p>
                        <p className="text-xs">Start a conversation with your AI assistant.</p>
                    </div>
                </div>
            )}

            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white dark:bg-[#202c33] rounded-lg p-3 shadow-sm animate-pulse">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
=======
'use client';

import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../hooks/useChatStore';
import MessageBubble from './MessageBubble';

export default function MessageList() {
    const { messages, isLoading } = useChatStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
            {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full opacity-50">
                    <div className="bg-white dark:bg-[#111b21] rounded-lg p-4 text-center max-w-sm shadow-sm">
                        <p className="text-sm font-medium">No messages yet.</p>
                        <p className="text-xs">Start a conversation with your AI assistant.</p>
                    </div>
                </div>
            )}

            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white dark:bg-[#202c33] rounded-lg p-3 shadow-sm animate-pulse">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 bg-default-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

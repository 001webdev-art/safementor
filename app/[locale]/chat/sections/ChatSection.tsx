'use client';

import React from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

export default function ChatSection() {
    return (
        <div className="flex flex-col h-full bg-[#e5ddd5] dark:bg-[#0b141a] relative">
            {/* Background Pattern (WhatsApp style) */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("https://wweb.dev/assets/whatsapp-chat-background-light.png")`,
                    backgroundSize: '400px'
                }}
            />

            {/* Message List */}
            <MessageList />

            {/* Input Area */}
            <MessageInput />
        </div>
    );
}

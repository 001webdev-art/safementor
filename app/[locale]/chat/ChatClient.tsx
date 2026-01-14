'use client';

import React, { useEffect, useState } from 'react';
import { useChatStore } from './hooks/useChatStore';
import ChatHeader from './components/ChatHeader';
import ChatFooter from './components/ChatFooter';
import ChatSection from './sections/ChatSection';

export default function ChatClient() {
    const { provider, setProvider } = useChatStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-screen h-dvh bg-[#f0f2f5] dark:bg-[#111b21] overflow-hidden">
            {/* Header */}
            <ChatHeader />

            {/* Chat Area */}
            <main className="flex-1 overflow-hidden relative">
                <ChatSection />
            </main>

            {/* Footer Navigation */}
            <ChatFooter />
        </div>
    );
}

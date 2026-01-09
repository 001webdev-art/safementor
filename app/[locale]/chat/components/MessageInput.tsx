<<<<<<< HEAD
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';
import { useChatStore } from '../hooks/useChatStore';
import { callLLM } from '@/lib/llm/llmService';

export default function MessageInput() {
    const [content, setContent] = useState('');
    const { addMessage, setLoading, provider, setError } = useChatStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = async () => {
        if (!content.trim()) return;

        const userMessage = content.trim();
        setContent('');
        addMessage({ role: 'user', content: userMessage });

        const currentMessages = useChatStore.getState().messages;

        setLoading(true);
        try {
            const response = await callLLM(provider, currentMessages);
            addMessage({
                role: 'assistant',
                content: response.content,
                provider
            });
        } catch (err: any) {
            setError(err.message || 'Failed to get response');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-3 flex items-end gap-2 shrink-0 z-10 border-t border-divider">
            <div className="flex gap-1 mb-1">
                <Button isIconOnly variant="light" radius="full" size="sm">
                    <Smile size={24} className="text-default-500" />
                </Button>
                <Button isIconOnly variant="light" radius="full" size="sm">
                    <Paperclip size={24} className="text-default-500" />
                </Button>
            </div>

            <div className="flex-1">
                <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    minRows={1}
                    maxRows={5}
                    variant="flat"
                    radius="lg"
                    classNames={{
                        base: "w-full",
                        inputWrapper: "bg-white dark:bg-[#2a3942] border-none shadow-none",
                        input: "text-base py-2"
                    }}
                />
            </div>

            <div className="mb-1">
                {content.trim() ? (
                    <Button
                        isIconOnly
                        color="primary"
                        radius="full"
                        size="md"
                        onClick={handleSend}
                        className="shadow-sm"
                    >
                        <Send size={20} />
                    </Button>
                ) : (
                    <Button isIconOnly variant="light" radius="full" size="md">
                        <Mic size={24} className="text-default-500" />
                    </Button>
                )}
            </div>
        </div>
    );
}
=======
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';
import { useChatStore } from '../hooks/useChatStore';
import { callLLM } from '@/lib/llm/llmService';

export default function MessageInput() {
    const [content, setContent] = useState('');
    const { addMessage, setLoading, provider, setError } = useChatStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = async () => {
        if (!content.trim()) return;

        const userMessage = content.trim();
        setContent('');
        addMessage({ role: 'user', content: userMessage });

        const currentMessages = useChatStore.getState().messages;

        setLoading(true);
        try {
            const response = await callLLM(provider, currentMessages);
            addMessage({
                role: 'assistant',
                content: response.content,
                provider
            });
        } catch (err: any) {
            setError(err.message || 'Failed to get response');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-3 flex items-end gap-2 shrink-0 z-10 border-t border-divider">
            <div className="flex gap-1 mb-1">
                <Button isIconOnly variant="light" radius="full" size="sm">
                    <Smile size={24} className="text-default-500" />
                </Button>
                <Button isIconOnly variant="light" radius="full" size="sm">
                    <Paperclip size={24} className="text-default-500" />
                </Button>
            </div>

            <div className="flex-1">
                <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    minRows={1}
                    maxRows={5}
                    variant="flat"
                    radius="lg"
                    classNames={{
                        base: "w-full",
                        inputWrapper: "bg-white dark:bg-[#2a3942] border-none shadow-none",
                        input: "text-base py-2"
                    }}
                />
            </div>

            <div className="mb-1">
                {content.trim() ? (
                    <Button
                        isIconOnly
                        color="primary"
                        radius="full"
                        size="md"
                        onClick={handleSend}
                        className="shadow-sm"
                    >
                        <Send size={20} />
                    </Button>
                ) : (
                    <Button isIconOnly variant="light" radius="full" size="md">
                        <Mic size={24} className="text-default-500" />
                    </Button>
                )}
            </div>
        </div>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

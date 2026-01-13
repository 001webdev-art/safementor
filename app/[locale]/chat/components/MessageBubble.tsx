'use client';

import React from 'react';
import { Message } from '../types/chat';
import { Clock, Check, CheckCheck, AlertCircle } from 'lucide-react';

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    const getStatusIcon = () => {
        if (!isUser) return null;
        switch (message.sync_status) {
            case 'pending':
                return <Clock size={12} className="opacity-50" />;
            case 'synced':
                return <CheckCheck size={12} className="text-primary" />;
            case 'failed':
                return <AlertCircle size={12} className="text-danger" />;
            default:
                return <Check size={12} className="opacity-50" />;
        }
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
            <div
                className={`max-w-[80%] px-3 py-2 rounded-lg shadow-sm relative ${isUser
                    ? 'bg-[#dcf8c6] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-none'
                    : 'bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-none'
                    }`}
            >
                {!isUser && message.provider && (
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                        {message.provider}
                    </p>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                    <span className="text-[10px] opacity-50">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {getStatusIcon()}
                </div>

                {/* Tail */}
                <div
                    className={`absolute top-0 w-2 h-2 ${isUser
                        ? '-right-2 bg-[#dcf8c6] dark:bg-[#005c4b] [clip-path:polygon(0_0,0_100%,100%_0)]'
                        : '-left-2 bg-white dark:bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]'
                        }`}
                />
            </div>
        </div>
    );
}

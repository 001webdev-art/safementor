'use client';

import React, { useEffect, useState } from 'react';
import chatDb, { LocalMessage } from '../services/pouchdb';
import HistoryGrid from './HistoryGrid';
import HistoryHeader from './HistoryHeader';
import { Spinner } from '@nextui-org/react';

export default function HistoryClient() {
    const [messages, setMessages] = useState<LocalMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const allMessages = await chatDb.getAllMessages();
            setMessages(allMessages);
            setIsLoading(false);
        };

        fetchHistory();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-[#f0f2f5] dark:bg-[#0b141a]">
            <HistoryHeader />
            <main className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Spinner label="Loading history..." />
                    </div>
                ) : (
                    <HistoryGrid messages={messages} />
                )}
            </main>
        </div>
    );
}

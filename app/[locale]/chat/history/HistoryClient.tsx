'use client';

import React, { useEffect, useState } from 'react';
import chatDb, { LocalMessage } from '../services/pouchdb';
import HistoryList from './HistoryList';
import HistoryHeader from './HistoryHeader';
import { Spinner } from '@nextui-org/react';
import { useChatStore } from '../hooks/useChatStore';

export default function HistoryClient() {
    const [messages, setMessages] = useState<LocalMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const { activeChildId, setActiveChildId } = useChatStore();
    const LIMIT = 30;

    const loadMoreMessages = async () => {
        if (isLoadingMore || !hasMore) return;

        try {
            setIsLoadingMore(true);
            const skip = page * LIMIT;
            const newMessages = await chatDb.getMessages(activeChildId || undefined, LIMIT, skip);

            setMessages(prev => [...prev, ...newMessages]);
            setHasMore(newMessages.length === LIMIT);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Error loading history:', error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Reset and reload when child selection changes
    useEffect(() => {
        let isMounted = true;

        const loadInitial = async () => {
            setIsLoading(true);
            try {
                // Reset states
                setPage(0);
                // We fetch page 0 immediately
                const newMessages = await chatDb.getMessages(activeChildId || undefined, LIMIT, 0);

                if (isMounted) {
                    setMessages(newMessages);
                    setHasMore(newMessages.length === LIMIT);
                    setPage(1); // Prepare for next page
                }
            } catch (error) {
                console.error('Error loading initial history:', error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadInitial();

        return () => {
            isMounted = false;
        };
    }, [activeChildId]);

    const handleLoadMore = () => {
        loadMoreMessages();
    };

    const handleDeleteAll = async () => {
        if (confirm('Are you sure you want to erase all conversations? This cannot be undone.')) {
            try {
                setIsLoading(true);
                await chatDb.deleteAllMessages(activeChildId || undefined);
                setMessages([]);
                setPage(0);
                setHasMore(false);
            } catch (error) {
                console.error('Error deleting messages:', error);
                alert('Failed to delete messages');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleResetDatabase = async () => {
        if (confirm('DANGER: This will delete the entire local database for ALL children. This action cannot be undone. Are you sure you want to reset the database?')) {
            try {
                setIsLoading(true);
                await chatDb.destroyDatabase();
                // Reload the page to ensure PouchDB is re-initialized correctly
                window.location.reload();
            } catch (error) {
                console.error('Error resetting database:', error);
                alert('Failed to reset database');
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col h-dvh bg-[#f0f2f5] dark:bg-[#0b141a]">
            {/* Pass onDeleteAll and onResetDatabase to Header */}
            <HistoryHeader
                onDeleteAll={handleDeleteAll}
                onResetDatabase={handleResetDatabase}
            />
            <main className="flex-1 overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Spinner label="Loading history..." />
                    </div>
                ) : (
                    <HistoryList
                        messages={messages}
                        hasMore={hasMore}
                        isLoadingMore={isLoadingMore}
                        onLoadMore={handleLoadMore}
                    />
                )}
            </main>
        </div>
    );
}

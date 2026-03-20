'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Child {
    id: string;
    nickname: string;
    // User prompt said "name", but DB uses "nickname"
}

export interface UserProfile {
    id: string;
    children: Child[];
}

interface ChildContextType {
    selectedChildId: string | null;
    setSelectedChildId: (id: string | null) => void;
    isLoading: boolean;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export function ChildProvider({ children }: { children: ReactNode }) {
    const [selectedChildId, setSelectedChildIdState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedId = localStorage.getItem('chat_selected_child');
        if (storedId) {
            setSelectedChildIdState(storedId);
        }
        setIsLoading(false);
    }, []);

    const setSelectedChildId = (id: string | null) => {
        setSelectedChildIdState(id);
        if (id) {
            localStorage.setItem('chat_selected_child', id);
        } else {
            localStorage.removeItem('chat_selected_child');
        }
    };

    return (
        <ChildContext.Provider value={{ selectedChildId, setSelectedChildId, isLoading }}>
            {children}
        </ChildContext.Provider>
    );
}

export function useChildContext() {
    const context = useContext(ChildContext);
    if (context === undefined) {
        throw new Error('useChildContext must be used within a ChildProvider');
    }
    return context;
}

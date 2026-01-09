'use client';

import { useState, useEffect } from 'react';

export function useCollapsibleGroups() {
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

    // Load collapsed states from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('dashboard_collapsed_groups');
        if (saved) {
            try {
                setCollapsedGroups(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse collapsed groups:', e);
            }
        }
    }, []);

    const toggleGroup = (groupId: string) => {
        const newState = {
            ...collapsedGroups,
            [groupId]: !collapsedGroups[groupId]
        };
        setCollapsedGroups(newState);
        localStorage.setItem('dashboard_collapsed_groups', JSON.stringify(newState));
    };

    return {
        collapsedGroups,
        toggleGroup
    };
}

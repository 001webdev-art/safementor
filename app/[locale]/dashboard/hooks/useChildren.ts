<<<<<<< HEAD
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Child } from '@/types/dashboard';

export function useChildren(parentId: string | undefined) {
    const [children, setChildren] = useState<Child[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [isAddingChild, setIsAddingChild] = useState(false);
    const supabase = createClient();

    const loadChildren = useCallback(async () => {
        if (!parentId) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('children')
                .select('*')
                .eq('parent_id', parentId)
                .order('nickname', { ascending: true });

            if (data) {
                setChildren(data);
            }
            if (error) throw error;
        } catch (err) {
            console.error('Error loading children:', err);
        } finally {
            setIsLoading(false);
        }
    }, [parentId, supabase]);

    const upsertChild = async (childData: Partial<Child>) => {
        if (!parentId) return;
        setIsLoading(true);

        try {
            // Clean payload: remove id if it's empty/new to allow DB to generate it
            const payload = { ...childData };
            if (!payload.id) delete payload.id;

            const { data, error } = await supabase
                .from('children')
                .upsert({
                    ...payload,
                    parent_id: parentId,
                    updated_at: new Date().toISOString(),
                    updated_by: parentId
                })
                .select()
                .single();

            if (error) throw error;

            // Refresh list
            await loadChildren();

            // Success state handling
            setIsAddingChild(false);
            if (data) setSelectedChildId(data.id);
        } catch (err) {
            console.error('Error upserting child:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteChild = async (id: string) => {
        if (!parentId) return;

        try {
            const { error } = await supabase
                .from('children')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Refresh list
            await loadChildren();

            // Reset selection if deleted child was selected
            if (selectedChildId === id) {
                setSelectedChildId(null);
            }
        } catch (err) {
            console.error('Error deleting child:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadChildren();
    }, [loadChildren]);

    return {
        children,
        isLoading,
        selectedChildId,
        setSelectedChildId,
        isAddingChild,
        setIsAddingChild,
        upsertChild,
        deleteChild,
        refreshChildren: loadChildren
    };
}
=======
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Child } from '@/types/dashboard';

export function useChildren(parentId: string | undefined) {
    const [children, setChildren] = useState<Child[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [isAddingChild, setIsAddingChild] = useState(false);
    const supabase = createClient();

    const loadChildren = useCallback(async () => {
        if (!parentId) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('children')
                .select('*')
                .eq('parent_id', parentId)
                .order('nickname', { ascending: true });

            if (data) {
                setChildren(data);
            }
            if (error) throw error;
        } catch (err) {
            console.error('Error loading children:', err);
        } finally {
            setIsLoading(false);
        }
    }, [parentId, supabase]);

    const upsertChild = async (childData: Partial<Child>) => {
        if (!parentId) return;
        setIsLoading(true);

        try {
            // Clean payload: remove id if it's empty/new to allow DB to generate it
            const payload = { ...childData };
            if (!payload.id) delete payload.id;

            const { data, error } = await supabase
                .from('children')
                .upsert({
                    ...payload,
                    parent_id: parentId,
                    updated_at: new Date().toISOString(),
                    updated_by: parentId
                })
                .select()
                .single();

            if (error) throw error;

            // Refresh list
            await loadChildren();

            // Success state handling
            setIsAddingChild(false);
            if (data) setSelectedChildId(data.id);
        } catch (err) {
            console.error('Error upserting child:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteChild = async (id: string) => {
        if (!parentId) return;

        try {
            const { error } = await supabase
                .from('children')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Refresh list
            await loadChildren();

            // Reset selection if deleted child was selected
            if (selectedChildId === id) {
                setSelectedChildId(null);
            }
        } catch (err) {
            console.error('Error deleting child:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadChildren();
    }, [loadChildren]);

    return {
        children,
        isLoading,
        selectedChildId,
        setSelectedChildId,
        isAddingChild,
        setIsAddingChild,
        upsertChild,
        deleteChild,
        refreshChildren: loadChildren
    };
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

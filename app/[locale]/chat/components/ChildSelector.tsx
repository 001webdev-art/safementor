'use client';

import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User } from '@nextui-org/react';
import { ChevronDown, Users } from 'lucide-react';
import { useChatStore } from '../hooks/useChatStore';
import { createClient } from '@/lib/supabase/client';

interface Child {
    id: string;
    nickname: string;
}

export default function ChildSelector() {
    const { activeChildId, setActiveChildId } = useChatStore();
    const [children, setChildren] = useState<Child[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchChildren = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('children')
                .select('id, nickname')
                .eq('parent_id', user.id);

            if (data) {
                setChildren(data);
            }
            setIsLoading(false);
        };

        fetchChildren();
    }, []);

    useEffect(() => {
        if (!activeChildId && children.length > 0) {
            setActiveChildId(children[0].id);
        }
    }, [children, activeChildId, setActiveChildId]);

    const activeChild = children.find(c => c.id === activeChildId);

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="flat"
                    size="sm"
                    className="bg-white/50 dark:bg-[#2a3942]/50"
                    startContent={<Users size={16} />}
                    endContent={<ChevronDown size={14} />}
                >
                    {activeChild ? activeChild.nickname : 'Select Child'}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Select Child"
                onAction={(key) => setActiveChildId(key as string)}
                selectedKeys={activeChildId ? [activeChildId] : []}
                selectionMode="single"
            >
                {children.map((child) => (
                    <DropdownItem key={child.id} textValue={child.nickname}>
                        <div className="flex items-center gap-2">
                            <User
                                name={child.nickname}
                                avatarProps={{
                                    size: "sm",
                                    src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.nickname}`
                                }}
                            />
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

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

interface ChildSelectorProps {
    onSelect?: (childId: string) => void;
    mode?: 'mandatory' | 'optional';
}

export default function ChildSelector({ onSelect, mode = 'optional' }: ChildSelectorProps) {
    const { activeChildId, setActiveChildId } = useChatStore();
    const [children, setChildren] = useState<Child[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tempSelectedId, setTempSelectedId] = useState<string | null>(activeChildId);

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
        if (!activeChildId && children.length > 0 && mode === 'optional') {
            setActiveChildId(children[0].id);
        }
    }, [children, activeChildId, setActiveChildId, mode]);

    const handleProceed = () => {
        if (tempSelectedId && onSelect) {
            onSelect(tempSelectedId);
        }
    };

    const activeChild = children.find(c => c.id === activeChildId);

    if (mode === 'mandatory') {
        return (
            <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {children.map((child) => (
                        <div
                            key={child.id}
                            onClick={() => setTempSelectedId(child.id)}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${tempSelectedId === child.id
                                    ? 'border-[#889A7F] bg-[#E8EDE6]/50 shadow-md'
                                    : 'border-transparent bg-white hover:bg-[#F5F7F4] shadow-sm'
                                }`}
                        >
                            <User
                                name={child.nickname}
                                avatarProps={{
                                    size: "lg",
                                    src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.nickname}`
                                }}
                            />
                        </div>
                    ))}
                </div>
                <Button
                    color="primary"
                    radius="full"
                    className="w-full font-bold h-12 text-lg shadow-lg"
                    isDisabled={!tempSelectedId}
                    onPress={handleProceed}
                >
                    Proceed
                </Button>
            </div>
        );
    }

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

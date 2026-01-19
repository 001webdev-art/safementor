'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { MessageSquare, Users, Settings, UserCircle, Hand } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface ChatFooterProps {
    currentView: string;
    onViewChange: (view: string) => void;
}

export default function ChatFooter({ currentView, onViewChange }: ChatFooterProps) {
    const navItems = [
        { icon: <Hand size={24} />, label: 'Hello', key: 'hello' },
        { icon: <MessageSquare size={24} />, label: 'Chats', key: 'chat' },
        { icon: <Users size={24} />, label: 'Contacts', key: 'contacts' },
        { icon: <Settings size={24} />, label: 'Settings', key: 'settings' },
        { icon: <UserCircle size={24} />, label: 'Profile', key: 'profile' },
    ];

    return (
        <footer className="h-16 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-divider flex items-center justify-around px-2 shrink-0 z-10">
            {navItems.map((item) => (
                <Button
                    key={item.key}
                    isIconOnly
                    variant="light"
                    radius="full"
                    className={`flex flex-col gap-1 h-12 w-12 ${currentView === item.key ? 'text-primary' : 'text-default-500'
                        }`}
                    onPress={() => onViewChange(item.key)}
                >
                    {item.icon}
                    <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </Button>
            ))}
        </footer>
    );
}

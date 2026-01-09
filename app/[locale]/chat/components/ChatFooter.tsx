<<<<<<< HEAD
'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { MessageSquare, Users, Settings, UserCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function ChatFooter() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
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
                    className={`flex flex-col gap-1 h-12 w-12 ${item.key === 'chat' ? 'text-primary' : 'text-default-500'
                        }`}
                    onClick={() => {
                        // Navigation logic if needed
                    }}
                >
                    {item.icon}
                    <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </Button>
            ))}
        </footer>
    );
}
=======
'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { MessageSquare, Users, Settings, UserCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function ChatFooter() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
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
                    className={`flex flex-col gap-1 h-12 w-12 ${item.key === 'chat' ? 'text-primary' : 'text-default-500'
                        }`}
                    onClick={() => {
                        // Navigation logic if needed
                    }}
                >
                    {item.icon}
                    <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </Button>
            ))}
        </footer>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

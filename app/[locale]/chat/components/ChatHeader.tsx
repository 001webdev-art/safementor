'use client';

import React from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Avatar
} from '@nextui-org/react';
import { ChevronDown, MoreVertical, Search, Bot, Download, HelpCircle, LogOut, History } from 'lucide-react';
import { useChatStore } from '../hooks/useChatStore';
import { LLMProvider } from '../types/chat';
import { usePWA } from '../hooks/usePWA';
import { useRouter, usePathname } from 'next/navigation';
import ChildSelector from './ChildSelector';

export default function ChatHeader() {
    const { provider, setProvider } = useChatStore();
    const { isInstallable, installApp } = usePWA();
    const router = useRouter();
    const pathname = usePathname();

    const pathSegments = pathname.split('/').filter(Boolean);
    const currentLocale = pathSegments[0] || 'en';

    const handleMenuAction = (key: string) => {
        if (key === 'install') {
            if (confirm('Would you like to install this app?')) {
                installApp();
            }
        } else if (key === 'help') {
            router.push(`/${currentLocale}/dashboard?section=help`);
        } else if (key === 'history') {
            router.push(`/${currentLocale}/chat/history`);
        } else if (key === 'exit') {
            router.push('/');
        }
    };

    const providerNames: Record<LLMProvider, string> = {
        gemini: 'Google Gemini',
        gpt: 'ChatGPT 4.o',
        groq: 'Groq (Llama 3)'
    };

    const providerColors: Record<LLMProvider, string> = {
        gemini: 'primary',
        gpt: 'success',
        groq: 'warning'
    };

    return (
        <header className="h-16 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-divider flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Avatar
                        icon={<Bot size={24} />}
                        classNames={{
                            base: "bg-gradient-to-br from-primary to-primary-600 text-white",
                            icon: "text-white/90"
                        }}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-[#f0f2f5] dark:border-[#202c33]"></div>
                </div>
                <div>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="light"
                                size="sm"
                                endContent={<ChevronDown size={14} />}
                                className="font-bold text-base p-0 h-auto min-w-0 bg-transparent hover:bg-transparent"
                            >
                                {providerNames[provider]}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Select LLM Provider"
                            onAction={(key) => setProvider(key as LLMProvider)}
                            selectedKeys={[provider]}
                            selectionMode="single"
                        >
                            <DropdownItem key="gemini" startContent={<div className="w-2 h-2 rounded-full bg-primary" />}>
                                Google Gemini
                            </DropdownItem>
                            <DropdownItem key="gpt" startContent={<div className="w-2 h-2 rounded-full bg-success" />}>
                                ChatGPT 4.o
                            </DropdownItem>
                            <DropdownItem key="groq" startContent={<div className="w-2 h-2 rounded-full bg-warning" />}>
                                Groq (Llama 3)
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div className="mt-1">
                        <ChildSelector />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button isIconOnly variant="light" radius="full" size="sm">
                    <Search size={20} className="text-default-500" />
                </Button>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button isIconOnly variant="light" radius="full" size="sm">
                            <MoreVertical size={20} className="text-default-500" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Menu" onAction={(key) => handleMenuAction(key as string)}>
                        <DropdownItem
                            key="install"
                            startContent={<Download size={18} />}
                        >
                            {isInstallable ? "Install this APP" : "PWA Status (Debug)"}
                        </DropdownItem>
                        <DropdownItem key="history" startContent={<History size={18} />}>
                            Messages Stored
                        </DropdownItem>
                        <DropdownItem key="help" startContent={<HelpCircle size={18} />}>
                            Help
                        </DropdownItem>
                        <DropdownItem key="exit" className="text-danger" color="danger" startContent={<LogOut size={18} />}>
                            Exit
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    );
}

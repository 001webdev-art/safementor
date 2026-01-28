'use client';

import React, { useState } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import {
    Shield, Bell, Settings, Lock, LogOut,
    Menu, X, ChevronDown, ChevronRight, User as UserIcon, Baby, Globe, MessageSquare
} from 'lucide-react';
import { Profile } from '@/types/database';
import { usePathname, useRouter } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/config';
import { createClient } from '@/lib/supabase/client';

interface NavSubItem {
    id: string;
    label: string;
    icon: any;
}

interface NavItem {
    id: string;
    label: string;
    icon: any;
    subItems?: NavSubItem[];
}

interface DashboardSidebarProps {
    profile: Partial<Profile>;
    userEmail?: string;
    activeSection: string;
    onSectionChange: (section: string) => void;
    isMobileMenuOpen: boolean;
    onMobileMenuClose: () => void;
    t: (key: string) => string;
}

export default function DashboardSidebar({
    profile,
    userEmail,
    activeSection,
    onSectionChange,
    isMobileMenuOpen,
    onMobileMenuClose,
    t
}: DashboardSidebarProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    // Extract current locale from URL
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentLocale = locales.includes(pathSegments[0] as any)
        ? pathSegments[0]
        : defaultLocale;

    const switchLanguage = (newLocale: string) => {
        if (pathname.startsWith(`/${currentLocale}`)) {
            const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
            router.push(newPathname);
        } else {
            const newPathname = `/${newLocale}${pathname}`;
            router.push(newPathname);
        }
    };

    const getFlag = (locale: string) => {
        switch (locale) {
            case 'pt': return '🇧🇷';
            case 'en': return '🇺🇸';
            case 'es': return '🇪🇸';
            case 'de': return '🇩🇪';
            default: return '🌐';
        }
    };

    // Translation for languages (could be unified with Header's tNav)
    const getLanguageName = (locale: string) => {
        switch (locale) {
            case 'pt': return 'Português';
            case 'en': return 'English';
            case 'es': return 'Español';
            case 'de': return 'Deutsch';
            default: return locale;
        }
    };

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const supabase = createClient();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await supabase.auth.signOut();
            router.push(`/${currentLocale}/login`);
            router.refresh(); // Ensure the layout/server components re-check session
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const navItems: NavItem[] = [
        { id: 'overview', label: t('sections.overview'), icon: Shield },
        { id: 'notifications', label: t('sections.notifications') || 'Notifications', icon: Bell },
        {
            id: 'settings',
            label: t('sections.settings') || 'Settings',
            icon: Settings,
            subItems: [
                { id: 'personal-data', label: t('sections.personalInfo') || 'Personal data', icon: UserIcon },
                { id: 'children-data', label: t('sections.children') || 'Children data', icon: Baby },
            ]
        },
        { id: 'privacy', label: t('sections.privacy'), icon: Lock },
    ];

    return (
        <aside className={`
            fixed md:static inset-y-0 left-0 z-40
            w-64 bg-white border-r border-gray-200
            transform transition-transform duration-300
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            flex flex-col h-full
        `}>
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#889A7F] rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-lg">SafeMentor</p>
                        <p className="text-xs text-[#4A5445] font-medium">Parent Dashboard</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const { id, label, icon: Icon, subItems } = item;
                    const isSelected = activeSection === id || (subItems && subItems.some(sub => sub.id === activeSection));

                    return (
                        <div key={id} className="space-y-1">
                            <Button
                                variant="light"
                                className={`
                                    w-full justify-start text-left
                                    ${isSelected && !subItems ? 'bg-[#F5F7F4] text-[#4A5445] font-semibold' : 'text-gray-700'}
                                    ${subItems ? 'hover:bg-gray-50' : ''}
                                `}
                                startContent={<Icon className="w-5 h-5" />}
                                endContent={subItems ? (
                                    isSettingsOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />
                                ) : null}
                                onPress={() => {
                                    if (subItems) {
                                        setIsSettingsOpen(!isSettingsOpen);
                                    } else {
                                        onSectionChange(id);
                                        onMobileMenuClose();
                                    }
                                }}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span>{label}</span>
                                </div>
                            </Button>

                            {subItems && isSettingsOpen && (
                                <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-2">
                                    {subItems.map((subItem) => (
                                        <Button
                                            key={subItem.id}
                                            variant="light"
                                            size="sm"
                                            className={`
                                                w-full justify-start text-left
                                                ${activeSection === subItem.id ? 'bg-[#E8EDE6] text-[#4A5445] font-medium' : 'text-gray-600'}
                                            `}
                                            startContent={<subItem.icon className="w-4 h-4" />}
                                            onPress={() => {
                                                onSectionChange(subItem.id);
                                                onMobileMenuClose();
                                            }}
                                        >
                                            {subItem.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-2">
                <Dropdown placement="top-start">
                    <DropdownTrigger>
                        <Button
                            variant="light"
                            className="w-full justify-start text-left text-gray-700 font-medium h-12"
                            startContent={<Globe className="w-5 h-5 text-gray-500" />}
                        >
                            <div className="flex justify-between items-center w-full">
                                <span>{getLanguageName(currentLocale)}</span>
                                <span className="text-lg">{getFlag(currentLocale)}</span>
                            </div>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Language selection"
                        onAction={(key) => switchLanguage(key as string)}
                        selectedKeys={[currentLocale]}
                        selectionMode="single"
                    >
                        {locales.map((locale) => (
                            <DropdownItem
                                key={locale}
                                startContent={<span className="text-lg">{getFlag(locale)}</span>}
                            >
                                {getLanguageName(locale)}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                <Button
                    variant="light"
                    className="w-full justify-start text-left text-gray-700"
                    startContent={<MessageSquare className="w-5 h-5" />}
                    onPress={() => router.push(`/${currentLocale}/chat`)}
                >
                    Go to Chat APP
                </Button>

                <Button
                    variant="light"
                    color="danger"
                    className="w-full justify-start text-left"
                    startContent={<LogOut className="w-5 h-5" />}
                    onPress={handleLogout}
                    isLoading={isLoggingOut}
                >
                    Logout
                </Button>
            </div>
        </aside>
    );
}

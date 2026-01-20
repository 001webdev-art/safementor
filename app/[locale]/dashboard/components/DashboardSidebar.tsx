'use client';

import React from 'react';
import { User, Divider, Listbox, ListboxItem, Chip, Button } from '@nextui-org/react';
import { LayoutDashboard, Users, ShieldCheck, HelpCircle } from 'lucide-react';
import { CloseIcon } from '@/components/landing/SafeMentorIcons';
import { Section } from '@/types/dashboard';
import { Profile } from '@/types/database';

interface DashboardSidebarProps {
    profile: Partial<Profile>;
    userEmail?: string;
    userInitial?: string;
    activeSection: Section;
    onSectionChange: (section: Section) => void;
    isMobileMenuOpen: boolean;
    onMobileMenuClose: () => void;
    t: (key: string) => string;
}

/**
 * DashboardSidebar Component
 * Responsibilities: Navigation, User Profile display, Mobile drawer behavior.
 */
export default function DashboardSidebar({
    profile,
    userEmail,
    userInitial,
    activeSection,
    onSectionChange,
    isMobileMenuOpen,
    onMobileMenuClose,
    t
}: DashboardSidebarProps) {
    return (
        <aside className={`
            w-64 border-r border-divider p-4 bg-white z-50 md:z-30 flex flex-col gap-6
            fixed top-0 bottom-0 left-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:top-auto md:bottom-auto
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="px-2 flex justify-between items-center md:block">
                <User
                    name={profile.nickname || profile.firstname || userEmail}
                    description={t('user.role')}
                    avatarProps={{
                        src: profile.profile_picture_url || undefined,
                        name: userInitial,
                        color: "primary",
                        isBordered: true
                    }}
                    className="justify-start"
                />
                <Button isIconOnly variant="light" size="sm" className="md:hidden" onClick={onMobileMenuClose}>
                    <CloseIcon />
                </Button>
            </div>

            <Divider />

            <Listbox
                aria-label="Navigation"
                onAction={(key) => onSectionChange(key as Section)}
                variant="flat"
                color="primary"
                className="p-0 gap-1"
                itemClasses={{
                    base: "px-3 rounded-lg gap-3 h-12 data-[hover=true]:bg-default-100",
                    title: "text-base font-medium",
                }}
            >
                <ListboxItem
                    key="overview"
                    startContent={<LayoutDashboard size={20} />}
                    className={activeSection === 'overview' ? "bg-primary-50 text-primary" : ""}
                >
                    {t('sections.overview')}
                </ListboxItem>
                <ListboxItem
                    key="children"
                    startContent={<Users size={20} />}
                    className={activeSection === 'children' ? "bg-primary-50 text-primary" : ""}
                >
                    {t('sections.children')}
                </ListboxItem>
                <ListboxItem
                    key="privacy"
                    startContent={<ShieldCheck size={20} />}
                    className={activeSection === 'privacy' ? "bg-primary-50 text-primary" : ""}
                >
                    {t('sections.privacy')}
                </ListboxItem>
                <ListboxItem
                    key="help"
                    startContent={<HelpCircle size={20} />}
                    className={activeSection === 'help' ? "bg-primary-50 text-primary" : ""}
                >
                    {t('sections.help')}
                </ListboxItem>
            </Listbox>

            <div className="mt-auto p-2">
                <Chip color="success" variant="dot" size="sm">{t('user.status')}</Chip>
            </div>
        </aside>
    );
}

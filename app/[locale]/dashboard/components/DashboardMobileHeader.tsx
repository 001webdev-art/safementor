<<<<<<< HEAD
'use client';

import React from 'react';
import { Button, Avatar } from '@nextui-org/react';
import { LayoutDashboard } from 'lucide-react';
import { Section } from '@/types/dashboard';

interface DashboardMobileHeaderProps {
    activeSection: Section;
    userInitial?: string;
    onMenuToggle: () => void;
    t: (key: string) => string;
}

/**
 * DashboardMobileHeader Component
 * Shows hamburger menu and section title on small screens.
 */
export default function DashboardMobileHeader({
    activeSection,
    userInitial,
    onMenuToggle,
    t
}: DashboardMobileHeaderProps) {
    return (
        <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-divider z-40 flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
                <Button
                    isIconOnly
                    variant="light"
                    onClick={onMenuToggle}
                >
                    <LayoutDashboard size={24} />
                </Button>
                <span className="font-bold text-lg text-gray-800">{t(`sections.${activeSection}`)}</span>
            </div>
            <Avatar
                name={userInitial}
                size="sm"
                color="primary"
                isBordered
            />
        </div>
    );
}
=======
'use client';

import React from 'react';
import { Button, Avatar } from '@nextui-org/react';
import { LayoutDashboard } from 'lucide-react';
import { Section } from '@/types/dashboard';

interface DashboardMobileHeaderProps {
    activeSection: Section;
    userInitial?: string;
    onMenuToggle: () => void;
    t: (key: string) => string;
}

/**
 * DashboardMobileHeader Component
 * Shows hamburger menu and section title on small screens.
 */
export default function DashboardMobileHeader({
    activeSection,
    userInitial,
    onMenuToggle,
    t
}: DashboardMobileHeaderProps) {
    return (
        <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-divider z-40 flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
                <Button
                    isIconOnly
                    variant="light"
                    onClick={onMenuToggle}
                >
                    <LayoutDashboard size={24} />
                </Button>
                <span className="font-bold text-lg text-gray-800">{t(`sections.${activeSection}`)}</span>
            </div>
            <Avatar
                name={userInitial}
                size="sm"
                color="primary"
                isBordered
            />
        </div>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

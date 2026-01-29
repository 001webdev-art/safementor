'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/react';
import { Menu } from 'lucide-react';

// Hooks
import { useProfile } from './hooks/useProfile';
import { useChildren } from './hooks/useChildren';
import { useCollapsibleGroups } from './hooks/useCollapsibleGroups';
import { useDashboardSections } from './hooks/useDashboardSections';

// Components (Production versions mapping to Modern UI)
import DashboardSidebar from './components/DashboardSidebar';
import LoadingState from './components/ui/LoadingState';

// Modern UI Components
import { Overview } from '@/components/dashboard2/Overview';
import { Notifications } from '@/components/dashboard2/Notifications';
import { PersonalData } from '@/components/dashboard2/PersonalData';
import { ChildrenData } from '@/components/dashboard2/ChildrenData';
import { Privacy } from '@/components/dashboard2/Privacy';
import { HelpSupport } from '@/components/dashboard2/HelpSupport';

// Types
import { DashboardClientProps } from '@/types/dashboard';

export default function DashboardClient({ user }: DashboardClientProps) {
    const t = useTranslations('Dashboard');

    // Real Data Hooks
    const { profile, setProfile, isLoading, isSaving, handleUpdate } = useProfile(user);
    const { collapsedGroups, toggleGroup } = useCollapsibleGroups();
    const {
        activeSection,
        setActiveSection,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    } = useDashboardSections();

    const {
        children,
        upsertChild,
        deleteChild,
        isLoading: isLoadingChildren
    } = useChildren(user.id);

    // Initial load check
    if (isLoading) {
        return <LoadingState message={t('actions.loading')} />;
    }

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            <DashboardSidebar
                profile={profile}
                userEmail={user.email}
                activeSection={activeSection}
                onSectionChange={(section) => setActiveSection(section as any)}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={closeMobileMenu}
                t={t}
            />

            <main className="flex-1 overflow-y-auto relative">
                {/* Mobile Header with Menu Toggle */}
                <div className="md:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <span className="font-bold text-gray-900">SafeMentor</span>
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={toggleMobileMenu}
                        aria-label={t('sidebar.menu') || 'Open Menu'}
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>

                <div className="max-w-7xl mx-auto p-6 md:p-10">
                    {activeSection === 'overview' && (
                        <Overview
                            children={children as any}
                            alerts={[]} // Alerts migration can follow
                            onNavigate={(view) => setActiveSection(view as any)}
                        />
                    )}

                    {activeSection === 'notifications' && (
                        <Notifications alerts={[]} />
                    )}

                    {activeSection === 'personal-data' && (
                        <PersonalData
                            profile={profile}
                            onProfileChange={setProfile}
                            onSave={handleUpdate}
                            isSaving={isSaving}
                        />
                    )}

                    {activeSection === 'children-data' && (
                        <ChildrenData
                            children={children as any}
                            onUpsertChild={upsertChild}
                            onDeleteChild={deleteChild}
                        />
                    )}

                    {activeSection === 'privacy' && <Privacy />}
                    {activeSection === 'help' && <HelpSupport />}
                </div>
            </main>
        </div>
    );
}

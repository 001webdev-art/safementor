'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/react';
import { Menu } from 'lucide-react';

import DashboardSidebar from './DashboardSidebar';
import LoadingState from './ui/LoadingState';

// Modern UI Components
import { Overview } from '@/features/dashboard/components/Overview';
import { Notifications } from '@/features/dashboard/components/Notifications';
import { PersonalData } from '@/features/dashboard/components/PersonalData';
import { ChildrenData } from '@/features/dashboard/components/ChildrenData';
import { Privacy } from '@/features/dashboard/components/Privacy';
import { HelpSupport } from '@/features/dashboard/components/HelpSupport';
import { useProfile } from '@/features/dashboard/hooks/useProfile';
import { useChildren } from '@/features/dashboard/hooks/useChildren';
import { useCollapsibleGroups } from '@/features/dashboard/hooks/useCollapsibleGroups';
import { useDashboardSections } from '@/features/dashboard/hooks/useDashboardSections';

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
                        <Notifications alerts={[]} profile={profile as any} />
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

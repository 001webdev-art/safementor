'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';

// Hooks
import { useProfile } from './hooks/useProfile';
import { useChildren } from './hooks/useChildren';
import { useCollapsibleGroups } from './hooks/useCollapsibleGroups';
import { useDashboardSections } from './hooks/useDashboardSections';

// Components
import DashboardSidebar from './components/DashboardSidebar';
import DashboardMobileHeader from './components/DashboardMobileHeader';
import SectionRenderer from './components/SectionRenderer';
import LoadingState from './components/ui/LoadingState';

// Types
import { DashboardClientProps } from '@/types/dashboard';

/**
 * DashboardClient - Main Orchestrator
 * This component follows SOLID principles by delegating state management to hooks
 * and UI rendering to modular sub-components.
 */
export default function DashboardClient({ user }: DashboardClientProps) {
    const t = useTranslations('Dashboard');

    // Logic extraction via custom hooks
    const { profile, setProfile, isLoading, isSaving, handleUpdate } = useProfile(user);
    const { collapsedGroups, toggleGroup } = useCollapsibleGroups();
    const {
        activeSection,
        setActiveSection,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    } = useDashboardSections();

    const {
        children,
        selectedChildId,
        setSelectedChildId,
        isAddingChild,
        setIsAddingChild,
        upsertChild,
        deleteChild,
        isLoading: isLoadingChildren
    } = useChildren(user.id);

    // Derived state
    const userInitial = useMemo(() =>
        profile.firstname?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U',
        [profile.firstname, user.email]);

    if (isLoading) {
        return <LoadingState message={t('actions.loading')} />;
    }

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden relative bg-white">
            {/* Mobile View Header */}
            <DashboardMobileHeader
                activeSection={activeSection}
                userInitial={userInitial}
                onMenuToggle={toggleMobileMenu}
                t={t}
            />

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar Navigation */}
            <DashboardSidebar
                profile={profile}
                userEmail={user.email}
                userInitial={userInitial}
                activeSection={activeSection}
                onSectionChange={(section) => {
                    setActiveSection(section);
                    closeMobileMenu();
                }}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuClose={closeMobileMenu}
                t={t}
            />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50/50 pt-20 md:pt-10">
                <div className="max-w-4xl mx-auto">
                    <SectionRenderer
                        activeSection={activeSection}
                        profile={profile}
                        onProfileChange={setProfile}
                        isLoading={isLoading}
                        isSaving={isSaving || isLoadingChildren}
                        onSave={handleUpdate}
                        collapsedGroups={collapsedGroups}
                        toggleGroup={toggleGroup}
                        t={t}
                        // Children specific props
                        childList={children}
                        selectedChildId={selectedChildId}
                        onSelectChild={setSelectedChildId}
                        isAddingChild={isAddingChild}
                        onSetAddingChild={setIsAddingChild}
                        onUpsertChild={upsertChild}
                        onDeleteChild={deleteChild}
                    />
                </div>
            </main>
        </div>
    );
}

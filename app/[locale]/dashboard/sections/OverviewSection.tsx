'use client';

import React from 'react';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import ContactInfoForm from '../forms/ContactInfoForm';
import AddressForm from '../forms/AddressForm';
import BillingForm from '../forms/BillingForm';
import CommunicationForm from '../forms/CommunicationForm';
import PreferencesForm from '../forms/PreferencesForm';
import SaveButton from '../components/ui/SaveButton';
import { SectionProps } from '@/types/dashboard';

/**
 * OverviewSection Component
 * Composes all forms related to user profile and account settings.
 */
export default function OverviewSection({
    profile,
    onProfileChange,
    isSaving,
    onSave,
    collapsedGroups,
    toggleGroup,
    t
}: SectionProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <h2 className="text-2xl font-bold">{t('sections.overview')}</h2>

            <PersonalInfoForm
                profile={profile}
                onProfileChange={onProfileChange}
                isCollapsed={collapsedGroups['personalInfo']}
                onToggle={() => toggleGroup('personalInfo')}
                t={t}
            />

            <ContactInfoForm
                profile={profile}
                onProfileChange={onProfileChange}
                isCollapsed={collapsedGroups['contactInfo']}
                onToggle={() => toggleGroup('contactInfo')}
                t={t}
            />

            <AddressForm
                profile={profile}
                onProfileChange={onProfileChange}
                isCollapsed={collapsedGroups['address']}
                onToggle={() => toggleGroup('address')}
                t={t}
            />

            <BillingForm
                profile={profile}
                onProfileChange={onProfileChange}
                isCollapsed={collapsedGroups['billingAddress']}
                onToggle={() => toggleGroup('billingAddress')}
                t={t}
            />


            <CommunicationForm
                profile={profile}
                onProfileChange={onProfileChange}
                isCollapsed={collapsedGroups['communication']}
                onToggle={() => toggleGroup('communication')}
                t={t}
            />


            <PreferencesForm
                profile={profile}
                onProfileChange={onProfileChange}
                isCollapsed={collapsedGroups['preferences']}
                onToggle={() => toggleGroup('preferences')}
                t={t}
            />

            <SaveButton
                isLoading={isSaving}
                onClick={onSave}
                label={t('actions.saveChanges')}
                loadingLabel={t('actions.loading')}
            />
        </div>
    );
}

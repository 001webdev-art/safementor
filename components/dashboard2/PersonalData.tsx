'use client';

import React, { useState } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { Profile } from '@/types/database';

// Import forms from the original dashboard
import PersonalInfoForm from '../../app/[locale]/dashboard/forms/PersonalInfoForm';
import ContactInfoForm from '../../app/[locale]/dashboard/forms/ContactInfoForm';
import AddressForm from '../../app/[locale]/dashboard/forms/AddressForm';
import BillingForm from '../../app/[locale]/dashboard/forms/BillingForm';
import SubscriptionForm from '../../app/[locale]/dashboard/forms/SubscriptionForm';
import CommunicationForm from '../../app/[locale]/dashboard/forms/CommunicationForm';
import SocialForm from '../../app/[locale]/dashboard/forms/SocialForm';
import PreferencesForm from '../../app/[locale]/dashboard/forms/PreferencesForm';
import SaveButton from '../../app/[locale]/dashboard/components/ui/SaveButton';

interface PersonalDataProps {
    profile?: Partial<Profile>;
    onProfileChange?: (profile: Partial<Profile>) => void;
    onSave?: () => Promise<void>;
    isSaving?: boolean;
}

export function PersonalData({
    profile: externalProfile,
    onProfileChange: onExternalProfileChange,
    onSave: onExternalSave,
    isSaving: externalIsSaving
}: PersonalDataProps) {
    const t = useTranslations('Dashboard');
    const [localIsSaving, setLocalIsSaving] = useState(false);

    // Initial mock profile state if no external profile is provided
    const [localProfile, setLocalProfile] = useState<Partial<Profile>>({
        firstname: 'John',
        lastname: 'Doe',
        nickname: 'JD',
        gender: 'male' as any,
        relative_to_children: 'Father' as any,
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address_line1: '123 Main St',
        address_city: 'Berlin',
        address_country: 'DE',
        billing_same_as_shipping_address: true
    });

    const currentProfile = (externalProfile || localProfile) as Profile;
    const isSaving = externalIsSaving ?? localIsSaving;

    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
        personalInfo: false,
        contactInfo: true,
        address: true,
        billingAddress: true,
        settings: true,
        communication: true,
        social: true,
        preferences: true,
    });

    const toggleGroup = (group: string) => {
        setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const handleSave = async () => {
        if (onExternalSave) {
            await onExternalSave();
        } else {
            setLocalIsSaving(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setLocalIsSaving(false);
        }
    };

    const handleProfileChange = (newProfile: Partial<Profile>) => {
        if (onExternalProfileChange) {
            onExternalProfileChange(newProfile);
        } else {
            setLocalProfile(newProfile);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Data</h1>
                <p className="text-gray-600">Manage your personal information and account settings.</p>
            </div>

            <div className="space-y-4">
                <PersonalInfoForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['personalInfo']}
                    onToggle={() => toggleGroup('personalInfo')}
                    t={t}
                />

                <ContactInfoForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['contactInfo']}
                    onToggle={() => toggleGroup('contactInfo')}
                    t={t}
                />

                <AddressForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['address']}
                    onToggle={() => toggleGroup('address')}
                    t={t}
                />

                <BillingForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['billingAddress']}
                    onToggle={() => toggleGroup('billingAddress')}
                    t={t}
                />

                <SubscriptionForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['settings']}
                    onToggle={() => toggleGroup('settings')}
                    t={t}
                />

                <CommunicationForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['communication']}
                    onToggle={() => toggleGroup('communication')}
                    t={t}
                />

                <SocialForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['social']}
                    onToggle={() => toggleGroup('social')}
                    t={t}
                />

                <PreferencesForm
                    profile={currentProfile}
                    onProfileChange={handleProfileChange}
                    isCollapsed={collapsedGroups['preferences']}
                    onToggle={() => toggleGroup('preferences')}
                    t={t}
                />
            </div>

            <div className="flex justify-end sticky bottom-6 z-10">
                <Button
                    color="success"
                    size="lg"
                    className="shadow-xl px-12 font-bold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                    onPress={handleSave}
                    isLoading={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save All Changes'}
                </Button>
            </div>
        </div>
    );
}

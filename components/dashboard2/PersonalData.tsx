'use client';

import React, { useState } from 'react';
import { Button, Spinner, Divider } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { Profile } from '@/types/database';

// Import forms from the original dashboard
import PersonalInfoForm from '../../app/[locale]/dashboard/forms/PersonalInfoForm';
import ContactInfoForm from '../../app/[locale]/dashboard/forms/ContactInfoForm';
import AddressForm from '../../app/[locale]/dashboard/forms/AddressForm';
import BillingForm from '../../app/[locale]/dashboard/forms/BillingForm';
import CommunicationForm from '../../app/[locale]/dashboard/forms/CommunicationForm';
import PreferencesForm from '../../app/[locale]/dashboard/forms/PreferencesForm';
import PaymentDataForm from '../../app/[locale]/dashboard/forms/PaymentDataForm';
import BillingInformationForm from '../../app/[locale]/dashboard/forms/BillingInformationForm';
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
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('sections.settings')}</h1>
                <p className="text-gray-500">{t('sections.settingsSubtitle')}</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">{t('sections.profileDetails')}</h3>
                    <PersonalInfoForm
                        profile={currentProfile}
                        onProfileChange={handleProfileChange}
                        t={t}
                    />

                    <ContactInfoForm
                        profile={currentProfile}
                        onProfileChange={handleProfileChange}
                        t={t}
                    />

                    <AddressForm
                        profile={currentProfile}
                        onProfileChange={handleProfileChange}
                        t={t}
                    />

                    <BillingForm
                        profile={currentProfile}
                        onProfileChange={handleProfileChange}
                        t={t}
                    />

                    <CommunicationForm
                        profile={currentProfile}
                        onProfileChange={handleProfileChange}
                        t={t}
                    />

                    <PreferencesForm
                        profile={currentProfile}
                        onProfileChange={handleProfileChange}
                        t={t}
                    />
                </div>

                <Divider className="my-8" />

                <div className="space-y-4">
                    <PaymentDataForm t={t} />
                    <BillingInformationForm t={t} />
                </div>
            </div>

            <div className="flex justify-end sticky bottom-6 z-10">
                <Button
                    color="success"
                    size="lg"
                    className="shadow-xl px-12 font-bold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                    onPress={handleSave}
                    isLoading={isSaving}
                >
                    {isSaving ? t('actions.loading') : t('actions.saveChanges')}
                </Button>
            </div>
        </div>
    );
}

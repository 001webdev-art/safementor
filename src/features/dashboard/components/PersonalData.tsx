'use client';

import React, { useState } from 'react';
import { Button, Spinner, Divider, Card, CardBody } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { Profile } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

// Import forms from the original dashboard
import PersonalInfoForm from '@/features/dashboard/forms/PersonalInfoForm';
import ContactInfoForm from '@/features/dashboard/forms/ContactInfoForm';
import AddressForm from '@/features/dashboard/forms/AddressForm';
import BillingForm from '@/features/dashboard/forms/BillingForm';
import CommunicationForm from '@/features/dashboard/forms/CommunicationForm';
import PreferencesForm from '@/features/dashboard/forms/PreferencesForm';
import PaymentDataForm from '@/features/dashboard/forms/PaymentDataForm';
import BillingInformationForm from '@/features/dashboard/forms/BillingInformationForm';
import SaveButton from '../components/ui/SaveButton';

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
    const [countries, setCountries] = useState<{ country_id: number; country_name: string }[]>([]);

    React.useEffect(() => {
        const fetchCountries = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from('countries')
                .select('country_id, country_name')
                .order('country_name');
            if (data) setCountries(data);
        };
        fetchCountries();
    }, []);

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
        address_country: 'Germany',
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
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('sections.settings')}</h1>
                <p className="text-gray-500 text-lg">{t('sections.settingsSubtitle')}</p>
            </div>

            <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                <CardBody className="p-0">
                    <div className="p-6 md:p-8 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">{t('sections.profileDetails')}</h3>
                            <div className="space-y-6">
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
                                    countries={countries}
                                />

                                <BillingForm
                                    profile={currentProfile}
                                    onProfileChange={handleProfileChange}
                                    t={t}
                                    countries={countries}
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
                        </div>

                        <Divider className="my-8" />

                        <div className="space-y-6">
                            <PaymentDataForm t={t} />
                            <BillingInformationForm t={t} />
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="flex justify-end sticky bottom-6 z-10">
                <Button
                    size="lg"
                    className="shadow-lg px-12 font-bold text-white bg-[#889A7F] hover:bg-[#748866] rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    onPress={handleSave}
                    isLoading={isSaving}
                >
                    {isSaving ? t('actions.loading') : t('actions.saveChanges')}
                </Button>
            </div>
        </div>
    );
}

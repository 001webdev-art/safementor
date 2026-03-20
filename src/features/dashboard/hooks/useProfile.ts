'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/database';

export function useProfile(user: { id: string; email?: string }) {
    const [profile, setProfile] = useState<Partial<Profile>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const supabase = createClient();

    const loadProfile = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setProfile(data);

                // Sync compliance data from localStorage if missing in DB
                const savedCompliance = localStorage.getItem('compliance_data');
                if (savedCompliance && (!data.terms_agreed1)) {
                    try {
                        const compliance = JSON.parse(savedCompliance);
                        const updatedProfile = {
                            ...data,
                            terms_agreed1: compliance.agreed,
                            terms_help_improve: compliance.helpImprove,
                            terms_allow_anonymous_safety_analysis: compliance.safetyAnalysis,
                            updated_at: new Date().toISOString()
                        };

                        const { error: syncError } = await supabase
                            .from('profiles')
                            .upsert(updatedProfile);

                        if (!syncError) {
                            setProfile(updatedProfile);
                            localStorage.removeItem('compliance_data');
                            console.log('Compliance data synced successfully');
                        }
                    } catch (e) {
                        console.error('Error syncing compliance data:', e);
                    }
                }
            } else if (error && error.code === 'PGRST116') {
                // Profile doesn't exist yet, initialize with user data
                const savedCompliance = localStorage.getItem('compliance_data');
                let compliance = { agreed: false, helpImprove: false, safetyAnalysis: false };
                if (savedCompliance) {
                    try {
                        compliance = JSON.parse(savedCompliance);
                    } catch (e) {
                        console.error('Error parsing compliance data', e);
                    }
                }

                const initialProfile: Partial<Profile> = {
                    id: user.id,
                    email: user.email || '',
                    firstname: '',
                    lastname: '',
                    nickname: '',
                    gender: null,
                    relative_to_children: 'Other',
                    address_country: 'Germany',
                    address_timezone: 'Europe/Berlin',
                    billing_country: 'Germany',
                    is_subscribed: false,
                    subscription_tier: 'free',
                    theme: 'system',
                    language: 'en',
                    date_format: 'DD/MM/YYYY',
                    time_format: '24h',
                    terms_agreed1: compliance.agreed,
                    terms_help_improve: compliance.helpImprove,
                    terms_allow_anonymous_safety_analysis: compliance.safetyAnalysis,
                    communication_preferences: {
                        marketing_emails: false,
                        newsletter: true,
                        product_updates: true,
                        security_alerts: true,
                        security_alerts_via_sms: false,
                        security_alerts_via_email: true,
                        security_alerts_via_push: true,
                        security_alerts_via_whatsapp: false
                    }
                };
                setProfile(initialProfile);

                // If we have compliance data, try to save it immediately since the record doesn't exist
                if (savedCompliance) {
                    const { error: createError } = await supabase.from('profiles').upsert(initialProfile);
                    if (!createError) {
                        localStorage.removeItem('compliance_data');
                    }
                }
            }
        } catch (err) {
            console.error('Error loading profile:', err);
        } finally {
            setIsLoading(false);
        }
    }, [user.id, user.email, supabase]);

    const handleUpdate = async () => {
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    ...profile,
                    id: user.id, // Ensure ID is set
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;
        } catch (err) {
            console.error('Error updating profile:', err);
            throw err;
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return {
        profile,
        setProfile,
        isLoading,
        isSaving,
        handleUpdate,
        refreshProfile: loadProfile
    };
}

'use client';

import React from 'react';
import { Card, CardHeader, CardBody, Divider, Switch, Button } from '@nextui-org/react';
import { Shield } from 'lucide-react';
import { SectionProps } from '@/types/dashboard';

/**
 * PrivacySection Component
 * Handles security settings like 2FA and shows last password change info.
 */
export default function PrivacySection({
    profile,
    onProfileChange,
    isSaving,
    onSave,
    t
}: SectionProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <h2 className="text-2xl font-bold">{t('sections.privacySecurity') || t('sections.privacy')}</h2>

            <Card className="p-6 border-none bg-white/70 backdrop-blur-md">
                <CardHeader className="flex gap-3 pb-2">
                    <Shield className="text-danger" />
                    <p className="text-lg font-bold">{t('sections.privacySecurity')}</p>
                </CardHeader>
                <Divider />
                <CardBody className="space-y-6 pt-4">
                    <p className="text-default-500">{t('content.privacyDescription')}</p>

                    <div className="flex justify-between items-center bg-default-50 p-4 rounded-xl border border-divider">
                        <div className="flex flex-col">
                            <span className="font-semibold">{t('fields.two_factor_enabled')}</span>
                            <span className="text-xs text-default-400">Add an extra layer of security to your account.</span>
                        </div>
                        <Switch
                            isSelected={profile.two_factor_enabled}
                            onValueChange={(v) => onProfileChange({ ...profile, two_factor_enabled: v })}
                        />
                    </div>

                    <div className="bg-default-50 p-4 rounded-xl border border-divider">
                        <p className="text-sm font-semibold mb-1">Last Password Change</p>
                        <p className="text-sm text-default-500">
                            {profile.last_password_change
                                ? new Date(profile.last_password_change).toLocaleString()
                                : 'Never'}
                        </p>
                    </div>
                </CardBody>
            </Card>

            <div className="flex justify-end">
                <Button
                    color="primary"
                    className="font-bold shadow-lg"
                    isLoading={isSaving}
                    onClick={onSave}
                >
                    {isSaving ? t('actions.loading') : t('actions.saveChanges')}
                </Button>
            </div>
        </div>
    );
}

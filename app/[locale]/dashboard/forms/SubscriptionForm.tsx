'use client';

import React from 'react';
import { Input, Switch } from '@nextui-org/react';
import { Settings } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';

/**
 * SubscriptionForm Component
 * Handles subscription status, tier, and two-factor authentication setting.
 */
const SubscriptionForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    return (
        <CollapsibleCard
            id="settings"
            title={t('sections.settings')}
            icon={<Settings className="text-default-500" />}
            isCollapsed={isCollapsed}
            onToggle={onToggle}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col justify-center">
                    <Switch
                        isSelected={profile.is_subscribed}
                        onValueChange={(v) => onProfileChange({ ...profile, is_subscribed: v })}
                        id="is_subscribed"
                    >
                        {t('fields.is_subscribed')}
                    </Switch>
                </div>
                <Input
                    label={t('fields.subscription_tier')}
                    value={profile.subscription_tier || 'free'}
                    variant="bordered"
                    isDisabled
                    labelPlacement="outside"
                    id="subscription_tier"
                />

                <div className="md:col-span-2 pt-2">
                    <div className="flex justify-between items-center bg-default-50/50 p-4 rounded-xl border border-divider">
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">{t('fields.two_factor_enabled')}</span>
                            <span className="text-xs text-default-400">Add an extra layer of security to your account.</span>
                        </div>
                        <Switch
                            isSelected={profile.two_factor_enabled}
                            onValueChange={(v) => onProfileChange({ ...profile, two_factor_enabled: v })}
                            id="two_factor_enabled"
                        />
                    </div>
                </div>
            </div>
        </CollapsibleCard>
    );
};

export default React.memo(SubscriptionForm);

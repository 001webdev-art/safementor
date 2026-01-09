'use client';

import React from 'react';
import { Input } from '@nextui-org/react';
import { CreditCard } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';

/**
 * BillingForm Component
 * Handles billing address fields. Only renders if billing_same_as_shipping_address is false.
 */
const BillingForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    if (profile.billing_same_as_shipping_address) return null;

    return (
        <div className="animate-in slide-in-from-top-2">
            <CollapsibleCard
                id="billingAddress"
                title={t('sections.billingAddress')}
                icon={<CreditCard className="text-warning" />}
                isCollapsed={isCollapsed}
                onToggle={onToggle}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label={t('fields.billing_address_line1')}
                        value={profile.billing_address_line1 || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_address_line1: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        className="md:col-span-2"
                        id="billing_address_line1"
                    />
                    <Input
                        label={t('fields.billing_address_additional_info')}
                        value={profile.billing_address_additional_info || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_address_additional_info: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_address_additional_info"
                    />
                    <Input
                        label={t('fields.billing_city')}
                        value={profile.billing_city || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_city: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_city"
                    />
                    <Input
                        label={t('fields.billing_state')}
                        value={profile.billing_state || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_state: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_state"
                    />
                    <Input
                        label={t('fields.billing_postal_code')}
                        value={profile.billing_postal_code || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_postal_code: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_postal_code"
                    />
                </div>
            </CollapsibleCard>
        </div>
    );
};

export default React.memo(BillingForm);

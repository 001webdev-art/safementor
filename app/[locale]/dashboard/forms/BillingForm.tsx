'use client';

import React from 'react';
import { Input, Card, CardBody } from '@nextui-org/react';
import { CreditCard } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

/**
 * BillingForm Component
 * Handles billing address fields. Only renders if billing_same_as_shipping_address is false.
 */
const BillingForm = ({ profile, onProfileChange, t }: FormProps) => {
    if (profile.billing_same_as_shipping_address) return null;

    return (
        <div className="animate-in slide-in-from-top-2">
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="text-default-400" size={18} />
                        <span className="font-bold">{t('sections.billingAddress')}</span>
                    </div>
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
                </CardBody>
            </Card>
        </div>
    );
};

export default React.memo(BillingForm);

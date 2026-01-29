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
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300 mt-4">
                <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="text-[#889A7F]" size={20} />
                    <span className="font-bold text-gray-900">{t('sections.billingAddress')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Input
                        label={t('fields.billing_address_line1')}
                        value={profile.billing_address_line1 || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_address_line1: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        className="md:col-span-2"
                        id="billing_address_line1"
                        classNames={{
                            inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                            label: "text-gray-600 font-medium"
                        }}
                    />
                    <Input
                        label={t('fields.billing_address_additional_info')}
                        value={profile.billing_address_additional_info || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_address_additional_info: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_address_additional_info"
                        classNames={{
                            inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                            label: "text-gray-600 font-medium"
                        }}
                    />
                    <Input
                        label={t('fields.billing_city')}
                        value={profile.billing_city || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_city: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_city"
                        classNames={{
                            inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                            label: "text-gray-600 font-medium"
                        }}
                    />
                    <Input
                        label={t('fields.billing_state')}
                        value={profile.billing_state || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_state: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_state"
                        classNames={{
                            inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                            label: "text-gray-600 font-medium"
                        }}
                    />
                    <Input
                        label={t('fields.billing_postal_code')}
                        value={profile.billing_postal_code || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_postal_code: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="billing_postal_code"
                        classNames={{
                            inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                            label: "text-gray-600 font-medium"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(BillingForm);

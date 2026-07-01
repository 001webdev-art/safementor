'use client';

import React from 'react';
import { Input, Card, CardBody, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { CreditCard } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

/**
 * BillingForm Component
 * Handles billing address fields. Only renders if billing_same_as_shipping_address is false.
 * Uses a responsive 4-column grid layout to prevent text/label wrapping.
 */
const BillingForm = ({ profile, onProfileChange, t, countries }: FormProps) => {
    if (profile.billing_same_as_shipping_address) return null;

    return (
        <div className="animate-in slide-in-from-top-2">
            <Card shadow="none" className="border border-gray-100 bg-gray-50/30 p-2 rounded-2xl">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="text-[#889A7F]" size={18} />
                        <span className="font-bold text-gray-900">{t('sections.billingAddress')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <Input
                            label={t('fields.billing_address_line1')}
                            placeholder={t('placeholders.address_line1')}
                            value={profile.billing_address_line1 || ''}
                            onValueChange={(v) => onProfileChange({ ...profile, billing_address_line1: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            className="md:col-span-3"
                            maxLength={255}
                            id="billing_address_line1"
                            classNames={{
                                inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                                label: "text-gray-600 font-medium"
                            }}
                        />
                        <Input
                            label={t('fields.billing_address_additional_info')}
                            placeholder="Apt, Suite"
                            value={profile.billing_address_additional_info || ''}
                            onValueChange={(v) => onProfileChange({ ...profile, billing_address_additional_info: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            className="md:col-span-1"
                            maxLength={100}
                            id="billing_address_additional_info"
                            classNames={{
                                inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                                label: "text-gray-600 font-medium"
                            }}
                        />
                        <Input
                            label={t('fields.billing_city')}
                            placeholder={t('placeholders.city')}
                            value={profile.billing_city || ''}
                            onValueChange={(v) => onProfileChange({ ...profile, billing_city: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            className="md:col-span-2"
                            id="billing_city"
                            classNames={{
                                inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                                label: "text-gray-600 font-medium"
                            }}
                        />
                        <Input
                            label={t('fields.billing_state')}
                            placeholder="e.g. BW"
                            value={profile.billing_state || ''}
                            onValueChange={(v) => onProfileChange({ ...profile, billing_state: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            className="md:col-span-1"
                            id="billing_state"
                            classNames={{
                                inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                                label: "text-gray-600 font-medium"
                            }}
                        />
                        <Input
                            label={t('fields.billing_postal_code')}
                            placeholder={t('placeholders.zip')}
                            value={profile.billing_postal_code || ''}
                            onValueChange={(v) => onProfileChange({ ...profile, billing_postal_code: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            className="md:col-span-1"
                            id="billing_postal_code"
                            classNames={{
                                inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                                label: "text-gray-600 font-medium"
                            }}
                        />
                        <Autocomplete
                            label={t('fields.billing_country')}
                            placeholder={t('placeholders.country')}
                            selectedKey={profile.billing_country}
                            onSelectionChange={(v) => onProfileChange({ ...profile, billing_country: v as string })}
                            variant="bordered"
                            labelPlacement="outside"
                            className="md:col-span-2"
                            id="billing_country"
                            classNames={{
                                base: "md:col-span-2",
                            }}
                            inputProps={{
                                classNames: {
                                    inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                                    label: "text-gray-600 font-medium"
                                }
                            }}
                        >
                            {(countries || []).map((country) => (
                                <AutocompleteItem key={country.country_name} value={country.country_name}>
                                    {country.country_name}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default React.memo(BillingForm);

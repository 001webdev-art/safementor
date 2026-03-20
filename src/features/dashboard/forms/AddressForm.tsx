'use client';

import React from 'react';
import { Input, Switch, Card, CardBody, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { MapPin } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

/**
 * AddressForm Component
 * Handles shipping address and billing address toggle.
 */
const AddressForm = ({ profile, onProfileChange, t, countries }: FormProps) => {
    return (
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-[#889A7F]" size={20} />
                <span className="font-bold text-gray-900">{t('sections.address')}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Input
                    label={t('fields.address_line1')}
                    placeholder={t('placeholders.address_line1')}
                    value={profile.address_line1 || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, address_line1: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                    maxLength={255}
                    id="address_line1"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.address_additional_info')}
                    value={profile.address_additional_info || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, address_additional_info: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    maxLength={100}
                    id="address_additional_info"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.address_city')}
                    placeholder={t('placeholders.city')}
                    value={profile.address_city || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, address_city: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="address_city"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.address_state')}
                    value={profile.address_state || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, address_state: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="address_state"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.address_postal_code')}
                    placeholder={t('placeholders.zip')}
                    value={profile.address_postal_code || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, address_postal_code: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="address_postal_code"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.address_country')}
                    value={profile.address_country || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, address_country: v.toUpperCase() })}
                    variant="bordered"
                    labelPlacement="outside"
                    maxLength={2}
                    id="address_country"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.address_timezone')}
                    value={profile.address_timezone || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, address_timezone: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                    id="address_timezone"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <div className="md:col-span-3 pt-2">
                    <Switch
                        isSelected={profile.billing_same_as_shipping_address}
                        onValueChange={(v) => onProfileChange({ ...profile, billing_same_as_shipping_address: v })}
                        id="billing_same_as_shipping_address"
                        classNames={{
                            wrapper: "group-data-[selected=true]:bg-[#889A7F]"
                        }}
                    >
                        <span className="text-gray-700 font-medium">{t('fields.billing_same_as_shipping')}</span>
                    </Switch>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label={t('fields.address_line1')}
                        placeholder={t('placeholders.address_line1')}
                        value={profile.address_line1 || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, address_line1: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        className="md:col-span-2"
                        maxLength={255}
                        id="address_line1"
                    />
                    <Input
                        label={t('fields.address_additional_info')}
                        value={profile.address_additional_info || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, address_additional_info: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        maxLength={100}
                        id="address_additional_info"
                    />
                    <Input
                        label={t('fields.address_city')}
                        placeholder={t('placeholders.city')}
                        value={profile.address_city || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, address_city: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="address_city"
                    />
                    <Input
                        label={t('fields.address_state')}
                        value={profile.address_state || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, address_state: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="address_state"
                    />
                    <Input
                        label={t('fields.address_postal_code')}
                        placeholder={t('placeholders.zip')}
                        value={profile.address_postal_code || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, address_postal_code: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="address_postal_code"
                    />
                    <Autocomplete
                        label={t('fields.address_country')}
                        placeholder={t('placeholders.country')}
                        selectedKey={profile.address_country}
                        onSelectionChange={(v) => onProfileChange({ ...profile, address_country: v as string })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="address_country"
                    >
                        {(countries || []).map((country) => (
                            <AutocompleteItem key={country.country_name} value={country.country_name}>
                                {country.country_name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                    <Input
                        label={t('fields.address_timezone')}
                        value={profile.address_timezone || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, address_timezone: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        className="md:col-span-2"
                        id="address_timezone"
                    />
                    <div className="md:col-span-3 pt-2">
                        <Switch
                            isSelected={profile.billing_same_as_shipping_address}
                            onValueChange={(v) => onProfileChange({ ...profile, billing_same_as_shipping_address: v })}
                            id="billing_same_as_shipping_address"
                        >
                            {t('fields.billing_same_as_shipping')}
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AddressForm);

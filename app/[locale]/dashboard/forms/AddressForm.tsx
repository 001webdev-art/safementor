'use client';

import React from 'react';
import { Input, Switch, Card, CardBody } from '@nextui-org/react';
import { MapPin } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

/**
 * AddressForm Component
 * Handles shipping address and billing address toggle.
 */
const AddressForm = ({ profile, onProfileChange, t }: FormProps) => {
    return (
        <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
            <CardBody className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-default-400" size={18} />
                    <span className="font-bold">{t('sections.address')}</span>
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
                    <Input
                        label={t('fields.address_country')}
                        value={profile.address_country || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, address_country: v.toUpperCase() })}
                        variant="bordered"
                        labelPlacement="outside"
                        maxLength={2}
                        id="address_country"
                    />
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
            </CardBody>
        </Card>
    );
};

export default React.memo(AddressForm);

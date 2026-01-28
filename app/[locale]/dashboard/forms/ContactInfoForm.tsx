'use client';

import React from 'react';
import { Input, Chip, Card, CardBody } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

/**
 * ContactInfoForm Component
 * Handles email (read-only) and phone number with verification chip.
 */
const ContactInfoForm = ({ profile, onProfileChange, t }: FormProps) => {
    return (
        <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
            <CardBody className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-default-400" size={18} />
                    <span className="font-bold">{t('sections.contactInfo')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label={t('fields.email')}
                        value={profile.email || ''}
                        variant="bordered"
                        isDisabled
                        labelPlacement="outside"
                        id="email"
                    />
                    <Input
                        label={t('fields.phone')}
                        placeholder={t('placeholders.phone')}
                        value={profile.phone || ''}
                        onValueChange={(v) => onProfileChange({ ...profile, phone: v })}
                        variant="bordered"
                        labelPlacement="outside"
                        maxLength={20}
                        id="phone"
                        startContent={profile.phone_is_verified && <Chip size="sm" color="success" variant="flat">Verified</Chip>}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default React.memo(ContactInfoForm);

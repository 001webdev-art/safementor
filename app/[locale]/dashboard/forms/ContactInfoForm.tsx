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
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
                <Mail className="text-[#889A7F]" size={20} />
                <span className="font-bold text-gray-900">{t('sections.contactInfo')}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label={t('fields.email')}
                    value={profile.email || ''}
                    variant="bordered"
                    isDisabled
                    labelPlacement="outside"
                    id="email"
                    classNames={{
                        inputWrapper: "border-gray-200 opacity-60 rounded-xl bg-gray-100",
                        label: "text-gray-600 font-medium"
                    }}
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
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                    startContent={profile.phone_is_verified && (
                        <Chip size="sm" className="bg-[#889A7F]/10 text-[#889A7F] border-none font-semibold">
                            Verified
                        </Chip>
                    )}
                />
            </div>
        </div>
    );
};

export default React.memo(ContactInfoForm);

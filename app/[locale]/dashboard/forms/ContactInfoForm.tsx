'use client';

import React from 'react';
import { Input, Chip, Button } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';

/**
 * ContactInfoForm Component
 * Handles email (read-only) and phone number with verification chip.
 */
import { useState, useCallback } from 'react';
import PhoneVerificationModal from '../components/verification/PhoneVerificationModal';

// ... (existing imports, but add useState above if needed, oh wait I did imports above)

const ContactInfoForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);

    const handleVerificationSuccess = useCallback(() => {
        onProfileChange({ ...profile, phone_is_verified: true });
    }, [profile, onProfileChange]);

    return (
        <>
            <CollapsibleCard
                id="contactInfo"
                title={t('sections.contactInfo')}
                icon={<Mail className="text-success" />}
                isCollapsed={isCollapsed}
                onToggle={onToggle}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label={t('fields.email')}
                        value={profile.email || ''}
                        variant="bordered"
                        isDisabled
                        labelPlacement="outside"
                        id="email"
                    />
                    <div className="flex flex-col gap-2">
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
                        <div className="flex justify-end pb-1">
                            <Button
                                color={profile.phone_is_verified ? "default" : "primary"}
                                variant={profile.phone_is_verified ? "flat" : "solid"}
                                isDisabled={profile.phone_is_verified || !profile.phone}
                                className={`w-full md:w-auto ${profile.phone_is_verified ? "opacity-50" : ""}`}
                                onClick={() => setIsVerificationOpen(true)}
                            >
                                {profile.phone_is_verified ? t('actions.numberVerified') : t('actions.verifyNumber')}
                            </Button>
                        </div>
                    </div>
                </div>
            </CollapsibleCard>

            <PhoneVerificationModal
                isOpen={isVerificationOpen}
                onClose={() => setIsVerificationOpen(false)}
                phoneNumber={profile.phone || ''}
                onSuccess={handleVerificationSuccess}
            />
        </>
    );
};

export default React.memo(ContactInfoForm);

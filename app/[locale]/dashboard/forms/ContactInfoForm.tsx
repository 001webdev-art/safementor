<<<<<<< HEAD
'use client';

import React from 'react';
import { Input, Chip } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';

/**
 * ContactInfoForm Component
 * Handles email (read-only) and phone number with verification chip.
 */
const ContactInfoForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    return (
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
        </CollapsibleCard>
    );
};

export default React.memo(ContactInfoForm);
=======
'use client';

import React from 'react';
import { Input, Chip } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';

/**
 * ContactInfoForm Component
 * Handles email (read-only) and phone number with verification chip.
 */
const ContactInfoForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    return (
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
        </CollapsibleCard>
    );
};

export default React.memo(ContactInfoForm);
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

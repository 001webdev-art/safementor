'use client';

import React from 'react';
import { Input, Textarea } from '@nextui-org/react';
import { Image as ImageIcon } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';

/**
 * SocialForm Component
 * Handles profile picture URL and bio.
 */
const SocialForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    return (
        <CollapsibleCard
            id="social"
            title={t('sections.social')}
            icon={<ImageIcon className="text-default-500" />}
            isCollapsed={isCollapsed}
            onToggle={onToggle}
        >
            <div className="grid grid-cols-1 gap-6">
                <Input
                    label={t('fields.profile_picture_url')}
                    placeholder="https://example.com/photo.jpg"
                    value={profile.profile_picture_url || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, profile_picture_url: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<ImageIcon size={18} className="text-default-400" />}
                    id="profile_picture_url"
                />
                <Textarea
                    label={t('fields.bio')}
                    placeholder={t('placeholders.bio')}
                    value={profile.bio || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, bio: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    minRows={3}
                    id="bio"
                />
            </div>
        </CollapsibleCard>
    );
};

export default React.memo(SocialForm);

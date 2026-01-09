'use client';

import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { Globe } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';
import { Theme } from '@/types/database';

/**
 * PreferencesForm Component
 * Handles theme, language, and date/time formatting preferences.
 */
const PreferencesForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    return (
        <CollapsibleCard
            id="preferences"
            title={t('sections.preferences')}
            icon={<Globe className="text-primary-300" />}
            isCollapsed={isCollapsed}
            onToggle={onToggle}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label={t('fields.theme')}
                    selectedKeys={profile.theme ? [profile.theme] : ['light']}
                    onSelectionChange={(keys) => onProfileChange({ ...profile, theme: Array.from(keys)[0] as Theme })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="theme"
                >
                    <SelectItem key="light" value="light">{t('options.themes.light')}</SelectItem>
                    <SelectItem key="dark" value="dark">{t('options.themes.dark')}</SelectItem>
                    <SelectItem key="system" value="system">{t('options.themes.system')}</SelectItem>
                </Select>
                <Input
                    label={t('fields.language')}
                    value={profile.language || 'en'}
                    onValueChange={(v) => onProfileChange({ ...profile, language: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="language"
                />
                <Input
                    label={t('fields.date_format')}
                    value={profile.date_format || 'MM/DD/YYYY'}
                    onValueChange={(v) => onProfileChange({ ...profile, date_format: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="date_format"
                />
                <Input
                    label={t('fields.time_format')}
                    value={profile.time_format || '12h'}
                    onValueChange={(v) => onProfileChange({ ...profile, time_format: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                    id="time_format"
                />
            </div>
        </CollapsibleCard>
    );
};

export default React.memo(PreferencesForm);

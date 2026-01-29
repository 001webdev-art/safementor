'use client';

import React from 'react';
import { Input, Select, SelectItem, Card, CardBody } from '@nextui-org/react';
import { Globe } from 'lucide-react';
import { FormProps } from '@/types/dashboard';
import { Theme } from '@/types/database';

/**
 * PreferencesForm Component
 * Handles theme, language, and date/time formatting preferences.
 */
const PreferencesForm = ({ profile, onProfileChange, t }: FormProps) => {
    return (
        <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
            <CardBody className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Globe className="text-default-400" size={18} />
                    <span className="font-bold">{t('sections.preferences')}</span>
                </div>
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
            </CardBody>
        </Card>
    );
};

export default React.memo(PreferencesForm);

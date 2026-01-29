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
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
                <Globe className="text-[#889A7F]" size={20} />
                <span className="font-bold text-gray-900">{t('sections.preferences')}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Select
                    label={t('fields.theme')}
                    selectedKeys={profile.theme ? [profile.theme] : ['light']}
                    onSelectionChange={(keys) => onProfileChange({ ...profile, theme: Array.from(keys)[0] as Theme })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="theme"
                    classNames={{
                        trigger: "border-gray-200 hover:border-[#889A7F] data-[focus=true]:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
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
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.date_format')}
                    value={profile.date_format || 'MM/DD/YYYY'}
                    onValueChange={(v) => onProfileChange({ ...profile, date_format: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="date_format"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.time_format')}
                    value={profile.time_format || '12h'}
                    onValueChange={(v) => onProfileChange({ ...profile, time_format: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                    id="time_format"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(PreferencesForm);

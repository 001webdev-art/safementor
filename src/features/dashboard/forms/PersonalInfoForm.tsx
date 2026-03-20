'use client';

import React from 'react';
import { Input, Select, SelectItem, Card, CardBody } from '@nextui-org/react';
import { UserCircle } from 'lucide-react';
import { FormProps } from '@/types/dashboard';
import { Gender } from '@/types/database';

/**
 * PersonalInfoForm Component
 * Handles firstname, lastname, nickname, gender, and relationship to children.
 */
const PersonalInfoForm = ({ profile, onProfileChange, t }: FormProps) => {
    return (
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
                <UserCircle className="text-[#889A7F]" size={20} />
                <span className="font-bold text-gray-900">{t('sections.personalInfo')}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label={t('fields.firstname')}
                    placeholder={t('placeholders.firstname')}
                    value={profile.firstname || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, firstname: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    maxLength={150}
                    isRequired
                    id="firstname"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.lastname')}
                    placeholder={t('placeholders.lastname')}
                    value={profile.lastname || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, lastname: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    maxLength={100}
                    id="lastname"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Input
                    label={t('fields.nickname')}
                    placeholder={t('placeholders.nickname')}
                    value={profile.nickname || ''}
                    onValueChange={(v) => onProfileChange({ ...profile, nickname: v })}
                    variant="bordered"
                    labelPlacement="outside"
                    maxLength={25}
                    id="nickname"
                    classNames={{
                        inputWrapper: "border-gray-200 hover:border-[#889A7F] focus-within:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                />
                <Select
                    label={t('fields.gender')}
                    placeholder={t('fields.gender')}
                    selectedKeys={profile.gender ? [profile.gender] : []}
                    onSelectionChange={(keys) => onProfileChange({ ...profile, gender: Array.from(keys)[0] as Gender })}
                    variant="bordered"
                    labelPlacement="outside"
                    id="gender"
                    classNames={{
                        trigger: "border-gray-200 hover:border-[#889A7F] data-[focus=true]:border-[#889A7F] transition-colors rounded-xl bg-white",
                        label: "text-gray-600 font-medium"
                    }}
                >
                    <SelectItem key="male" value="male">{t('options.genders.male')}</SelectItem>
                    <SelectItem key="female" value="female">{t('options.genders.female')}</SelectItem>
                    <SelectItem key="diverse" value="diverse">{t('options.genders.diverse')}</SelectItem>
                    <SelectItem key="prefer_not_to_say" value="prefer_not_to_say">{t('options.genders.prefer_not_to_say')}</SelectItem>
                </Select>
            </div>
        </div>
    );
};

export default React.memo(PersonalInfoForm);

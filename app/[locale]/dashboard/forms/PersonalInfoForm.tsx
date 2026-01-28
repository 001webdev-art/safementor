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
        <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
            <CardBody className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <UserCircle className="text-default-400" size={18} />
                    <span className="font-bold">{t('sections.personalInfo')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    />
                    <Select
                        label={t('fields.gender')}
                        placeholder={t('fields.gender')}
                        selectedKeys={profile.gender ? [profile.gender] : []}
                        onSelectionChange={(keys) => onProfileChange({ ...profile, gender: Array.from(keys)[0] as Gender })}
                        variant="bordered"
                        labelPlacement="outside"
                        id="gender"
                    >
                        <SelectItem key="male" value="male">{t('options.genders.male')}</SelectItem>
                        <SelectItem key="female" value="female">{t('options.genders.female')}</SelectItem>
                        <SelectItem key="diverse" value="diverse">{t('options.genders.diverse')}</SelectItem>
                        <SelectItem key="prefer_not_to_say" value="prefer_not_to_say">{t('options.genders.prefer_not_to_say')}</SelectItem>
                    </Select>

                </div>
            </CardBody>
        </Card>
    );
};

export default React.memo(PersonalInfoForm);

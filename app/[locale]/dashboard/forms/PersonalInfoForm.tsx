<<<<<<< HEAD
'use client';

import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { UserCircle } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';
import { Gender, RelativeToChildren } from '@/types/database';

/**
 * PersonalInfoForm Component
 * Handles firstname, lastname, nickname, gender, and relationship to children.
 */
const PersonalInfoForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    return (
        <CollapsibleCard
            id="personalInfo"
            title={t('sections.personalInfo')}
            icon={<UserCircle className="text-primary" />}
            isCollapsed={isCollapsed}
            onToggle={onToggle}
        >
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
                <Select
                    label={t('fields.relative_to_children')}
                    placeholder={t('fields.relative_to_children')}
                    selectedKeys={profile.relative_to_children ? [profile.relative_to_children] : ['Mother']}
                    onSelectionChange={(keys) => onProfileChange({ ...profile, relative_to_children: Array.from(keys)[0] as RelativeToChildren })}
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                    id="relative_to_children"
                >
                    {['Mother', 'Father', 'Uncle', 'Aunt', 'Grandfather', 'Grandmother', 'Other'].map(r => (
                        <SelectItem key={r} value={r}>{t(`options.relations.${r}`)}</SelectItem>
                    ))}
                </Select>
            </div>
        </CollapsibleCard>
    );
};

export default React.memo(PersonalInfoForm);
=======
'use client';

import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { UserCircle } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';
import { Gender, RelativeToChildren } from '@/types/database';

/**
 * PersonalInfoForm Component
 * Handles firstname, lastname, nickname, gender, and relationship to children.
 */
const PersonalInfoForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    return (
        <CollapsibleCard
            id="personalInfo"
            title={t('sections.personalInfo')}
            icon={<UserCircle className="text-primary" />}
            isCollapsed={isCollapsed}
            onToggle={onToggle}
        >
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
                <Select
                    label={t('fields.relative_to_children')}
                    placeholder={t('fields.relative_to_children')}
                    selectedKeys={profile.relative_to_children ? [profile.relative_to_children] : ['Mother']}
                    onSelectionChange={(keys) => onProfileChange({ ...profile, relative_to_children: Array.from(keys)[0] as RelativeToChildren })}
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                    id="relative_to_children"
                >
                    {['Mother', 'Father', 'Uncle', 'Aunt', 'Grandfather', 'Grandmother', 'Other'].map(r => (
                        <SelectItem key={r} value={r}>{t(`options.relations.${r}`)}</SelectItem>
                    ))}
                </Select>
            </div>
        </CollapsibleCard>
    );
};

export default React.memo(PersonalInfoForm);
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

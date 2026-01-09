<<<<<<< HEAD
'use client';

import React from 'react';
import { Input, Select, SelectItem, Switch, Card, CardBody } from '@nextui-org/react';
import { User, Mail, Activity } from 'lucide-react';
import { ChildFormProps } from '@/types/dashboard';

/**
 * ChildForm Component
 * Comprehensive form for child data based on children.sql schema.
 */
const ChildForm = ({ child, onChildChange, t }: ChildFormProps) => {
    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <User size={18} className="text-primary" />
                        <span className="font-bold">{t('sections.basicInfo')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label={t('fields.childrenname')}
                            placeholder={t('placeholders.childrenname')}
                            value={child.childrenname || ''}
                            onValueChange={(v) => onChildChange({ ...child, childrenname: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            isRequired
                        />
                        <Input
                            label={t('fields.nickname')}
                            placeholder={t('placeholders.nickname')}
                            value={child.nickname || ''}
                            onValueChange={(v) => onChildChange({ ...child, nickname: v })}
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Input
                            label={t('fields.age')}
                            type="number"
                            value={child.age?.toString() || ''}
                            onValueChange={(v) => onChildChange({ ...child, age: parseInt(v) || 0 })}
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Select
                            label={t('fields.gender')}
                            selectedKeys={child.gender ? [child.gender] : ['Male']}
                            onSelectionChange={(keys) => onChildChange({ ...child, gender: Array.from(keys)[0] as string })}
                            variant="bordered"
                            labelPlacement="outside"
                        >
                            <SelectItem key="Male">{t('options.genders.male')}</SelectItem>
                            <SelectItem key="Female">{t('options.genders.female')}</SelectItem>
                            <SelectItem key="Diverse">{t('options.genders.diverse')}</SelectItem>
                            <SelectItem key="Prefer Not to Say">{t('options.genders.prefer_not_to_say')}</SelectItem>
                        </Select>
                    </div>
                </CardBody>
            </Card>

            {/* Contact Information */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Mail size={18} className="text-success" />
                        <span className="font-bold">{t('sections.contactInfo')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label={t('fields.email')}
                            type="email"
                            placeholder={t('placeholders.email')}
                            value={child.email || ''}
                            onValueChange={(v) => onChildChange({ ...child, email: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            isRequired
                        />
                        <Input
                            label={t('fields.phone')}
                            placeholder={t('placeholders.phone')}
                            value={child.phone || ''}
                            onValueChange={(v) => onChildChange({ ...child, phone: v })}
                            variant="bordered"
                            labelPlacement="outside"
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Medical Information */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity size={18} className="text-danger" />
                        <span className="font-bold">{t('sections.medicalInfo')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <Switch
                            isSelected={child.medical_has_allergies}
                            onValueChange={(v) => onChildChange({ ...child, medical_has_allergies: v })}
                        >
                            {t('fields.medical_has_allergies')}
                        </Switch>
                        <Switch
                            isSelected={child.medical_has_mental_disorders}
                            onValueChange={(v) => onChildChange({ ...child, medical_has_mental_disorders: v })}
                        >
                            {t('fields.medical_has_mental_disorders')}
                        </Switch>
                        <Switch
                            isSelected={child.medical_has_physical_disorders}
                            onValueChange={(v) => onChildChange({ ...child, medical_has_physical_disorders: v })}
                        >
                            {t('fields.medical_has_physical_disorders')}
                        </Switch>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default React.memo(ChildForm);
=======
'use client';

import React from 'react';
import { Input, Select, SelectItem, Switch, Card, CardBody } from '@nextui-org/react';
import { User, Mail, Activity } from 'lucide-react';
import { ChildFormProps } from '@/types/dashboard';

/**
 * ChildForm Component
 * Comprehensive form for child data based on children.sql schema.
 */
const ChildForm = ({ child, onChildChange, t }: ChildFormProps) => {
    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <User size={18} className="text-primary" />
                        <span className="font-bold">{t('sections.basicInfo')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label={t('fields.childrenname')}
                            placeholder={t('placeholders.childrenname')}
                            value={child.childrenname || ''}
                            onValueChange={(v) => onChildChange({ ...child, childrenname: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            isRequired
                        />
                        <Input
                            label={t('fields.nickname')}
                            placeholder={t('placeholders.nickname')}
                            value={child.nickname || ''}
                            onValueChange={(v) => onChildChange({ ...child, nickname: v })}
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Input
                            label={t('fields.age')}
                            type="number"
                            value={child.age?.toString() || ''}
                            onValueChange={(v) => onChildChange({ ...child, age: parseInt(v) || 0 })}
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Select
                            label={t('fields.gender')}
                            selectedKeys={child.gender ? [child.gender] : ['Male']}
                            onSelectionChange={(keys) => onChildChange({ ...child, gender: Array.from(keys)[0] as string })}
                            variant="bordered"
                            labelPlacement="outside"
                        >
                            <SelectItem key="Male">{t('options.genders.male')}</SelectItem>
                            <SelectItem key="Female">{t('options.genders.female')}</SelectItem>
                            <SelectItem key="Diverse">{t('options.genders.diverse')}</SelectItem>
                            <SelectItem key="Prefer Not to Say">{t('options.genders.prefer_not_to_say')}</SelectItem>
                        </Select>
                    </div>
                </CardBody>
            </Card>

            {/* Contact Information */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Mail size={18} className="text-success" />
                        <span className="font-bold">{t('sections.contactInfo')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label={t('fields.email')}
                            type="email"
                            placeholder={t('placeholders.email')}
                            value={child.email || ''}
                            onValueChange={(v) => onChildChange({ ...child, email: v })}
                            variant="bordered"
                            labelPlacement="outside"
                            isRequired
                        />
                        <Input
                            label={t('fields.phone')}
                            placeholder={t('placeholders.phone')}
                            value={child.phone || ''}
                            onValueChange={(v) => onChildChange({ ...child, phone: v })}
                            variant="bordered"
                            labelPlacement="outside"
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Medical Information */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity size={18} className="text-danger" />
                        <span className="font-bold">{t('sections.medicalInfo')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <Switch
                            isSelected={child.medical_has_allergies}
                            onValueChange={(v) => onChildChange({ ...child, medical_has_allergies: v })}
                        >
                            {t('fields.medical_has_allergies')}
                        </Switch>
                        <Switch
                            isSelected={child.medical_has_mental_disorders}
                            onValueChange={(v) => onChildChange({ ...child, medical_has_mental_disorders: v })}
                        >
                            {t('fields.medical_has_mental_disorders')}
                        </Switch>
                        <Switch
                            isSelected={child.medical_has_physical_disorders}
                            onValueChange={(v) => onChildChange({ ...child, medical_has_physical_disorders: v })}
                        >
                            {t('fields.medical_has_physical_disorders')}
                        </Switch>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default React.memo(ChildForm);
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

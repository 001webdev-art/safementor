'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Select, SelectItem, Input } from '@nextui-org/react';
import { User, Trash2, Pause, Save, Clock } from 'lucide-react';
import { Child } from '@/types/dashboard2';
import { useTranslations } from 'next-intl';

interface ChildrenDataProps {
    children?: Child[];
    onUpsertChild?: (child: Partial<Child>) => Promise<void>;
    onDeleteChild?: (id: string) => Promise<void>;
}

export function ChildrenData({
    children: externalChildren,
    onUpsertChild,
    onDeleteChild
}: ChildrenDataProps) {
    const t = useTranslations('Dashboard.children_new');
    // Initializing with an empty array as per user request to start fresh
    const [localChildren, setLocalChildren] = useState<Child[]>([]);
    const [drafts, setDrafts] = useState<Record<string, Partial<Child & { time_limit?: string }>>>({});
    const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});

    const currentChildren = [...(externalChildren || []), ...localChildren];

    const handleAddChild = () => {
        const id = `temp-${Date.now()}`;
        const newChild: Child = {
            id,
            nickname: t('newChild'),
            childrenname: t('newChild'),
            email: null,
            date_birth: '',
            language: 'en',
            device: t('newDevice'),
        };
        setLocalChildren([...localChildren, newChild]);
    };

    const handleDelete = async (id: string) => {
        if (id.toString().startsWith('temp-')) {
            setLocalChildren(localChildren.filter(c => c.id !== id));
            setDrafts(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            return;
        }
        if (onDeleteChild) {
            await onDeleteChild(id);
        }
    };

    const handleSaveChild = async (id: string, originalChild: Child) => {
        setIsSaving(prev => ({ ...prev, [id]: true }));
        try {
            if (onUpsertChild) {
                const draft = drafts[id] || {};
                const finalChild = { ...originalChild, ...draft };

                // Ensure childrenname is provided because it's NOT NULL in DB
                // If it's a new or updated child, we sync childrenname with nickname if needed
                const payload = {
                    ...finalChild,
                    id,
                    childrenname: finalChild.nickname || finalChild.childrenname || 'Unnamed'
                };

                await onUpsertChild(payload);

                // Clear draft and local child if it was a temp one
                setDrafts(prev => {
                    const next = { ...prev };
                    delete next[id];
                    return next;
                });
                if (id.toString().startsWith('temp-')) {
                    setLocalChildren(prev => prev.filter(c => c.id !== id));
                }
            } else {
                await new Promise(resolve => setTimeout(resolve, 800));
            }
        } catch (error) {
            console.error('Failed to save child:', error);
        } finally {
            setIsSaving(prev => ({ ...prev, [id]: false }));
        }
    };

    const updateChildField = (id: string, field: string, value: any) => {
        setDrafts(prev => ({
            ...prev,
            [id]: {
                ...(prev[id] || {}),
                [field]: value
            }
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-900">{t('management')}</h3>
                        <p className="text-sm text-gray-500">{t('managementSubtitle')}</p>
                    </div>
                    <Button
                        className="bg-[#889A7F] text-white hover:bg-[#748866]"
                        startContent={<User className="w-4 h-4" />}
                        onPress={handleAddChild}
                    >
                        {t('addChild')}
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className="space-y-4">
                        {currentChildren.length === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500 italic">{t('noChildren')}</p>
                            </div>
                        ) : (
                            currentChildren.map(child => {
                                const draft = drafts[child.id] || {};
                                const displayNickname = draft.nickname ?? child.nickname;
                                const displayDateBirth = draft.date_birth ?? child.date_birth;
                                const displayLanguage = draft.language ?? child.language;
                                const displayTimeLimit = draft.time_limit ?? '';

                                return (
                                    <div key={child.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#E8EDE6] text-[#4A5445] rounded-full flex items-center justify-center font-bold">
                                                    {(displayNickname || '??').substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{displayNickname || 'Unnamed'}</p>
                                                    <p className="text-xs text-gray-500">{child.device}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <Button
                                                    size="sm"
                                                    className="bg-[#889A7F] text-white hover:bg-[#748866]"
                                                    startContent={<Save className="w-3.5 h-3.5" />}
                                                    onPress={() => handleSaveChild(child.id, child)}
                                                    isLoading={isSaving[child.id]}
                                                >
                                                    {t('actions.save')}
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="bordered" 
                                                    className="border-gray-300"
                                                    startContent={<Pause className="w-3.5 h-3.5" />}
                                                >
                                                    {t('actions.pause')}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="bordered"
                                                    color="danger"
                                                    startContent={<Trash2 className="w-3.5 h-3.5" />}
                                                    onPress={() => handleDelete(child.id)}
                                                >
                                                    {t('actions.delete')}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                                            <p className="text-sm font-semibold text-gray-900 mb-2">{t('settings', { name: displayNickname || t('child') })}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <Input
                                                    label={t('fields.nickname')}
                                                    value={displayNickname || ''}
                                                    onValueChange={(v) => updateChildField(child.id, 'nickname', v)}
                                                    size="sm"
                                                    variant="bordered"
                                                    isRequired
                                                    classNames={{
                                                        inputWrapper: "border-gray-300 hover:border-[#889A7F] focus-within:border-[#889A7F]"
                                                    }}
                                                />
                                                <Input
                                                    label={t('fields.birthdate')}
                                                    value={displayDateBirth || ''}
                                                    placeholder="MM/YY"
                                                    type="text"
                                                    onValueChange={(v) => updateChildField(child.id, 'date_birth', v)}
                                                    size="sm"
                                                    variant="bordered"
                                                    classNames={{
                                                        inputWrapper: "border-gray-300 hover:border-[#889A7F] focus-within:border-[#889A7F]"
                                                    }}
                                                />
                                                <Select
                                                    label={t('fields.language')}
                                                    size="sm"
                                                    selectedKeys={[displayLanguage || 'en']}
                                                    onSelectionChange={(keys) => {
                                                        const val = Array.from(keys)[0] as string;
                                                        updateChildField(child.id, 'language', val);
                                                    }}
                                                    variant="bordered"
                                                    classNames={{
                                                        trigger: "border-gray-300 hover:border-[#889A7F] focus:border-[#889A7F]"
                                                    }}
                                                >
                                                    <SelectItem key="en" textValue={t('languages.en')}>{t('languages.en')}</SelectItem>
                                                    <SelectItem key="pt" textValue={t('languages.pt')}>{t('languages.pt')}</SelectItem>
                                                    <SelectItem key="de" textValue={t('languages.de')}>{t('languages.de')}</SelectItem>
                                                </Select>
                                                <Input
                                                    label={t('fields.timeLimit')}
                                                    value={displayTimeLimit || ''}
                                                    placeholder="e.g. 120"
                                                    onValueChange={(v) => updateChildField(child.id, 'time_limit', v)}
                                                    size="sm"
                                                    variant="bordered"
                                                    type="number"
                                                    startContent={<Clock className="w-4 h-4 text-gray-400" />}
                                                    classNames={{
                                                        inputWrapper: "border-gray-300 hover:border-[#889A7F] focus-within:border-[#889A7F]"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

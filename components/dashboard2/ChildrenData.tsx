'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Select, SelectItem, Input } from '@nextui-org/react';
import { User, Trash2, QrCode, Pause, Save } from 'lucide-react';
import { Child } from '@/types/dashboard2';

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
    // Initializing with an empty array as per user request to start fresh
    const [localChildren, setLocalChildren] = useState<Child[]>([]);
    const [drafts, setDrafts] = useState<Record<string, Partial<Child>>>({});
    const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});

    const currentChildren = [...(externalChildren || []), ...localChildren];

    const handleAddChild = () => {
        const id = `temp-${Date.now()}`;
        const newChild: Child = {
            id,
            nickname: 'New Child',
            childrenname: 'New Child',
            email: null,
            date_birth: '',
            language: 'en',
            device: 'New Device',
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

    const updateChildField = (id: string, field: keyof Child, value: any) => {
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Children Data</h1>
                <p className="text-gray-600">Manage your connected children and their safety preferences.</p>
            </div>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-900">Child Management</h3>
                        <p className="text-sm text-gray-500">Connect and manage child devices</p>
                    </div>
                    <Button
                        color="success"
                        startContent={<User className="w-4 h-4" />}
                        onPress={handleAddChild}
                    >
                        Add Child
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className="space-y-4">
                        {currentChildren.length === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500 italic">No children added yet. Click "Add Child" to begin.</p>
                            </div>
                        ) : (
                            currentChildren.map(child => {
                                const draft = drafts[child.id] || {};
                                const displayNickname = draft.nickname ?? child.nickname;
                                const displayDateBirth = draft.date_birth ?? child.date_birth;
                                const displayLanguage = draft.language ?? child.language;

                                return (
                                    <div key={child.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
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
                                                    color="success"
                                                    variant="solid"
                                                    className="text-white bg-green-600"
                                                    startContent={<Save className="w-3.5 h-3.5" />}
                                                    onPress={() => handleSaveChild(child.id, child)}
                                                    isLoading={isSaving[child.id]}
                                                >
                                                    Save
                                                </Button>
                                                <Button size="sm" variant="bordered" startContent={<QrCode className="w-3.5 h-3.5" />}>
                                                    QR Code
                                                </Button>
                                                <Button size="sm" variant="bordered" startContent={<Pause className="w-3.5 h-3.5" />}>
                                                    Pause
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="bordered"
                                                    color="danger"
                                                    startContent={<Trash2 className="w-3.5 h-3.5" />}
                                                    onPress={() => handleDelete(child.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                                            <p className="text-sm font-semibold text-gray-900 mb-2">{displayNickname || 'Child'}'s Settings</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <Input
                                                    label="Nickname"
                                                    value={displayNickname || ''}
                                                    onValueChange={(v) => updateChildField(child.id, 'nickname', v)}
                                                    size="sm"
                                                    variant="bordered"
                                                    isRequired
                                                />
                                                <Input
                                                    label="Birthdate (MM/YY)"
                                                    value={displayDateBirth || ''}
                                                    placeholder="e.g. 05/18"
                                                    onValueChange={(v) => updateChildField(child.id, 'date_birth', v)}
                                                    size="sm"
                                                    variant="bordered"
                                                />
                                                <Select
                                                    label="Language"
                                                    size="sm"
                                                    selectedKeys={[displayLanguage || 'en']}
                                                    onSelectionChange={(keys) => {
                                                        const val = Array.from(keys)[0] as string;
                                                        updateChildField(child.id, 'language', val);
                                                    }}
                                                    variant="bordered"
                                                >
                                                    <SelectItem key="en" textValue="English">English</SelectItem>
                                                    <SelectItem key="pt" textValue="Portuguese">Portuguese</SelectItem>
                                                    <SelectItem key="de" textValue="German">German</SelectItem>
                                                </Select>
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

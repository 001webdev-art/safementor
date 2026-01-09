<<<<<<< HEAD
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Select, SelectItem } from '@nextui-org/react';
import { Users, PlusCircle, Save, Trash2, ChevronDown } from 'lucide-react';
import ChildForm from '../forms/ChildForm';
import { ChildrenSectionProps, Child } from '@/types/dashboard';

/**
 * ChildrenSection Component
 * Implements the child management system: listing, selecting, and upserting.
 */
export default function ChildrenSection({
    children,
    selectedChildId,
    onSelectChild,
    isAddingChild,
    onSetAddingChild,
    onUpsertChild,
    onDeleteChild,
    isSaving,
    t
}: ChildrenSectionProps) {
    const [localChild, setLocalChild] = useState<Partial<Child>>({});
    const [isDeleting, setIsDeleting] = useState(false);

    // When selection changes, update local state for editing
    useEffect(() => {
        if (selectedChildId) {
            const found = children.find(c => c.id === selectedChildId);
            if (found) {
                setLocalChild(found);
                onSetAddingChild(false);
            }
        } else if (isAddingChild) {
            setLocalChild({
                childrenname: '',
                nickname: '',
                age: 0,
                gender: 'Male',
                email: '',
                phone: '',
                medical_has_allergies: false,
                medical_has_mental_disorders: false,
                medical_has_physical_disorders: false
            });
        } else {
            setLocalChild({});
        }
    }, [selectedChildId, isAddingChild, children, onSetAddingChild]);

    const handleSave = async () => {
        try {
            await onUpsertChild(localChild);
        } catch (err: any) {
            alert(err.message || "Failed to save child data. Please check all fields and try again.");
        }
    };

    const handleDelete = async () => {
        if (!selectedChildId) return;
        if (confirm(t('actions.confirmDelete') || 'Are you sure you want to delete this child?')) {
            setIsDeleting(true);
            try {
                await onDeleteChild(selectedChildId);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const hasChildren = children.length > 0;

    // We show the layout (form/selection) if there are children OR we are adding one.
    // The "Empty State" appears JUST when children table is empty and we are NOT adding.
    const showEmptyState = !hasChildren && !isAddingChild;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('sections.children')}</h2>
                {hasChildren && !isAddingChild && (
                    <Button
                        color="primary"
                        variant="flat"
                        startContent={<PlusCircle size={18} />}
                        onClick={() => {
                            onSelectChild(null);
                            onSetAddingChild(true);
                        }}
                    >
                        {t('content.addChild')}
                    </Button>
                )}
            </div>

            {showEmptyState ? (
                /* Empty State Placeholder */
                <Card className="p-12 items-center justify-center text-center border-dashed border-2 bg-transparent">
                    <CardBody className="flex flex-col items-center gap-4">
                        <Users size={48} className="text-default-300" />
                        <p className="text-default-500">{t('content.noChildren')}</p>
                        <Button
                            color="primary"
                            variant="flat"
                            className="mt-4"
                            onClick={() => {
                                onSelectChild(null);
                                onSetAddingChild(true);
                            }}
                        >
                            {t('content.addChild')}
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                /* Main Management Area (Selection + Form) */
                <div className="space-y-6 animate-in slide-in-from-bottom-4">
                    {/* Child Selector Dropdown */}
                    {hasChildren && !isAddingChild && (
                        <Select
                            label={t('fields.selectChild') || "Select Child"}
                            placeholder={t('placeholders.selectChild') || "Choose a child to edit"}
                            selectedKeys={selectedChildId ? [selectedChildId] : []}
                            onSelectionChange={(keys) => {
                                const val = Array.from(keys)[0] as string;
                                onSelectChild(val || null);
                            }}
                            variant="bordered"
                            className="max-w-xs"
                            selectorIcon={<ChevronDown size={18} />}
                        >
                            {children.map((child) => (
                                <SelectItem key={child.id} textValue={child.nickname || child.childrenname}>
                                    {child.nickname || child.childrenname}
                                </SelectItem>
                            ))}
                        </Select>
                    )}

                    {/* Show a heading if adding a child */}
                    {isAddingChild && (
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <PlusCircle size={20} />
                            <span>{t('content.addChild')}</span>
                        </div>
                    )}

                    {/* Form Area */}
                    {(isAddingChild || selectedChildId) && (
                        <div className="space-y-6">
                            <ChildForm
                                child={localChild}
                                onChildChange={setLocalChild}
                                t={t}
                            />

                            <div className="flex flex-wrap justify-between items-center gap-3 mt-8">
                                <div>
                                    {selectedChildId && !isAddingChild && (
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onClick={handleDelete}
                                            isLoading={isDeleting}
                                            startContent={!isDeleting && <Trash2 size={18} />}
                                        >
                                            {t('actions.deleteChild') || "Delete Child"}
                                        </Button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="light"
                                        onClick={() => {
                                            onSelectChild(null);
                                            onSetAddingChild(false);
                                        }}
                                    >
                                        {t('actions.cancel')}
                                    </Button>
                                    <Button
                                        color="primary"
                                        className="font-bold px-8"
                                        isLoading={isSaving}
                                        onClick={handleSave}
                                        startContent={!isSaving && <Save size={18} />}
                                    >
                                        {isSaving ? t('actions.loading') : t('actions.saveChild')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Informational message when children exist but none is selected and not adding */}
                    {hasChildren && !selectedChildId && !isAddingChild && (
                        <Card className="bg-default-50 border-none shadow-none">
                            <CardBody className="text-center py-10">
                                <p className="text-default-500">{t('placeholders.selectChildToEdit') || "Please select a child from the list above to view or edit their information."}</p>
                            </CardBody>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}
=======
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Select, SelectItem } from '@nextui-org/react';
import { Users, PlusCircle, Save, Trash2, ChevronDown } from 'lucide-react';
import ChildForm from '../forms/ChildForm';
import { ChildrenSectionProps, Child } from '@/types/dashboard';

/**
 * ChildrenSection Component
 * Implements the child management system: listing, selecting, and upserting.
 */
export default function ChildrenSection({
    children,
    selectedChildId,
    onSelectChild,
    isAddingChild,
    onSetAddingChild,
    onUpsertChild,
    onDeleteChild,
    isSaving,
    t
}: ChildrenSectionProps) {
    const [localChild, setLocalChild] = useState<Partial<Child>>({});
    const [isDeleting, setIsDeleting] = useState(false);

    // When selection changes, update local state for editing
    useEffect(() => {
        if (selectedChildId) {
            const found = children.find(c => c.id === selectedChildId);
            if (found) {
                setLocalChild(found);
                onSetAddingChild(false);
            }
        } else if (isAddingChild) {
            setLocalChild({
                childrenname: '',
                nickname: '',
                age: 0,
                gender: 'Male',
                email: '',
                phone: '',
                medical_has_allergies: false,
                medical_has_mental_disorders: false,
                medical_has_physical_disorders: false
            });
        } else {
            setLocalChild({});
        }
    }, [selectedChildId, isAddingChild, children, onSetAddingChild]);

    const handleSave = async () => {
        try {
            await onUpsertChild(localChild);
        } catch (err: any) {
            alert(err.message || "Failed to save child data. Please check all fields and try again.");
        }
    };

    const handleDelete = async () => {
        if (!selectedChildId) return;
        if (confirm(t('actions.confirmDelete') || 'Are you sure you want to delete this child?')) {
            setIsDeleting(true);
            try {
                await onDeleteChild(selectedChildId);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const hasChildren = children.length > 0;

    // We show the layout (form/selection) if there are children OR we are adding one.
    // The "Empty State" appears JUST when children table is empty and we are NOT adding.
    const showEmptyState = !hasChildren && !isAddingChild;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('sections.children')}</h2>
                {hasChildren && !isAddingChild && (
                    <Button
                        color="primary"
                        variant="flat"
                        startContent={<PlusCircle size={18} />}
                        onClick={() => {
                            onSelectChild(null);
                            onSetAddingChild(true);
                        }}
                    >
                        {t('content.addChild')}
                    </Button>
                )}
            </div>

            {showEmptyState ? (
                /* Empty State Placeholder */
                <Card className="p-12 items-center justify-center text-center border-dashed border-2 bg-transparent">
                    <CardBody className="flex flex-col items-center gap-4">
                        <Users size={48} className="text-default-300" />
                        <p className="text-default-500">{t('content.noChildren')}</p>
                        <Button
                            color="primary"
                            variant="flat"
                            className="mt-4"
                            onClick={() => {
                                onSelectChild(null);
                                onSetAddingChild(true);
                            }}
                        >
                            {t('content.addChild')}
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                /* Main Management Area (Selection + Form) */
                <div className="space-y-6 animate-in slide-in-from-bottom-4">
                    {/* Child Selector Dropdown */}
                    {hasChildren && !isAddingChild && (
                        <Select
                            label={t('fields.selectChild') || "Select Child"}
                            placeholder={t('placeholders.selectChild') || "Choose a child to edit"}
                            selectedKeys={selectedChildId ? [selectedChildId] : []}
                            onSelectionChange={(keys) => {
                                const val = Array.from(keys)[0] as string;
                                onSelectChild(val || null);
                            }}
                            variant="bordered"
                            className="max-w-xs"
                            selectorIcon={<ChevronDown size={18} />}
                        >
                            {children.map((child) => (
                                <SelectItem key={child.id} textValue={child.nickname || child.childrenname}>
                                    {child.nickname || child.childrenname}
                                </SelectItem>
                            ))}
                        </Select>
                    )}

                    {/* Show a heading if adding a child */}
                    {isAddingChild && (
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <PlusCircle size={20} />
                            <span>{t('content.addChild')}</span>
                        </div>
                    )}

                    {/* Form Area */}
                    {(isAddingChild || selectedChildId) && (
                        <div className="space-y-6">
                            <ChildForm
                                child={localChild}
                                onChildChange={setLocalChild}
                                t={t}
                            />

                            <div className="flex flex-wrap justify-between items-center gap-3 mt-8">
                                <div>
                                    {selectedChildId && !isAddingChild && (
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onClick={handleDelete}
                                            isLoading={isDeleting}
                                            startContent={!isDeleting && <Trash2 size={18} />}
                                        >
                                            {t('actions.deleteChild') || "Delete Child"}
                                        </Button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="light"
                                        onClick={() => {
                                            onSelectChild(null);
                                            onSetAddingChild(false);
                                        }}
                                    >
                                        {t('actions.cancel')}
                                    </Button>
                                    <Button
                                        color="primary"
                                        className="font-bold px-8"
                                        isLoading={isSaving}
                                        onClick={handleSave}
                                        startContent={!isSaving && <Save size={18} />}
                                    >
                                        {isSaving ? t('actions.loading') : t('actions.saveChild')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Informational message when children exist but none is selected and not adding */}
                    {hasChildren && !selectedChildId && !isAddingChild && (
                        <Card className="bg-default-50 border-none shadow-none">
                            <CardBody className="text-center py-10">
                                <p className="text-default-500">{t('placeholders.selectChildToEdit') || "Please select a child from the list above to view or edit their information."}</p>
                            </CardBody>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

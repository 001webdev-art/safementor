'use client';

import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { ChevronLeft, History, Trash2, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ChildSelector from '../components/ChildSelector';

interface HistoryHeaderProps {
    onDeleteAll: () => void;
    onResetDatabase: () => void;
}

export default function HistoryHeader({ onDeleteAll, onResetDatabase }: HistoryHeaderProps) {
    const router = useRouter();

    return (
        <header className="h-16 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-divider flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
            <div className="flex items-center gap-2">
                <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    onClick={() => router.back()}
                >
                    <ChevronLeft size={24} />
                </Button>
                <div className="flex items-center gap-2">
                    <History size={20} className="text-primary" />
                    <h1 className="text-xl font-bold hidden sm:block">Messages Stored</h1>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ChildSelector />

                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button isIconOnly variant="light" radius="full">
                            <MoreVertical size={20} className="text-default-500" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="History Options"
                        onAction={(key) => {
                            if (key === 'delete_all') {
                                onDeleteAll();
                            } else if (key === 'reset_db') {
                                onResetDatabase();
                            }
                        }}
                    >
                        <DropdownItem
                            key="reset_db"
                            className="text-warning"
                            color="warning"
                            startContent={<Trash2 size={18} />}
                        >
                            Reset Local Database
                        </DropdownItem>
                        <DropdownItem
                            key="delete_all"
                            className="text-danger"
                            color="danger"
                            startContent={<Trash2 size={18} />}
                        >
                            Erase all conversations
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    );
}

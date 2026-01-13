'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { ChevronLeft, History } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HistoryHeader() {
    const router = useRouter();

    return (
        <header className="h-16 bg-[#f0f2f5] dark:bg-[#202c33] border-b border-divider flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
            <div className="flex items-center gap-3">
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
                    <h1 className="text-xl font-bold">Messages Stored</h1>
                </div>
            </div>
        </header>
    );
}

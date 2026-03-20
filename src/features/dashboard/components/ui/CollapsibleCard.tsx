'use client';

import React from 'react';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { ChevronDown } from 'lucide-react';
import { CollapsibleCardProps } from '@/types/dashboard';

export default function CollapsibleCard({
    id,
    title,
    icon,
    isCollapsed,
    onToggle,
    children
}: CollapsibleCardProps) {
    return (
        <Card shadow="sm" className="p-4 border-none bg-white/70 backdrop-blur-md">
            <CardHeader
                className="flex gap-3 pb-2 cursor-pointer hover:bg-default-100/50 transition-colors rounded-xl"
                onClick={onToggle}
            >
                {icon}
                <p className="text-lg font-bold flex-1">{title}</p>
                <ChevronDown
                    className={`transition-transform duration-300 ${isCollapsed ? '-rotate-90' : ''}`}
                    size={20}
                />
            </CardHeader>
            {!isCollapsed && (
                <>
                    <Divider />
                    <CardBody className="pt-4 overflow-visible">
                        {children}
                    </CardBody>
                </>
            )}
        </Card>
    );
}

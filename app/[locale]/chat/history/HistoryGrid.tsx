'use client';

import React from 'react';
import { Card, CardBody, CardHeader, Chip, User } from '@nextui-org/react';
import { Clock, CheckCheck, AlertCircle } from 'lucide-react';
import { LocalMessage } from '../../services/pouchdb';

interface HistoryGridProps {
    messages: LocalMessage[];
}

export default function HistoryGrid({ messages }: HistoryGridProps) {
    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-default-500 gap-2">
                <p>No stored messages found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {messages.map((msg) => (
                <Card key={msg._id} className="shadow-sm border border-divider">
                    <CardHeader className="flex justify-between items-start gap-3 px-4 pt-4">
                        <User
                            name={msg.nickname || 'Unknown'}
                            description={`${msg.date} ${msg.time}`}
                            avatarProps={{
                                size: "sm",
                                src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.nickname || 'unknown'}`
                            }}
                        />
                        <SyncStatusIcon status={msg.sync_status} />
                    </CardHeader>
                    <CardBody className="px-4 py-2">
                        <div className="flex gap-2 items-start mb-2">
                            <Chip
                                size="sm"
                                color={msg.message_type === 'user' ? 'primary' : 'success'}
                                variant="flat"
                                className="capitalize"
                            >
                                {msg.message_type}
                            </Chip>
                        </div>
                        <p className="text-sm line-clamp-4 text-default-700">
                            {msg.content}
                        </p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

function SyncStatusIcon({ status }: { status: LocalMessage['sync_status'] }) {
    switch (status) {
        case 'synced':
            return <CheckCheck size={16} className="text-success" />;
        case 'failed':
            return <AlertCircle size={16} className="text-danger" />;
        default:
            return <Clock size={16} className="text-warning" />;
    }
}

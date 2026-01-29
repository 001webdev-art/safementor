'use client';

import React from 'react';
import { Switch, Card, CardBody } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import { FormProps } from '@/types/dashboard';

/**
 * CommunicationForm Component
 * Dynamically renders switches for communication preferences stored in JSONB.
 */
const CommunicationForm = ({ profile, onProfileChange, t }: FormProps) => {
    // Ensure communication_preferences exists to avoid render errors
    // Using any as fallback to satisfy the dynamic Object.entries approach
    const preferences = Object.fromEntries(
        Object.entries((profile.communication_preferences || {}) as Record<string, any>)
            .filter(([key]) => !['security_alerts_via_push', 'marketing_emails', 'product_updates'].includes(key))
    );

    return (
        <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
            <CardBody className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-default-400" size={18} />
                    <span className="font-bold">{t('sections.communication_preferences')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(preferences).map(([key, val]) => (
                        <div key={key} className="flex flex-col gap-2 p-3 rounded-lg border border-divider hover:bg-default-50 transition-colors">
                            <Switch
                                size="sm"
                                isSelected={val as boolean}
                                onValueChange={(v) => onProfileChange({
                                    ...profile,
                                    communication_preferences: {
                                        ...preferences,
                                        [key]: v
                                    } as any
                                })}
                                id={`comm_${key}`}
                            >
                                <span className="text-sm font-medium">
                                    {key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                </span>
                            </Switch>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export default React.memo(CommunicationForm);

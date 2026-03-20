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
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
                <Mail className="text-[#889A7F]" size={20} />
                <span className="font-bold text-gray-900">{t('sections.communication_preferences')}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(preferences).map(([key, val]) => (
                    <div key={key} className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#889A7F] transition-all hover:shadow-sm">
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
                            classNames={{
                                wrapper: "group-data-[selected=true]:bg-[#889A7F]"
                            }}
                        >
                            <span className="text-gray-700 font-medium">
                                {key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </span>
                        </Switch>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(CommunicationForm);

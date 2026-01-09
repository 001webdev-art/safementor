'use client';

import React from 'react';
import { Switch } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import { FormProps } from '@/types/dashboard';

/**
 * CommunicationForm Component
 * Dynamically renders switches for communication preferences stored in JSONB.
 */
const CommunicationForm = ({ profile, onProfileChange, isCollapsed, onToggle, t }: FormProps) => {
    // Ensure communication_preferences exists to avoid render errors
    // Using any as fallback to satisfy the dynamic Object.entries approach
    const preferences = (profile.communication_preferences || {}) as Record<string, any>;

    return (
        <CollapsibleCard
            id="communication"
            title={t('sections.communication_preferences')}
            icon={<Mail className="text-primary-400" />}
            isCollapsed={isCollapsed}
            onToggle={onToggle}
        >
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
        </CollapsibleCard>
    );
};

export default React.memo(CommunicationForm);

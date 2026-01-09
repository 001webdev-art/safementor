<<<<<<< HEAD
'use client';

import React from 'react';
import { Card, Button } from '@nextui-org/react';
import { HelpCircle } from 'lucide-react';
import { SectionProps } from '@/types/dashboard';

/**
 * HelpSection Component
 * Shows help description and support options.
 */
export default function HelpSection({ t }: SectionProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold">{t('sections.help')}</h2>
            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <HelpCircle className="text-primary" size={24} />
                    <p className="text-default-600">{t('content.helpDescription')}</p>
                </div>
                <Button color="primary" variant="flat" className="mt-6 font-semibold">
                    {t('content.supportTicket')}
                </Button>
            </Card>
        </div>
    );
}
=======
'use client';

import React from 'react';
import { Card, Button } from '@nextui-org/react';
import { HelpCircle } from 'lucide-react';
import { SectionProps } from '@/types/dashboard';

/**
 * HelpSection Component
 * Shows help description and support options.
 */
export default function HelpSection({ t }: SectionProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold">{t('sections.help')}</h2>
            <Card className="p-6">
                <div className="flex items-center gap-4">
                    <HelpCircle className="text-primary" size={24} />
                    <p className="text-default-600">{t('content.helpDescription')}</p>
                </div>
                <Button color="primary" variant="flat" className="mt-6 font-semibold">
                    {t('content.supportTicket')}
                </Button>
            </Card>
        </div>
    );
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button, Card, CardBody } from '@nextui-org/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function VerifiedPage() {
    const t = useTranslations('VerifiedPage');
    const locale = useLocale();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <Card className="max-w-[450px] w-full p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in duration-500">
                <CardBody className="flex flex-col items-center text-center gap-6 py-8">
                    <div className="p-4 bg-[#889A7F]/10 rounded-full">
                        <CheckCircle2 size={64} className="text-[#889A7F]" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                            {t('title')}
                        </h1>
                        <p className="text-gray-600 max-w-sm mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    <Button
                        as={Link}
                        href={`/${locale}/login`}
                        size="lg"
                        className="bg-[#889A7F] hover:bg-[#748866] text-white font-semibold px-8 mt-4 rounded-xl transition-colors"
                        endContent={<ArrowRight size={20} />}
                        fullWidth
                    >
                        {t('goLogin')}
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

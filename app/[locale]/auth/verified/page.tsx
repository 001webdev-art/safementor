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
            <Card className="max-w-[450px] w-full p-6 shadow-xl border-none animate-in fade-in zoom-in duration-500">
                <CardBody className="flex flex-col items-center text-center gap-6 py-8">
                    <div className="p-4 bg-success-50 rounded-full">
                        <CheckCircle2 size={64} className="text-success" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-black text-gray-900 leading-tight">
                            {t('title')}
                        </h1>
                        <p className="text-default-500 max-w-sm mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    <Button
                        as={Link}
                        href={`/${locale}/login`}
                        color="primary"
                        size="lg"
                        variant="shadow"
                        className="font-bold px-8 mt-4"
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

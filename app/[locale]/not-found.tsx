'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    const t = useTranslations('NotFound');
    const locale = useLocale();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <Card className="max-w-[500px] w-full p-8 shadow-xl border-none">
                <CardBody className="flex flex-col items-center text-center gap-6">
                    <div className="p-4 bg-danger-50 rounded-full">
                        <AlertCircle size={64} className="text-danger" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-gray-900">404</h1>
                        <h2 className="text-2xl font-bold text-gray-800">{t('title')}</h2>
                        <p className="text-default-500 max-w-sm mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    <Button
                        as={Link}
                        href={`/${locale}/`}
                        color="primary"
                        size="lg"
                        variant="shadow"
                        className="font-bold px-8 mt-4"
                        startContent={<Home size={20} />}
                    >
                        {t('goHome')}
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

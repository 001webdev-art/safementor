import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import HistoryClient from './HistoryClient';

export default async function HistoryPage({ params: { locale } }: { params: { locale: string } }) {
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <HistoryClient />
        </NextIntlClientProvider>
    );
}

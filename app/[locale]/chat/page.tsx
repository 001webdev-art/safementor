import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import ChatClient from './ChatClient';

export default async function ChatPage({ params: { locale } }: { params: { locale: string } }) {
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ChatClient />
        </NextIntlClientProvider>
    );
}

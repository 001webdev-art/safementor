import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import './globals.css'

// Importe a configuração
import { locales } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'SafeMentor Project',
  description: 'Modern project with almost all the modern features possible',
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport = {
  themeColor: '#006FEE',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// Gera os parâmetros estáticos
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

import { Providers } from '@/components/layout/Providers'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Valida o locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Carrega as mensagens
  let messages
  try {
    messages = await getMessages({ locale })
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`)
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <Script
          id="pwa-prompt-handler"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.deferredPWAPrompt = null;
              window.addEventListener('beforeinstallprompt', (e) => {
                console.log('Global beforeinstallprompt captured');
                e.preventDefault();
                window.deferredPWAPrompt = e;
                // Dispatch a custom event to notify any mounted hooks
                window.dispatchEvent(new CustomEvent('pwa-prompt-available', { detail: e }));
              });
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
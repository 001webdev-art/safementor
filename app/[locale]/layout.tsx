import type { Metadata } from 'next'
import { Inter, Libre_Baskerville, Source_Sans_3 } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif-main',
  style: ['normal', 'italic']
})
const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans-main'
})

// Importe a configuração
import { locales } from '@/i18n/config'

export const metadata: Metadata = {
  title: 'Safementor Project',
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

import { Providers } from '@/components/Providers'

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
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${libreBaskerville.variable} ${sourceSans3.variable}`}>
      <body className={sourceSans3.className}>
        <script
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
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
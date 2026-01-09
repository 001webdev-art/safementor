<<<<<<< HEAD
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

// Importe a configuração
import { locales } from '@/i18n/config'

export const metadata: Metadata = {
  title: 'Safementor Project',
  description: 'Modern project with almost all the modern features possible',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Safementor',
  },
  formatDetection: {
    telephone: false,
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
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
=======
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

// Importe a configuração
import { locales } from '@/i18n/config'

export const metadata: Metadata = {
  title: 'Safementor Project',
  description: 'Modern project with almost all the modern features possible',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Safementor',
  },
  formatDetection: {
    telephone: false,
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
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
}
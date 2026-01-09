<<<<<<< HEAD
import Header from '@/components/Header'
import { Hero } from '@/components/landing/Hero'
import { Trusted } from '@/components/landing/Trusted'
import { Features1 } from '@/components/landing/Features'
import { Plans } from '@/components/landing/plans'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/i18n/config'
import { Footer } from '@/components/landing/Footer'

// Gera metadados
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'HomePage' })

  return {
    title: t('title'),
  }
}

// Gera páginas estáticas para cada locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="flex flex-col gap-10 pb-20">
        <Hero />
        <Trusted />
        <Features1 />
        <Plans />
        <Footer />
      </main>
    </div>
  )
}
=======
import Header from '@/components/Header'
import { Hero } from '@/components/landing/Hero'
import { Trusted } from '@/components/landing/Trusted'
import { Features1 } from '@/components/landing/Features'
import { Plans } from '@/components/landing/plans'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/i18n/config'
import { Footer } from '@/components/landing/Footer'

// Gera metadados
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'HomePage' })

  return {
    title: t('title'),
  }
}

// Gera páginas estáticas para cada locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="flex flex-col gap-10 pb-20">
        <Hero />
        <Trusted />
        <Features1 />
        <Plans />
        <Footer />
      </main>
    </div>
  )
}
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

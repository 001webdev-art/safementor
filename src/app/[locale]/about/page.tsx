import { getTranslations } from 'next-intl/server'
import { locales } from '@/lib/i18n/config'
import AboutPage from '@/features/landing/components/AboutPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function Page() {
  return <AboutPage />
}

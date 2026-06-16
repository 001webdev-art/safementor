import { getTranslations } from 'next-intl/server'
import { locales } from '@/lib/i18n/config'
import HowItWorksPage from '@/features/landing/components/HowItWorksPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'HowItWorks' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function Page() {
  return <HowItWorksPage />
}

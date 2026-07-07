import { getTranslations } from 'next-intl/server'
import { locales } from '@/lib/i18n/config'
import PilotProgramPage from '@/features/landing/components/PilotProgramPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'PilotProgram' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function Page() {
  return <PilotProgramPage />
}

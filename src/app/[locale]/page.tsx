import { Navigation } from '@/features/landing/components/Navigation'
import { SafeMentorHero } from '@/features/landing/components/SafeMentorHero'
import { TrustBadges } from '@/features/landing/components/TrustBadges'
import { ValuesSection } from '@/features/landing/components/ValuesSection'
import { ApproachSection } from '@/features/landing/components/ApproachSection'
import { TestimonialSection } from '@/features/landing/components/TestimonialSection'
import { CTASection } from '@/features/landing/components/CTASection'
import { SafeMentorFooter } from '@/features/landing/components/SafeMentorFooter'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/lib/i18n/config'

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
  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]">
      <Navigation />

      <main className="flex flex-col">
        <SafeMentorHero />
        <TrustBadges />
        <ValuesSection />
        <ApproachSection />
        <TestimonialSection />
        <CTASection />
      </main>

      <SafeMentorFooter />
    </div>
  )
}

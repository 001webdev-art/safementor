import { Navigation } from '@/components/landing/Navigation'
import { SafeMentorHero } from '@/components/landing/SafeMentorHero'
import { TrustBadges } from '@/components/landing/TrustBadges'
import { ValuesSection } from '@/components/landing/ValuesSection'
import { ApproachSection } from '@/components/landing/ApproachSection'
import { FamiliesSection } from '@/components/landing/FamiliesSection'
import { TestimonialSection } from '@/components/landing/TestimonialSection'
import { CTASection } from '@/components/landing/CTASection'
import { SafeMentorFooter } from '@/components/landing/SafeMentorFooter'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/i18n/config'

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
        <FamiliesSection />
        <TestimonialSection />
        <CTASection />
      </main>

      <SafeMentorFooter />
    </div>
  )
}

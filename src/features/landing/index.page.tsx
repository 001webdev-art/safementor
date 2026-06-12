'use client';

import { Navigation } from './components/Navigation'
import { SafeMentorHero } from './components/SafeMentorHero'
import { TrustBadges } from './components/TrustBadges'
import { ValuesSection } from './components/ValuesSection'
import { ApproachSection } from './components/ApproachSection'
import { TestimonialSection } from './components/TestimonialSection'
import { CTASection } from './components/CTASection'
import { SafeMentorFooter } from './components/SafeMentorFooter'

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]" suppressHydrationWarning>
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

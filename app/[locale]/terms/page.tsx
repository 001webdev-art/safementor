import { Navigation } from '@/components/landing/Navigation'
import { SafeMentorFooter } from '@/components/landing/SafeMentorFooter'
import { useTranslations } from 'next-intl'

export default function TermsPage() {
  const t = useTranslations('Terms')
  const sectionKeys = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14']

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-[#4A4540]">{t('title')}</h1>
        <p className="text-lg font-medium opacity-60 mb-2">{t('subtitle')}</p>
        <p className="text-sm opacity-40 mb-12">{t('lastUpdated')}</p>
        
         <div className="prose prose-stone max-w-none text-[#4A4540] opacity-80 leading-relaxed">
            <p className="text-xl mb-12 italic border-l-4 border-[#4A4540]/20 pl-6">{t('preamble')}</p>
            
            {sectionKeys.map((key) => (
              <section key={key} className="mb-12">
                <h2 className="text-2xl font-bold mt-12 mb-6 border-b border-[#4A4540]/10 pb-2">{t(`sections.${key}.title`)}</h2>
                <div className="whitespace-pre-line space-y-4">
                  {t(`sections.${key}.content`)}
                </div>
              </section>
            ))}
        </div>
      </main>
      <SafeMentorFooter />
    </div>
  )
}

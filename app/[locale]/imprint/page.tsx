import { Navigation } from '@/components/landing/Navigation'
import { SafeMentorFooter } from '@/components/landing/SafeMentorFooter'
import { useTranslations } from 'next-intl'

export default function ImprintPage() {
  const t = useTranslations('Imprint')

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12 text-[#4A4540]">{t('title')}</h1>
        
        <div className="space-y-8 text-lg opacity-80 text-[#4A4540] leading-relaxed">
            <div>
                <p className="font-bold mb-2">{t('provider')}</p>
                <p>{t('names')}</p>
                <p>{t('address')}</p>
            </div>
            
            <div>
                <p>{t.rich('contactInfo', {br: () => <br/>})}</p>
            </div>
            
            <div>
                 <p>{t('disputeResolution')}</p>
            </div>

            <div>
                 <p>{t('copyright')}</p>
            </div>
            
             <div>
                 <p>{t('liability')}</p>
            </div>
        </div>
      </main>
      <SafeMentorFooter />
    </div>
  )
}

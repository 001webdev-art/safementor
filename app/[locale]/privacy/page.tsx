import { Navigation } from '@/components/landing/Navigation'
import { SafeMentorFooter } from '@/components/landing/SafeMentorFooter'
import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations('Privacy')

  // Explicitly list the sections that have structured items
  const structuredSections = ['2', '3', '4'];
  const allSections = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-[#4A4540]">{t('title')}</h1>
        <p className="opacity-60 mb-12">{t('lastUpdated')}</p>
        
        <div className="prose prose-stone max-w-none text-[#4A4540] opacity-90 leading-relaxed font-sans">
            <p className="text-lg mb-8 font-medium">{t('intro')}</p>
            
            <div className="space-y-12">
              {allSections.map((sectionId) => {
                const isStructured = structuredSections.includes(sectionId);
                
                return (
                  <section key={sectionId}>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">{t(`sections.${sectionId}.title`)}</h2>
                    {/* Render content or intro depending on structure */}
                    {isStructured ? (
                      <>
                        <p className="mb-4">{t(`sections.${sectionId}.intro`)}</p>
                        <ul className="list-none space-y-4 pl-0">
                           {/* We assume a fixed reasonable max number of items to try, or use keys method if available. 
                               Since we can't easily iterate keys in all next-intl versions without rich translation or messages object,
                               we'll hardcode the known item counts or try a range. 
                               For now, let's look at the structure: 
                               Sec 2: 4 items
                               Sec 3: 6 items
                               Sec 4: 3 items
                           */}
                           {[0, 1, 2, 3, 4, 5].map((idx) => {
                              // We try to render items until one is missing/empty string (if fallback behavior).
                              // Ideally we should have the messages object. 
                              // Let's rely on standard keys '0', '1' etc inside 'items' array
                              // UPDATE: in the JSON I used an array "items": [ {title, content}, ... ]. 
                              // next-intl array access is usually via keys like "0", "1"...
                              
                              // Safe way: access specific known indices based on the section.
                              const count = sectionId === '2' ? 4 : sectionId === '3' ? 6 : sectionId === '4' ? 3 : 0;
                              if (idx >= count) return null;

                              return (
                                <li key={idx} className="ml-4">
                                  <span className="font-bold block mb-1">• {t(`sections.${sectionId}.items.${idx}.title`)}</span>
                                  <span className="block opacity-90">{t(`sections.${sectionId}.items.${idx}.content`)}</span>
                                </li>
                              );
                           })}
                        </ul>
                      </>
                    ) : (
                      <p className="whitespace-pre-line">{t(`sections.${sectionId}.content`)}</p>
                    )}
                  </section>
                )
              })}
            </div>
        </div>
      </main>
      <SafeMentorFooter />
    </div>
  )
}

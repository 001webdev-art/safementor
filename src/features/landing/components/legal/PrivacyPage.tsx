import { Navigation } from '@/features/landing/components/Navigation'
import { SafeMentorFooter } from '@/features/landing/components/SafeMentorFooter'
import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations('Privacy')

  // List all sections and sub-sections
  const allSections = [
    '1', '2', '3', '3a', '3b', '4', '4a', '4b', '4c', '4d', '4e', '5', '6', '7', '8', '9', '10', '11', '12', '13'
  ];
  
  // Sections that have an "items" array
  const structuredSections = ['2', '9', '13'];

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-[#4A4540]">{t('title')}</h1>
        <p className="opacity-60 mb-12">{t('lastUpdated')}</p>
        
        <div className="prose prose-stone max-w-none text-[#4A4540] opacity-90 leading-relaxed font-sans">
            <p className="text-lg mb-8 font-medium whitespace-pre-line">{t('intro')}</p>
            
            <div className="space-y-12">
              {allSections.map((sectionId) => {
                const isStructured = structuredSections.includes(sectionId);
                
                return (
                  <section key={sectionId} id={`section-${sectionId}`}>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">{t(`sections.${sectionId}.title`)}</h2>
                    
                    {/* Render Intro if present */}
                    {t.has(`sections.${sectionId}.intro`) && (
                      <p className="mb-4 whitespace-pre-line">{t(`sections.${sectionId}.intro`)}</p>
                    )}

                    {/* Render Table if present (specifically for 4a and 6) */}
                    {(sectionId === '4a' || sectionId === '6') && t.raw(`sections.${sectionId}.table`) && t.has(`sections.${sectionId}.table`) && (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse border border-[#4A4540]/20 text-sm">
                          <thead>
                            <tr className="bg-[#4A4540]/5">
                              {t.raw(`sections.${sectionId}.table.headers`).map((header: string, i: number) => (
                                <th key={i} className="border border-[#4A4540]/20 p-2 text-left font-bold">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {t.raw(`sections.${sectionId}.table.rows`).map((row: string[], i: number) => (
                              <tr key={i}>
                                {row.map((cell: string, j: number) => (
                                  <td key={j} className="border border-[#4A4540]/20 p-2">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Render items (list) */}
                    {isStructured ? (
                      <ul className="list-none space-y-4 pl-0">
                         {t.raw(`sections.${sectionId}.items`).map((item: any, idx: number) => (
                            <li key={idx} className="ml-4">
                              <span className="font-bold block mb-1">• {item.title}</span>
                              <span className="block opacity-90 whitespace-pre-line">{item.content}</span>
                            </li>
                         ))}
                      </ul>
                    ) : (
                      /* Render main content if present */
                      t.has(`sections.${sectionId}.content`) && (
                        <p className="whitespace-pre-line">{t(`sections.${sectionId}.content`)}</p>
                      )
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

import { Navigation } from '@/features/landing/components/Navigation'
import { SafeMentorFooter } from '@/features/landing/components/SafeMentorFooter'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function SubprocessorsPage() {
  const t = useTranslations('Subprocessors')
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#4A4540]">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-[#4A4540]">{t('title')}</h1>
        <p className="text-lg mb-12 opacity-90 leading-relaxed font-sans">{t('intro')}</p>

        <div className="overflow-x-auto my-12">
          <table className="min-w-full border-collapse border border-[#4A4540]/20 text-sm font-sans">
            <thead>
              <tr className="bg-[#4A4540]/5">
                <th className="border border-[#4A4540]/20 p-3 text-left font-bold">{t('headers.category')}</th>
                <th className="border border-[#4A4540]/20 p-3 text-left font-bold">{t('headers.provider')}</th>
                <th className="border border-[#4A4540]/20 p-3 text-left font-bold">{t('headers.location')}</th>
                <th className="border border-[#4A4540]/20 p-3 text-left font-bold">{t('headers.purpose')}</th>
                <th className="border border-[#4A4540]/20 p-3 text-left font-bold">{t('headers.contact')}</th>
              </tr>
            </thead>
            <tbody>
              {t.raw('providers').map((provider: any, i: number) => (
                <tr key={i} className="hover:bg-[#4A4540]/2">
                  <td className="border border-[#4A4540]/20 p-3 font-medium">{provider.category}</td>
                  <td className="border border-[#4A4540]/20 p-3 font-bold">{provider.provider}</td>
                  <td className="border border-[#4A4540]/20 p-3">{provider.location}</td>
                  <td className="border border-[#4A4540]/20 p-3 opacity-90">{provider.purpose}</td>
                  <td className="border border-[#4A4540]/20 p-3 text-xs opacity-80 whitespace-pre-line leading-relaxed">
                    {provider.contact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16">
          <Link
            href={`/${locale}/privacy`}
            className="inline-flex items-center text-[#4A4540] hover:translate-x-[-4px] transition-transform duration-200"
          >
            <span className="mr-2">&lt;-</span>
            <span className="border-b border-[#4A4540]/40 pb-0.5">{t('back')}</span>
          </Link>
        </div>
      </main>
      <SafeMentorFooter />
    </div>
  )
}

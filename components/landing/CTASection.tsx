import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export const CTASection = () => {
    const t = useTranslations('SafeMentor.CTA');
    const locale = useLocale();

    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FDFBF8]">
            <div className="max-w-4xl mx-auto">
                <div className="rounded-3xl p-10 md:p-16 text-center animate-fade-in bg-[#F5F2EC]/50" id="cta-card">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#4A4540]" id="cta-title">
                        {t('title')}
                    </h2>
                    <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto text-[#4A4540]" id="cta-subtitle">
                        {t('subtitle')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={`/${locale}/register`}
                            className="px-8 py-4 rounded-full font-medium bg-[#7B8F71] text-[#FDFBF8] transition-all hover:opacity-90 shadow-lg shadow-[#7B8F71]/20"
                        >
                            {t('buttonPrimary')}
                        </Link>
                        <Link
                            href="#values"
                            className="px-8 py-4 rounded-full font-medium border-2 border-[#4A4540] text-[#4A4540] transition-all hover:bg-[#4A4540] hover:text-[#FDFBF8]"
                        >
                            {t('buttonSecondary')}
                        </Link>
                    </div>
                    <p className="text-sm opacity-60 mt-8 text-[#4A4540]">{t('disclaimer')}</p>
                </div>
            </div>
        </section>
    );
};

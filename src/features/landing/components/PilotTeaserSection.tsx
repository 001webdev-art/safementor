'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ConnectionIcon } from './SafeMentorIcons';

export const PilotTeaserSection = () => {
    const t = useTranslations('SafeMentor.PilotTeaser');
    const locale = useLocale();

    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FDFBF8]" id="pilot-teaser">
            <div className="max-w-4xl mx-auto">
                <div className="gentle-shadow rounded-3xl p-10 md:p-16 text-center animate-fade-in bg-[#F5F2EC]/50">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto bg-[#A8B5A0]/40 text-[#7B8F71]">
                        <ConnectionIcon />
                    </div>
                    <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-70 text-[#4A4540]">
                        {t('eyebrow')}
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#4A4540]">
                        {t('title')}
                    </h2>
                    <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed text-[#4A4540]">
                        {t('description')}
                    </p>
                    <Link
                        href={`/${locale}/pilotprogramm`}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium bg-[#7B8F71] text-[#FDFBF8] transition-all hover:opacity-90 shadow-lg shadow-[#7B8F71]/20"
                    >
                        {t('cta')} <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

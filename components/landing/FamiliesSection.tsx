'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const FamiliesSection = () => {
    const t = useTranslations('SafeMentor.Families');

    return (
        <section id="families" className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FDFBF8]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#4A4540]">{t('title')}</h2>
                    <p className="max-w-2xl mx-auto opacity-80 text-lg text-[#4A4540]">{t('description')}</p>
                </div>

                <div className="max-w-3xl mx-auto gentle-shadow rounded-3xl p-10 md:p-12 mb-16 bg-[#F5F2EC]/50">
                    <h3 className="font-serif text-2xl font-bold mb-6 text-center text-[#4A4540]">{t('receives.title')}</h3>
                    <ul className="space-y-4 opacity-80 leading-relaxed text-lg text-[#4A4540]">
                        {(t.raw('receives.list') as string[]).map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="opacity-60 flex-shrink-0 text-[#7B8F71]">•</span> <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-center opacity-80 text-xl font-medium mt-8 text-[#4A4540]">
                        {t.rich('receives.emphasis', { br: () => <br /> })}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto gentle-shadow rounded-3xl p-10 md:p-12 bg-[#F5F2EC]/50">
                    <h3 className="font-serif text-2xl font-bold mb-6 text-center text-[#4A4540]">{t('trust.title')}</h3>
                    <div className="space-y-4 opacity-80 leading-relaxed text-lg mb-6 text-[#4A4540]">
                        <p>{t('trust.description')}</p>
                        <ul className="space-y-3 pl-6">
                            {(t.raw('trust.list') as string[]).map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="opacity-60 text-[#7B8F71]">•</span> <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="opacity-80 text-lg leading-relaxed mb-4 text-[#4A4540]">{t('trust.final')}</p>
                    <p className="text-center opacity-80 text-xl font-medium text-[#4A4540]">
                        {t.rich('trust.emphasis', { br: () => <br /> })}
                    </p>
                </div>
            </div>
        </section>
    );
};

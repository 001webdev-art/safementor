'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CuriosityIcon, ConnectionIcon, TrustIcon } from './SafeMentorIcons';

const ValueCard = ({ icon, title, desc, delay = "" }: { icon: React.ReactNode, title: string, desc: string, delay?: string }) => (
    <div className={`card-hover gentle-shadow rounded-3xl p-8 animate-fade-in ${delay} bg-[#F5F2EC]/50`}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#A8B5A0]/40 text-[#7B8F71]">
            {icon}
        </div>
        <h3 className="font-serif text-lg font-bold mb-2 text-[#4A4540]">{title}</h3>
        <p className="opacity-70 leading-relaxed text-sm text-[#4A4540]">{desc}</p>
    </div>
);

const SubSection = ({ title, children, eyebrow, padding = "py-20" }: { title: string, children: React.ReactNode, eyebrow?: string, padding?: string }) => (
    <div className={`${padding}`}>
        <div className="text-center mb-12">
            {eyebrow && <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-70 text-[#4A4540]">{eyebrow}</p>}
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#4A4540]">{title}</h2>
        </div>
        <div className="max-w-3xl mx-auto gentle-shadow rounded-3xl p-10 md:p-12 bg-[#F5F2EC]/50">
            {children}
        </div>
    </div>
);

export const ValuesSection = () => {
    const t = useTranslations('SafeMentor.Values');

    return (
        <section id="values" className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#FDFBF8]">
            <div className="max-w-6xl mx-auto">
                {/* Intro */}
                <div className="text-center mb-16 animate-fade-in">
                    <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-70 text-[#4A4540]">{t('eyebrow')}</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#4A4540]">{t('title')}</h2>
                    <p className="max-w-3xl mx-auto opacity-80 text-lg leading-relaxed mb-4 text-[#4A4540]">{t('description')}</p>
                    <p className="max-w-2xl mx-auto opacity-80 text-xl font-medium leading-relaxed text-[#4A4540]">
                        {t.rich('emphasis', { br: () => <br /> })}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto gentle-shadow rounded-3xl p-10 md:p-12 mb-12 bg-[#F5F2EC]/30">
                    <p className="opacity-70 text-center leading-relaxed text-[#4A4540]">
                        {t.rich('citation', { strong: (chunks) => <strong>{chunks}</strong> })}
                    </p>
                </div>

                {/* Core Values Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <ValueCard
                        icon={<CuriosityIcon />}
                        title={t('card1.title')}
                        desc={t('card1.desc')}
                        delay="delay-1"
                    />
                    <ValueCard
                        icon={<ConnectionIcon />}
                        title={t('card2.title')}
                        desc={t('card2.desc')}
                        delay="delay-2"
                    />
                    <ValueCard
                        icon={<TrustIcon />}
                        title={t('card3.title')}
                        desc={t('card3.desc')}
                        delay="delay-3"
                    />
                </div>

                {/* Learning */}
                <SubSection title={t('learning.title')} eyebrow={t('learning.eyebrow')}>
                    <p className="opacity-80 text-lg leading-relaxed mb-6 text-[#4A4540]">{t('learning.description')}</p>
                    <div className="border-l-4 pl-6 mb-6 border-[#7B8F71]">
                        <p className="font-semibold mb-3 text-lg text-[#4A4540]">{t('learning.callout.title')}</p>
                        <p className="opacity-80 leading-relaxed mb-3 text-[#4A4540]">{t('learning.callout.desc1')}</p>
                        <p className="opacity-80 leading-relaxed text-[#4A4540]">{t('learning.callout.desc2')}</p>
                    </div>
                    <p className="opacity-80 text-lg leading-relaxed font-medium text-center text-[#4A4540]">{t('learning.emphasis')}</p>
                </SubSection>

                {/* Offline */}
                <SubSection title={t('offline.title')} padding="pb-20">
                    <p className="opacity-80 text-lg leading-relaxed mb-6 text-[#4A4540]">{t('offline.description')}</p>
                    <p className="opacity-80 text-xl leading-relaxed font-medium text-center text-[#4A4540]">{t('offline.emphasis')}</p>
                </SubSection>

                {/* Emotional */}
                <SubSection title={t('emotional.title')} padding="pb-20">
                    <p className="opacity-80 text-lg leading-relaxed mb-6 text-[#4A4540]">{t('emotional.description')}</p>
                    <div className="border-l-4 pl-6 mb-6 border-[#7B8F71]">
                        <p className="font-semibold mb-2 text-[#4A4540]">{t('emotional.callout.title')}</p>
                        <p className="opacity-80 leading-relaxed text-[#4A4540]">{t('emotional.callout.desc')}</p>
                    </div>
                    <p className="opacity-80 text-lg leading-relaxed text-[#4A4540]">{t('emotional.final')}</p>
                </SubSection>

                {/* Safety */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-70 text-[#4A4540]">{t('safety.eyebrow')}</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#4A4540]">{t('safety.title')}</h2>
                        <p className="max-w-2xl mx-auto opacity-80 text-lg text-[#4A4540]">{t('safety.description')}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="gentle-shadow rounded-3xl p-8 bg-[#F5F2EC]/50">
                            <h3 className="font-serif text-xl font-bold mb-4 text-[#4A4540]">{t('safety.detect.title')}</h3>
                            <ul className="space-y-2 opacity-80 leading-relaxed text-sm text-[#4A4540]">
                                {(t.raw('safety.detect.list') as string[]).map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="opacity-60">•</span> <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="gentle-shadow rounded-3xl p-8 bg-[#F5F2EC]/50">
                            <h3 className="font-serif text-xl font-bold mb-4 text-[#4A4540]">{t('safety.see.title')}</h3>
                            <ul className="space-y-2 opacity-80 leading-relaxed text-sm text-[#4A4540]">
                                {(t.raw('safety.see.list') as string[]).map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="opacity-60 text-[#7B8F71]">✓</span> <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="gentle-shadow rounded-3xl p-8 bg-[#F5F2EC]/50">
                            <h3 className="font-serif text-xl font-bold mb-4 text-[#4A4540]">{t('safety.notSee.title')}</h3>
                            <ul className="space-y-2 opacity-80 leading-relaxed text-sm text-[#4A4540]">
                                {(t.raw('safety.notSee.list') as string[]).map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="opacity-60 text-red-500">✗</span> <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="gentle-shadow rounded-3xl p-8 bg-[#F5F2EC]/50">
                            <h3 className="font-serif text-xl font-bold mb-4 text-[#4A4540]">{t('safety.protects.title')}</h3>
                            <p className="opacity-80 leading-relaxed text-[#4A4540]">{t('safety.protects.desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

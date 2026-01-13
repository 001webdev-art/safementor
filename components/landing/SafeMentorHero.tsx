'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const HeroIllustration = () => (
    <svg viewBox="0 0 300 300" className="w-full h-full max-w-md mx-auto">
        {/* Ground/nature element */}
        <ellipse cx="150" cy="260" rx="120" ry="20" fill="#A8B5A0" opacity="0.3" />
        {/* Tree in background */}
        <path d="M230 260V180" stroke="#8B7355" strokeWidth="8" strokeLinecap="round" />
        <circle cx="230" cy="160" r="35" fill="#7B8F71" opacity="0.6" />
        {/* Parent figure */}
        <ellipse cx="130" cy="250" rx="35" ry="8" fill="#D4C4B0" opacity="0.5" />
        <path d="M110 250C110 250 105 200 120 180C135 160 145 165 150 175C155 185 160 250 160 250" fill="#B8A082" />
        <circle cx="130" cy="155" r="22" fill="#E8DDD0" />
        <path d="M120 150C120 150 125 145 130 145C135 145 140 150 140 150" stroke="#7B6B5A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="125" cy="152" r="2" fill="#7B6B5A" />
        <circle cx="135" cy="152" r="2" fill="#7B6B5A" />
        {/* Child figure */}
        <path d="M155 250C155 250 152 215 160 200C168 185 175 188 178 195C181 202 185 250 185 250" fill="#C4B8A8" />
        <circle cx="168" cy="180" r="16" fill="#E8DDD0" />
        <path d="M162 177C162 177 165 175 168 175C171 175 174 177 174 177" stroke="#7B6B5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="164" cy="178" r="1.5" fill="#7B6B5A" />
        <circle cx="172" cy="178" r="1.5" fill="#7B6B5A" />
        {/* Book they're sharing */}
        <rect x="135" y="195" width="30" height="22" rx="2" fill="#E8DDD0" transform="rotate(-10 150 206)" />
        <line x1="150" y1="193" x2="150" y2="215" stroke="#D4C4B0" strokeWidth="1" />
        {/* Floating elements */}
        <circle cx="80" cy="120" r="4" fill="#A8B5A0" opacity="0.6" className="float-gentle" />
        <circle cx="220" cy="100" r="3" fill="#A8B5A0" opacity="0.5" className="float-gentle delay-1" />
        <circle cx="100" cy="80" r="2.5" fill="#A8B5A0" opacity="0.4" className="float-gentle delay-2" />
    </svg>
);

export const SafeMentorHero = () => {
    const t = useTranslations('SafeMentor.Hero');
    const locale = useLocale();

    return (
        <section id="hero-section" className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 relative overflow-hidden bg-[#FDFBF8]">
            {/* Decorative organic shapes */}
            <div className="absolute top-10 right-10 w-64 h-64 organic-blob bg-[#A8B5A0] opacity-20 -z-0"></div>
            <div className="absolute bottom-20 left-0 w-48 h-48 organic-blob-2 bg-[#7B8F71] opacity-15 -z-0"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in">
                        <p id="hero-eyebrow" className="text-sm font-medium tracking-widest uppercase mb-4 opacity-70 text-[#4A4540]">
                            {t('eyebrow')}
                        </p>
                        <h1 id="hero-title" className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#4A4540]">
                            {t('title')}
                        </h1>
                        <p id="hero-subtitle" className="text-lg md:text-xl leading-relaxed opacity-80 mb-8 text-[#4A4540]">
                            {t('subtitle')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="#approach"
                                id="hero-cta-primary"
                                className="px-8 py-4 rounded-full font-medium bg-[#7B8F71] text-[#FDFBF8] transition-all hover:opacity-90 shadow-lg shadow-[#7B8F71]/20"
                            >
                                {t('ctaPrimary')}
                            </Link>
                            <Link
                                href={`/${locale}/register`}
                                id="hero-cta-secondary"
                                className="px-8 py-4 rounded-full font-medium border-2 border-[#4A4540] text-[#4A4540] transition-all hover:bg-[#4A4540] hover:text-[#FDFBF8]"
                            >
                                {t('ctaSecondary')}
                            </Link>
                        </div>
                    </div>

                    <div className="animate-fade-in delay-2">
                        <div className="relative">
                            <div className="w-full aspect-square organic-blob-2 p-8 flex items-center justify-center bg-[#F5F2EC]/50" id="hero-illustration-bg">
                                <HeroIllustration />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

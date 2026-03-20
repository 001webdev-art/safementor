'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

import Image from 'next/image';

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

                    </div>

                    <div className="animate-fade-in delay-2">
                        <div className="relative">
                            <div className="w-full aspect-square organic-blob-2 p-8 flex items-center justify-center bg-[#F5F2EC]/50" id="hero-illustration-bg">
                                <Image
                                    src="/svg/hero-illustration.svg"
                                    alt="Parent and child reading together"
                                    width={300}
                                    height={300}
                                    className="w-full h-full max-w-md mx-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

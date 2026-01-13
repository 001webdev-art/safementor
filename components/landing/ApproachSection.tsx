'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const ApproachIllustration = () => (
    <svg viewBox="0 0 300 300" className="w-full h-full max-w-sm mx-auto">
        {/* Nature scene */}
        <ellipse cx="150" cy="270" rx="130" ry="25" fill="#A8B5A0" opacity="0.3" />
        {/* Sun */}
        <circle cx="250" cy="50" r="25" fill="#E8D4A8" opacity="0.6" />
        {/* Hills */}
        <path d="M0 280Q75 200 150 250Q225 200 300 280V300H0Z" fill="#C4D4BC" opacity="0.4" />
        {/* Flowers */}
        <circle cx="60" cy="250" r="6" fill="#D4A8A8" opacity="0.7" />
        <circle cx="240" cy="255" r="5" fill="#D4A8A8" opacity="0.6" />
        <circle cx="180" cy="260" r="4" fill="#D4A8A8" opacity="0.5" />
        {/* Child with magnifying glass */}
        <ellipse cx="150" cy="265" rx="25" ry="6" fill="#8B7355" opacity="0.3" />
        <path d="M135 265C135 265 130 220 145 200C160 180 165 185 168 195C171 205 175 265 175 265" fill="#B8C4A8" />
        <circle cx="152" cy="175" r="20" fill="#E8DDD0" />
        <path d="M145 172C145 172 149 169 152 169C155 169 159 172 159 172" stroke="#7B6B5A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="147" cy="173" r="2" fill="#7B6B5A" />
        <circle cx="157" cy="173" r="2" fill="#7B6B5A" />
        {/* Magnifying glass */}
        <circle cx="195" cy="210" r="18" stroke="#8B7355" strokeWidth="3" fill="none" opacity="0.8" />
        <line x1="180" y1="225" x2="165" y2="240" stroke="#8B7355" strokeWidth="4" strokeLinecap="round" />
        {/* Butterfly */}
        <ellipse cx="100" cy="140" rx="8" ry="12" fill="#D4C4E8" opacity="0.7" transform="rotate(-30 100 140)" />
        <ellipse cx="115" cy="145" rx="8" ry="12" fill="#D4C4E8" opacity="0.7" transform="rotate(30 115 145)" />
        <ellipse cx="107" cy="150" rx="2" ry="6" fill="#8B7355" />
    </svg>
);

export const ApproachSection = () => {
    const t = useTranslations('SafeMentor.Approach');

    return (
        <section id="approach" className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#F8F6F3]">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 animate-fade-in">
                        <div className="relative">
                            <div className="w-full aspect-square rounded-3xl p-8 bg-[#FDFBF8]/50 shadow-inner" id="approach-illustration-bg">
                                <ApproachIllustration />
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 animate-fade-in delay-2">
                        <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-70 text-[#4A4540]">{t('eyebrow')}</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-[#4A4540]">{t('title')}</h2>
                        <p className="opacity-80 text-lg mb-8 leading-relaxed text-[#4A4540]">{t('description')}</p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#7B8F71] text-[#FDFBF8]">
                                    <span className="text-sm font-bold">1</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1 text-[#4A4540]">{t('bullet1.title')}</h4>
                                    <p className="opacity-70 text-sm text-[#4A4540]">{t('bullet1.desc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#7B8F71] text-[#FDFBF8]">
                                    <span className="text-sm font-bold">2</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1 text-[#4A4540]">{t('bullet2.title')}</h4>
                                    <p className="opacity-70 text-sm text-[#4A4540]">{t('bullet2.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

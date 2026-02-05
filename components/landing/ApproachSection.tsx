'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const ApproachSection = () => {
    const t = useTranslations('SafeMentor.Approach');

    return (
        <section id="approach" className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#F8F6F3]">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 animate-fade-in">
                        <div className="relative">
                            <div className="w-full aspect-square rounded-3xl p-8 bg-[#FDFBF8]/50 shadow-inner" id="approach-illustration-bg">
                                <Image
                                    src="/svg/approach-illustration.svg"
                                    alt="Child exploring nature with a magnifying glass"
                                    width={300}
                                    height={300}
                                    className="w-full h-full max-w-sm mx-auto object-contain"
                                    loading="lazy"
                                />
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
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#7B8F71] text-[#FDFBF8]">
                                    <span className="text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1 text-[#4A4540]">{t('bullet3.title')}</h4>
                                    <p className="opacity-70 text-sm text-[#4A4540]">{t('bullet3.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

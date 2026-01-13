'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { QuoteIcon } from './SafeMentorIcons';

export const TestimonialSection = () => {
    const t = useTranslations('SafeMentor.Quote');

    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#F5F2EC]/50" id="quote-section">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <QuoteIcon className="mx-auto mb-8 opacity-30 text-[#7B8F71]" />
                <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed mb-8 text-[#4A4540]">
                    {t('text')}
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#A8B5A0] text-[#4A4540]">
                        <span className="font-serif font-bold">MK</span>
                    </div>
                    <div className="text-left">
                        <p className="font-medium text-[#4A4540]">{t('author')}</p>
                        <p className="text-sm opacity-60 text-[#4A4540]">{t('role')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

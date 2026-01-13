'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { KosaIcon, GdprIcon, ParentsIcon } from './SafeMentorIcons';

export const TrustBadges = () => {
    const t = useTranslations('SafeMentor.Trust');

    const badges = [
        { icon: <KosaIcon />, label: t('badge1') },
        { icon: <GdprIcon />, label: t('badge2') },
        { icon: <ParentsIcon />, label: t('badge3') },
    ];

    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-12 border-t border-b border-[#F5F2EC]" id="trust-section">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 text-[#4A4540]">
                    {badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="text-[#7B8F71]">{badge.icon}</div>
                            <span className="text-sm font-medium">{badge.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

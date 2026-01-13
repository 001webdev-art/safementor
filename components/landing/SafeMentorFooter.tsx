import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { SafeMentorLogo } from './SafeMentorIcons';
import Link from 'next/link';

export const SafeMentorFooter = () => {
    const t = useTranslations('SafeMentor.Footer');
    const locale = useLocale();

    return (
        <footer className="w-full px-6 md:px-12 lg:px-20 py-16 border-t border-[#F5F2EC] bg-[#FDFBF8]" id="footer-section">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <SafeMentorLogo size={32} className="" />
                            <span className="font-serif text-lg font-bold text-[#4A4540]">SafeMentor</span>
                        </div>
                        <p className="opacity-70 leading-relaxed mb-4 max-w-sm text-[#4A4540]" id="footer-text">
                            {t('text')}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-[#4A4540]">{t('learnMore')}</h4>
                        <ul className="space-y-3 opacity-70 text-[#4A4540]">
                            <li><Link href="#approach" className="hover:opacity-100 transition-opacity">{t('links.approach')}</Link></li>
                            <li><Link href={`/${locale}`} className="hover:opacity-100 transition-opacity">{t('links.ethics')}</Link></li>
                            <li><Link href={`/${locale}`} className="hover:opacity-100 transition-opacity">{t('links.educators')}</Link></li>
                            <li><Link href={`/${locale}`} className="hover:opacity-100 transition-opacity">{t('links.research')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-[#4A4540]">{t('company')}</h4>
                        <ul className="space-y-3 opacity-70 text-[#4A4540]">
                            <li><Link href={`/${locale}`} className="hover:opacity-100 transition-opacity">{t('links.about')}</Link></li>
                            <li><Link href={`/${locale}/register`} className="hover:opacity-100 transition-opacity">{t('links.privacy')}</Link></li>
                            <li><Link href={`/${locale}/login`} className="hover:opacity-100 transition-opacity">{t('links.contact')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-[#F5F2EC] flex flex-wrap justify-between items-center gap-4 text-[#4A4540]">
                    <p className="text-sm opacity-60">© {new Date().getFullYear()} SafeMentor. All rights reserved.</p>
                    <p className="text-sm opacity-60">{t('bottom')}</p>
                </div>
            </div>
        </footer>
    );
};

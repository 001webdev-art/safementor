'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { SafeMentorLogo, MenuIcon } from './SafeMentorIcons';
import Link from 'next/link';

export const Navigation = () => {
    const t = useTranslations('SafeMentor.Navigation');
    const locale = useLocale();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "#values", label: t('values') },
        { href: "#approach", label: t('approach') },
        { href: "#families", label: t('families') },
    ];

    return (
        <nav id="nav-bar" className="w-full px-6 py-5 md:px-12 lg:px-20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href={`/${locale}`} className="flex items-center gap-3 group">
                    <SafeMentorLogo className="group-hover:scale-110 transition-transform duration-300" />
                    <span id="logo-text" className="font-serif text-xl font-bold tracking-tight text-[#4A4540]">
                        SafeMentor
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-[#4A4540] hover:opacity-70 transition-opacity"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href={`/${locale}/register`}
                        id="nav-cta"
                        className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#7B8F71] text-[#FDFBF8] transition-all hover:opacity-90 shadow-sm hover:shadow-md"
                    >
                        {t('learnMore')}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[#4A4540]"
                    aria-label="Menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <MenuIcon />
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-lg font-medium text-[#4A4540]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href={`/${locale}/register`}
                        className="w-full px-5 py-3 rounded-full text-lg text-center font-medium bg-[#7B8F71] text-[#FDFBF8] mt-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t('learnMore')}
                    </Link>
                </div>
            )}
        </nav>
    );
};

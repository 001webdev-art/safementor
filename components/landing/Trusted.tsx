<<<<<<< HEAD
import React from 'react';
import { AcmeLogo } from './Icons';
import { useTranslations } from 'next-intl';

export const Trusted = () => {
    const t = useTranslations('Landing.Trusted');

    return (
        <div className="flex flex-col items-center justify-center pt-20 px-6 gap-8">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">{t('title')}</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    {t('description')}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-x-16 md:gap-y-12 w-full max-w-5xl mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                        <AcmeLogo />
                        <span className="font-semibold text-lg">{t('company')} {i}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
=======
import React from 'react';
import { AcmeLogo } from './Icons';
import { useTranslations } from 'next-intl';

export const Trusted = () => {
    const t = useTranslations('Landing.Trusted');

    return (
        <div className="flex flex-col items-center justify-center pt-20 px-6 gap-8">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">{t('title')}</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    {t('description')}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-x-16 md:gap-y-12 w-full max-w-5xl mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                        <AcmeLogo />
                        <span className="font-semibold text-lg">{t('company')} {i}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

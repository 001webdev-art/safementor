<<<<<<< HEAD
import React from 'react';
import { CheckIcon } from './Icons';
import { useTranslations } from 'next-intl';

export const Hero = () => {
    const t = useTranslations('Landing.Hero');

    return (
        <div className="relative w-full min-h-[calc(100vh-64px)] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/criancas3.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col gap-6 items-center text-center">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                    {t('title1')}{' '}
                    <span className="block text-blue-400">{t('title2')}</span>
                    <span className="block">{t('title3')}</span>
                </h1>

                <p className="text-xl text-gray-200 max-w-2xl drop-shadow-md">
                    {t('description')}
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-8">
                    <input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        className="px-6 py-3 rounded-xl bg-white/90 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 w-full sm:w-auto outline-none transition-all placeholder:text-gray-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                        {t('startTrial')}
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 py-6 text-gray-200 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <CheckIcon /> <span className="drop-shadow-sm">{t('noCreditCard')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckIcon /> <span className="drop-shadow-sm">{t('freeTrial')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckIcon /> <span className="drop-shadow-sm">{t('cancelAnytime')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
=======
import React from 'react';
import { CheckIcon } from './Icons';
import { useTranslations } from 'next-intl';

export const Hero = () => {
    const t = useTranslations('Landing.Hero');

    return (
        <div className="relative w-full min-h-[calc(100vh-64px)] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/criancas3.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col gap-6 items-center text-center">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                    {t('title1')}{' '}
                    <span className="block text-blue-400">{t('title2')}</span>
                    <span className="block">{t('title3')}</span>
                </h1>

                <p className="text-xl text-gray-200 max-w-2xl drop-shadow-md">
                    {t('description')}
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-8">
                    <input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        className="px-6 py-3 rounded-xl bg-white/90 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 w-full sm:w-auto outline-none transition-all placeholder:text-gray-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                        {t('startTrial')}
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 py-6 text-gray-200 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <CheckIcon /> <span className="drop-shadow-sm">{t('noCreditCard')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckIcon /> <span className="drop-shadow-sm">{t('freeTrial')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckIcon /> <span className="drop-shadow-sm">{t('cancelAnytime')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9

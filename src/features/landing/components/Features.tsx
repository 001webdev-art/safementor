import React from 'react';
import { BoxIcon, FeatureIcon } from './Icons';
import { useTranslations } from 'next-intl';

export const Features1 = () => {
    const t = useTranslations('Landing.Features');

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 py-20 w-full max-w-7xl mx-auto">

            <div className="flex flex-col gap-8 md:w-1/2">
                <div className="space-y-4">
                    <span className="text-blue-600 font-medium">{t('awesomeFeature')}</span>
                    <h3 className="text-3xl font-bold">{t('mainTitle')}</h3>
                    <p className="text-gray-500 max-w-md">
                        {t('mainDescription')}
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="shrink-0 p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <BoxIcon />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-lg font-semibold">{t('featureTitle')}</h4>
                                <p className="text-gray-500 text-sm max-w-sm">
                                    {t('featureDescription')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
                <FeatureIcon />
            </div>
        </div>
    );
};

'use client'

import { useTranslations } from 'next-intl'

export const DataUsageSection = () => {
    const t = useTranslations('Compliance.dataUsage')

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {t('title')}
            </h2>

            <ul className="space-y-3 text-gray-700 font-medium">
                <li className="flex gap-3">
                    <span className="text-[#889A7F] font-bold mt-1">•</span>
                    <p>
                        <strong className="text-gray-900">{t('riskSignals.label')}</strong>{' '}
                        {t('riskSignals.value')}
                    </p>
                </li>
                <li className="flex gap-3">
                    <span className="text-[#889A7F] font-bold mt-1">•</span>
                    <p>
                        <strong className="text-gray-900">{t('usageStats.label')}</strong>{' '}
                        {t('usageStats.value')}
                    </p>
                </li>
            </ul>
        </section>
    )
}

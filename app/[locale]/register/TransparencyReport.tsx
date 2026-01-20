'use client'

import { useTranslations } from 'next-intl'
import { Ban, Eye } from 'lucide-react'

export const TransparencyReport = () => {
    const t = useTranslations('Compliance.transparency')

    // We need to handle the lists manually since next-intl doesn't automatically return arrays for keys
    const neverList = [
        t('never.list.0'),
        t('never.list.1'),
        t('never.list.2'),
        t('never.list.3')
    ]

    const parentsList = [
        t('parents.list.0'),
        t('parents.list.1'),
        t('parents.list.2'),
        t('parents.list.3')
    ]

    return (
        <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-xs font-semibold tracking-widest text-gray-500 mb-4 uppercase">
                {t('title')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {/* Never Collected */}
                <div>
                    <h4 className="font-semibold text-danger-600 mb-2 flex items-center gap-2">
                        <Ban size={16} /> {t('never.title')}
                    </h4>
                    <ul className="space-y-1 text-gray-600">
                        {neverList.map((item, index) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>

                {/* Parents Can See */}
                <div>
                    <h4 className="font-semibold text-success-600 mb-2 flex items-center gap-2">
                        <Eye size={16} /> {t('parents.title')}
                    </h4>
                    <ul className="space-y-1 text-gray-600">
                        {parentsList.map((item, index) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

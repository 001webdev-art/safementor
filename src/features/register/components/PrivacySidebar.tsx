'use client'

import { useTranslations } from 'next-intl'
import { Shield } from 'lucide-react'

export const PrivacySidebar = () => {
    const t = useTranslations('Compliance.sidebar')

    return (
        <aside className="col-span-1 bg-[#889A7F] text-white p-10 flex flex-col justify-between rounded-l-2xl">
            <div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6 text-white" />
                </div>

                <h1 className="text-2xl font-bold mb-4">
                    {t('title')}
                </h1>

                <p className="text-sm leading-relaxed text-white/90 font-medium">
                    {t('description')}
                </p>
            </div>

            <div className="text-sm text-white/80 font-medium flex items-center gap-2">
                <Shield size={16} />
                {t('compliant')}
            </div>
        </aside>
    )
}

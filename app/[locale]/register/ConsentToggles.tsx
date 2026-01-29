'use client'

import { useTranslations } from 'next-intl'
import { Checkbox } from '@nextui-org/react'

interface ConsentTogglesProps {
    helpImprove: boolean
    safetyAnalysis: boolean
    onChange: (field: string, value: boolean) => void
}

export const ConsentToggles = ({ helpImprove, safetyAnalysis, onChange }: ConsentTogglesProps) => {
    const t = useTranslations('Compliance.consent')

    return (
        <section className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Checkbox
                    className="mt-1"
                    isSelected={helpImprove}
                    onValueChange={(isSelected) => onChange('helpImprove', isSelected)}
                    classNames={{
                        wrapper: "group-data-[selected=true]:after:bg-[#889A7F]"
                    }}
                >
                    <div>
                        <h4 className="font-semibold text-gray-900">
                            {t('improve.title')} <span className="text-gray-500 text-sm font-normal">({t('improve.optional')})</span>
                        </h4>
                        <p className="text-sm text-gray-600">
                            {t('improve.description')}
                        </p>
                    </div>
                </Checkbox>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Checkbox
                    className="mt-1"
                    isSelected={safetyAnalysis}
                    onValueChange={(isSelected) => onChange('safetyAnalysis', isSelected)}
                    classNames={{
                        wrapper: "group-data-[selected=true]:after:bg-[#889A7F]"
                    }}
                >
                    <div>
                        <h4 className="font-semibold text-gray-900">{t('safeAnalysis.title')}</h4>
                        <p className="text-sm text-gray-600">
                            {t('safeAnalysis.description')}
                        </p>
                    </div>
                </Checkbox>
            </div>
        </section>
    )
}

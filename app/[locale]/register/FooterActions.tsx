'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Button, Checkbox } from '@nextui-org/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FooterActionsProps {
    complianceData: {
        agreedToTerms: boolean
        agreedToPrivacy: boolean
        isGuardian: boolean
        marketingOptOut: boolean
        agreedToPayment: boolean
    }
    onDataChange: (field: string, value: boolean) => void
    onAccept: () => void
}

export const FooterActions = ({ complianceData, onDataChange, onAccept }: FooterActionsProps) => {
    const t = useTranslations('Compliance.footer')
    const locale = useLocale()
    const router = useRouter()

    const isValid = 
        complianceData.agreedToTerms && 
        complianceData.agreedToPrivacy && 
        complianceData.isGuardian && 
        complianceData.agreedToPayment

    return (
        <section className="space-y-6">
            <div className="space-y-4">
                {/* 1. Terms */}
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="terms-agreement"
                        isSelected={complianceData.agreedToTerms}
                        onValueChange={(val) => onDataChange('agreedToTerms', val)}
                        color="default"
                        size="md"
                        classNames={{ wrapper: "group-data-[selected=true]:after:bg-[#889A7F]" }}
                    />
                    <label htmlFor="terms-agreement" className="text-sm text-gray-700 font-medium cursor-pointer select-none pt-0.5">
                        {t.rich('agreement.terms', {
                            terms: (chunks) => (
                                <a href={`/${locale}/terms`} className="text-[#889A7F] hover:underline mx-1" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    {chunks}
                                </a>
                            )
                        })} *
                    </label>
                </div>

                {/* 2. Privacy */}
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="privacy-agreement"
                        isSelected={complianceData.agreedToPrivacy}
                        onValueChange={(val) => onDataChange('agreedToPrivacy', val)}
                        color="default"
                        size="md"
                        classNames={{ wrapper: "group-data-[selected=true]:after:bg-[#889A7F]" }}
                    />
                    <label htmlFor="privacy-agreement" className="text-sm text-gray-700 font-medium cursor-pointer select-none pt-0.5">
                        {t.rich('agreement.privacy', {
                             privacy: (chunks) => (
                                <a href={`/${locale}/privacy`} className="text-[#889A7F] hover:underline mx-1" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    {chunks}
                                </a>
                            )
                        })} *
                    </label>
                </div>

                {/* 3. Guardian & Age */}
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="guardian-confirm"
                        isSelected={complianceData.isGuardian}
                        onValueChange={(val) => onDataChange('isGuardian', val)}
                        color="default"
                        size="md"
                        classNames={{ wrapper: "group-data-[selected=true]:after:bg-[#889A7F]" }}
                    />
                    <label htmlFor="guardian-confirm" className="text-sm text-gray-700 font-medium cursor-pointer select-none pt-0.5">
                        {t('agreement.guardian')} *
                    </label>
                </div>

                <div className="my-2 border-t border-gray-100" />

                {/* 4. Marketing Opt-Out (Optional) */}
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="marketing-opt-out"
                        isSelected={complianceData.marketingOptOut}
                        onValueChange={(val) => onDataChange('marketingOptOut', val)}
                        color="default"
                        size="md"
                        classNames={{ wrapper: "group-data-[selected=true]:after:bg-[#889A7F]" }}
                    />
                    <label htmlFor="marketing-opt-out" className="text-sm text-gray-700 font-medium cursor-pointer select-none pt-0.5">
                        {t('agreement.marketing')}
                    </label>
                </div>

                {/* 5. Payment & Withdrawal */}
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="payment-agreement"
                        isSelected={complianceData.agreedToPayment}
                        onValueChange={(val) => onDataChange('agreedToPayment', val)}
                        color="default"
                        size="md"
                        classNames={{ wrapper: "group-data-[selected=true]:after:bg-[#889A7F]" }}
                    />
                    <label htmlFor="payment-agreement" className="text-sm text-gray-700 font-medium cursor-pointer select-none pt-0.5">
                        {t('agreement.payment')} *
                    </label>
                </div>
            </div>

            <div className="text-xs text-gray-500 italic">
                * = {locale === 'de' ? 'Pflichtfeld' : 'Mandatory field'}
            </div>

            <div className="flex items-center justify-between pt-4">
                <Button
                    variant="light"
                    color="default"
                    onPress={() => router.push(`/${locale}`)}
                    className="text-gray-500 hover:text-gray-700 font-medium"
                >
                    {t('back')}
                </Button>

                <Button
                    size="lg"
                    endContent={<ArrowRight size={18} />}
                    onPress={onAccept}
                    isDisabled={!isValid}
                    className="bg-[#889A7F] text-white hover:bg-[#748866] font-bold px-8"
                >
                    {t('createAccount')}
                </Button>
            </div>
        </section>
    )
}

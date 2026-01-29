'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Button, Checkbox } from '@nextui-org/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FooterActionsProps {
    agreed: boolean
    onAgreedChange: (agreed: boolean) => void
    onAccept: () => void
}

export const FooterActions = ({ agreed, onAgreedChange, onAccept }: FooterActionsProps) => {
    const t = useTranslations('Compliance.footer')
    const locale = useLocale()
    const router = useRouter()

    return (
        <section className="space-y-6">
            <div className="flex items-start gap-3">
                <Checkbox
                    id="compliance-agreement"
                    isSelected={agreed}
                    onValueChange={onAgreedChange}
                    color="default"
                    size="md"
                    classNames={{
                        wrapper: "group-data-[selected=true]:after:bg-[#889A7F]"
                    }}
                />
                <label 
                    htmlFor="compliance-agreement" 
                    className="text-sm text-gray-700 font-medium cursor-pointer select-none pt-0.5"
                >
                    {t.rich('agreement', {
                        terms: (chunks) => (
                            <a 
                                href={`/${locale}/terms`}
                                className="text-[#889A7F] hover:underline mx-1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {chunks}
                            </a>
                        )
                    })}
                </label>
            </div>

            <div className="flex items-center justify-between">
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
                    isDisabled={!agreed}
                    className="bg-[#889A7F] text-white hover:bg-[#748866] font-bold px-8"
                >
                    {t('createAccount')}
                </Button>
            </div>
        </section>
    )
}

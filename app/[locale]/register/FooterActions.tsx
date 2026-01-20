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
            <div className="flex items-center gap-3">
                <Checkbox
                    isSelected={agreed}
                    onValueChange={onAgreedChange}
                    color="primary"
                    size="md"
                >
                    <span className="text-sm text-gray-700">
                        {t('agreement')}
                    </span>
                </Checkbox>
            </div>

            <div className="flex items-center justify-between">
                <Button
                    variant="light"
                    color="default"
                    onPress={() => router.push(`/${locale}`)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    {t('back')}
                </Button>

                <Button
                    color="primary"
                    size="lg"
                    endContent={<ArrowRight size={18} />}
                    onPress={onAccept}
                    isDisabled={!agreed}
                    className="font-semibold shadow-lg"
                >
                    {t('createAccount')}
                </Button>
            </div>
        </section>
    )
}

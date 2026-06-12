import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { PrivacySidebar } from './PrivacySidebar'
import { DataUsageSection } from './DataUsageSection'
import { ConsentToggles } from './ConsentToggles'
import { TransparencyReport } from './TransparencyReport'
import { FooterActions } from './FooterActions'

interface ComplianceFrameProps {
    complianceData: {
        helpImprove: boolean
        safetyAnalysis: boolean
        agreedToTerms: boolean
        agreedToPrivacy: boolean
        isGuardian: boolean
        marketingOptOut: boolean
        agreedToPayment: boolean
    }
    onDataChange: (field: string, value: boolean) => void
    onAccept: () => void
}

export const ComplianceFrame = ({ complianceData, onDataChange, onAccept }: ComplianceFrameProps) => {
    const tHeader = useTranslations('Compliance.header')
    const locale = useLocale()   
   
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 border border-gray-100">
                <PrivacySidebar />

                <main className="col-span-2 p-8 md:p-12 space-y-8 max-h-[90vh] overflow-y-auto">
                    {/* Already have an account banner */}
                    <div className="w-full bg-gray-50 rounded-2xl flex items-center justify-between py-4 px-6 border border-gray-100/50">
                        <span className="text-gray-700 font-medium text-lg md:text-xl">
                            {tHeader('alreadyHaveAccount')}
                        </span>
                        <Link
                            href={`/${locale}/login`}
                            className="text-gray-700 hover:text-gray-900 font-bold text-lg md:text-xl underline ml-2 cursor-pointer"
                        >
                            {tHeader('signIn')}
                        </Link>
                    </div>

                    {/* Titles */}
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {tHeader('createAccountTitle')}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 font-normal">
                            {tHeader('createAccountSubtitle')}
                        </p>
                    </div>

                                    
                    
                    
                    <DataUsageSection />
                    <ConsentToggles
                        helpImprove={complianceData.helpImprove}
                        safetyAnalysis={complianceData.safetyAnalysis}
                        onChange={onDataChange}
                    />
                    <TransparencyReport />
                    <FooterActions
                        complianceData={complianceData}
                        onDataChange={onDataChange}
                        onAccept={onAccept}
                    />
                </main>
            </div>
        </div>
    )
}

'use client'

import { PrivacySidebar } from './PrivacySidebar'
import { DataUsageSection } from './DataUsageSection'
import { ConsentToggles } from './ConsentToggles'
import { TransparencyReport } from './TransparencyReport'
import { FooterActions } from './FooterActions'

interface ComplianceFrameProps {
    complianceData: {
        agreed: boolean
        helpImprove: boolean
        safetyAnalysis: boolean
    }
    onDataChange: (field: string, value: boolean) => void
    onAccept: () => void
}

export const ComplianceFrame = ({ complianceData, onDataChange, onAccept }: ComplianceFrameProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 border border-gray-100">
                <PrivacySidebar />

                <main className="col-span-2 p-8 md:p-12 space-y-8 max-h-[90vh] overflow-y-auto">
                    <DataUsageSection />
                    <ConsentToggles
                        helpImprove={complianceData.helpImprove}
                        safetyAnalysis={complianceData.safetyAnalysis}
                        onChange={onDataChange}
                    />
                    <TransparencyReport />
                    <FooterActions
                        agreed={complianceData.agreed}
                        onAgreedChange={(val) => onDataChange('agreed', val)}
                        onAccept={onAccept}
                    />
                </main>
            </div>
        </div>
    )
}

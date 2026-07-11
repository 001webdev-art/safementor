'use client';

import { Card, CardBody, CardHeader, Button, Spinner } from '@nextui-org/react';
import { AlertTriangle, Phone, ShieldAlert } from 'lucide-react';
import { SafetyAlert } from '@/types/dashboard';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { Profile } from '@/types/database';

interface NotificationsProps {
    alerts: SafetyAlert[];
    profile?: Partial<Profile>;
}

const countryKeys: Record<string, string> = {
    "Austria": "austria",
    "Belgium": "belgium",
    "Bulgaria": "bulgaria",
    "Croatia": "croatia",
    "Cyprus": "cyprus",
    "Czech Republic": "czech_republic",
    "Denmark": "denmark",
    "Estonia": "estonia",
    "Finland": "finland",
    "France": "france",
    "Germany": "germany",
    "Greece": "greece",
    "Hungary": "hungary",
    "Ireland": "ireland",
    "Italy": "italy",
    "Latvia": "latvia",
    "Lithuania": "lithuania",
    "Luxembourg": "luxembourg",
    "Malta": "malta",
    "Netherlands": "netherlands",
    "Poland": "poland",
    "Portugal": "portugal",
    "Romania": "romania",
    "Slovakia": "slovakia",
    "Slovenia": "slovenia",
    "Spain": "spain",
    "Sweden": "sweden",
    "Switzerland": "switzerland"
};

const infoKeys: Record<string, string> = {
    "24/7 support for children and their caregivers.": "support_24_7_caregivers",
    "General support lines that assist parents with family issues.": "general_support_family",
    "Operated by the State Agency for Child Protection.": "operated_state_agency",
    "Specific line dedicated to parents and caregivers.": "specific_parents_caregivers",
    "European harmonized number providing support for families.": "european_harmonized_families",
    "Dedicated parental helpline for educational and family crisis.": "dedicated_parental_crisis",
    "Specialized helpline for parents and educators.": "specialized_parents_educators",
    "24/7 service for child-related concerns, including parents.": "service_24_7_child_parents",
    "Professional guidance for parents on upbringing and family life.": "professional_guidance_upbringing",
    "National service for children at risk, also serving parents.": "national_service_risk_parents",
    "Anonymous and free counseling for parents.": "anonymous_free_parents",
    "Counseling and psychological support for families.": "counseling_psychological_families",
    "Provides a dedicated line for adults worried about children.": "provides_dedicated_adults",
    "Volunteer-led helpline providing support and guidance to parents.": "volunteer_led_parents",
    "Dedicated counseling for children and adults regarding child welfare.": "dedicated_counseling_child_welfare",
    "State-run helpline for children, adolescents, and parents.": "state_run_children_parents",
    "Professional psychological help for parents.": "professional_psychological_parents",
    "Direct line for parents and caregivers.": "direct_parents_caregivers",
    "24/7 national helpline for all social welfare concerns.": "national_24_7_welfare",
    "Anonymized support specifically for parents.": "anonymized_support_parents",
    "Focused on safety and mental health of children.": "focused_safety_mental_health",
    "800 number is specialized for family and adoption support.": "specialized_family_adoption",
    "Counseling for children and their legal representatives.": "counseling_children_representatives",
    "Provides support for families in crisis.": "provides_support_crisis",
    "General helpline often used by parents for advice.": "general_helpline_advice",
    "Dedicated line for adults and family members.": "dedicated_adults_family",
    "Specialized support for adults regarding children's rights.": "specialized_support_children_rights",
    "24/7 specialist advice for parents and caregivers.": "specialist_advice_24_7"
};

export function Notifications({ alerts, profile }: NotificationsProps) {
    const t = useTranslations('Dashboard.notifications_new');
    const [allRisks, setAllRisks] = useState<any[]>([]);
    const [isLoadingRisks, setIsLoadingRisks] = useState(true);
    const [helplineInfo, setHelplineInfo] = useState<any>(null);
    const supabase = createClient();

    const fetchRisks = async () => {
        try {
            const { data, error } = await supabase
                .from('chat_messages')
                .select(`
                    id,
                    user_intent_summary,
                    user_intent_flag,
                    user_intent_level,
                    parent_hint,
                    child_id,
                    created_at,
                    children:children(nickname)
                `)
                .not('user_intent_flag', 'is', null)
                .neq('user_intent_flag', 'none')
                .eq('parent_reviewed', false);

            if (error) throw error;
            setAllRisks(data || []);
        } catch (err) {
            console.error('Error fetching risks:', err);
        } finally {
            setIsLoadingRisks(false);
        }
    };

    const riskAlerts = allRisks.filter(
        a => a.user_intent_level !== 'yellow' && a.user_intent_level !== 'gelb'
    );

    const otherAlerts = [
        ...alerts.filter(a => a.type !== 'red'),
        ...allRisks
            .filter(a => a.user_intent_level === 'yellow' || a.user_intent_level === 'gelb')
            .map(a => ({
                id: a.id,
                type: 'yellow' as const,
                title: `${a.children?.nickname || 'Child'} - Warning Detected`,
                description: a.user_intent_summary || "Potentially unsafe content detected.",
                timestamp: a.created_at ? new Date(a.created_at).toLocaleDateString() : 'Today',
                childId: a.child_id,
                parent_hint: a.parent_hint
            }))
    ];

    useEffect(() => {
        fetchRisks();

        const fetchHelplines = async () => {
            if (profile?.address_country) {
                try {
                    const response = await fetch('/parent_helplines_europe.json');
                    const helplines = await response.json();

                    // Match country name (assuming profile stores full name like "Germany")
                    const countryInfo = helplines[profile.address_country];
                    if (countryInfo) {
                        setHelplineInfo({
                            country: profile.address_country,
                            ...countryInfo
                        });
                    }
                } catch (error) {
                    console.error('Error loading helplines:', error);
                }
            }
        };

        fetchHelplines();
    }, [profile?.address_country]);

    const handleAcknowledge = async (messageId: string) => {
        try {
            const { error } = await supabase
                .from('chat_messages')
                .update({ parent_reviewed: true })
                .eq('id', messageId);

            if (error) throw error;

            // Remove from local state
            setAllRisks(prev => prev.filter(alert => alert.id !== messageId));
        } catch (err) {
            console.error('Error acknowledging risk:', err);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            {/* Active Alerts Section */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('activeAlerts')}</h2>

                {isLoadingRisks ? (
                    <div className="flex justify-center p-8">
                        <Spinner color="danger" />
                    </div>
                ) : riskAlerts.length > 0 ? (
                    <div className="space-y-4">
                        {riskAlerts.map(alert => (
                            <Card key={alert.id} className="border-2 border-red-300 bg-red-50">
                                <CardBody className="p-6">
                                    {/* Alert Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-3 py-1 rounded text-xs font-bold bg-red-600 text-white">
                                            {t('redFlag')}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {alert.created_at ? new Date(alert.created_at).toLocaleDateString() : 'Today'}
                                        </span>
                                    </div>

                                    {/* Alert Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        {alert.children?.nickname || 'Child'} - {alert.user_intent_flag}
                                    </h3>
                                    
                                    {(() => {
                                        const getRoleKey = (flag: string, summary: string) => {
                                            const lowerFlag = (flag || '').toLowerCase();
                                            const lowerSummary = (summary || '').toLowerCase();
                                            
                                            if (lowerFlag.includes('self_harm') || lowerFlag.includes('suicide')) {
                                                return 'victim';
                                            }
                                            if (lowerSummary.includes('victim') || lowerSummary.includes('bullied') || lowerSummary.includes('threatened') || lowerSummary.includes('harassed') || lowerSummary.includes('victim') || lowerSummary.includes('abused') || lowerSummary.includes('angegriffen') || lowerSummary.includes('gemobbt') || lowerSummary.includes('bedroht')) {
                                                return 'victim';
                                            }
                                            if (lowerSummary.includes('perpetrator') || lowerSummary.includes('bullying') || lowerSummary.includes('threatening') || lowerSummary.includes('attacking') || lowerSummary.includes('threaten') || lowerSummary.includes('mobbt') || lowerSummary.includes('bedroht jemanden') || lowerSummary.includes('schlagen') || lowerSummary.includes('angreifen')) {
                                                return 'perpetrator';
                                            }
                                            if (lowerSummary.includes('witness') || lowerSummary.includes('bystander') || lowerSummary.includes('saw') || lowerSummary.includes('heard') || lowerSummary.includes('beobachtet')) {
                                                return 'bystander';
                                            }
                                            if (lowerFlag.includes('violence') || lowerFlag.includes('harassment')) {
                                                return 'perpetrator';
                                            }
                                            return 'victim';
                                        };
                                        const roleKey = getRoleKey(alert.user_intent_flag, alert.user_intent_summary || '');
                                        return (
                                            <div className="flex gap-4 text-xs font-semibold text-red-700 mb-3">
                                                <span>
                                                    {t('roles.label')}: <span className="underline">{t(`roles.${roleKey}`)}</span>
                                                </span>
                                            </div>
                                        );
                                    })()}

                                    {/* Guidance Box */}
                                    <div className="bg-white border border-red-200 rounded-lg p-4 mb-4">
                                        <div className="flex gap-2 items-start mb-2">
                                            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
                                            <p className="text-sm font-bold text-red-900">Risk Detected</p>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">
                                            {alert.user_intent_summary || "We detected a potentially unsafe interaction."}
                                        </p>
                                    </div>

                                    {alert.parent_hint && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
                                            <p className="text-xs font-bold text-blue-900 mb-1">{t('parentHint.title')}</p>
                                            <p className="text-sm text-gray-700 leading-relaxed italic mb-2">
                                                {alert.parent_hint}
                                            </p>
                                            <p className="text-[10px] text-gray-400 border-t border-blue-100 pt-1.5 mt-2">
                                                {t('parentHint.disclaimer')}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-3 mt-4">
                                        <Button
                                            className="bg-red-600 text-white font-bold"
                                            onPress={() => handleAcknowledge(alert.id)}
                                        >
                                            Mark as Resolved
                                        </Button>
                                        <Button
                                            variant="bordered"
                                            className="border-red-600 text-red-600 font-bold"
                                        >
                                            View Chat Context
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border border-gray-200">
                        <CardBody className="py-8 text-center text-gray-500">
                            <p className="text-sm">{t('noActiveAlerts')}</p>
                        </CardBody>
                    </Card>
                )}
            </div>

            {/* Important Disclaimer */}
            <Card className="bg-yellow-50 border border-yellow-200">
                <CardBody className="flex gap-3 p-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-yellow-900 mb-1">{t('disclaimer.title')}</p>
                        <p className="text-sm text-yellow-800">
                            {t('disclaimer.text')}
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Need to Talk? Find Support Now */}
            <Card className="border border-gray-200 bg-gray-50">
                <CardBody className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('support.title')}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {t('support.desc')}
                    </p>

                    <div className="space-y-4">
                        {helplineInfo ? (
                            <>
                                <div className="bg-white border-2 border-red-100 rounded-lg p-4 text-center shadow-sm">
                                    <p className="text-sm font-bold text-red-600 mb-1">
                                        {t('support.crisis_country', { country: t(`countries.${countryKeys[helplineInfo.country] || helplineInfo.country}`) })}
                                    </p>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{helplineInfo.name}</h4>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <p className="font-mono font-bold text-xl text-gray-900">{helplineInfo.number}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 italic border-t border-gray-100 pt-2 mt-2">
                                        {t('support.info_label', { info: t(`helplines.${infoKeys[helplineInfo.info] || helplineInfo.info}`) })}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-3">
                                <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-center">
                                    <p className="text-sm font-bold text-gray-900">
                                        {t('support.crisis') || "National Crisis Line"}
                                    </p>
                                </div>
                                <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-center">
                                    <p className="text-sm font-bold text-gray-900">
                                        {t('support.emergency') || "Emergency: 112"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Recent Safety Notifications */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('recent')}</h2>

                {otherAlerts.length > 0 ? (
                    <div className="space-y-3">
                        {otherAlerts.map(alert => (
                            <Card
                                key={alert.id}
                                className={`border ${alert.type === 'yellow'
                                    ? 'bg-yellow-50 border-yellow-200'
                                    : 'bg-green-50 border-green-200'
                                    }`}
                            >
                                <CardBody className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${alert.type === 'yellow'
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-gray-500 text-white'
                                                }`}>
                                                {alert.type === 'yellow' ? t('levels.yellow') : t('levels.info')}
                                            </span>
                                            <p className="text-sm font-bold text-gray-900">{alert.title}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-3">{alert.description}</p>

                                    {alert.parent_hint && (
                                        <div className="bg-white border border-yellow-200 rounded-lg p-3 mb-3 shadow-sm">
                                            <p className="text-xs font-bold text-yellow-900 mb-1">{t('parentHint.title')}</p>
                                            <p className="text-sm text-gray-700 leading-relaxed italic mb-2">
                                                {alert.parent_hint}
                                            </p>
                                            <p className="text-[10px] text-gray-400 border-t border-gray-100 pt-1 mt-1">
                                                {t('parentHint.disclaimer')}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <Button size="sm" variant="bordered" className="border-gray-300">
                                            {t('actions.getAdvice')}
                                        </Button>
                                        <Button size="sm" variant="bordered" className="border-gray-300">
                                            {t('actions.markRead')}
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}

                        {/* View All Link */}
                        <button className="w-full text-center text-sm text-[#889A7F] hover:underline py-2">
                            {t('actions.viewAll')}
                        </button>
                    </div>
                ) : (
                    <Card className="border border-gray-200">
                        <CardBody className="py-8 text-center text-gray-500">
                            <p className="text-sm">{t('noRecent')}</p>
                        </CardBody>
                    </Card>
                )}
            </div>

            {/* What to Do Next */}
            <Card className="bg-gray-50 border border-gray-200">
                <CardBody className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('nextSteps.title')}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {t('nextSteps.desc')}
                    </p>
                    <Button
                        className="w-full bg-[#889A7F] text-white hover:bg-[#748866]"
                    >
                        {t('nextSteps.button')}
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

'use client';

import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { 
    FileText, Shield, ShieldAlert, ShieldCheck, 
    AlertTriangle, Info, AlertCircle, Phone, 
    ChevronRight, XCircle, CheckCircle2, Search,
    MessageSquare, Activity, LayoutDashboard, BellRing
} from 'lucide-react';

import { useTranslations } from 'next-intl';

export function HelpSupport() {
    const t = useTranslations('Dashboard.help_new');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            {/* Section 1: Documentation */}
            <Card shadow="none" className="border-none bg-[#EBF0E9] p-2">
                <CardBody className="flex flex-col items-center text-center py-6 space-y-4">
                    <div className="p-3 bg-white/50 rounded-2xl">
                        <FileText className="w-8 h-8 text-[#5E6B56]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#424B3C]">{t('docs.title')}</h3>
                        <p className="text-[#5E6B56] text-sm">{t('docs.desc')}</p>
                    </div>
                    <Button 
                        className="bg-[#8CAB7D] text-white font-bold px-8"
                        endContent={<ChevronRight size={16} />}
                        radius="full"
                    >
                        {t('docs.button')}
                    </Button>
                </CardBody>
            </Card>

            {/* Section 2: Why This Is Not a Surveillance Tool */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold">{t('surveillance.title')}</h3>
                        <p className="text-gray-500 text-xs">{t('surveillance.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {/* What NOT Do */}
                        <div className="bg-danger-50 p-5 rounded-2xl border border-danger-100">
                            <div className="flex items-center gap-2 mb-3 text-danger-700">
                                <XCircle size={18} />
                                <p className="font-bold text-sm uppercase tracking-wider">{t('surveillance.notDo.title')}</p>
                            </div>
                            <ul className="text-xs text-danger-600 space-y-2 list-none font-medium">
                                <li>• {t('surveillance.notDo.items.0')}</li>
                                <li>• {t('surveillance.notDo.items.1')}</li>
                                <li>• {t('surveillance.notDo.items.2')}</li>
                                <li>• {t('surveillance.notDo.items.3')}</li>
                                <li>• {t('surveillance.notDo.items.4')}</li>
                            </ul>
                        </div>

                        {/* What SafeMentor Does */}
                        <div className="bg-success-50 p-5 rounded-2xl border border-success-100">
                            <div className="flex items-center gap-2 mb-3 text-success-700">
                                <CheckCircle2 size={18} />
                                <p className="font-bold text-sm uppercase tracking-wider">{t('surveillance.does.title')}</p>
                            </div>
                            <ul className="text-xs text-success-700 space-y-2 list-none font-medium">
                                <li>• {t('surveillance.does.items.0')}</li>
                                <li>• {t('surveillance.does.items.1')}</li>
                                <li>• {t('surveillance.does.items.2')}</li>
                                <li>• {t('surveillance.does.items.3')}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-default-100/50 p-4 rounded-xl border border-divider">
                        <p className="font-bold text-[13px] mb-1">{t('surveillance.whySafer.title')}</p>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                            {t('surveillance.whySafer.desc')}
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Section 3: How Child Rights Are Protected */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-4">
                    <div>
                        <h3 className="text-xl font-bold">{t('rights.title')}</h3>
                        <p className="text-gray-500 text-xs text-uppercase">{t('rights.subtitle')}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="border-l-4 border-default-300 pl-4 py-1">
                            <p className="font-bold text-sm mb-1">{t('rights.rawChat.title')}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {t('rights.rawChat.desc')}
                            </p>
                        </div>
                        <div className="border-l-4 border-default-300 pl-4 py-1">
                            <p className="font-bold text-sm mb-1">{t('rights.insulation.title')}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {t('rights.insulation.desc')}
                            </p>
                        </div>
                        <div className="border-l-4 border-default-300 pl-4 py-1">
                            <p className="font-bold text-sm mb-1">{t('rights.balance.title')}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {t('rights.balance.desc')}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Section 4: How SafeMentor Works */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold">{t('works.title')}</h3>
                        <p className="text-gray-500 text-xs">{t('works.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { step: 1, key: 'step1', icon: MessageSquare },
                            { step: 2, key: 'step2', icon: Search },
                            { step: 3, key: 'step3', icon: LayoutDashboard },
                            { step: 4, key: 'step4', icon: BellRing }
                        ].map((item) => (
                            <div key={item.step} className="bg-white p-4 rounded-xl border border-divider shadow-sm group hover:border-[#8CAB7D] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#E8EDE6] text-[#5E6B56] rounded-lg flex items-center justify-center font-bold">
                                        {item.step}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm mb-0.5">{t(`works.${item.key}.title`)}</p>
                                        <p className="text-[11px] text-gray-500">{t(`works.${item.key}.desc`)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* Section 5: Understanding Signal Types */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold">{t('signals.title')}</h3>
                        <p className="text-gray-500 text-[11px] uppercase tracking-wide">{t('signals.subtitle')}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-divider">
                            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                                <Info size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{t('signals.info.title')}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{t('signals.info.desc')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-divider">
                            <div className="p-2 bg-warning-50 text-warning-500 rounded-lg">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{t('signals.yellow.title')}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{t('signals.yellow.desc')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-divider">
                            <div className="p-2 bg-danger-50 text-danger-500 rounded-lg">
                                <AlertCircle size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{t('signals.red.title')}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{t('signals.red.desc')}</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Section 6: AI Limitations: False Signals */}
            <Card shadow="none" className="border border-divider bg-default-50/30 p-2">
                <CardBody className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold">{t('limitations.title')}</h3>
                        <p className="text-gray-500 text-xs">{t('limitations.subtitle')}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-orange-50/30 border border-orange-100 p-4 rounded-xl">
                            <p className="font-bold text-sm text-orange-900 mb-1">{t('limitations.positives.title')}</p>
                            <p className="text-xs text-orange-800 leading-relaxed">
                                {t('limitations.positives.desc')}
                            </p>
                        </div>
                        <div className="bg-default-100/30 border border-divider p-4 rounded-xl">
                            <p className="font-bold text-sm mb-1 text-gray-900">{t('limitations.negatives.title')}</p>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                {t('limitations.negatives.desc')}
                            </p>
                        </div>
                        <div className="bg-warning-50 border border-warning-200 p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-1.5 text-warning-700">
                                <AlertTriangle size={14} />
                                <p className="font-bold text-xs uppercase pr-2">{t('limitations.reminder.title')}</p>
                            </div>
                            <p className="text-xs text-warning-800 leading-relaxed font-bold italic">
                                {t('limitations.reminder.desc')}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Section 7: Emergency Resources */}
            <Card shadow="none" className="border-none bg-danger-50 p-2">
                <CardBody className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/50 rounded-lg text-danger-500">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-danger-900">{t('emergency.title')}</h3>
                            <p className="text-danger-700/80 text-xs">{t('emergency.subtitle')}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-white p-3 rounded-xl border border-danger-100 text-center">
                            <p className="text-xs font-medium text-gray-700">
                                {t('emergency.crisisLine')} <span className="text-danger font-bold">988</span>
                            </p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-danger-100 text-center">
                            <p className="text-xs font-medium text-gray-700">
                                {t('emergency.crisisText')} <span className="text-danger font-bold uppercase">{t('emergency.crisisTextAction')}</span>
                            </p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-danger-100 text-center">
                            <p className="text-xs font-medium text-gray-700">
                                {t('emergency.findTherapist')} <span className="text-danger font-bold">www.1116117.de</span>
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

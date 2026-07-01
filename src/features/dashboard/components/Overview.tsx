'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Select, SelectItem } from '@nextui-org/react';
import { Clock, CheckCircle, AlertTriangle, Info, Lock, ShieldAlert } from 'lucide-react';
import { Child } from '@/types/dashboard';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@nextui-org/react';

interface OverviewProps {
    children: Child[];
}

export function Overview({ children }: OverviewProps) {
    const t = useTranslations('Dashboard.overview_new');
    const [selectedChild, setSelectedChild] = useState<string>(children[0]?.id || '');
    const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
    const [riskAlerts, setRiskAlerts] = useState<any[]>([]);
    const [warnings, setWarnings] = useState<any[]>([]);
    const [isLoadingWarnings, setIsLoadingWarnings] = useState(false);

    const supabase = createClient();

    const fetchRisks = async () => {
        try {
            const { data, error } = await supabase
                .from('chat_messages')
                .select(`
                    id,
                    user_intent_summary,
                    user_intent_flag,
                    child_id,
                    children:children(nickname)
                `)
                .not('user_intent_flag', 'is', null)
                .neq('user_intent_flag', 'none')
                .eq('parent_reviewed', false);

            if (error) throw error;
            setRiskAlerts(data || []);
        } catch (err) {
            console.error('Error fetching risks:', err);
        }
    };

    useEffect(() => {
        fetchRisks();
    }, []);

    const fetchWarnings = async () => {
        if (!selectedChild) return;
        setIsLoadingWarnings(true);
        try {
            const days = timeRange === '7d' ? 7 : 30;
            const since = new Date();
            since.setDate(since.getDate() - days);

            const { data, error } = await supabase
                .from('chat_messages')
                .select('id, created_at, user_intent_summary, user_intent_flag, content')
                .eq('child_id', selectedChild)
                .gt('created_at', since.toISOString())
                .in('user_intent_flag', ['yellow', 'red'])
                .order('created_at', { ascending: false });

            if (error) throw error;
            setWarnings(data || []);
        } catch (err) {
            console.error('Error fetching warnings:', err);
        } finally {
            setIsLoadingWarnings(false);
        }
    };

    const handleAcknowledge = async (messageId: string) => {
        try {
            const { error } = await supabase
                .from('chat_messages')
                .update({ parent_reviewed: true })
                .eq('id', messageId);

            if (error) throw error;

            // Remove from local state
            setRiskAlerts(prev => prev.filter(alert => alert.id !== messageId));
        } catch (err) {
            console.error('Error acknowledging risk:', err);
        }
    };

    useEffect(() => {
        fetchWarnings();
    }, [selectedChild, timeRange]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            {/* 1. Current Risk Level - Most Important */}
            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="flex justify-between items-start pb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">{t('riskLevel')}</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Clock className="w-4 h-4" />
                            <span>{t('lastChecked')}</span>
                        </div>
                    </div>
                    <div className={`rounded-full p-3 ${riskAlerts.length > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                        {riskAlerts.length > 0 ? (
                            <AlertTriangle className="w-7 h-7 text-red-600" />
                        ) : (
                            <CheckCircle className="w-7 h-7 text-green-600" />
                        )}
                    </div>
                </CardHeader>
                <CardBody>
                    {riskAlerts.length > 0 ? (
                        <div className="space-y-4 mb-4">
                            {riskAlerts.map((alert) => (
                                <div key={alert.id} className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex gap-3">
                                        <div className="bg-red-100 p-2 rounded-full h-fit">
                                            <ShieldAlert className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-red-900 text-base mb-1">
                                                {alert.children?.nickname || 'Child'} - Risk Detected
                                            </h4>
                                            <p className="text-sm text-red-800 mb-1 leading-relaxed">
                                                {alert.user_intent_summary || "Potentially unsafe content detected."}
                                            </p>
                                            <p className="text-xs font-semibold text-red-700 mb-3">
                                                Pattern detected: {alert.user_intent_flag}
                                            </p>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="border border-red-200 text-red-700 hover:bg-red-100 font-medium"
                                                >
                                                    Get advice
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-600 text-white hover:bg-red-700 font-medium shadow-sm shadow-red-200"
                                                    onPress={() => handleAcknowledge(alert.id)}
                                                >
                                                    Mark acknowledged
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 animate-in fade-in">
                            <p className="text-xl font-bold text-green-800 mb-1">{t('noConcerns')}</p>
                            <p className="text-sm text-green-700">
                                {t('healthyPatterns')}
                            </p>
                        </div>
                    )}

                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm font-semibold text-gray-900 mb-3">{t('understandingSignals')}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-600">{t('signals.info')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-gray-600">{t('signals.yellow')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-gray-600">{t('signals.red')}</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* 2. Child Selector */}
            <Select
                label={t('viewingFor')}
                selectedKeys={[selectedChild]}
                onSelectionChange={(keys) => setSelectedChild(Array.from(keys)[0] as string)}
                className="max-w-md"
            >
                {children.map(child => (
                    <SelectItem key={child.id} textValue={child.nickname ?? 'Child'}>
                        {child.nickname ?? 'Child'}
                    </SelectItem>
                ))}
            </Select>

            {/* 3. Time Period Selector */}
            <div className="flex gap-3">
                <button
                    onClick={() => setTimeRange('7d')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${timeRange === '7d'
                        ? 'bg-[#889A7F] text-white border-[#889A7F]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#889A7F]'
                        }`}
                >
                    {t('timeRange.7d')}
                </button>
                <button
                    onClick={() => setTimeRange('30d')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${timeRange === '30d'
                        ? 'bg-[#889A7F] text-white border-[#889A7F]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#889A7F]'
                        }`}
                >
                    {t('timeRange.30d')}
                </button>
            </div>

            {/* 4. Warnings List */}
            <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                    <h2 className="text-lg font-bold text-gray-900">
                        {timeRange === '7d' ? t('warningsTitle7d') : t('warningsTitle30d')}
                    </h2>
                </CardHeader>
                <CardBody>
                    {isLoadingWarnings ? (
                        <div className="flex justify-center py-8">
                            <div className="text-gray-500">Loading...</div>
                        </div>
                    ) : warnings.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 italic">{t('noWarnings')}</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {warnings.map((warning) => (
                                <div key={warning.id} className={`border rounded-lg p-4 ${
                                    warning.user_intent_flag === 'red'
                                        ? 'bg-red-50 border-red-200'
                                        : 'bg-yellow-50 border-yellow-200'
                                }`}>
                                    <div className="flex gap-3">
                                        <div className={`flex-shrink-0 mt-1 ${
                                            warning.user_intent_flag === 'red'
                                                ? 'bg-red-100 p-2 rounded-full'
                                                : 'bg-yellow-100 p-2 rounded-full'
                                        }`}>
                                            <AlertTriangle className={`w-4 h-4 ${
                                                warning.user_intent_flag === 'red'
                                                    ? 'text-red-600'
                                                    : 'text-yellow-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                    <p className={`font-semibold mb-1 ${
                                                        warning.user_intent_flag === 'red'
                                                            ? 'text-red-900'
                                                            : 'text-yellow-900'
                                                    }`}>
                                                        {warning.user_intent_summary || t('warningText')}
                                                    </p>
                                                    <p className={`text-sm mb-2 ${
                                                        warning.user_intent_flag === 'red'
                                                            ? 'text-red-800'
                                                            : 'text-yellow-800'
                                                    }`}>
                                                        {warning.content}
                                                    </p>
                                                    <p className={`text-xs ${
                                                        warning.user_intent_flag === 'red'
                                                            ? 'text-red-700'
                                                            : 'text-yellow-700'
                                                    }`}>
                                                        {new Date(warning.created_at).toLocaleString('de-DE')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* 5. Important Disclaimer */}
            <Card className="bg-yellow-50 border border-yellow-200">
                <CardBody className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-yellow-900 mb-1">{t('disclaimer.title')}</p>
                        <p className="text-sm text-yellow-800">
                            {t('disclaimer.text')}
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* 6. Privacy Protection Notice */}
            <Card className="bg-green-50 border border-green-200">
                <CardBody className="flex gap-3">
                    <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-green-900">{t('privacy.title')}</h4>
                        <p className="text-xs md:text-sm text-green-700 mt-1">
                            {t('privacy.desc')}
                        </p>
                    </div>
                </CardBody>
            </Card>

        </div>
    );
}

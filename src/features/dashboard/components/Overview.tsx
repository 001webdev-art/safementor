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
                    user_intent_level,
                    parent_hint,
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
                .select('id, created_at, user_intent_summary, user_intent_flag, user_intent_level, parent_hint, content')
                .eq('child_id', selectedChild)
                .gt('created_at', since.toISOString())
                .in('user_intent_level', ['yellow', 'red'])
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
                            {riskAlerts.map((alert) => {
                                const isYellow = alert.user_intent_level === 'yellow' || alert.user_intent_level === 'gelb';
                                
                                // Determine child's role
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
                                    <div key={alert.id} className={`border rounded-xl p-4 animate-in fade-in slide-in-from-top-2 ${
                                        isYellow ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
                                    }`}>
                                        <div className="flex gap-3">
                                            <div className={`p-2 rounded-full h-fit ${isYellow ? 'bg-yellow-100' : 'bg-red-100'}`}>
                                                <ShieldAlert className={`w-5 h-5 ${isYellow ? 'text-yellow-600' : 'text-red-600'}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-bold text-base mb-1 ${isYellow ? 'text-yellow-900' : 'text-red-900'}`}>
                                                    {alert.children?.nickname || 'Child'} - {isYellow ? 'Warning Detected' : 'Risk Detected'}
                                                </h4>
                                                <p className={`text-sm mb-1 leading-relaxed ${isYellow ? 'text-yellow-800' : 'text-red-800'}`}>
                                                    {alert.user_intent_summary || "Potentially unsafe content detected."}
                                                </p>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs">
                                                    <span className={`font-semibold ${isYellow ? 'text-yellow-700' : 'text-red-700'}`}>
                                                        Pattern detected: {alert.user_intent_flag}
                                                    </span>
                                                    <span className={`font-semibold ${isYellow ? 'text-yellow-700' : 'text-red-700'}`}>
                                                        {t('roles.label')}: <span className="underline">{t(`roles.${roleKey}`)}</span>
                                                    </span>
                                                </div>

                                                {alert.parent_hint && (
                                                    <div className={`border rounded-lg p-3 mb-3 shadow-sm ${
                                                        isYellow ? 'bg-white border-yellow-100' : 'bg-white border-red-100'
                                                    }`}>
                                                        <p className={`text-xs font-bold mb-1 ${isYellow ? 'text-yellow-900' : 'text-blue-900'}`}>
                                                            {t('parentHint.title')}
                                                        </p>
                                                        <p className="text-sm text-gray-700 leading-relaxed italic mb-2">
                                                            {alert.parent_hint}
                                                        </p>
                                                        <p className="text-[10px] text-gray-400 border-t border-gray-100 pt-1 mt-1">
                                                            {t('parentHint.disclaimer')}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className={`border font-medium ${
                                                            isYellow 
                                                                ? 'border-yellow-200 text-yellow-700 hover:bg-yellow-100' 
                                                                : 'border-red-200 text-red-700 hover:bg-red-100'
                                                        }`}
                                                    >
                                                        Get advice
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className={`font-medium shadow-sm ${
                                                            isYellow 
                                                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-yellow-200' 
                                                                : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
                                                        }`}
                                                        onPress={() => handleAcknowledge(alert.id)}
                                                    >
                                                        Mark acknowledged
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                                    warning.user_intent_level === 'red'
                                        ? 'bg-red-50 border-red-200'
                                        : 'bg-yellow-50 border-yellow-200'
                                }`}>
                                    <div className="flex gap-3">
                                        <div className={`flex-shrink-0 mt-1 ${
                                            warning.user_intent_level === 'red'
                                                ? 'bg-red-100 p-2 rounded-full'
                                                : 'bg-yellow-100 p-2 rounded-full'
                                        }`}>
                                            <AlertTriangle className={`w-4 h-4 ${
                                                warning.user_intent_level === 'red'
                                                    ? 'text-red-600'
                                                    : 'text-yellow-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                    <p className={`font-semibold mb-1 ${
                                                        warning.user_intent_level === 'red'
                                                            ? 'text-red-900'
                                                            : 'text-yellow-900'
                                                    }`}>
                                                        {warning.user_intent_summary || t('warningText')}
                                                    </p>
                                                    <p className={`text-sm mb-2 ${
                                                        warning.user_intent_level === 'red'
                                                            ? 'text-red-800'
                                                            : 'text-yellow-800'
                                                    }`}>
                                                        {warning.content}
                                                    </p>
                                                    <p className={`text-xs ${
                                                        warning.user_intent_level === 'red'
                                                            ? 'text-red-700'
                                                            : 'text-yellow-700'
                                                    }`}>
                                                        {new Date(warning.created_at).toLocaleString('de-DE')}
                                                    </p>

                                                    {warning.parent_hint && (
                                                        <div className="bg-white border border-gray-200 rounded-lg p-3 mt-3 shadow-sm">
                                                            <p className="text-xs font-bold text-gray-900 mb-1">{t('parentHint.title')}</p>
                                                            <p className="text-sm text-gray-700 leading-relaxed italic mb-2">
                                                                {warning.parent_hint}
                                                            </p>
                                                            <p className="text-[10px] text-gray-400 border-t border-gray-100 pt-1 mt-1">
                                                                {t('parentHint.disclaimer')}
                                                            </p>
                                                        </div>
                                                    )}
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

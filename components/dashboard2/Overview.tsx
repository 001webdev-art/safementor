'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Select, SelectItem } from '@nextui-org/react';
import { Clock, CheckCircle, AlertTriangle, Info, Loader2, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Child, SafetyAlert, EmotionTrend, DashboardService } from '@/types/dashboard2';
import { useTranslations } from 'next-intl';

interface OverviewProps {
    children: Child[];
    alerts: SafetyAlert[];
    onNavigate: (view: string) => void;
}

export function Overview({ children, alerts, onNavigate }: OverviewProps) {
    const t = useTranslations('Dashboard.overview_new');
    const [selectedChild, setSelectedChild] = useState<string>(children[0]?.id || '');
    const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
    const [trends, setTrends] = useState<EmotionTrend[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedChild) {
            setIsLoading(true);
            DashboardService.getEmotionTrends(selectedChild, timeRange === '7d' ? 7 : 30)
                .then(data => {
                    setTrends(data);
                    setIsLoading(false);
                });
        }
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
                    <div className="bg-green-100 rounded-full p-3">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                        <p className="text-xl font-bold text-green-800 mb-1">{t('noConcerns')}</p>
                        <p className="text-sm text-green-700">
                            {t('healthyPatterns')}
                        </p>
                    </div>

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
                    <SelectItem key={child.id} textValue={child.nickname}>
                        {child.nickname}
                    </SelectItem>
                ))}
            </Select>

            {/* 3. Time Period Selector */}
            <div className="flex gap-3">
                <button
                    onClick={() => setTimeRange('7d')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                        timeRange === '7d'
                            ? 'bg-[#889A7F] text-white border-[#889A7F]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#889A7F]'
                    }`}
                >
                    {t('timeRange.7d')}
                </button>
                <button
                    onClick={() => setTimeRange('30d')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                        timeRange === '30d'
                            ? 'bg-[#889A7F] text-white border-[#889A7F]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-[#889A7F]'
                    }`}
                >
                    {t('timeRange.30d')}
                </button>
            </div>

            {/* 4. Emotional Trend Summary Chart */}
            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">{t('trendTitle')}</h2>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-xs text-gray-500">{t('legend.positive')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            <span className="text-xs text-gray-500">{t('legend.neutral')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <span className="text-xs text-gray-500">{t('legend.needsSupport')}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="text-sm text-gray-600 mb-4">{t('patterns')}</p>
                    <div className="h-80">
                        {isLoading ? (
                            <div className="h-full flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-[#889A7F]" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trends}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <YAxis hide domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
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

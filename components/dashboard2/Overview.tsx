'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Select, SelectItem } from '@nextui-org/react';
import { Bell, Clock, CheckCircle, AlertTriangle, Info, Loader2, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Child, SafetyAlert, EmotionTrend, DashboardService } from '@/types/dashboard2';

interface OverviewProps {
    children: Child[];
    alerts: SafetyAlert[];
    onNavigate: (view: string) => void;
}

export function Overview({ children, alerts, onNavigate }: OverviewProps) {
    const activeAlertCount = alerts.filter(a => a.type !== 'info').length;

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
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Overview</h1>
                <p className="text-gray-600">Welcome back! Here's your child safety summary.</p>
            </div>

            <Card className="bg-yellow-50 border border-yellow-200">
                <CardBody className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-yellow-900 mb-1">⚠️ Important Note:</p>
                        <p className="text-sm text-yellow-800">
                            SafeMentor looks for patterns that may indicate risk. It cannot see everything and may
                            miss or misinterpret signals. This tool supports—but does not replace—your relationship
                            with your child.
                        </p>
                    </div>
                </CardBody>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="flex justify-between items-start pb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Current Risk Level</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Clock className="w-4 h-4" />
                            <span>Last checked: Just now</span>
                        </div>
                    </div>
                    <div className="bg-green-100 rounded-full p-3">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                        <p className="text-xl font-bold text-green-800 mb-1">No Concerns Detected</p>
                        <p className="text-sm text-green-700">
                            Your child's conversations show healthy patterns. Continue regular check-ins.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm font-semibold text-gray-900 mb-3">Understanding Risk Signals:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-600">Info: General patterns</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-gray-600">Yellow: Potential concern</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-gray-600">Red: Immediate action</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-gray-200">
                    <CardBody>
                        <p className="text-xs text-gray-500 mb-1">Active Alerts</p>
                        <p className="text-2xl font-bold text-gray-900">{activeAlertCount}</p>
                        <button
                            onClick={() => onNavigate('notifications')}
                            className="text-xs text-green-600 mt-2 hover:underline"
                        >
                            View Details →
                        </button>
                    </CardBody>
                </Card>

                <Card className="border border-gray-200">
                    <CardBody>
                        <p className="text-xs text-gray-500 mb-1">Children Monitored</p>
                        <p className="text-2xl font-bold text-gray-900">{children.length}</p>
                        <button
                            onClick={() => onNavigate('settings')}
                            className="text-xs text-green-600 mt-2 hover:underline"
                        >
                            Manage Devices →
                        </button>
                    </CardBody>
                </Card>

                <Card className="border border-gray-200">
                    <CardBody>
                        <p className="text-xs text-gray-500 mb-1">Privacy Status</p>
                        <p className="text-sm font-semibold text-green-600">Protected</p>
                        <button
                            onClick={() => onNavigate('privacy')}
                            className="text-xs text-green-600 mt-2 hover:underline"
                        >
                            View Details →
                        </button>
                    </CardBody>
                </Card>
            </div>

            <div className="pt-10 border-t border-gray-200">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Emotional Trends</h2>
                    <p className="text-gray-600 text-sm">Aggregated insights into your child's wellbeing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Select
                        label="Viewing Data For"
                        selectedKeys={[selectedChild]}
                        onSelectionChange={(keys) => setSelectedChild(Array.from(keys)[0] as string)}
                        className="md:col-span-2"
                    >
                        {children.map(child => (
                            <SelectItem key={child.id} textValue={child.nickname}>
                                {child.nickname}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        label="Time Period"
                        selectedKeys={[timeRange]}
                        onSelectionChange={(keys) => setTimeRange(Array.from(keys)[0] as '7d' | '30d')}
                    >
                        <SelectItem key="7d" textValue="Last 7 Days">Last 7 Days</SelectItem>
                        <SelectItem key="30d" textValue="Last 30 Days">Last 30 Days</SelectItem>
                    </Select>
                </div>

                <Card className="border border-gray-200 shadow-sm mb-6">
                    <CardHeader className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Sentiment Analysis</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-xs text-gray-500">Positive</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                <span className="text-xs text-gray-500">Neutral</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <span className="text-xs text-gray-500">Concern</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="h-80">
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="border border-gray-200">
                        <CardBody>
                            <p className="text-xs text-gray-500 mb-1">Total Sessions Analyzed</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </CardBody>
                    </Card>
                    <Card className="border border-gray-200">
                        <CardBody>
                            <p className="text-xs text-gray-500 mb-1">Average Sentiment</p>
                            <p className="text-2xl font-bold text-green-600">Positive</p>
                        </CardBody>
                    </Card>
                    <Card className="border border-gray-200">
                        <CardBody>
                            <p className="text-xs text-gray-500 mb-1">Safety Alerts</p>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                        </CardBody>
                    </Card>
                </div>

                <Card className="bg-green-50 border border-green-200">
                    <CardBody className="flex gap-3">
                        <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-green-900">Privacy Protection Active</h4>
                            <p className="text-xs md:text-sm text-green-700 mt-1">
                                Only aggregated emotional trends are shown. Individual messages remain private to protect
                                your child's confidential space. Safety alerts are shown separately if AI detects concerning patterns.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>

        </div>
    );
}

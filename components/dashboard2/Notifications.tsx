'use client';

import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { Bell, AlertTriangle } from 'lucide-react';
import { SafetyAlert } from '@/types/dashboard2';

interface NotificationsProps {
    alerts: SafetyAlert[];
}

export function Notifications({ alerts }: NotificationsProps) {
    const redAlerts = alerts.filter(a => a.type === 'red');
    const otherAlerts = alerts.filter(a => a.type !== 'red');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Notifications</h1>
                <p className="text-gray-600">Monitor and respond to safety alerts for your children.</p>
            </div>

            {redAlerts.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
                    <div className="space-y-3">
                        {redAlerts.map(alert => (
                            <Card key={alert.id} className="border-2 border-red-300 bg-red-50">
                                <CardHeader className="flex justify-between items-start pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-600 text-white">
                                            RED FLAG
                                        </span>
                                        <span className="text-sm text-gray-500">{alert.timestamp}</span>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <p className="text-lg font-bold text-gray-900 mb-3">{alert.title}</p>

                                    {alert.quote && (
                                        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                                            <p className="text-sm text-gray-700 italic">"{alert.quote}"</p>
                                        </div>
                                    )}

                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                        <p className="text-sm font-bold text-red-900 mb-3">Guidance</p>
                                        <ol className="space-y-2 text-sm text-red-900 list-decimal list-inside">
                                            <li>Talk to an expert, helpline 988</li>
                                            <li>Stay calm and be gentle</li>
                                            <li>Have a caring conversation</li>
                                        </ol>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Button size="sm" color="danger" variant="solid">
                                            Get Immediate Help
                                        </Button>
                                        <Button size="sm" variant="bordered">
                                            Mark as Reviewed
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            <Card className="bg-yellow-50 border border-yellow-200">
                <CardBody className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-yellow-900 mb-1">⚠️ Important:</p>
                        <p className="text-sm text-yellow-800">
                            SafeMentor <span className="font-bold underline">is not</span> a human expert and{" "}
                            <span className="font-bold underline">can make errors</span>. For help,{" "}
                            <span className="font-bold underline">please always first contact a human expert</span>.
                        </p>
                    </div>
                </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                <CardHeader>
                    <h3 className="text-lg font-bold text-red-900">🆘 Emergency Resources</h3>
                </CardHeader>
                <CardBody className="space-y-3">
                    <div className="bg-white border border-red-100 rounded-xl p-4 text-center">
                        <p className="font-bold text-gray-900">Crisis Helpline: <span className="text-red-600">988</span></p>
                    </div>
                    <div className="bg-white border border-red-100 rounded-xl p-4 text-center">
                        <p className="font-bold text-gray-900">Local Emergency: <span className="text-red-600">112</span></p>
                    </div>
                </CardBody>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                    <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
                </CardHeader>
                <CardBody>
                    {otherAlerts.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">No recent notifications</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {otherAlerts.map(alert => (
                                <div
                                    key={alert.id}
                                    className={`border rounded-xl p-4 ${alert.type === 'yellow'
                                        ? 'bg-yellow-50 border-yellow-200'
                                        : 'bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${alert.type === 'yellow'
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-gray-500 text-white'
                                                }`}>
                                                {alert.type === 'yellow' ? 'Yellow Flag' : 'Info'}
                                            </span>
                                            <p className="text-sm font-semibold text-gray-900 ml-2">{alert.title}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="bordered">
                                            Get Advice
                                        </Button>
                                        <Button size="sm" variant="bordered">
                                            Mark Acknowledged
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                <CardHeader>
                    <h3 className="text-lg font-bold text-gray-900">What to Do Next</h3>
                </CardHeader>
                <CardBody>
                    <p className="text-sm text-gray-700 mb-4">
                        Immediate safety concerns should be addressed directly. Use our guide for conversation starters.
                    </p>
                    <Button color="success" className="w-full">
                        Read Crisis Guide
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

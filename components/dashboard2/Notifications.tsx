'use client';

import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { AlertTriangle, Phone } from 'lucide-react';
import { SafetyAlert } from '@/types/dashboard2';

interface NotificationsProps {
    alerts: SafetyAlert[];
}

export function Notifications({ alerts }: NotificationsProps) {
    const redAlerts = alerts.filter(a => a.type === 'red');
    const otherAlerts = alerts.filter(a => a.type !== 'red');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Notifications</h1>
                <p className="text-gray-600">Monitor and respond to safety alerts for your children.</p>
            </div>

            {/* Active Alerts Section */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
                
                {redAlerts.length > 0 ? (
                    <div className="space-y-4">
                        {redAlerts.map(alert => (
                            <Card key={alert.id} className="border-2 border-red-300 bg-red-50">
                                <CardBody className="p-6">
                                    {/* Alert Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-3 py-1 rounded text-xs font-bold bg-red-600 text-white">
                                            RED FLAG
                                        </span>
                                        <span className="text-sm text-gray-600">{alert.timestamp}</span>
                                    </div>

                                    {/* Alert Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        {alert.title}
                                    </h3>

                                    {/* Quote */}
                                    {alert.quote && (
                                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                                            <p className="text-sm text-gray-700 italic">"{alert.quote}"</p>
                                        </div>
                                    )}

                                    {/* Guidance Box */}
                                    <div className="bg-white border border-red-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm font-bold text-red-900 mb-3">Guidance</p>
                                        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                                            <li>Talk to an expert, helpline <span className="font-semibold">988</span></li>
                                            <li>Stay calm and be gentle</li>
                                            <li>Have a caring conversation</li>
                                        </ol>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border border-gray-200">
                        <CardBody className="py-8 text-center text-gray-500">
                            <p className="text-sm">No active alerts at this time</p>
                        </CardBody>
                    </Card>
                )}
            </div>

            {/* Important Disclaimer */}
            <Card className="bg-yellow-50 border border-yellow-200">
                <CardBody className="flex gap-3 p-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-yellow-900 mb-1">⚠️ Important:</p>
                        <p className="text-sm text-yellow-800">
                            SafeMentor <span className="font-bold">is not</span> a human expert and{" "}
                            <span className="font-bold">can make errors</span>. For help,{" "}
                            <span className="font-bold">please always first contact a human expert</span>.
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Need to Talk? Find Support Now */}
            <Card className="border border-gray-200 bg-gray-50">
                <CardBody className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Need to Talk? Find Support Now</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        If you have immediate safety concerns, there is professional help:
                    </p>
                    
                    <div className="space-y-3">
                        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-center">
                            <p className="text-sm font-bold text-gray-900">
                                Crisis Helpline: <span className="text-red-600 text-lg">988</span>
                            </p>
                        </div>
                        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-center">
                            <p className="text-sm font-bold text-gray-900">
                                Local Emergency Services: <span className="text-red-600 text-lg">112</span>
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Recent Safety Notifications */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Safety Notifications</h2>
                
                {otherAlerts.length > 0 ? (
                    <div className="space-y-3">
                        {otherAlerts.map(alert => (
                            <Card 
                                key={alert.id} 
                                className={`border ${
                                    alert.type === 'yellow' 
                                        ? 'bg-yellow-50 border-yellow-200' 
                                        : 'bg-green-50 border-green-200'
                                }`}
                            >
                                <CardBody className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                alert.type === 'yellow' 
                                                    ? 'bg-yellow-500 text-white' 
                                                    : 'bg-gray-500 text-white'
                                            }`}>
                                                {alert.type === 'yellow' ? 'Yellow' : 'Info'}
                                            </span>
                                            <p className="text-sm font-bold text-gray-900">{alert.title}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                                    
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="bordered" className="border-gray-300">
                                            Get Advice
                                        </Button>
                                        <Button size="sm" variant="bordered" className="border-gray-300">
                                            Mark Acknowledged
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                        
                        {/* View All Link */}
                        <button className="w-full text-center text-sm text-[#889A7F] hover:underline py-2">
                            View All Notifications →
                        </button>
                    </div>
                ) : (
                    <Card className="border border-gray-200">
                        <CardBody className="py-8 text-center text-gray-500">
                            <p className="text-sm">No recent notifications</p>
                        </CardBody>
                    </Card>
                )}
            </div>

            {/* What to Do Next */}
            <Card className="bg-gray-50 border border-gray-200">
                <CardBody className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">What to Do Next</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Immediate safety concerns should be addressed directly. Use our guide for conversation starters.
                    </p>
                    <Button 
                        className="w-full bg-[#889A7F] text-white hover:bg-[#748866]"
                    >
                        Read Crisis Guide
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

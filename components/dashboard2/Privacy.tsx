'use client';

import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { Lock, Shield, Globe, Trash2, Download, XCircle } from 'lucide-react';

export function Privacy() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Data & Privacy</h1>
                <p className="text-gray-600">How we protect your family's information.</p>
            </div>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-lg">Legal Basis for Processing (GDPR)</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">
                            EU Compliant
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Why we're allowed to process your child's data</p>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="space-y-3">
                        <div className="border-l-4 border-green-600 pl-4 py-2 bg-green-50 rounded-r-lg">
                            <p className="text-sm font-bold text-green-900">Child Safety (Vital Interests)</p>
                            <p className="text-sm text-green-700">AI analysis to detect and prevent harm to children</p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 rounded-r-lg">
                            <p className="text-sm font-bold text-blue-900">Service Operation (Contractual Necessity)</p>
                            <p className="text-sm text-blue-700">Technical processing required to deliver the AI companion service</p>
                        </div>
                        <div className="border-l-4 border-purple-600 pl-4 py-2 bg-purple-50 rounded-r-lg">
                            <p className="text-sm font-bold text-purple-900">Legitimate Interest (With Safeguards)</p>
                            <p className="text-sm text-purple-700">Improving safety features while protecting child privacy</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                    <h3 className="font-bold text-gray-900 text-lg">Data Access, Visibility and Deletion</h3>
                    <p className="text-sm text-gray-600 mt-1">Aligned with GDPR principles</p>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4" /> What You See (Data Visibility):
                        </p>
                        <ul className="text-sm text-green-700 space-y-1 ml-6">
                            <li>• Aggregated emotional trends only</li>
                            <li>• Safety alerts with minimal context</li>
                            <li>• No raw chat logs or surveillance</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <p className="text-sm font-bold text-yellow-900 mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> What You Can Request (Data Access Rights):
                        </p>
                        <ul className="text-sm text-yellow-700 space-y-1 ml-6">
                            <li>• Under GDPR, you may request full data access</li>
                            <li>• This is exceptional and requires legal justification</li>
                            <li>• All requests are logged and reviewed</li>
                            <li>• Protects child's dignity and trust</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-sm font-bold text-red-900 mb-2 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" /> Automatic Data Deletion:
                        </p>
                        <p className="text-sm text-red-700">
                            After 30 days, all conversation data is permanently deleted from our servers (GDPR compliance)
                        </p>
                    </div>
                </CardBody>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                    <h3 className="font-bold text-gray-900 text-lg">Your GDPR Rights</h3>
                    <p className="text-sm text-gray-600 mt-1">Manage your data and privacy preferences</p>
                </CardHeader>
                <CardBody className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                            <p className="text-sm font-bold text-gray-900">Right to Access</p>
                            <p className="text-xs text-gray-600">Download a copy of all data we hold</p>
                        </div>
                        <Button size="sm" startContent={<Download className="w-4 h-4" />} variant="bordered">
                            Request Export
                        </Button>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                            <p className="text-sm font-bold text-gray-900">Right to Erasure</p>
                            <p className="text-xs text-gray-600">Permanently delete all stored data</p>
                        </div>
                        <Button size="sm" startContent={<Trash2 className="w-4 h-4" />} color="danger" variant="bordered">
                            Delete Data
                        </Button>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                            <p className="text-sm font-bold text-gray-900">Right to Object</p>
                            <p className="text-xs text-gray-600">Withdraw consent and stop processing</p>
                        </div>
                        <Button size="sm" startContent={<XCircle className="w-4 h-4" />} color="warning" variant="bordered">
                            Withdraw Consent
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

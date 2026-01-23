'use client';

import { Card, CardBody, CardHeader, Button, Select, SelectItem, Input } from '@nextui-org/react';
import { User, Trash2, QrCode, Pause } from 'lucide-react';
import { Child } from '@/types/dashboard2';

interface SettingsProps {
    children: Child[];
}

export function Settings({ children }: SettingsProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account and safety preferences.</p>
            </div>

            <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-900">Child Management</h3>
                        <p className="text-sm text-gray-500">Connect and manage child devices</p>
                    </div>
                    <Button color="success" startContent={<User className="w-4 h-4" />}>
                        Add Child
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className="space-y-4">
                        {children.map(child => (
                            <div key={child.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                            {child.nickname.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{child.nickname}</p>
                                            <p className="text-xs text-gray-500">{child.device}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <Button size="sm" variant="bordered" startContent={<QrCode className="w-3.5 h-3.5" />}>
                                            QR Code
                                        </Button>
                                        <Button size="sm" variant="bordered" startContent={<Pause className="w-3.5 h-3.5" />}>
                                            Pause
                                        </Button>
                                        <Button size="sm" variant="bordered" color="danger" startContent={<Trash2 className="w-3.5 h-3.5" />}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">{child.nickname}'s Settings</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input
                                            label="Nickname"
                                            defaultValue={child.nickname}
                                            size="sm"
                                        />
                                        <Input
                                            label="Birthdate (MM/YY)"
                                            defaultValue="05/18"
                                            size="sm"
                                        />
                                        <Select label="Language" size="sm" defaultSelectedKeys={['en']}>
                                            <SelectItem key="en" textValue="English">English</SelectItem>
                                            <SelectItem key="pt" textValue="Portuguese">Portuguese</SelectItem>
                                            <SelectItem key="de" textValue="German">German</SelectItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

'use client';

import { Button } from '@nextui-org/react';
import {
    Shield, BarChart3, Bell, Settings, Lock, LogOut,
    Menu, X
} from 'lucide-react';
import { useState } from 'react';

interface DashboardNavProps {
    currentView: string;
    onNavigate: (view: string) => void;
    alertCount: number;
}

export function DashboardNav({ currentView, onNavigate, alertCount }: DashboardNavProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'overview', label: 'Overview', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'privacy', label: 'Privacy', icon: Lock },
    ];

    const MobileToggle = () => (
        <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
    );

    return (
        <>
            <MobileToggle />

            <aside className={`
                fixed md:static inset-y-0 left-0 z-40
                w-64 bg-white border-r border-gray-200
                transform transition-transform duration-300
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
                flex flex-col h-full
            `}>
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">SafeMentor</p>
                            <p className="text-xs text-green-600 font-medium">Parent Dashboard</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <Button
                            key={id}
                            variant="light"
                            className={`
                                w-full justify-start text-left
                                ${currentView === id ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700'}
                            `}
                            startContent={<Icon className="w-5 h-5" />}
                            onPress={() => {
                                onNavigate(id);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <div className="flex justify-between items-center w-full">
                                <span>{label}</span>
                                {id === 'notifications' && alertCount > 0 && (
                                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {alertCount}
                                    </span>
                                )}
                            </div>
                        </Button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Button
                        variant="light"
                        color="danger"
                        className="w-full justify-start text-left"
                        startContent={<LogOut className="w-5 h-5" />}
                        onPress={() => {
                            window.location.href = '/login';
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </aside>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}

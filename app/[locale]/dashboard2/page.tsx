'use client';

import { useState, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import { Child, SafetyAlert, DashboardService } from '@/types/dashboard2';
import { Overview } from '@/components/dashboard2/Overview';
import { Notifications } from '@/components/dashboard2/Notifications';
import { Settings } from '@/components/dashboard2/Settings';
import { Privacy } from '@/components/dashboard2/Privacy';
import { DashboardNav } from '@/components/dashboard2/DashboardNav';

type ViewState = 'overview' | 'notifications' | 'settings' | 'privacy';

export default function Dashboard2Page() {
    const [currentView, setCurrentView] = useState<ViewState>('overview');
    const [children, setChildren] = useState<Child[]>([]);
    const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Simulating API calls
                const [childData, alertData] = await Promise.all([
                    DashboardService.getChildren(),
                    DashboardService.getAlerts()
                ]);
                setChildren(childData);
                setAlerts(alertData);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Spinner size="lg" color="success" />
                <p className="ml-3 text-gray-600">Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="h-screen flex bg-gray-50">
            <DashboardNav
                currentView={currentView}
                onNavigate={(view) => setCurrentView(view as ViewState)}
                alertCount={alerts.length}
            />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 md:p-10">
                    {currentView === 'overview' && (
                        <Overview children={children} alerts={alerts} onNavigate={(view) => setCurrentView(view as ViewState)} />
                    )}
                    {currentView === 'notifications' && <Notifications alerts={alerts} />}
                    {currentView === 'settings' && <Settings children={children} />}
                    {currentView === 'privacy' && <Privacy />}
                </div>
            </main>
        </div>
    );
}

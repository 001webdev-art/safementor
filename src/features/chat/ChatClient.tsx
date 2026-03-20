'use client';

import React, { useEffect, useState } from 'react';
import ChatFooter from './components/ChatFooter';
import WelcomeSection from './components/screens/WelcomeSection';
import ProfileSection from './components/screens/ProfileSection';
import { ChatScreen } from './components/screens/ChatScreen';
import { HelpScreen } from './components/screens/HelpScreen';
import { ExitScreen } from './components/screens/ExitScreen';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';

export default function ChatClient() {
    const router = useRouter();
    const currentLocale = useLocale();
    const [mounted, setMounted] = useState(false);
    const [currentView, setCurrentView] = useState('hello');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        setMounted(true);

        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push('/');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isAuthenticated, router]);

    if (!mounted) return null;

    if (isAuthenticated === false) {
        return (
            <div className="flex flex-col items-center justify-center h-dvh bg-[#f0f2f5] dark:bg-[#111b21] p-6 text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-red-500">
                        I am very sorry, but you are not logged
                    </h1>
                    <p className="text-lg text-default-600">
                        Redirecting to Home page in {countdown} seconds
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        color="primary"
                        variant="solid"
                        onPress={() => router.push(`/${currentLocale}/login`)}
                        className="font-bold"
                    >
                        Login
                    </Button>
                    <Button
                        color="default"
                        variant="flat"
                        onPress={() => router.push('/')}
                    >
                        Go to Home Page
                    </Button>
                </div>
            </div>
        );
    }

    // Show loading state while checking auth
    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center h-dvh bg-[#f0f2f5] dark:bg-[#111b21]">
                <div className="animate-pulse text-default-500">Checking authentication...</div>
            </div>
        );
    }

    const renderContent = () => {
        switch (currentView) {
            case 'hello':
                return <WelcomeSection onNavigate={setCurrentView} />;
            case 'chat':
                return <ChatScreen onNavigate={setCurrentView} />;
            case 'help':
                return <HelpScreen onNavigate={setCurrentView} />;
            case 'exit':
                return <ExitScreen onNavigate={setCurrentView} />;
            case 'profile':
                return <ProfileSection />;
            default:
                return <WelcomeSection onNavigate={setCurrentView} />;
        }
    };

    return (
        <div className="flex flex-col h-dvh bg-[#f0f2f5] dark:bg-[#111b21] overflow-hidden">
            <main className="flex-1 overflow-hidden relative">
                {renderContent()}
            </main>

            {currentView !== 'hello' && currentView !== 'exit' && (
                <ChatFooter currentView={currentView} onViewChange={setCurrentView} />
            )}
        </div>
    );
}

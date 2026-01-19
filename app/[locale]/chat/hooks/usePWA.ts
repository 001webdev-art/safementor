'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

export function usePWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [debugInfo, setDebugInfo] = useState({
        secureContext: false,
        serviceWorker: 'checking',
        beforeInstallPrompt: 'not_fired',
    });

    const locale = useLocale();

    useEffect(() => {
        // Check secure context
        setDebugInfo(prev => ({ ...prev, secureContext: window.isSecureContext }));

        // Manual Service Worker Registration for isolation
        const isChatRoute = window.location.pathname.includes(`/${locale}/chat`);
        console.log('usePWA: checking context', {
            pathname: window.location.pathname,
            expectedPrefix: `/${locale}/chat`,
            isChatRoute,
            locale
        });

        if ('serviceWorker' in navigator && isChatRoute) {
            console.log('usePWA: attempting to register /sw-chat.js with scope:', `/${locale}/chat`);
            navigator.serviceWorker.register('/sw-chat.js', {
                scope: `/${locale}/chat`
            }).then(
                (registration) => {
                    console.log('SW: registered successfully', registration.scope);
                    setDebugInfo(prev => ({
                        ...prev,
                        serviceWorker: 'registered'
                    }));
                },
                (err) => {
                    console.error('SW: registration failed', err);
                    setDebugInfo(prev => ({
                        ...prev,
                        serviceWorker: 'failed'
                    }));
                }
            );
        } else if ('serviceWorker' in navigator) {
            console.log('usePWA: not in chat route or SW not supported, checking existing registrations');
            navigator.serviceWorker.getRegistration().then(reg => {
                console.log('SW: current registration:', reg ? reg.scope : 'none');
                setDebugInfo(prev => ({
                    ...prev,
                    serviceWorker: reg ? 'registered' : 'not_registered'
                }));
            });
        } else {
            setDebugInfo(prev => ({ ...prev, serviceWorker: 'not_supported' }));
        }

        const handler = (e: any) => {
            console.log('usePWA: beforeinstallprompt captured');
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
            setDebugInfo(prev => ({ ...prev, beforeInstallPrompt: 'fired' }));
        };

        // 1. Check if we already have it globally
        if ((window as any).deferredPWAPrompt) {
            console.log('usePWA: using existing global deferredPWAPrompt');
            handler((window as any).deferredPWAPrompt);
        }

        // 2. Listen for the custom event from our layout script
        const onAvailable = (e: any) => {
            console.log('usePWA: captured via pwa-prompt-available event');
            handler(e.detail);
        };

        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('pwa-prompt-available', onAvailable);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('pwa-prompt-available', onAvailable);
        };
    }, []);

    const installApp = async () => {
        if (!deferredPrompt) {
            alert(`Debug Info:\n- Secure: ${debugInfo.secureContext}\n- SW: ${debugInfo.serviceWorker}\n- Event: ${debugInfo.beforeInstallPrompt}\n\nChrome requires HTTPS and a registered Service Worker to show the install prompt.`);
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setIsInstallable(false);
    };

    return { isInstallable, installApp, debugInfo };
}

'use client';

import { useState, useEffect } from 'react';

export function usePWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [debugInfo, setDebugInfo] = useState({
        secureContext: false,
        serviceWorker: 'checking',
        beforeInstallPrompt: 'not_fired',
    });

    useEffect(() => {
        // Check secure context
        setDebugInfo(prev => ({ ...prev, secureContext: window.isSecureContext }));

        // Manual Service Worker Registration for isolation
        if ('serviceWorker' in navigator && window.location.pathname.includes('/chat')) {
            navigator.serviceWorker.register('/app/${locale}/chat/sw.js').then(
                (registration) => {
                    console.log('SW: registered successfully', registration.scope);
                    setDebugInfo(prev => ({
                        ...prev,
                        serviceWorker: 'registered'
                    }));
                },
                (err) => {
                    console.log('SW: registration failed', err);
                    setDebugInfo(prev => ({
                        ...prev,
                        serviceWorker: 'failed'
                    }));
                }
            );
        } else if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(reg => {
                setDebugInfo(prev => ({
                    ...prev,
                    serviceWorker: reg ? 'registered' : 'not_registered'
                }));
            });
        } else {
            setDebugInfo(prev => ({ ...prev, serviceWorker: 'not_supported' }));
        }

        const handler = (e: any) => {
            console.log('beforeinstallprompt fired'); // Debug log
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
            setDebugInfo(prev => ({ ...prev, beforeInstallPrompt: 'fired' }));
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
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

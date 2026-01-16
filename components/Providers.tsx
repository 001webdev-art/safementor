'use client';

import { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if ('serviceWorker' in navigator && window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
            const swUrl = '/sw.js';
            navigator.serviceWorker.register(swUrl)
                .then((registration) => {
                    console.log('PWA Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('PWA Service Worker registration failed:', error);
                });
        }
    }, []);

    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}

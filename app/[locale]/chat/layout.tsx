import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }) {
    const { locale } = params;
    return {
        manifest: `/${locale}/chat/manifest.json`,
        appleWebApp: {
            capable: true,
            statusBarStyle: 'default',
            title: 'Safementor Chat',
        },
        formatDetection: {
            telephone: false,
        },
        other: {
            'mobile-web-app-capable': 'yes',
        }
    };
}

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

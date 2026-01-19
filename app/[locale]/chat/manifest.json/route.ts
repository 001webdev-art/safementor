import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { locale: string } }
) {
    const locale = params.locale;

    const manifest = {
        "name": "Safementor - AI Chat PWA",
        "short_name": "Safementor",
        "description": "Secure and intelligent AI Chat for your daily needs.",
        "start_url": `/${locale}/chat`,
        "id": `/${locale}/chat`,
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#006FEE",
        "orientation": "portrait",
        "scope": `/${locale}/chat/`,
        "icons": [
            {
                "src": "/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ]
    };

    return NextResponse.json(manifest);
}

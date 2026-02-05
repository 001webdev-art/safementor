import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './i18n/config'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'as-needed'
})

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Check for password cookie
  const isAuthenticated = req.cookies.get('site-access')?.value === 'true'
  const isAccessPage = pathname.endsWith('/access')
  
  // Skip check for API routes or static files (handled by matcher, but good to be explicit for logic flow)
  if (pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // If not authenticated and not on access page, redirect
  if (!isAuthenticated && !isAccessPage) {
    // Attempt to preserve locale if present
    const localeMatch = locales.find(loc => pathname.startsWith(`/${loc}`))
    const locale = localeMatch || defaultLocale
    
    return NextResponse.redirect(new URL(`/${locale}/access`, req.url))
  }

  // If authenticated and on access page, redirect to home
  if (isAuthenticated && isAccessPage) {
     const localeMatch = locales.find(loc => pathname.startsWith(`/${loc}`))
     const locale = localeMatch || defaultLocale
     return NextResponse.redirect(new URL(`/${locale}`, req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
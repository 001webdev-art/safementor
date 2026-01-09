<<<<<<< HEAD
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
=======
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
}
<<<<<<< HEAD
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Define os idiomas suportados
export type Locale = 'en' | 'pt' | 'es' | 'de'
export const locales: Locale[] = ['en', 'pt', 'es', 'de']
export const defaultLocale: Locale = 'pt'
export const localePrefix = 'as-needed'

// Configura o next-intl
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Valida se o locale é suportado
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
=======
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Define os idiomas suportados
export type Locale = 'en' | 'pt' | 'es' | 'de'
export const locales: Locale[] = ['en', 'pt', 'es', 'de']
export const defaultLocale: Locale = 'pt'
export const localePrefix = 'as-needed'

// Configura o next-intl
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Valida se o locale é suportado
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
})
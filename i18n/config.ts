import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Define os idiomas suportados
export type Locale = 'en' | 'pt' | 'es' | 'de'
export const locales: Locale[] = ['en', 'pt', 'es', 'de']
export const defaultLocale: Locale = 'en'
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
})
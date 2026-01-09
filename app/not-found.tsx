import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

// This is the global 404 page.
// It is a Server Component to avoid hydration issues and 
// efficiently redirect root-level 404s to the default locale.
export default function GlobalNotFound() {
    redirect(`/${defaultLocale}`);
}

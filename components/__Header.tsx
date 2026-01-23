'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { locales, defaultLocale } from '@/i18n/config'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button
} from '@nextui-org/react';
import {
  UserCircle,
  LayoutDashboard,
  LogOut,
  LifeBuoy,
  LogIn,
  UserPlus,
  MessageSquare
} from 'lucide-react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Translations
  const t = useTranslations('Header');
  const tNav = useTranslations('Navigation');
  const tDash = useTranslations('Dashboard');

  // Extract current locale from URL
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLocale = locales.includes(pathSegments[0] as any)
    ? pathSegments[0]
    : defaultLocale;

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const switchLanguage = (newLocale: string) => {
    if (pathname.startsWith(`/${currentLocale}`)) {
      const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPathname);
    } else {
      const newPathname = `/${newLocale}${pathname}`;
      router.push(newPathname);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${currentLocale}`);
  };

  const getFlag = (locale: string) => {
    switch (locale) {
      case 'pt': return '🇧🇷';
      case 'en': return '🇺🇸';
      case 'es': return '🇪🇸';
      case 'de': return '🇩🇪';
      default: return '🌐';
    }
  };

  if (isLoading) {
    return (
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-divider">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="h-8 bg-default-200 rounded animate-pulse w-32" />
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-default-200 rounded-full animate-pulse" />
            <div className="h-10 w-10 bg-default-200 rounded-full animate-pulse" />
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-divider">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href={`/${currentLocale}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-400">
              {t('title')}
            </span>
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Minimalist Language Selector */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                radius="full"
                size="sm"
                className="text-lg"
              >
                {getFlag(currentLocale)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Language selection"
              onAction={(key) => switchLanguage(key as string)}
              selectedKeys={[currentLocale]}
              selectionMode="single"
            >
              {locales.map((locale) => (
                <DropdownItem
                  key={locale}
                  startContent={<span className="text-lg">{getFlag(locale)}</span>}
                >
                  {tNav(locale as any)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Pop-up User Menu */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="flat"
                color="primary"
                radius="full"
                className="w-10 h-10"
              >
                <UserCircle size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              {isLoggedIn ? (
                <DropdownSection>
                  <DropdownItem
                    key="dashboard"
                    startContent={<LayoutDashboard size={18} />}
                    onClick={() => router.push(`/${currentLocale}/dashboard`)}
                  >
                    {tDash('title')}
                  </DropdownItem>
                  <DropdownItem
                    key="chat"
                    startContent={<MessageSquare size={18} />}
                    onClick={() => router.push(`/${currentLocale}/chat`)}
                  >
                    Chat
                  </DropdownItem>
                  <DropdownItem
                    key="help"
                    startContent={<LifeBuoy size={18} />}
                    onClick={() => router.push(`/${currentLocale}/dashboard`)}
                  >
                    {tDash('sections.help')}
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    startContent={<LogOut size={18} />}
                    onClick={handleLogout}
                  >
                    {t('logout')}
                  </DropdownItem>
                </DropdownSection>
              ) : (
                <DropdownSection>
                  <DropdownItem
                    key="login"
                    startContent={<LogIn size={18} />}
                    onClick={() => router.push(`/${currentLocale}/login`)}
                  >
                    {t('login')}
                  </DropdownItem>
                  <DropdownItem
                    key="register"
                    startContent={<UserPlus size={18} />}
                    onClick={() => router.push(`/${currentLocale}/register`)}
                  >
                    {t('register')}
                  </DropdownItem>
                </DropdownSection>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}
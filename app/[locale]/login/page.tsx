<<<<<<< HEAD
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardBody, Input, Button, Link as NextUILink, Divider } from '@nextui-org/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const router = useRouter()
  const supabase = createClient()
  const currentLocale = useLocale()

  const t = useTranslations('Auth')
  const tLogin = useTranslations('LoginPage')
  const tErrors = useTranslations('Errors')
  const tHeader = useTranslations('Header')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push(`/${currentLocale}/dashboard`)
      router.refresh()
    } catch (err: any) {
      setError(err.message || tErrors('generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="max-w-[400px] w-full p-2">
        <CardHeader className="flex flex-col gap-1 items-center pb-0">
          <h2 className="text-2xl font-bold text-center">
            {tLogin('title')}
          </h2>
          <p className="text-sm text-default-500">
            {t('signIn')} {tHeader('title')}
          </p>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input
              label={t('email')}
              placeholder={tLogin('emailPlaceholder')}
              type="email"
              variant="bordered"
              isRequired
              value={email}
              onValueChange={setEmail}
              isDisabled={loading}
              className="mt-2"
            />
            <Input
              label={t('password')}
              placeholder={t('password')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              value={password}
              onValueChange={setPassword}
              isDisabled={loading}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <svg className="text-2xl text-default-400 pointer-events-none" fill="none" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg className="text-2xl text-default-400 pointer-events-none" fill="none" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.74-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              }
            />

            {error && (
              <div className="bg-danger-50 text-danger text-xs p-3 rounded-lg border border-danger-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="mt-2 font-bold"
              fullWidth
            >
              {t('signIn')}
            </Button>

            <Divider className="my-2" />

            <p className="text-center text-sm text-default-500">
              {t('dontHaveAccount')}{' '}
              <NextUILink
                as={Link}
                href={`/${currentLocale}/register`}
                size="sm"
                className="font-bold"
              >
                {t('createAccount')}
              </NextUILink>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  )
=======
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardBody, Input, Button, Link as NextUILink, Divider } from '@nextui-org/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const router = useRouter()
  const supabase = createClient()
  const currentLocale = useLocale()

  const t = useTranslations('Auth')
  const tLogin = useTranslations('LoginPage')
  const tErrors = useTranslations('Errors')
  const tHeader = useTranslations('Header')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push(`/${currentLocale}/dashboard`)
      router.refresh()
    } catch (err: any) {
      setError(err.message || tErrors('generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="max-w-[400px] w-full p-2">
        <CardHeader className="flex flex-col gap-1 items-center pb-0">
          <h2 className="text-2xl font-bold text-center">
            {tLogin('title')}
          </h2>
          <p className="text-sm text-default-500">
            {t('signIn')} {tHeader('title')}
          </p>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input
              label={t('email')}
              placeholder={tLogin('emailPlaceholder')}
              type="email"
              variant="bordered"
              isRequired
              value={email}
              onValueChange={setEmail}
              isDisabled={loading}
              className="mt-2"
            />
            <Input
              label={t('password')}
              placeholder={t('password')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              value={password}
              onValueChange={setPassword}
              isDisabled={loading}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <svg className="text-2xl text-default-400 pointer-events-none" fill="none" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg className="text-2xl text-default-400 pointer-events-none" fill="none" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.74-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              }
            />

            {error && (
              <div className="bg-danger-50 text-danger text-xs p-3 rounded-lg border border-danger-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="mt-2 font-bold"
              fullWidth
            >
              {t('signIn')}
            </Button>

            <Divider className="my-2" />

            <p className="text-center text-sm text-default-500">
              {t('dontHaveAccount')}{' '}
              <NextUILink
                as={Link}
                href={`/${currentLocale}/register`}
                size="sm"
                className="font-bold"
              >
                {t('createAccount')}
              </NextUILink>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  )
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
}
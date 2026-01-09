<<<<<<< HEAD
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Card, CardHeader, CardBody, Input, Button, Link as NextUILink, Divider } from '@nextui-org/react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const router = useRouter()
  const currentLocale = useLocale()
  const supabase = createClient()

  const t = useTranslations('Auth')
  const tRegister = useTranslations('RegisterPage')
  const tErrors = useTranslations('Errors')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError(tErrors('passwordMismatch'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      alert(tRegister('successMessage'))
      router.push(`/${currentLocale}/login`)
    } catch (err: any) {
      setError(err.message || tErrors('generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="max-w-[400px] w-full p-2 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center pb-0">
          <h2 className="text-2xl font-bold text-center">
            {tRegister('title')}
          </h2>
          <p className="text-sm text-default-500">
            {t('createAccount')}
          </p>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <Input
              label={t('email')}
              placeholder={tRegister('emailPlaceholder')}
              type="email"
              variant="bordered"
              isRequired
              value={email}
              onValueChange={setEmail}
              isDisabled={loading}
              autoComplete="email"
            />

            <Input
              label={t('password')}
              placeholder={tRegister('passwordPlaceholder')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              value={password}
              onValueChange={setPassword}
              isDisabled={loading}
              autoComplete="new-password"
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

            <Input
              label={t('confirmPassword')}
              placeholder={tRegister('passwordPlaceholder')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              isDisabled={loading}
              autoComplete="new-password"
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
              {loading ? t('loading') : tRegister('title')}
            </Button>

            <Divider className="my-2" />

            <p className="text-center text-sm text-default-500">
              {t('alreadyHaveAccount')}{' '}
              <NextUILink
                as={Link}
                href={`/${currentLocale}/login`}
                size="sm"
                className="font-bold"
              >
                {t('signIn')}
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
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Card, CardHeader, CardBody, Input, Button, Link as NextUILink, Divider } from '@nextui-org/react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const router = useRouter()
  const currentLocale = useLocale()
  const supabase = createClient()

  const t = useTranslations('Auth')
  const tRegister = useTranslations('RegisterPage')
  const tErrors = useTranslations('Errors')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError(tErrors('passwordMismatch'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      alert(tRegister('successMessage'))
      router.push(`/${currentLocale}/login`)
    } catch (err: any) {
      setError(err.message || tErrors('generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="max-w-[400px] w-full p-2 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center pb-0">
          <h2 className="text-2xl font-bold text-center">
            {tRegister('title')}
          </h2>
          <p className="text-sm text-default-500">
            {t('createAccount')}
          </p>
        </CardHeader>

        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <Input
              label={t('email')}
              placeholder={tRegister('emailPlaceholder')}
              type="email"
              variant="bordered"
              isRequired
              value={email}
              onValueChange={setEmail}
              isDisabled={loading}
              autoComplete="email"
            />

            <Input
              label={t('password')}
              placeholder={tRegister('passwordPlaceholder')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              value={password}
              onValueChange={setPassword}
              isDisabled={loading}
              autoComplete="new-password"
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

            <Input
              label={t('confirmPassword')}
              placeholder={tRegister('passwordPlaceholder')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              isDisabled={loading}
              autoComplete="new-password"
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
              {loading ? t('loading') : tRegister('title')}
            </Button>

            <Divider className="my-2" />

            <p className="text-center text-sm text-default-500">
              {t('alreadyHaveAccount')}{' '}
              <NextUILink
                as={Link}
                href={`/${currentLocale}/login`}
                size="sm"
                className="font-bold"
              >
                {t('signIn')}
              </NextUILink>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  )
>>>>>>> 91de5cabbcfa46eb587b93b07c41c682e2e5faf9
}
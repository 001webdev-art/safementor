'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardBody, Input, Button, Link as NextUILink, Divider } from '@nextui-org/react'
import { EyeOpenIcon, EyeClosedIcon } from '@/components/landing/SafeMentorIcons'

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
                  {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
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
}
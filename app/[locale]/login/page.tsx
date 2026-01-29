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
      <Card className="max-w-[400px] w-full p-2 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in duration-500">
        <CardHeader className="flex flex-col gap-1 items-center pb-2 pt-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {tLogin('title')}
          </h2>
          <p className="text-sm text-gray-500">
            {t('signIn')} {tHeader('title')}
          </p>
        </CardHeader>

        <CardBody className="px-6 pb-8 pt-2">
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                label={t('email')}
                placeholder={tLogin('emailPlaceholder')}
                type="email"
                variant="bordered"
                isRequired
                value={email}
                onValueChange={setEmail}
                isDisabled={loading}
                classNames={{
                  inputWrapper: "group-data-[focus=true]:border-[#889A7F] transition-colors rounded-xl border-gray-200",
                  label: "text-gray-600 font-medium"
                }}
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
                classNames={{
                  inputWrapper: "group-data-[focus=true]:border-[#889A7F] transition-colors rounded-xl border-gray-200",
                  label: "text-gray-600 font-medium"
                }}
                endContent={
                  <button className="focus:outline-none text-gray-400 hover:text-gray-600 transition-colors" type="button" onClick={toggleVisibility}>
                    {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                }
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 animate-in shake duration-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              isLoading={loading}
              className="bg-[#889A7F] hover:bg-[#748866] text-white font-semibold py-6 rounded-xl transition-all shadow-sm hover:shadow-md"
              fullWidth
            >
              {t('signIn')}
            </Button>

            <div className="flex items-center gap-4 my-2">
              <Divider className="flex-1 bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">oder</span>
              <Divider className="flex-1 bg-gray-100" />
            </div>

            <p className="text-center text-sm text-gray-500">
              {t('dontHaveAccount')}{' '}
              <NextUILink
                as={Link}
                href={`/${currentLocale}/register`}
                className="font-bold text-[#889A7F] hover:text-[#748866] transition-colors"
                size="sm"
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
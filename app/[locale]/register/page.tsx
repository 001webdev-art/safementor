'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Card, CardHeader, CardBody, Input, Button, Link as NextUILink, Divider } from '@nextui-org/react'
import { ComplianceFrame } from './ComplianceFrame'
import { EyeOpenIcon, EyeClosedIcon } from '@/components/landing/SafeMentorIcons'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showCompliance, setShowCompliance] = useState(true)
  const [complianceData, setComplianceData] = useState({
    agreed: false,
    helpImprove: false,
    safetyAnalysis: false
  })

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('compliance_data')
    if (savedData) {
      try {
        setComplianceData(JSON.parse(savedData))
      } catch (e) {
        console.error('Error parsing compliance data from localStorage', e)
      }
    }
  }, [])

  // Persistence to localStorage
  const saveComplianceToLocal = (data: typeof complianceData) => {
    localStorage.setItem('compliance_data', JSON.stringify(data))
  }

  const handleComplianceChange = (field: string, value: boolean) => {
    setComplianceData(prev => {
      const newData = { ...prev, [field]: value }
      saveComplianceToLocal(newData)
      return newData
    })
  }

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

    let signUpError: any = null

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            terms_agreed1: complianceData.agreed,
            terms_help_improve: complianceData.helpImprove,
            terms_allow_anonymous_safety_analysis: complianceData.safetyAnalysis,
            // also include others if needed by the trigger
            firstname: '',
            lastname: ''
          }
        },
      })

      signUpError = error

      if (signUpError) {
        // Handle email conflict
        if (signUpError.message.includes('User already registered') || (signUpError.status === 400 && signUpError.message.includes('already'))) {
          setError(tErrors('emailConflict'))
          setLoading(false)
          setTimeout(() => {
            router.push(`/${currentLocale}/login`)
          }, 3000)
          return
        }
        throw signUpError
      }

      alert(tRegister('successMessage'))
      router.push(`/${currentLocale}/login`)
    } catch (err: any) {
      setError(err.message || tErrors('generic'))
    } finally {
      if (!signUpError || !signUpError.message?.includes('User already registered')) {
        setLoading(false)
      }
    }
  }

  if (showCompliance) {
    return (
      <ComplianceFrame
        complianceData={complianceData}
        onDataChange={handleComplianceChange}
        onAccept={() => setShowCompliance(false)}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="max-w-[400px] w-full p-4 border border-gray-200 shadow-sm rounded-2xl">
        <CardHeader className="flex flex-col gap-1 items-center pb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {tRegister('title')}
          </h2>
          <p className="text-sm text-gray-500 font-medium">
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
              classNames={{
                inputWrapper: "border-gray-300 hover:border-[#889A7F] focus-within:border-[#889A7F]"
              }}
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
              classNames={{
                inputWrapper: "border-gray-300 hover:border-[#889A7F] focus-within:border-[#889A7F]"
              }}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
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
              classNames={{
                inputWrapper: "border-gray-300 hover:border-[#889A7F] focus-within:border-[#889A7F]"
              }}
            />

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              isLoading={loading}
              className="mt-2 bg-[#889A7F] text-white hover:bg-[#748866] font-bold"
              fullWidth
            >
              {loading ? t('loading') : tRegister('title')}
            </Button>

            <Divider className="my-2" />

            <p className="text-center text-sm text-gray-500 font-medium">
              {t('alreadyHaveAccount')}{' '}
              <NextUILink
                as={Link}
                href={`/${currentLocale}/login`}
                size="sm"
                className="font-bold text-[#889A7F] hover:text-[#748866]"
              >
                {t('signIn')}
              </NextUILink>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
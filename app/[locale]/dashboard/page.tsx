import Header from '@/components/__Header'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import DashboardClient from './DashboardClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Dashboard' })

  return {
    title: t('title'),
  }
}

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect(`/${locale}/login`)
  }

  // Simplified user object for client component
  const user = {
    id: session.user.id,
    email: session.user.email,
    created_at: session.user.created_at,
  }

  return (
    <div className="min-h-screen bg-gray-50/10">
      <Header />
      <DashboardClient user={user} />
    </div>
  )
}
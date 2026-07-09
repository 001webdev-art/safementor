import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAdminDashboardData } from '@/features/admin/services/dashboardService'
import { AdminDashboardClient } from '@/features/admin/components/AdminDashboardClient'

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // If not logged in, redirect to login
  if (!session) {
    redirect(`/${locale}/login?redirectTo=admin`)
  }

  const data = await getAdminDashboardData()

  // If not authorized (not admin), redirect to dashboard
  if (!data.authorized) {
    redirect(`/${locale}/dashboard`)
  }

  return <AdminDashboardClient data={data} />
}

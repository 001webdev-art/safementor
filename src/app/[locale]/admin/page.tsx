import { redirect } from 'next/navigation'
import { getAdminDashboardData } from '@/features/admin/services/dashboardService'
import { AdminDashboardClient } from '@/features/admin/components/AdminDashboardClient'

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = await getAdminDashboardData()

  if (!data.authorized) {
    redirect(`/${locale}/dashboard`)
  }

  return <AdminDashboardClient data={data} />
}

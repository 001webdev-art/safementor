import Header from '@/components/Header'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Bem-vindo, {session.user.email}!
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Você está logado e esta página é protegida.
        </div>
      </main>
    </>
  )
}
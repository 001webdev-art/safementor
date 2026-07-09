'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, BarChart3, BellRing, MessageSquareText, ShieldAlert, Sparkles, TrendingUp, Users, Eye, EyeOff } from 'lucide-react'
import { SummaryCard } from '@/features/admin/components/SummaryCard'
import { CostTrendChart } from '@/features/admin/components/CostTrendChart'
import { AlertBreakdownChart } from '@/features/admin/components/AlertBreakdownChart'
import { ModelUsageChart } from '@/features/admin/components/ModelUsageChart'
import type { AdminDashboardData } from '@/features/admin/types'
import { createClient } from '@/lib/supabase/client'

interface AdminDashboardClientProps {
  data: AdminDashboardData
}

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString('en-GB', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export function AdminDashboardClient({ data }: AdminDashboardClientProps) {
  const [alertCount, setAlertCount] = useState(5)
  const [revealedMessageId, setRevealedMessageId] = useState<string | null>(null)
  const [revealedContent, setRevealedContent] = useState<string | null>(null)
  const [pendingRevealId, setPendingRevealId] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmingReveal, setIsConfirmingReveal] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const supabase = createClient()

  const visibleAlerts = useMemo(() => data.recentAlerts.slice(0, alertCount), [alertCount, data.recentAlerts])

  const handleRevealRequest = (alertId: string) => {
    setPendingRevealId(alertId)
    setPassword('')
    setPasswordError('')
    setIsConfirmingReveal(true)
    setIsPasswordVisible(false)
  }

  const handleRevealConfirm = async () => {
    if (!pendingRevealId) {
      return
    }

    setIsRevealing(true)
    setPasswordError('')

    try {
      // Privacy-first access flow:
      // 1. The admin must provide the same password used for login.
      // 2. The password is verified through Supabase auth before the full message is revealed.
      // 3. The full content is never stored in client cache and is fetched server-side only after verification.
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email ?? '',
        password,
      })

      if (error || !authData.session) {
        setPasswordError('Password is incorrect or the session could not be verified.')
        return
      }

      // Fetch the message content from the server only after password verification
      const response = await fetch(`/api/admin/message-content?messageId=${encodeURIComponent(pendingRevealId)}`)
      if (!response.ok) {
        setPasswordError('Unable to retrieve message content.')
        return
      }

      const data = await response.json()
      setRevealedContent(data.content)
      setRevealedMessageId(pendingRevealId)
      setPendingRevealId(null)
      setIsConfirmingReveal(false)
      setIsPasswordVisible(false)
      setPassword('')
    } catch {
      setPasswordError('Unable to verify your password at the moment.')
    } finally {
      setIsRevealing(false)
    }
  }

  const renderAlertContent = (alert: (typeof data.recentAlerts)[number]) => {
    const isRevealed = revealedMessageId === alert.id

    if (!isRevealed) {
      const maskedText = `${'*'.repeat(Math.max(20, 20))}...`
      return (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
          <div className="min-w-0 flex-1 text-sm text-slate-400">
            <div className="mb-1 font-medium text-slate-300">Protected message preview</div>
            <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono tracking-[0.2em] text-slate-500">{maskedText}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="group relative">
              <button
                type="button"
                className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20"
                onClick={() => handleRevealRequest(alert.id)}
              >
                Show message
              </button>
              <span className="pointer-events-none absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-xs text-slate-300 opacity-0 shadow-lg transition group-hover:opacity-100">
                Important operation
              </span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-100">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">Message unlocked</span>
          <button type="button" className="text-sm text-emerald-200 underline" onClick={() => { setRevealedMessageId(null); setRevealedContent(null) }}>
            OK
          </button>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-6 text-emerald-50">{revealedContent || 'No content available'}</p>
      </div>
    )
  }

  if (!data.authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
        <div className="max-w-md rounded-2xl border border-red-900/50 bg-red-950/40 p-8 text-center text-red-200">
          <p className="text-lg font-semibold">Access denied</p>
          <p className="mt-2 text-sm text-red-300">Only users marked as admin in the Supabase profiles table can access this dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.10),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] p-6 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-sky-300">
                <Sparkles size={14} />
                SafeMentor Admin
              </div>
              <h1 className="mt-4 text-3xl font-semibold text-white">Operations intelligence</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Safementor Admin Dashboard - overview of cost, safety, and engagement signals for the safementor platform.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              <p className="font-medium">Live signal snapshot</p>
              <p className="mt-1 text-xs text-emerald-300/80">Updated from chat and profile data.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="Total messages" value={data.metrics.totalMessages.toString()} icon={<MessageSquareText size={18} />} />
          <SummaryCard title="Total users" value={data.metrics.totalUsers.toString()} icon={<Users size={18} />} />
          <SummaryCard title="Total children" value={data.metrics.totalChildren.toString()} icon={<Users size={18} />} />
          <SummaryCard title="Total cost" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.metrics.totalCost)} icon={<BarChart3 size={18} />} />
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <SummaryCard title="Total alerts" value={data.metrics.totalAlerts.toString()} hint="From alert_level field" icon={<BellRing size={18} />} />
          <SummaryCard title="Yellow alerts" value={data.metrics.yellowAlerts.toString()} hint="Warning level" icon={<ShieldAlert size={18} />} />
          <SummaryCard title="Red alerts" value={data.metrics.redAlerts.toString()} hint="Critical level" icon={<AlertCircle size={18} />} />
          <SummaryCard title="Unverified alerts" value={data.metrics.unverifiedAlerts.toString()} hint="The Alert messages not reviewed by the parents" icon={<AlertCircle size={18} />} />
          <SummaryCard title="Active users" value={data.metrics.activeUsers.toString()} hint="Last 7 days with chat activity" icon={<TrendingUp size={18} />} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <CostTrendChart data={data.costTrend} />
          <AlertBreakdownChart data={data.alertBreakdown} />
        </div>

        <ModelUsageChart data={data.modelUsage} />

        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent alerts</h3>
              <p className="text-sm text-slate-400">The latest messages flagged by the safety layer. The content is shown privately and only after a password confirmation.</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2">
              <label className="text-sm text-slate-400" htmlFor="alert-count">
                Show
              </label>
              <input
                id="alert-count"
                type="number"
                min="1"
                max="20"
                value={alertCount}
                onChange={(event) => setAlertCount(Number(event.target.value || 1))}
                className="w-16 rounded-xl border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-100 outline-none ring-0"
              />
              <span className="text-sm text-slate-400">alerts</span>
            </div>
          </div>

          {isConfirmingReveal ? (
            <div className="mb-4 rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4 text-sm text-sky-100">
              <div className="mb-2 font-medium">Confirm access to the protected message</div>
              <p className="text-sm text-sky-200/90">
                By typing your password to see this message, you will be logged accordingly to the GDPR Rules.
              </p>
              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end">
                <label className="flex-1 text-sm text-sky-100">
                  Password
                  <div className="mt-1 flex items-center rounded-2xl border border-sky-400/30 bg-slate-950/60 px-3 py-2">
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="flex-1 bg-transparent text-sm text-white outline-none"
                      placeholder="Enter your login password"
                    />
                    <button type="button" className="ml-2 text-sky-200" onClick={() => setIsPasswordVisible((value) => !value)}>
                      {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>
                <div className="flex gap-2">
                  <button type="button" className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200" onClick={() => { setPendingRevealId(null); setIsConfirmingReveal(false); setPassword(''); setPasswordError('') }}>
                    Cancel
                  </button>
                  <button type="button" className="rounded-2xl bg-sky-500 px-3 py-2 text-sm font-medium text-white" onClick={handleRevealConfirm} disabled={isRevealing}>
                    {isRevealing ? 'Checking…' : 'Confirm'}
                  </button>
                </div>
              </div>
              {passwordError ? <p className="mt-2 text-sm text-rose-200">{passwordError}</p> : null}
            </div>
          ) : null}

          <div className="space-y-3">
            {data.recentAlerts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-6 text-center text-sm text-slate-500">
                No recent alerts available.
              </div>
            ) : (
              visibleAlerts.map((alert) => (
                <div key={alert.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-white">{alert.childName}</p>
                      <p className="text-sm text-slate-400">{formatTimestamp(alert.timestamp)}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${alert.alertLevel === 'red' ? 'bg-rose-500/15 text-rose-300' : 'bg-amber-500/15 text-amber-300'}`}>
                      {alert.alertLevel}
                    </span>
                  </div>
                  {renderAlertContent(alert)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

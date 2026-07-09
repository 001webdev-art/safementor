import { createClient } from '@/lib/supabase/server'
import type {
  AdminDashboardData,
  AdminDashboardMetrics,
  AlertBreakdownPoint,
  CostTrendPoint,
  RecentAlert,
} from '@/features/admin/types'

const emptyMetrics: AdminDashboardMetrics = {
  totalMessages: 0,
  totalUsers: 0,
  totalChildren: 0,
  totalCost: 0,
  flaggedMessages: 0,
  totalAlerts: 0,
  yellowAlerts: 0,
  redAlerts: 0,
  unverifiedAlerts: 0,
  avgCostPerMessage: 0,
  activeUsers: 0,
}

const emptyDashboard: AdminDashboardData = {
  authorized: false,
  metrics: emptyMetrics,
  costTrend: [],
  alertBreakdown: [],
  modelUsage: [],
  recentAlerts: [],
}

function toCurrency(value: number) {
  return Number(value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

function normalizeAlertLevel(value: string | null | undefined) {
  const normalized = String(value ?? '').trim().toLowerCase()

  if (!normalized || normalized === 'none' || normalized === 'null' || normalized === 'undefined') {
    return 'none'
  }

  if (['yellow', 'amber', 'orange', 'warning', 'moderate', 'medium', 'low'].includes(normalized)) {
    return 'yellow'
  }

  if (['red', 'critical', 'high', 'urgent', 'danger', 'severe'].includes(normalized)) {
    return 'red'
  }

  return normalized
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return emptyDashboard
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('admin')
    .eq('id', session.user.id)
    .maybeSingle()

  if (profileError || !profile?.admin) {
    if (profileError) {
      console.error('Admin access lookup failed', profileError)
    }

    return emptyDashboard
  }

  const [{ data: messagesData }, { data: profilesData }, { data: childrenData }] = await Promise.all([
    supabase
      .from('chat_messages')
      .select('id, child_id, timestamp, total_cost, user_intent_level, alert_level, parent_reviewed, content, model_used')
      .order('timestamp', { ascending: false }),
    supabase.from('profiles').select('id, created_at'),
    supabase.from('children').select('id, parent_id, childrenname'),
  ])

  const messages = messagesData ?? []
  const profiles = profilesData ?? []
  const children = childrenData ?? []

  const totalMessages = messages.length
  const totalCost = messages.reduce((sum, item) => sum + Number(item.total_cost || 0), 0)
  const normalizedAlerts = messages.map((item) => normalizeAlertLevel((item as { alert_level?: string | null; user_intent_level?: string | null }).alert_level ?? (item as { alert_level?: string | null; user_intent_level?: string | null }).user_intent_level))
  const totalAlerts = normalizedAlerts.filter((level) => level !== 'none').length
  const yellowAlerts = normalizedAlerts.filter((level) => level === 'yellow').length
  const redAlerts = normalizedAlerts.filter((level) => level === 'red').length
  const unverifiedAlerts = messages.filter((item) => {
    const level = normalizeAlertLevel((item as { alert_level?: string | null; user_intent_level?: string | null }).alert_level ?? (item as { alert_level?: string | null; user_intent_level?: string | null }).user_intent_level)
    return level !== 'none' && !item.parent_reviewed
  }).length
  const flaggedMessages = totalAlerts
  const avgCostPerMessage = totalMessages > 0 ? totalCost / totalMessages : 0

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentMessageChildIds = new Set(
    messages
      .filter((item) => item.timestamp && new Date(item.timestamp) >= sevenDaysAgo)
      .map((item) => item.child_id)
  )
  const activeUsers = Array.from(
    new Set(
      children
        .filter((child) => recentMessageChildIds.has(child.id))
        .map((child) => child.parent_id)
        .filter(Boolean)
    )
  ).length

  const trendMap = new Map<string, CostTrendPoint>()
  messages.forEach((message) => {
    const rawDate = message.timestamp ? new Date(message.timestamp) : new Date()
    const date = rawDate.toISOString().split('T')[0]
    const entry = trendMap.get(date) ?? { date, cost: 0, messages: 0 }
    entry.cost += Number(message.total_cost || 0)
    entry.messages += 1
    trendMap.set(date, entry)
  })

  const costTrend = Array.from(trendMap.values()).sort((a, b) => a.date.localeCompare(b.date)).slice(-14)

  const alertBreakdownMap = new Map<string, number>()
  messages.forEach((message) => {
    const level = normalizeAlertLevel((message as { alert_level?: string | null; user_intent_level?: string | null }).alert_level ?? (message as { alert_level?: string | null; user_intent_level?: string | null }).user_intent_level)
    if (level === 'none') return
    const current = alertBreakdownMap.get(level) ?? 0
    alertBreakdownMap.set(level, current + 1)
  })

  const alertBreakdown: AlertBreakdownPoint[] = Array.from(alertBreakdownMap.entries()).map(([name, value]) => ({
    name,
    value,
  }))

  const modelUsageMap = new Map<string, number>()
  messages.forEach((message) => {
    const modelName = (message as { model_used?: string | null }).model_used || 'unknown'
    const current = modelUsageMap.get(modelName) ?? 0
    modelUsageMap.set(modelName, current + 1)
  })

  const modelUsage = Array.from(modelUsageMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  const childNameMap = new Map(children.map((child) => [child.id, child.childrenname || 'Unknown child']))
  const recentAlerts: RecentAlert[] = messages
    .filter((item) => {
      const level = normalizeAlertLevel((item as { alert_level?: string | null; user_intent_level?: string | null }).alert_level ?? (item as { alert_level?: string | null; user_intent_level?: string | null }).user_intent_level)
      return level !== 'none'
    })
    .slice(0, 8)
    .map((item) => ({
      id: item.id,
      childName: childNameMap.get(item.child_id) || 'Unknown child',
      alertLevel: normalizeAlertLevel((item as { alert_level?: string | null; user_intent_level?: string | null }).alert_level ?? (item as { alert_level?: string | null; user_intent_level?: string | null }).user_intent_level),
      timestamp: item.timestamp || new Date().toISOString(),
      probability: 0,
    }))

  const metrics: AdminDashboardMetrics = {
    totalMessages,
    totalUsers: profiles.length,
    totalChildren: children.length,
    totalCost,
    flaggedMessages,
    totalAlerts,
    yellowAlerts,
    redAlerts,
    unverifiedAlerts,
    avgCostPerMessage,
    activeUsers,
  }

  return {
    authorized: true,
    metrics,
    costTrend,
    alertBreakdown,
    modelUsage,
    recentAlerts,
  }
}

export { toCurrency }

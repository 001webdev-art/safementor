export interface AdminDashboardMetrics {
  totalMessages: number
  totalUsers: number
  totalChildren: number
  totalCost: number
  flaggedMessages: number
  totalAlerts: number
  yellowAlerts: number
  redAlerts: number
  unverifiedAlerts: number
  avgCostPerMessage: number
  activeUsers: number
}

export interface CostTrendPoint {
  date: string
  cost: number
  messages: number
}

export interface AlertBreakdownPoint {
  name: string
  value: number
}

export interface RecentAlert {
  id: string
  childName: string
  alertLevel: string
  timestamp: string
  probability: number
}

export interface ModelUsagePoint {
  name: string
  count: number
}

export interface AdminDashboardData {
  authorized: boolean
  metrics: AdminDashboardMetrics
  costTrend: CostTrendPoint[]
  alertBreakdown: AlertBreakdownPoint[]
  modelUsage: ModelUsagePoint[]
  recentAlerts: RecentAlert[]
}

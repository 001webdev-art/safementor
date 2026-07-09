'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export interface ModelUsagePoint {
  name: string
  count: number
}

interface ModelUsageChartProps {
  data: ModelUsagePoint[]
}

export function ModelUsageChart({ data }: ModelUsageChartProps) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Model usage</h3>
        <p className="text-sm text-slate-400">How frequently each model is being used across the platform.</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

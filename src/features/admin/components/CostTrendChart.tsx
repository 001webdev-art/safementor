'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { CostTrendPoint } from '@/features/admin/types'

interface CostTrendChartProps {
  data: CostTrendPoint[]
}

export function CostTrendChart({ data }: CostTrendChartProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">API Tokens Cost trend</h3>
        <p className="text-sm text-slate-400">Daily cost for input/output tokens and message volume over the last two weeks.</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="cost" stroke="#38bdf8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

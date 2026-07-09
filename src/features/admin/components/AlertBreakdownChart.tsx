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
import type { AlertBreakdownPoint } from '@/features/admin/types'

interface AlertBreakdownChartProps {
  data: AlertBreakdownPoint[]
}

export function AlertBreakdownChart({ data }: AlertBreakdownChartProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Alert distribution</h3>
        <p className="text-sm text-slate-400">How safety alerts are distributed by severity.</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

'use client'

import type { ReactNode } from 'react'

interface SummaryCardProps {
  title: string
  value: string
  hint?: string
  icon?: ReactNode
}

export function SummaryCard({ title, value, hint, icon }: SummaryCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/25 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
          {hint ? <p className="mt-1 text-sm text-slate-500">{hint}</p> : null}
        </div>
        {icon ? <div className="rounded-2xl border border-slate-700/80 bg-slate-800/80 p-2 text-slate-200 shadow-inner shadow-slate-950/20">{icon}</div> : null}
      </div>
    </div>
  )
}

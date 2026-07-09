export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="h-32 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
      </div>
    </div>
  )
}

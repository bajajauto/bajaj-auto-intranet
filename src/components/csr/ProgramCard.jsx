import { iconMap } from '@/components/shared/iconMap'

export default function ProgramCard({ program }) {
  const Icon = iconMap[program.icon] ?? iconMap.Circle

  return (
    <div className="site-surface group flex flex-col gap-3 rounded-card border p-4 transition-all hover:-translate-y-0.5 hover:shadow-card">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-card bg-gradient-to-br ${program.accent} text-white shadow-sm transition-transform group-hover:scale-110`}
      >
        <Icon size={20} strokeWidth={1.8} />
      </span>

      <div>
        <p className="text-sm font-semibold text-text-primary">{program.title}</p>
        <p className="mt-1 line-clamp-3 text-xs text-text-secondary">{program.summary}</p>
      </div>

      <div className="mt-auto flex items-baseline gap-1 border-t border-gray-100 pt-2">
        <span className="text-base font-bold text-brand-primary">{program.stat}</span>
        <span className="text-[11px] text-text-secondary">{program.statLabel}</span>
      </div>
    </div>
  )
}

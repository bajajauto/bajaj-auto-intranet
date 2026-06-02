import { ArrowRight, Calendar, HeartHandshake, MapPin } from 'lucide-react'
import { useVolunteerOpportunities } from '@/hooks/useVolunteerOpportunities'

function formatDate(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

function jumpToCsr() {
  const el = document.getElementById('csr')
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 124
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

export default function VolunteerNextCard() {
  const opportunities = useVolunteerOpportunities()
  const next = opportunities[0]

  if (!next) return null

  const slotsRemaining = next.slotsTotal - next.slotsTaken
  const isAlmostFull = slotsRemaining <= 5

  return (
    <button
      type="button"
      onClick={jumpToCsr}
      className="site-surface-interactive group relative w-full overflow-hidden rounded-card border text-left transition-all hover:-translate-y-0.5 hover:shadow-card focus-ring"
      aria-label={`Volunteer for ${next.title}`}
    >
      <div className="relative h-16 overflow-hidden" style={{ background: next.coverGradient }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-2.5 text-white">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
            <HeartHandshake size={11} />
            Volunteer next
          </span>
          {isAlmostFull && (
            <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-900">
              {slotsRemaining} left
            </span>
          )}
        </div>
      </div>

      <div className="px-3 pb-3 pt-2.5">
        <p className="line-clamp-2 text-sm font-semibold text-text-primary">{next.title}</p>

        <ul className="mt-1.5 space-y-0.5 text-[11px] text-text-secondary">
          <li className="flex items-center gap-1.5">
            <Calendar size={11} />
            {formatDate(next.date)} · {next.timeRange}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin size={11} />
            <span className="truncate">{next.location}</span>
          </li>
        </ul>

        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
          <span className="text-text-secondary">
            {next.slotsTaken}/{next.slotsTotal} signed up
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            Sign up
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  )
}

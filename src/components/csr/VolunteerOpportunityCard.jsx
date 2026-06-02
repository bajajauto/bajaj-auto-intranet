import { Calendar, Clock, MapPin, Users } from 'lucide-react'

function formatDate(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function VolunteerOpportunityCard({ opportunity, onSignup }) {
  const slotsRemaining = opportunity.slotsTotal - opportunity.slotsTaken
  const fillPercent = Math.round((opportunity.slotsTaken / opportunity.slotsTotal) * 100)
  const isAlmostFull = slotsRemaining <= 5

  return (
    <div className="site-surface group flex h-full flex-col overflow-hidden rounded-card border transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div
        className="relative h-20 overflow-hidden"
        style={{ background: opportunity.coverGradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-3 text-white">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/80">
            <Calendar size={11} />
            {formatDate(opportunity.date)}
          </div>
        </div>
        {isAlmostFull && (
          <span className="absolute right-2 top-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-900 shadow-card">
            {slotsRemaining} slots left
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <p className="text-sm font-semibold text-text-primary">{opportunity.title}</p>

        <ul className="space-y-1 text-[11px] text-text-secondary">
          <li className="flex items-start gap-1.5">
            <Clock size={12} className="mt-0.5 flex-shrink-0" />
            {opportunity.timeRange}
          </li>
          <li className="flex items-start gap-1.5">
            <MapPin size={12} className="mt-0.5 flex-shrink-0" />
            {opportunity.location}
          </li>
          <li className="flex items-start gap-1.5">
            <Users size={12} className="mt-0.5 flex-shrink-0" />
            {opportunity.role}
          </li>
        </ul>

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
            <span>
              {opportunity.slotsTaken}/{opportunity.slotsTotal} signed up
            </span>
            <span>{fillPercent}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
              style={{ width: `${fillPercent}%` }}
            />
          </div>

          <button
            type="button"
            onClick={onSignup}
            className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-btn bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-emerald-700 focus-ring"
          >
            Sign up to volunteer
          </button>
        </div>
      </div>
    </div>
  )
}

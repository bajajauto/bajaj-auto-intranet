import { ChevronRight, HeartHandshake } from 'lucide-react'
import ImpactCounter from './ImpactCounter'

export default function CsrHero({ onJumpToVolunteer }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-emerald-900/10">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#064e3b_0%,#047857_45%,#0f766e_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.18),transparent_45%)]" />

      <div className="relative grid gap-5 px-5 py-6 sm:px-7 sm:py-7 lg:grid-cols-[1.1fr,1fr] lg:items-center">
        <div className="text-white">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
            <HeartHandshake size={12} />
            Bajaj Auto Foundation
          </div>
          <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
            Driving change beyond business.
          </h3>
          <p className="mt-2 max-w-md text-sm text-white/75">
            Skill, education, health, livelihoods, environment — six programmes working across rural
            India. Every Bajaj employee can contribute.
          </p>

          <button
            type="button"
            onClick={onJumpToVolunteer}
            className="mt-4 inline-flex items-center gap-0 rounded-btn bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-card transition-all hover:-translate-y-0.5 hover:bg-emerald-50 focus-ring"
          >
            Volunteer with BAF
            <ChevronRight size={14} />
          </button>
        </div>

        <ImpactCounter />
      </div>
    </div>
  )
}

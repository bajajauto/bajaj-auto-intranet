import { forwardRef, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, History } from 'lucide-react'
import { useVolunteerOpportunities } from '@/hooks/useVolunteerOpportunities'
import { useUserCsrStats } from '@/hooks/useUserCsrStats'
import VolunteerOpportunityCard from './VolunteerOpportunityCard'
import VolunteerSignupModal from './VolunteerSignupModal'

function formatDate(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const VolunteerBlock = forwardRef(function VolunteerBlock(_, ref) {
  const opportunities = useVolunteerOpportunities()
  const stats = useUserCsrStats()
  const carouselRef = useRef(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)

  function scrollByPage(direction) {
    const scrollAmount = carouselRef.current?.clientWidth ?? 720
    carouselRef.current?.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  const hasControls = opportunities.length > 1

  return (
    <div
      ref={ref}
      className="rounded-card border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            Volunteer with us — pick a cause this month
          </h3>
          <p className="mt-0.5 text-xs text-text-secondary">
            Every employee gets up to <strong className="text-emerald-700">3 paid volunteer days</strong>{' '}
            a year. Sign up below — we&apos;ll handle the logistics.
          </p>
        </div>

        <div className="flex flex-col rounded-card border border-emerald-200/80 bg-white px-3 py-2 sm:flex-row sm:items-center sm:gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
              Your CSR hours · {stats.fiscalYear}
            </p>
            <p className="mt-0.5 text-xl font-bold leading-none text-emerald-700">
              {stats.hoursFiscalYear}h
            </p>
          </div>
          {stats.lastEventTitle && (
            <div className="mt-2 border-t border-emerald-100 pt-2 text-[11px] text-text-secondary sm:mt-0 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <p className="flex items-center gap-1 font-semibold text-text-primary">
                <History size={11} /> Last event
              </p>
              <p className="mt-0.5">{stats.lastEventTitle}</p>
              <p className="text-text-secondary/80">{formatDate(stats.lastVolunteeredOn)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-4">
        {hasControls && (
          <div className="hidden sm:flex pointer-events-none absolute inset-y-0 left-0 right-0 z-20 items-center justify-between">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              className="pointer-events-auto -ml-2 p-1.5 rounded-full bg-white border border-emerald-100 text-emerald-700 shadow-card hover:bg-emerald-50 focus-ring transition-all"
              aria-label="Previous opportunities"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              className="pointer-events-auto -mr-2 p-1.5 rounded-full bg-white border border-emerald-100 text-emerald-700 shadow-card hover:bg-emerald-50 focus-ring transition-all"
              aria-label="Next opportunities"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div
          ref={carouselRef}
          className="grid auto-cols-[minmax(15rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth lg:auto-cols-[calc((100%-2rem)/3)]"
          aria-label="Upcoming volunteer opportunities"
        >
          {opportunities.map((opp) => (
            <div key={opp.id} className="snap-start">
              <VolunteerOpportunityCard
                opportunity={opp}
                onSignup={() => setSelectedOpportunity(opp)}
              />
            </div>
          ))}
        </div>
      </div>

      {opportunities.length === 0 && (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-card border border-dashed border-emerald-200 bg-white px-4 py-8 text-center">
          <Clock size={18} className="text-emerald-600" />
          <p className="text-sm font-semibold text-text-primary">No open events right now</p>
          <p className="text-xs text-text-secondary">
            Check back next week — new opportunities are added every Monday.
          </p>
        </div>
      )}

      <VolunteerSignupModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </div>
  )
})

export default VolunteerBlock

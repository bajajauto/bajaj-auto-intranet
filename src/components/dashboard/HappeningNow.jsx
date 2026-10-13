import { Bell, Headphones, Leaf } from 'lucide-react'
import { useCalendarEvents } from '@/hooks/useCalendarEvents'
import { useVolunteerOpportunities } from '@/hooks/useVolunteerOpportunities'
import { useBajajBytesVolumes } from '@/hooks/useBajajBytesVolumes'
import { useNotifications } from '@/hooks/useNotifications'
import { services } from '@/config/services.config'
import Shelf from '@/components/shared/Shelf'
import Skeleton from '@/components/shared/Skeleton'
import ErrorState from '@/components/shared/ErrorState'
import { outlookEventLink, toDateKey } from '@/utils/calendarLinks'
import { scrollToSection } from '@/utils/scrollToSection'

const CARD =
  'relative flex h-[300px] w-[250px] flex-none snap-start flex-col overflow-hidden rounded-3xl p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted sm:w-[260px]'
const EYEBROW = 'mb-2 text-[11px] font-bold tracking-[0.08em]'
const TITLE = 'mb-2 font-display text-[22px] font-bold leading-[1.05] tracking-[-0.025em]'
const PILL =
  'relative mt-auto inline-flex h-9 items-center gap-2 self-start rounded-full px-4 text-sm font-semibold transition-transform hover:scale-[1.03] focus-ring'

const boltUrl = services.find((s) => s.id === 'bolt-learning')?.redirectUrl

function formatLong(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function jumpTo(sectionId) {
  return (e) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }
}

function CardSkeleton() {
  return (
    <div role="listitem" className={`${CARD} bg-surface`} aria-hidden="true">
      <Skeleton className="mb-4 h-3 w-24" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="mt-auto h-9 w-32" rounded="rounded-full" />
    </div>
  )
}

function CardError({ label, onRetry }) {
  return (
    <div role="listitem" className={`${CARD} items-center justify-center bg-surface`}>
      <ErrorState label={label} onRetry={onRetry} compact />
    </div>
  )
}

/* The next company event or holiday — the navy lead card. */
function NextUpCard({ query }) {
  if (query.isPending) return <CardSkeleton />
  if (query.isError) return <CardError label="the calendar" onRetry={query.refetch} />

  const from = toDateKey(new Date())
  const next = query.data
    .filter((item) => item.type !== 'meeting' && item.date >= from)
    .sort((a, b) => a.date.localeCompare(b.date))[0]
  if (!next) return null

  const isHoliday = next.type === 'holiday'

  return (
    <article role="listitem" className={`${CARD} bg-navy text-white dark:ring-1 dark:ring-white/10`}>
      <p className={`${EYEBROW} text-[#F7A35C]`}>{isHoliday ? 'NEXT HOLIDAY' : 'COMING UP'}</p>
      <h3 className={TITLE}>{next.label}</h3>
      <p className="mb-2 text-[13px] font-medium leading-snug text-[#E3E8EF]">
        {isHoliday ? next.remarks ?? next.time : `At ${next.location}.`}
      </p>
      <p className="text-[13px] text-[#B7C1CF]">
        {formatLong(next.date)}
        {!isHoliday && next.time ? ` · ${next.time}` : ''}
      </p>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-5 font-display text-[140px] font-bold leading-none tracking-[-0.06em] text-white/[0.07]"
      >
        {new Date(next.date).getDate()}
      </span>
      <a
        href={outlookEventLink(next)}
        target="_blank"
        rel="noreferrer"
        className={`${PILL} bg-[#FFFFFF] text-navy`}
      >
        Add to calendar
      </a>
    </article>
  )
}

/* Today's meetings, from the personal slice of the calendar feed. */
function YourDayCard({ query }) {
  if (query.isPending) return <CardSkeleton />
  if (query.isError) return null // NextUpCard already reports this feed's failure

  const today = toDateKey(new Date())
  const meetings = query.data.filter((item) => item.type === 'meeting' && item.date === today)

  return (
    <article role="listitem" className={`${CARD} bg-surface text-ink`}>
      <p className={`${EYEBROW} text-brand-primary dark:text-[#8fb5ec]`}>YOUR DAY</p>
      <h3 className={TITLE}>
        {meetings.length === 0
          ? 'No meetings today'
          : `${meetings.length} meeting${meetings.length === 1 ? '' : 's'} today`}
      </h3>
      <ul className="space-y-2">
        {meetings.slice(0, 3).map((meeting) => (
          <li key={`${meeting.time}-${meeting.label}`} className="flex gap-3 text-[13px]">
            <span className="w-[60px] flex-shrink-0 font-semibold tabular-nums text-muted">
              {meeting.time.split(/\s*-\s*/)[0]}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold">{meeting.label}</span>
              <span className="block truncate text-xs text-muted">{meeting.location}</span>
            </span>
          </li>
        ))}
      </ul>
      <a
        href="https://outlook.office.com/calendar/"
        target="_blank"
        rel="noreferrer"
        className={`${PILL} bg-ink text-canvas`}
      >
        {meetings.length > 3 ? `See all ${meetings.length} in Outlook` : 'Open Outlook'}
      </a>
    </article>
  )
}

function VolunteerCard() {
  const query = useVolunteerOpportunities()
  if (query.isPending) return <CardSkeleton />
  if (query.isError) return <CardError label="volunteer drives" onRetry={query.refetch} />

  const next = query.data[0]
  if (!next) return null
  const left = next.slotsTotal - next.slotsTaken
  const filled = Math.round((next.slotsTaken / next.slotsTotal) * 100)

  return (
    <article role="listitem" className={`${CARD} bg-surface text-ink`}>
      <p className={`${EYEBROW} text-accent-green dark:text-emerald-400`}>VOLUNTEER</p>
      <h3 className={`${TITLE} relative`}>{next.title}</h3>
      <p className="relative mb-2 text-[13px] font-medium leading-snug">{next.location}</p>
      <p className="relative text-[13px] text-muted">
        {formatLong(next.date)} · {next.timeRange}
      </p>
      <div
        aria-hidden="true"
        className="absolute -right-6 bottom-20 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#E1F3EA] text-accent-green dark:bg-emerald-400/10"
      >
        <Leaf size={40} strokeWidth={1.2} />
      </div>
      <div className="relative mt-auto">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="font-semibold">
            {next.slotsTaken} of {next.slotsTotal} places filled
          </span>
          <span className="text-muted">{left} left</span>
        </div>
        <div
          className="mb-3 h-1.5 overflow-hidden rounded-full bg-chip"
          role="progressbar"
          aria-valuenow={filled}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Places filled"
        >
          {/* Width steps in tenths: Tailwind needs the class strings literally. */}
          <div
            className={`h-full rounded-full bg-accent-green ${
              [
                'w-0',
                'w-[10%]',
                'w-[20%]',
                'w-[30%]',
                'w-[40%]',
                'w-1/2',
                'w-[60%]',
                'w-[70%]',
                'w-[80%]',
                'w-[90%]',
                'w-full',
              ][Math.min(10, Math.round(filled / 10))]
            }`}
          />
        </div>
        <a
          href="#csr"
          onClick={jumpTo('csr')}
          className="inline-flex h-9 items-center rounded-full bg-accent-green px-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03] focus-ring"
        >
          Sign up
        </a>
      </div>
    </article>
  )
}

function BytesCard() {
  const query = useBajajBytesVolumes()
  if (query.isPending) return <CardSkeleton />
  if (query.isError) return <CardError label="Bajaj Bytes" onRetry={query.refetch} />

  const latest = query.data[0]
  if (!latest) return null

  return (
    <article role="listitem" className={`${CARD} bg-brand-primary text-white`}>
      <p className={`${EYEBROW} text-[#FFD8B0]`}>NEW ISSUE</p>
      <h3 className={TITLE}>Bajaj Bytes, {latest.label.replace('Volume', 'Vol.')}</h3>
      <p className="text-[13px] font-medium leading-snug text-[#E6EEFA]">
        The {latest.month} newsletter and podcast. Stories from the shop floor and beyond.
      </p>
      <div
        aria-hidden="true"
        className="absolute -bottom-[70px] -right-[70px] h-60 w-60 rounded-full border-[1.5px] border-white/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -right-8 h-[165px] w-[165px] rounded-full border-[1.5px] border-white/30"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-2 right-2 h-[88px] w-[88px] rounded-full bg-white/15"
      />
      {/* Bytes has no section of its own on the page: this card is its home,
          so it opens the issue itself. */}
      <a
        href={latest.href}
        target="_blank"
        rel="noreferrer"
        className={`${PILL} bg-[#FFFFFF] text-navy`}
      >
        <Headphones size={16} />
        Read &amp; listen
      </a>
    </article>
  )
}

function LearningCard() {
  return (
    <article role="listitem" className={`${CARD} bg-surface text-ink`}>
      <p className={`${EYEBROW} text-accent-orange`}>LEARNING</p>
      <h3 className={TITLE}>Bolt. Start learning.</h3>
      <p className="text-[13px] font-medium leading-snug">
        Courses picked for your role, at your own pace.
      </p>
      <div aria-hidden="true" className="mt-3 grid grid-cols-3 gap-2">
        <div className="h-9 rounded-[18px] bg-[#FCEEDB] dark:bg-amber-400/15" />
        <div className="h-9 rounded-full bg-[#E4EDFA] dark:bg-sky-400/15" />
        <div className="h-9 rounded-[18px_18px_92px_18px] bg-[#E1F3EA] dark:bg-emerald-400/15" />
        <div className="h-9 rounded-[92px_18px_18px_18px] bg-[#E4EDFA] dark:bg-sky-400/15" />
        <div className="h-9 rounded-[18px] bg-navy dark:bg-white/20" />
        <div className="h-9 rounded-full bg-[#FCEEDB] dark:bg-amber-400/15" />
      </div>
      <a href={boltUrl} target="_blank" rel="noreferrer" className={`${PILL} bg-ink text-canvas`}>
        Browse courses
      </a>
    </article>
  )
}

const PRIORITY_STYLE = {
  Urgent: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  New: 'bg-brand-primary/10 text-brand-primary dark:text-[#8fb5ec]',
}

function AlertsCard() {
  const query = useNotifications()
  if (query.isPending) return <CardSkeleton />
  if (query.isError) return <CardError label="alerts" onRetry={query.refetch} />
  if (query.data.length === 0) return null

  return (
    <article role="listitem" className={`${CARD} bg-surface text-ink`}>
      <p className={`${EYEBROW} flex items-center gap-1.5 text-accent-orange`}>
        <Bell size={14} strokeWidth={2.2} />
        ALERTS
      </p>
      <h3 className={TITLE}>For your attention</h3>
      <ul className="divide-y divide-line/[0.06]">
        {query.data.slice(0, 4).map((alert) => (
          <li key={alert.id} className="flex items-start gap-3 py-1.5 first:pt-0">
            <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug">{alert.title}</span>
            {PRIORITY_STYLE[alert.priority] && (
              <span
                className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${PRIORITY_STYLE[alert.priority]}`}
              >
                {alert.priority}
              </span>
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}

/*
 * What's on: a shelf of mixed cards, each from a different feed. Every card
 * owns its own loading and failure, so one slow or broken feed never holds the
 * others back — the shelf fills in as each lands.
 */
export default function HappeningNow() {
  const calendarQuery = useCalendarEvents()

  return (
    <Shelf label="Happening now" className="pb-8 pt-6">
      <NextUpCard query={calendarQuery} />
      <YourDayCard query={calendarQuery} />
      <VolunteerCard />
      <BytesCard />
      <LearningCard />
      <AlertsCard />
    </Shelf>
  )
}

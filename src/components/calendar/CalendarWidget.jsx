import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from 'lucide-react'
import { useCalendarEvents } from '@/hooks/useCalendarEvents'
import { services } from '@/config/services.config'
import QueryBoundary from '@/components/shared/QueryBoundary'
import Skeleton from '@/components/shared/Skeleton'
import { outlookEventLink, toDateKey } from '@/utils/calendarLinks'

// The feed above is this location's holidays only. Every other plant's list
// lives behind the Pitstop's Holiday Calendar tile, so the URL is kept there.
const otherLocationsUrl = services.find((s) => s.id === 'holiday-calendar')?.redirectUrl
const hasOtherLocations = Boolean(otherLocationsUrl) && otherLocationsUrl !== '#'

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const CARD = 'min-w-0 flex-[1_1_420px] rounded-3xl bg-surface p-4 shadow-soft sm:p-5'
const ROUND_BUTTON =
  'flex h-8 w-8 items-center justify-center rounded-full bg-chip text-ink transition-colors hover:bg-brand-primary hover:text-white focus-ring'

// A day's fill says what kind of day it is. Today wins over everything, then a
// holiday, then an event; weekends are only dimmed.
const DAY_STYLE = {
  today: 'bg-brand-primary text-white',
  holiday: 'bg-[#FCEEDB] text-[#A0520A] dark:bg-amber-400/15 dark:text-amber-300',
  event: 'bg-[#E4EDFA] text-[#0B4A99] dark:bg-sky-400/15 dark:text-sky-300',
  weekend: 'bg-[#F7F8FA] text-muted/80 dark:bg-white/[0.03]',
  plain: 'bg-[#F7F8FA] text-ink dark:bg-white/[0.03]',
}

const KIND_COLOR = {
  holiday: 'text-accent-orange',
  event: 'text-brand-primary dark:text-[#8fb5ec]',
}

function formatMonthYear(date) {
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
}

function weekdayShort(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { weekday: 'short' }).toUpperCase()
}

function MonthGrid({ items }) {
  const today = new Date()
  const todayKey = toDateKey(today)
  const [visible, setVisible] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedKey, setSelectedKey] = useState(null)

  const year = visible.getFullYear()
  const month = visible.getMonth()
  const leading = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array(leading)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  // Meetings are personal and change hourly; the month grid marks only the
  // company calendar — events and holidays.
  const byDate = new Map()
  items
    .filter((item) => item.type !== 'meeting')
    .forEach((item) => byDate.set(item.date, [...(byDate.get(item.date) ?? []), item]))

  const selected = selectedKey ? byDate.get(selectedKey) : null

  function changeMonth(delta) {
    setSelectedKey(null)
    setVisible(new Date(year, month + delta, 1))
  }

  return (
    <div className={CARD}>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-lg font-semibold tracking-[-0.015em] text-ink" aria-live="polite">
          {formatMonthYear(visible)}
        </p>
        <div className="flex gap-1">
          <button type="button" onClick={() => changeMonth(-1)} className={ROUND_BUTTON} aria-label="Previous month">
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <button type="button" onClick={() => changeMonth(1)} className={ROUND_BUTTON} aria-label="Next month">
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold tracking-[0.04em] text-muted/80">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <div key={`blank-${index}`} className="h-8" />

          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const marked = byDate.get(key)
          const isWeekend = [5, 6].includes((leading + day - 1) % 7)
          const kind =
            key === todayKey
              ? 'today'
              : marked?.some((m) => m.type === 'holiday')
                ? 'holiday'
                : marked
                  ? 'event'
                  : isWeekend
                    ? 'weekend'
                    : 'plain'
          const label = marked ? `${day}, ${marked.map((m) => m.label).join(', ')}` : `${day}`

          return marked ? (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(selectedKey === key ? null : key)}
              title={marked.map((m) => m.label).join(', ')}
              aria-label={label}
              aria-pressed={selectedKey === key}
              className={`flex h-8 items-center justify-center rounded-lg text-[13px] font-semibold transition-transform hover:-translate-y-0.5 focus-ring ${
                DAY_STYLE[kind]
              } ${selectedKey === key ? 'ring-2 ring-brand-primary/50' : ''}`}
            >
              {day}
            </button>
          ) : (
            <div
              key={key}
              aria-label={key === todayKey ? `${day}, today` : undefined}
              className={`flex h-8 items-center justify-center rounded-lg text-[13px] font-semibold ${DAY_STYLE[kind]}`}
            >
              {day}
            </div>
          )
        })}
      </div>

      {selected && (
        <div className="mt-3 rounded-2xl bg-chip px-3 py-2 text-[13px]">
          {selected.map((item) => (
            <p key={item.label} className="text-ink">
              <span className="font-semibold">{item.label}</span>
              <span className="text-muted"> · {item.type === 'holiday' ? item.remarks ?? 'Holiday' : item.time}</span>
            </p>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
          Today
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#CFE0F7]" />
          Event
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FAD9BF]" />
          Holiday
        </span>
      </div>
    </div>
  )
}

function AgendaRow({ item, last }) {
  const isHoliday = item.type === 'holiday'
  return (
    <a
      href={outlookEventLink(item)}
      target="_blank"
      rel="noreferrer"
      title="Add to Outlook calendar"
      className={`group flex items-center gap-3 rounded-xl py-2 text-ink focus-ring ${last ? '' : 'border-b border-line/[0.07]'}`}
    >
      <span className="w-10 flex-none text-center">
        <span className={`block text-[10px] font-bold tracking-[0.06em] ${KIND_COLOR[item.type] ?? 'text-muted'}`}>
          {weekdayShort(item.date)}
        </span>
        <span className="block font-display text-xl font-semibold leading-tight">
          {new Date(item.date).getDate()}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold group-hover:text-brand-primary">
          {item.label}
        </span>
        <span className="block truncate text-xs text-muted">
          {isHoliday
            ? `${new Date(item.date).toLocaleDateString('en-IN', { month: 'long' })} · ${item.time}`
            : `${item.location} · ${item.time}`}
        </span>
      </span>
    </a>
  )
}

function AgendaSkeleton() {
  return (
    <div className="space-y-3 py-3" aria-hidden="true">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-9 w-10" rounded="rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

const AGENDA_TABS = [
  { id: 'upcoming', label: 'Coming up' },
  { id: 'holidays', label: 'All holidays' },
]

function Agenda({ query }) {
  const [tab, setTab] = useState('upcoming')
  const from = toDateKey(new Date())
  const companyItems = query.data
    .filter((item) => item.type !== 'meeting')
    .sort((a, b) => a.date.localeCompare(b.date))
  const items =
    tab === 'upcoming'
      ? companyItems.filter((item) => item.date >= from).slice(0, 4)
      : companyItems.filter((item) => item.type === 'holiday')

  return (
    <div className={`${CARD} flex flex-col`}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg font-semibold tracking-[-0.015em] text-ink">
          {tab === 'upcoming' ? 'Coming up' : `Holidays ${new Date().getFullYear()}`}
        </p>
        <div role="tablist" aria-label="Agenda view" className="flex gap-1 rounded-full bg-chip p-1">
          {AGENDA_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-7 rounded-full px-3 text-xs font-semibold transition-colors focus-ring ${
                tab === t.id ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <QueryBoundary
        query={query}
        skeleton={<AgendaSkeleton />}
        label="the calendar"
        emptyMessage="Nothing on the company calendar."
        isEmpty={() => items.length === 0}
        compact
      >
        {() => (
          <div className={tab === 'holidays' ? 'scrollbar-none max-h-[240px] overflow-y-auto' : ''}>
            {items.map((item, i) => (
              <AgendaRow key={`${item.date}-${item.label}`} item={item} last={i === items.length - 1} />
            ))}
          </div>
        )}
      </QueryBoundary>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-2 text-[13px] font-semibold">
        <a
          href="https://outlook.office.com/calendar/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded text-brand-primary hover:text-brand-dark focus-ring dark:text-[#8fb5ec]"
        >
          Open your Outlook calendar
          <ExternalLink size={14} />
        </a>
        {hasOtherLocations ? (
          <a
            href={otherLocationsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded text-accent-orange hover:text-[#A0520A] focus-ring"
          >
            <MapPin size={14} />
            View other locations’ holidays
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-muted" title="Link coming soon">
            <MapPin size={14} />
            View other locations’ holidays
            <span className="text-xs font-medium">(coming soon)</span>
          </span>
        )}
      </div>
    </div>
  )
}

/*
 * The month at a glance beside what is coming up. The grid renders regardless
 * of the feed — a month with no marked days is still a usable calendar — so a
 * failed fetch degrades to a plain month, and the agenda says what went wrong.
 */
export default function CalendarWidget() {
  const query = useCalendarEvents()

  return (
    <div className="flex flex-wrap gap-5">
      <MonthGrid items={query.data} />
      <Agenda query={query} />
    </div>
  )
}

import { useState } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { calendarService } from '@/services/calendarService'
import { notificationService } from '@/services/notificationService'
import NotificationCard from '@/components/notifications/NotificationCard'

const EVENT_BACKGROUNDS = [
  'bg-gradient-to-br from-brand-dark via-brand-primary to-slate-500',
  'bg-gradient-to-br from-slate-700 via-brand-dark to-brand-primary',
  'bg-gradient-to-br from-brand-primary via-slate-600 to-brand-dark',
  'bg-gradient-to-br from-slate-800 via-brand-primary to-slate-500',
]

function formatDay(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric' })
}

function formatMonth(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { month: 'short' })
}

function formatWeekday(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { weekday: 'short' })
}

function formatMonthYear(year, month) {
  return new Date(year, month, 1).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })
}

function formatIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`
}

function EventCard({ event, index }) {
  const background = EVENT_BACKGROUNDS[index % EVENT_BACKGROUNDS.length]

  return (
    <div className="grid grid-cols-[3.25rem_1fr] items-center gap-3">
      <div
        className={`relative h-[52px] w-[52px] overflow-hidden rounded-card text-white shadow-card ${background}`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -right-5 -top-5 h-12 w-12 rounded-full bg-white/15" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/75">
            {formatMonth(event.date)}
          </p>
          <p className="text-xl font-semibold leading-none">{formatDay(event.date)}</p>
        </div>
      </div>

      <button
        type="button"
        className="site-surface-interactive relative min-h-[68px] overflow-hidden rounded-card border px-3 py-2.5 text-left focus-ring transition-all hover:-translate-y-0.5 hover:bg-brand-light/50 hover:shadow-modal"
        aria-label={event.label}
      >
        <div className="relative z-10">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-brand-primary">
            {event.label}
          </p>
          <p className="mt-1 text-xs text-text-secondary">{event.location}</p>
          <p className="mt-1 text-xs font-semibold text-brand-primary">{event.time}</p>
        </div>
      </button>
    </div>
  )
}

function HolidayCalendar({ holidays }) {
  const today = new Date()
  const todayKey = formatIsoDate(today)
  const [visibleDate, setVisibleDate] = useState(today)
  const year = visibleDate.getFullYear()
  const month = visibleDate.getMonth()
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const holidayMap = new Map(holidays.map((holiday) => [holiday.date, holiday]))
  const cells = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, index) => index + 1))

  function toKey(day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function changeMonth(delta) {
    setVisibleDate((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))
  }

  return (
    <div className="bg-gradient-to-b from-brand-light/70 via-white to-white px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="rounded-btn bg-white/80 p-1.5 text-brand-primary shadow-sm ring-1 ring-brand-primary/10 transition-colors hover:bg-brand-primary hover:text-white focus-ring"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <p className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-primary shadow-sm ring-1 ring-brand-primary/10">
          {formatMonthYear(year, month)}
        </p>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="rounded-btn bg-white/80 p-1.5 text-brand-primary shadow-sm ring-1 ring-brand-primary/10 transition-colors hover:bg-brand-primary hover:text-white focus-ring"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => {
          const isWeekendHeader = day === 'Sa' || day === 'Su'
          return (
          <div
            key={day}
            className={`rounded-full py-1 text-[10px] font-semibold ${
              isWeekendHeader
                ? 'bg-indigo-100/55 text-indigo-500/80'
                : 'bg-white/70 text-brand-primary/70'
            }`}
          >
            {day}
          </div>
          )
        })}
        {cells.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="aspect-square" />

          const key = toKey(day)
          const holiday = holidayMap.get(key)
          const isToday = key === todayKey
          const dayOfWeek = new Date(year, month, day).getDay()
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

          return (
            <button
              key={key}
              type="button"
              className={`group relative aspect-square rounded-btn text-xs shadow-sm transition-all focus-ring ${
                holiday
                  ? 'bg-brand-primary font-semibold text-white ring-1 ring-brand-primary/20 hover:-translate-y-0.5 hover:bg-brand-dark'
                  : isToday
                    ? 'bg-white font-semibold text-brand-primary ring-2 ring-brand-primary/40'
                    : isWeekend
                      ? 'bg-indigo-100/45 text-indigo-500/80 ring-1 ring-indigo-200/50 hover:-translate-y-0.5 hover:bg-indigo-100/65 hover:text-indigo-600'
                      : 'bg-white/80 text-text-secondary ring-1 ring-brand-primary/5 hover:-translate-y-0.5 hover:bg-white hover:text-brand-primary hover:ring-brand-primary/20'
              }`}
              aria-label={holiday ? `${day}, ${holiday.label}` : `${day}`}
            >
              {day}
              {holiday && (
                <>
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white" />
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-card border border-brand-primary/10 bg-white p-3 text-left opacity-0 shadow-modal transition-all group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:-translate-y-1 group-focus-visible:opacity-100">
                    <span className="block text-xs font-semibold text-brand-primary">
                      {holiday.label}
                    </span>
                    <span className="mt-1 block text-[11px] font-normal text-text-secondary">
                      {formatWeekday(holiday.date)}, {formatDay(holiday.date)}{' '}
                      {formatMonth(holiday.date)}
                    </span>
                    <span className="mt-2 inline-flex rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-medium text-brand-primary">
                      {holiday.time}
                    </span>
                    <span className="mt-2 block text-[11px] font-normal leading-snug text-text-secondary">
                      {holiday.remarks}
                    </span>
                  </span>
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function HolidayRow({ holiday }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-card px-2 py-2 hover:bg-bg-alt transition-colors">
      <div className="text-center">
        <p className="text-base font-semibold leading-none text-brand-primary">
          {formatDay(holiday.date)}
        </p>
        <p className="mt-1 text-[10px] uppercase text-text-secondary">
          {formatMonth(holiday.date)}
        </p>
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-text-primary leading-snug">{holiday.label}</p>
          <span className="flex-shrink-0 text-[10px] text-text-secondary">
            {formatWeekday(holiday.date)}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-text-secondary line-clamp-2">
          {holiday.remarks ?? holiday.time}
        </p>
      </div>
    </div>
  )
}

function HolidayList({ holidays }) {
  return (
    <div className="max-h-[310px] space-y-1 overflow-y-auto px-4 py-3 overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary/25 hover:[&::-webkit-scrollbar-thumb]:bg-brand-primary/45">
      {holidays.map((holiday) => (
        <HolidayRow key={`${holiday.date}-${holiday.label}`} holiday={holiday} />
      ))}
    </div>
  )
}

export default function DashboardUpdatesPanel() {
  const [activeTab, setActiveTab] = useState('events')
  const [calendarTab, setCalendarTab] = useState('calendar')
  const calendarItems = calendarService.getEvents()
  const events = calendarItems.filter((item) => item.type === 'event')
  const meetings = calendarItems.filter((item) => item.type === 'meeting')
  const hasExtraMeetings = meetings.length > 2
  const visibleMeetings = hasExtraMeetings ? meetings.slice(0, 2) : meetings
  const hiddenMeetingsCount = meetings.length - visibleMeetings.length
  const holidays = calendarItems.filter((item) => item.type === 'holiday')
  const notifications = notificationService.getAll()
  const title =
    activeTab === 'events'
      ? 'Upcoming Events'
      : activeTab === 'meetings'
        ? 'Meetings'
        : 'Notifications'

  return (
    <div className="site-surface rounded-card border overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>

        <div className="flex flex-shrink-0 rounded-btn bg-bg-alt p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1 text-xs font-medium rounded-btn transition-colors focus-ring ${
              activeTab === 'events'
                ? 'bg-white text-brand-primary shadow-card'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Events
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('meetings')}
            className={`px-3 py-1 text-xs font-medium rounded-btn transition-colors focus-ring ${
              activeTab === 'meetings'
                ? 'bg-white text-brand-primary shadow-card'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Meetings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`px-3 py-1 text-xs font-medium rounded-btn transition-colors focus-ring ${
              activeTab === 'notifications'
                ? 'bg-white text-brand-primary shadow-card'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Alerts
          </button>
        </div>
      </div>

      {activeTab === 'events' ? (
        <div className="space-y-3 px-4 py-4">
          {events.map((event, index) => (
            <EventCard key={`${event.date}-${event.label}`} event={event} index={index} />
          ))}
        </div>
      ) : activeTab === 'meetings' ? (
        <div className="space-y-3 px-4 py-4">
          {visibleMeetings.map((meeting, index) => (
            <EventCard key={`${meeting.date}-${meeting.label}`} event={meeting} index={index} />
          ))}
          {hasExtraMeetings && (
            <a
              href="https://outlook.office.com/calendar/"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-btn border border-brand-primary/10 bg-brand-light/60 px-3 py-2 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-light focus-ring"
            >
              <span>View {hiddenMeetingsCount} more on Outlook</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      ) : (
        <div className="max-h-[390px] overflow-y-auto divide-y divide-gray-50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary/25 hover:[&::-webkit-scrollbar-thumb]:bg-brand-primary/45">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} {...notification} />
          ))}
        </div>
      )}

      <div className="border-t border-gray-100">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <h3 className="text-sm font-semibold text-text-primary">Calendar</h3>
          <div className="flex rounded-btn bg-bg-alt p-0.5">
            <button
              type="button"
              onClick={() => setCalendarTab('calendar')}
              className={`px-3 py-1 text-xs font-medium rounded-btn transition-colors focus-ring ${
                calendarTab === 'calendar'
                  ? 'bg-white text-brand-primary shadow-card'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Calendar
            </button>
            <button
              type="button"
              onClick={() => setCalendarTab('holidays')}
              className={`px-3 py-1 text-xs font-medium rounded-btn transition-colors focus-ring ${
                calendarTab === 'holidays'
                  ? 'bg-white text-brand-primary shadow-card'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Holidays
            </button>
          </div>
        </div>

        {calendarTab === 'calendar' ? (
          <HolidayCalendar holidays={holidays} />
        ) : (
          <HolidayList holidays={holidays} />
        )}
      </div>
    </div>
  )
}

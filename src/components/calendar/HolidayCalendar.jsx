import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCalendarEvents } from '@/hooks/useCalendarEvents'
import { toDateKey } from '@/utils/calendarLinks'
import Panel from '@/components/shared/Panel'
import QueryBoundary from '@/components/shared/QueryBoundary'
import Skeleton from '@/components/shared/Skeleton'

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const pad = (n) => String(n).padStart(2, '0')

function MonthGrid({ holidays }) {
  const today = new Date()
  const [visible, setVisible] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const year = visible.getFullYear()
  const month = visible.getMonth()
  const leading = (new Date(year, month, 1).getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const todayKey = toDateKey(today)
  const marked = new Map(holidays.map((h) => [h.date, h]))

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ocean-ink" aria-live="polite">
          {visible.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </p>
        <div className="flex gap-1">
          {[
            [-1, ChevronLeft, 'Previous month'],
            [1, ChevronRight, 'Next month'],
          ].map(([delta, Icon, label]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => setVisible(new Date(year, month + delta, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-ocean-100 text-ocean-700 hover:bg-ocean-200 focus-ring"
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-[3px] text-center text-[11px]">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="font-semibold text-[#2b5266]">
            {d}
          </span>
        ))}
        {Array.from({ length: leading }, (_, i) => (
          <span key={`b${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const key = `${year}-${pad(month + 1)}-${pad(i + 1)}`
          const holiday = marked.get(key)
          const cls = holiday
            ? 'bg-[#f3c969] text-[#3d2a00] font-semibold'
            : key === todayKey
              ? 'bg-ocean-900 text-white font-semibold'
              : 'bg-ocean-100 text-[#5a5d60]'
          return (
            <span key={key} title={holiday?.label} className={`h-[21px] rounded-md leading-[21px] ${cls}`}>
              {i + 1}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function NextHoliday({ holiday }) {
  const date = new Date(holiday.date)
  return (
    <p className="mt-2.5 flex items-center gap-2 border-t border-ocean-line pt-2.5 text-[12.5px] text-ocean-sub">
      <span className="h-2.5 w-2.5 flex-none rounded-sm bg-[#f3c969]" aria-hidden="true" />
      <span className="min-w-0 truncate">
        Next: <span className="font-semibold text-ocean-ink">{holiday.label}</span> ·{' '}
        {date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
      </span>
    </p>
  )
}

/*
 * The company holiday list as a month you can page through, holidays in
 * gold, with the next one named beneath it. Holidays only — events rotate in
 * Highlights above, and meetings are personal.
 */
export default function HolidayCalendar() {
  const query = useCalendarEvents()
  const todayKey = toDateKey(new Date())
  const holidays = query.data
    .filter((item) => item.type === 'holiday')
    .sort((a, b) => a.date.localeCompare(b.date))
  const next = holidays.find((h) => h.date >= todayKey)

  return (
    <Panel as="section" id="holidays" aria-labelledby="holidays-heading" className="scroll-mt-20 px-5 py-4">
      <h2 id="holidays-heading" className="text-[17px] font-semibold text-[#000a0c]">
        Holiday Calendar
      </h2>

      <div className="mt-1.5">
        <QueryBoundary
          query={query}
          label="the holiday calendar"
          compact
          isEmpty={() => false}
          skeleton={<Skeleton className="h-[190px] w-full" rounded="rounded-xl" />}
        >
          {() => (
            <>
              <MonthGrid holidays={holidays} />
              {next && <NextHoliday holiday={next} />}
            </>
          )}
        </QueryBoundary>
      </div>
    </Panel>
  )
}

import { useCalendarEvents } from '@/hooks/useCalendarEvents'
import { CONTAINER } from '@/lib/layout'
import { scrollToSection } from '@/utils/scrollToSection'
import { toDateKey } from '@/utils/calendarLinks'

function formatDay(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

/*
 * One line under the header naming the next thing on the company calendar —
 * an event or a holiday, never a personal meeting. Until the calendar has
 * loaded, or when nothing is coming up, it is simply absent: an empty ribbon
 * would be a strip of white with nothing to say.
 */
export default function TodayRibbon() {
  const { data, isPending, isError } = useCalendarEvents()
  if (isPending || isError) return null

  const from = toDateKey(new Date())
  const next = data
    .filter((item) => item.type !== 'meeting' && item.date >= from)
    .sort((a, b) => a.date.localeCompare(b.date))[0]
  if (!next) return null

  const detail =
    next.type === 'holiday'
      ? `Holiday on ${formatDay(next.date)}.`
      : `${formatDay(next.date)}, ${next.time}${next.location ? ` in the ${next.location}` : ''}.`

  return (
    <div className="border-b border-line/[0.06] bg-surface">
      <p className={`${CONTAINER} py-2 text-center text-sm leading-normal text-ink`}>
        <span className="font-semibold">{next.label}.</span> {detail}{' '}
        <a
          href="#calendar"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('calendar')
          }}
          className="whitespace-nowrap rounded font-semibold text-brand-primary hover:text-brand-dark focus-ring dark:text-[#8fb5ec]"
        >
          See calendar →
        </a>
      </p>
    </div>
  )
}

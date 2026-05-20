import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { calendarService } from '@/services/calendarService'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function toKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function CalendarWidget() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  const events = calendarService.getEvents()
  const eventMap = Object.fromEntries(events.map((e) => [e.date, e]))

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
  }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  )

  const selectedKey = selectedDate ? toKey(year, month, selectedDate) : null
  const selectedEvent = selectedKey ? eventMap[selectedKey] : null

  return (
    <div className="site-surface rounded-card border p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 rounded hover:bg-bg-alt focus-ring" aria-label="Previous month">
          <ChevronLeft size={16} className="text-text-secondary" />
        </button>
        <span className="text-sm font-semibold text-text-primary">
          {MONTHS[month]} {year}
        </span>
        <button onClick={nextMonth} className="p-1 rounded hover:bg-bg-alt focus-ring" aria-label="Next month">
          <ChevronRight size={16} className="text-text-secondary" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {DAYS.map((d) => (
          <div key={d} className="text-[10px] font-semibold text-text-secondary py-1">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />
          const key = toKey(year, month, day)
          const event = eventMap[key]
          const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate()
          const isSelected = selectedDate === day

          return (
            <button
              key={key}
              onClick={() => setSelectedDate(isSelected ? null : day)}
              className={`relative flex flex-col items-center justify-center text-xs py-1 rounded focus-ring
                ${isToday ? 'bg-brand-primary text-white font-semibold' : ''}
                ${isSelected && !isToday ? 'bg-brand-light text-brand-primary font-semibold' : ''}
                ${!isToday && !isSelected ? 'text-text-primary hover:bg-bg-alt' : ''}
              `}
              aria-label={`${day} ${MONTHS[month]}${event ? `, ${event.label}` : ''}`}
            >
              {day}
              {event && (
                <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${event.type === 'holiday' ? 'bg-red-500' : 'bg-brand-primary'} ${isToday ? 'bg-white' : ''}`} />
              )}
            </button>
          )
        })}
      </div>

      {selectedEvent && (
        <div className="mt-3 p-2 rounded bg-brand-light text-xs text-brand-primary font-medium">
          {selectedEvent.label}
        </div>
      )}
    </div>
  )
}

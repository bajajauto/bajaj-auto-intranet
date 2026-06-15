import { Bell, CalendarDays } from 'lucide-react'
import distinctlyAheadBanner from '@/assets/distinctly-ahead-banner-small-text.png'
import { useUser } from '@/context/UserContext'
import { calendarService } from '@/services/calendarService'
import { notificationService } from '@/services/notificationService'
import StockTickerTape from '@/components/dashboard/StockTickerTape'

function getHeroMoment() {
  const h = new Date().getHours()
  if (h >= 0 && h < 5) return { greeting: 'Good Night' }
  if (h >= 5 && h < 11) return { greeting: 'Good Morning' }
  if (h >= 11 && h < 19) return { greeting: 'Good Afternoon' }
  if (h >= 19 && h < 22) return { greeting: 'Good Evening' }
  return { greeting: 'Good Night' }
}

function formatIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`
}

function DistinctlyAheadScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0E4E87]">
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${distinctlyAheadBanner})`,
          backgroundPosition: 'center 34%',
          backgroundSize: '88% auto',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#083D73]/85 via-[#083D73]/30 to-[#083D73]/10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#062A55]/85 to-transparent" />
    </div>
  )
}

export default function HeroBanner() {
  const user = useUser()
  const moment = getHeroMoment()
  const unreadCount = notificationService.getAll().length
  const todayKey = formatIsoDate(new Date())
  const meetingsToday = calendarService
    .getEvents()
    .filter((event) => event.type === 'meeting' && event.date === todayKey)
  const meetingsTodayCount = String(meetingsToday.length).padStart(2, '0')
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="relative mb-5 overflow-hidden rounded-2xl animate-fade-up">
      <DistinctlyAheadScene />

      <div className="relative z-10 flex h-[320px] flex-col">
        <div className="flex flex-1 flex-col justify-between gap-3 p-4 text-white md:px-5 md:py-4">
          <div className="max-w-sm">
            <p className="mb-0.5 text-xs font-medium tracking-wide text-white/60">{moment.greeting}</p>
            <h1 className="mb-0.5 text-lg font-bold tracking-tight text-white">{user.name}</h1>
            <p className="text-xs font-medium text-white/55">
              {user.designation} &middot; {user.department}
            </p>
          </div>

          <div className="max-w-sm">
            <div className="mt-1.5 w-56 max-w-full rounded-card border border-white/15 bg-white/10 px-3.5 py-2 shadow-modal backdrop-blur-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    Meetings Today
                  </p>
                  <div className="mt-1.5 flex items-end gap-2">
                    <span className="text-[1.35rem] font-bold leading-none text-white">
                      {meetingsTodayCount}
                    </span>
                    <span className="pb-1 text-xs font-medium text-white/55">scheduled</span>
                  </div>
                </div>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                  <CalendarDays size={16} />
                </span>
              </div>
            </div>

            <div className="mt-1.5 flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                <Bell size={12} className="text-amber-300" />
                <span className="text-amber-200">{unreadCount} new</span>
                <span className="text-white/50">notifications</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                <CalendarDays size={12} />
                {today}
              </div>
            </div>
          </div>
        </div>

        <StockTickerTape />
      </div>
    </div>
  )
}

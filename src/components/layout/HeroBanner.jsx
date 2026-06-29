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
        className="absolute inset-0 bg-no-repeat bg-[length:auto_86%] bg-[position:48%_center] sm:bg-[length:auto_96%] sm:bg-[position:60%_center] md:bg-[length:88%_auto] md:bg-[position:64%_34%]"
        style={{ backgroundImage: `url(${distinctlyAheadBanner})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#083D73]/92 via-[#083D73]/45 to-[#083D73]/5 md:from-[#083D73]/85 md:via-[#083D73]/30 md:to-[#083D73]/10" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#062A55]/90 via-[#062A55]/30 to-transparent" />
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

      <div className="relative z-10 flex h-[218px] flex-col sm:h-[258px] md:h-[320px]">
        <div className="flex flex-1 flex-col justify-start gap-1 p-2.5 pt-3 text-white sm:gap-2 sm:p-4 md:gap-2.5 md:px-5 md:py-4">
          <div className="max-w-[11.5rem] sm:max-w-sm">
            <p className="text-[9px] font-medium leading-tight tracking-wide text-white/65 sm:mb-0.5 sm:text-xs">{moment.greeting}</p>
            <h1 className="text-sm font-bold leading-tight tracking-tight text-white sm:mb-0.5 sm:text-lg">{user.name}</h1>
            <p className="text-[9px] font-medium leading-tight text-white/60 sm:text-xs">
              {user.designation} &middot; {user.department}
            </p>
          </div>

          <div className="w-24 max-w-full rounded-lg border border-white/15 bg-white/10 px-1.5 py-1 shadow-modal backdrop-blur-md sm:w-40 sm:px-2.5 sm:py-2 md:w-48 md:px-3">
            <div className="flex items-start justify-between gap-1 sm:gap-2">
              <div>
                <p className="text-[7px] font-semibold uppercase leading-tight tracking-[0.1em] text-white/55 sm:text-[10px] sm:tracking-[0.16em]">
                  Meetings Today
                </p>
                <div className="mt-0.5 flex items-end gap-1 sm:mt-1.5 sm:gap-2">
                  <span className="text-sm font-bold leading-none text-white sm:text-xl md:text-[1.35rem]">
                    {meetingsTodayCount}
                  </span>
                  <span className="pb-px text-[7px] font-medium leading-none text-white/60 sm:text-[10px] md:pb-1 md:text-xs">scheduled</span>
                </div>
              </div>
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white sm:h-8 sm:w-8 md:h-9 md:w-9">
                <CalendarDays size={10} className="sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              </span>
            </div>
          </div>

          <div className="flex max-w-sm flex-col items-start gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/75 backdrop-blur-sm sm:px-3 sm:text-xs">
              <CalendarDays size={12} />
              {today}
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm sm:px-3 sm:text-xs">
              <Bell size={12} className="text-amber-300" />
              <span className="text-amber-200">{unreadCount} new</span>
              <span className="text-white/50">notifications</span>
            </div>
          </div>
        </div>

        <StockTickerTape />
      </div>
    </div>
  )
}

import { Bell, CalendarDays, Factory, TrendingUp } from 'lucide-react'
import pulsarImage from '@/assets/pulsar.webp'
import { useUser } from '@/context/UserContext'
import { calendarService } from '@/services/calendarService'
import { notificationService } from '@/services/notificationService'

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

function MotorcycleIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 36h64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <circle cx="18" cy="34" r="10" stroke="currentColor" strokeWidth="4" />
      <circle cx="62" cy="34" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        d="M18 34 29 20h14l10 14M28 20c5-9 20-9 27 0l9-2M38 20l-5 13h20M31 13l-6-8M58 13l7-8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 27h22l-8 6H27l5-6Z" fill="#e5e7eb" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

const SALES_SNAPSHOT = [
  {
    id: 'manufactured',
    label: 'Manufactured',
    value: '4.12L',
    icon: Factory,
  },
  {
    id: 'sold',
    label: 'Sold',
    value: '3.96L',
    icon: MotorcycleIcon,
  },
]


function WheelOverlay({ cx, cy, size }) {
  const spokes = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: cx, bottom: cy, width: size, aspectRatio: '1', transform: 'translate(-50%, 50%)' }}
    >
      <svg
        viewBox="0 0 44 44"
        fill="none"
        className="hero-wheel-spin w-full h-full"
        aria-hidden
      >
        <defs>
          <clipPath id="wc">
            <circle cx="22" cy="22" r="20" />
          </clipPath>
        </defs>
        <g clipPath="url(#wc)">
          {spokes.map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1="22" y1="22"
                x2={22 + 19 * Math.cos(rad)}
                y2={22 + 19 * Math.sin(rad)}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            )
          })}
          <circle cx="22" cy="22" r="2.8" fill="rgba(255,255,255,0.45)" />
        </g>
      </svg>
    </div>
  )
}

function PulsarHeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1A56A8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.14),transparent_32%),linear-gradient(90deg,rgba(19,62,130,0.96)_0%,rgba(26,86,168,0.88)_42%,rgba(26,86,168,1)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#133E82]/80 to-transparent" />

      {/* Outer div: horizontal drive + flip */}
      <div className="hero-pulsar-drive pointer-events-none absolute bottom-3 select-none">
        {/* Inner div: suspension bob */}
        <div className="hero-pulsar-bob relative inline-block">
          <img
            src={pulsarImage}
            alt=""
            className="h-[132px] w-auto sm:h-[168px] md:h-[198px] lg:h-[226px]"
            draggable="false"
          />
          {/* Rear wheel — cx=16% → visual 84% from left, 30% from bottom */}
          <WheelOverlay cx="16%" cy="30%" size="20%" />
          {/* Front wheel — cx=84% → visual 16% from left, 30% from bottom */}
          <WheelOverlay cx="84%" cy="30%" size="18%" />
        </div>
      </div>

      <style>{`
        @keyframes hero-pulsar-drive {
          from { transform: translateX(106vw) scaleX(-1); }
          to   { transform: translateX(-24vw) scaleX(-1); }
        }
        @keyframes hero-pulsar-bob {
          0%,  100% { transform: translateY(0px); }
          25%        { transform: translateY(-3px); }
          75%        { transform: translateY(2px); }
        }
        .hero-pulsar-drive {
          animation: hero-pulsar-drive 7s linear infinite;
          will-change: transform;
        }
        .hero-pulsar-bob {
          animation: hero-pulsar-bob 0.42s ease-in-out infinite;
        }
        @keyframes hero-wheel-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .hero-wheel-spin {
          animation: hero-wheel-spin 0.4s linear infinite;
          transform-origin: center;
        }
      `}</style>
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
    <div className="relative mb-5 overflow-hidden rounded-2xl animate-fade-up" style={{ minHeight: '128px' }}>
      <PulsarHeroScene />

      <div className="relative z-10 flex min-h-[128px] flex-col gap-2 p-4 text-white md:px-5 md:py-4 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="max-w-sm lg:self-end">
          <p className="mb-0.5 text-xs font-medium tracking-wide text-white/60">{moment.greeting}</p>
          <h1 className="mb-0.5 text-lg font-bold tracking-tight text-white">
            {user.name}
          </h1>
          <p className="text-xs font-medium text-white/55">
            {user.designation} &middot; {user.department}
          </p>

          <div className="mt-1.5 max-w-sm rounded-card border border-white/15 bg-white/10 px-3.5 py-2 shadow-modal backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
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

          <div className="mt-1.5 max-w-sm rounded-card border border-white/15 bg-white/10 px-3.5 py-2 shadow-modal backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Sales snapshot
                </p>
                <p className="mt-0.5 text-xs font-semibold text-white">Month overview</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-[11px] font-semibold text-emerald-100">
                <TrendingUp size={12} />
                +8.4%
              </span>
            </div>

            <div className="mt-1 border-t border-white/10" />

            <div className="mt-1 grid grid-cols-2 divide-x divide-white/10">
              {SALES_SNAPSHOT.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.id} className="flex flex-col gap-1 px-3 first:pl-0 last:pr-0">
                    <div className="flex items-center gap-2 text-white/60">
                      <Icon
                        size={metric.id === 'sold' ? 24 : 18}
                        className="flex-shrink-0 text-white/70"
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wide">
                        {metric.label}
                      </span>
                    </div>
                    <p className="text-[0.95rem] font-bold leading-none text-white">{metric.value}</p>
                  </div>
                )
              })}
            </div>
            <p className="mt-1 border-t border-white/10 pt-1 text-[10px] font-medium uppercase tracking-wide text-white/40">
              Units this month
            </p>
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
    </div>
  )
}

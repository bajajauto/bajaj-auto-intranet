import { Bell, CalendarDays, Factory, TrendingUp } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { calendarService } from '@/services/calendarService'
import { notificationService } from '@/services/notificationService'

function getHeroMoment() {
  const h = new Date().getHours()
  if (h >= 0  && h < 5)  return { greeting: 'Good Night',     timeOfDay: 'night',     subtitle: 'Night mode: dreams on cruise control.' }
  if (h >= 5  && h < 7)  return { greeting: 'Good Morning',   timeOfDay: 'dawn',      subtitle: 'Fresh keys, fresh roads, fresh spark.' }
  if (h >= 7  && h < 11) return { greeting: 'Good Morning',   timeOfDay: 'morning',   subtitle: "Coffee's warmed up. So are we." }
  if (h >= 11 && h < 14) return { greeting: 'Good Afternoon', timeOfDay: 'noon',      subtitle: 'Midday pit stop: refuel, reset, roll on.' }
  if (h >= 14 && h < 19) return { greeting: 'Good Afternoon', timeOfDay: 'afternoon', subtitle: 'Afternoon lane: steady hands, bright ideas.' }
  if (h >= 19 && h < 22) return { greeting: 'Good Evening',   timeOfDay: 'evening',   subtitle: 'Evening lights on. Nice drive today.' }
  return                        { greeting: 'Good Night',      timeOfDay: 'night',     subtitle: 'Parked for now. Tomorrow gets the throttle.' }
}

function formatIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`
}

const SKY = {
  night:     { sky: ['#060d1f', '#0f2347'], field: '#14532d', fieldFar: '#166534', showSun: false, moonX: 720, moonY: 38,  sunX: 0,   sunY: 0,   sunColor: '#fbbf24', cloudFill: '#1e3a8a', cloudOp: 0.5,  stars: true  },
  dawn:      { sky: ['#3b0764', '#c2410c'], field: '#15803d', fieldFar: '#166534', showSun: true,  moonX: 0,   moonY: 0,   sunX: 80,  sunY: 128, sunColor: '#ef4444', cloudFill: '#fda4af', cloudOp: 0.85, stars: false },
  morning:   { sky: ['#075985', '#7dd3fc'], field: '#16a34a', fieldFar: '#15803d', showSun: true,  moonX: 0,   moonY: 0,   sunX: 160, sunY: 45,  sunColor: '#fbbf24', cloudFill: '#ffffff', cloudOp: 0.95, stars: false },
  noon:      { sky: ['#0369a1', '#38bdf8'], field: '#16a34a', fieldFar: '#15803d', showSun: true,  moonX: 0,   moonY: 0,   sunX: 450, sunY: 22,  sunColor: '#fef08a', cloudFill: '#ffffff', cloudOp: 0.90, stars: false },
  afternoon: { sky: ['#0c4a6e', '#60a5fa'], field: '#15803d', fieldFar: '#14532d', showSun: true,  moonX: 0,   moonY: 0,   sunX: 740, sunY: 45,  sunColor: '#fbbf24', cloudFill: '#ffffff', cloudOp: 0.85, stars: false },
  evening:   { sky: ['#7c2d12', '#f97316'], field: '#166534', fieldFar: '#14532d', showSun: true,  moonX: 0,   moonY: 0,   sunX: 820, sunY: 128, sunColor: '#dc2626', cloudFill: '#fca5a5', cloudOp: 0.80, stars: false },
}

const STARS = [
  [60,18],[130,32],[220,14],[310,28],[420,11],[510,36],[600,20],[690,8],[790,30],[850,16],
  [40,52],[180,48],[350,56],[500,44],[670,60],[820,50],[110,70],[430,65],[730,72],
]

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
      <path d="M4 14c9 2 16 2 24 0M66 10l8 3M2 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
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

// Auto in LOCAL coords — y=0 is ground level (wheel bottom), facing LEFT
// 3-wheeler: single front wheel (left/front) + two rear wheels (right/rear, near+far)
function AutoBody() {
  return (
    <g>
      {/* ══ LAYER 0: FAR-SIDE REAR WHEEL (behind near-side, drawn first) ══ */}
      <circle cx="168" cy="-23" r="23" fill="#111"/>
      <circle cx="168" cy="-23" r="15" fill="#e5e7eb"/>
      <circle cx="168" cy="-23" r="9"  fill="#6b7280"/>
      <circle cx="168" cy="-23" r="3"  fill="#f8fafc"/>

      {/* ══ LAYER 1: CHASSIS / FLOOR ══ */}
      {/* Rear axle bar (connects two rear wheels) */}
      <rect x="148" y="-30" width="30" height="7" rx="3" fill="#374151"/>
      {/* Main chassis floor */}
      <rect x="30" y="-32" width="148" height="10" rx="3" fill="#1e3a1e"/>
      {/* Front fork / steering column */}
      <line x1="42" y1="-23" x2="52" y2="-34" stroke="#374151" strokeWidth="6" strokeLinecap="round"/>

      {/* ══ LAYER 2: BODY ══ */}
      {/* Lower green body panels */}
      <path d="M 26 -68 C 34 -88 50 -96 76 -96 L 174 -94 C 184 -84 188 -70 188 -50 L 188 -31 L 175 -31 C 172 -49 161 -58 148 -58 C 132 -58 121 -46 119 -31 L 63 -31 C 60 -48 50 -58 36 -58 C 25 -58 17 -50 13 -39 L 9 -39 C 10 -52 16 -62 26 -68 Z" fill="#16a34a"/>
      {/* Upper body */}
      <path d="M 82 -93 L 175 -91 L 175 -63 L 83 -63 Z" fill="#14532d"/>
      {/* Yellow horizontal stripe (centre band) */}
      <path d="M 18 -84 L 80 -84 L 78 -71 L 14 -71 Z" fill="#f59e0b"/>

      {/* ══ LAYER 3: FRONT SECTION (left = front) ══ */}
      {/* Engine cowl / front face — slanted trapeziod */}
      <path d="M 9 -74 L 22 -101 C 30 -119 47 -128 74 -126 L 84 -125 C 76 -104 72 -86 73 -69 L 62 -43 L 15 -43 C 8 -53 6 -64 9 -74 Z" fill="#374151"/>
      {/* Windshield glass */}
      <path d="M 31 -99 C 39 -116 53 -122 76 -121 C 88 -120 93 -113 91 -102 L 85 -80 C 83 -73 78 -70 69 -70 L 28 -70 C 25 -82 26 -92 31 -99 Z" fill="#9ca3af" opacity="0.78"/>
      {/* Windshield glare streak */}
      <line x1="50" y1="-111" x2="39" y2="-82" stroke="white" strokeWidth="2" opacity="0.55" strokeLinecap="round"/>
      <line x1="75" y1="-110" x2="52" y2="-79" stroke="#111827" strokeWidth="3" opacity="0.65" strokeLinecap="round"/>
      <line x1="59" y1="-119" x2="59" y2="-70" stroke="#111827" strokeWidth="2" opacity="0.65"/>
      {/* Front bumper nose (rounded) */}
      <path d="M 11 -66 L 63 -66 L 58 -47 L 17 -47 C 13 -53 11 -59 11 -66 Z" fill="#4b5563"/>
      {/* Headlight */}
      <ellipse cx="48" cy="-55" rx="9" ry="12" fill="#e5e7eb"/>
      <ellipse cx="48" cy="-55" rx="5" ry="7" fill="#f8fafc"/>
      {/* Front turn indicator */}
      <rect x="67" y="-80" width="18" height="8" rx="2" fill="#ef4444"/>
      {/* Number plate */}
      <rect x="18" y="-77" width="28" height="22" rx="5" fill="#e59b17"/>
      {/* Side mirror arm */}
      <line x1="78" y1="-105" x2="103" y2="-123" stroke="#1f2937" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="106" cy="-126" rx="8" ry="11" fill="#4b5563" transform="rotate(-18 106 -126)"/>
      <line x1="24" y1="-99" x2="8" y2="-111" stroke="#1f2937" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="5" cy="-113" rx="5" ry="8" fill="#1f2937" transform="rotate(-28 5 -113)"/>

      {/* ══ LAYER 4: CANOPY / ROOF (dome-shaped, yellow) ══ */}
      {/* Canopy dome — tall arch shape */}
      <path d="M 25 -103 C 31 -142 57 -155 106 -153 L 151 -151 C 178 -148 194 -140 207 -127 C 216 -110 220 -96 218 -82 L 194 -83 C 194 -96 188 -106 176 -110 L 93 -117 C 84 -124 74 -128 56 -126 C 42 -123 34 -115 29 -101 Z" fill="#facc15"/>
      {/* Canopy interior ceiling edge */}
      <path d="M 31 -109 C 43 -139 70 -146 111 -144 L 165 -140" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" opacity="0.55"/>
      {/* Top flat section */}
      <path d="M 38 -121 C 57 -138 86 -140 130 -137" stroke="#fde047" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
      {/* Front canopy overhang lip */}
      <path d="M 18 -101 Q 9 -101 7 -95 Q 6 -90 16 -90 L 29 -101 Z" fill="#facc15"/>
      {/* Rear canopy tail */}
      <path d="M 194 -83 C 207 -82 215 -86 218 -94 L 219 -77 L 195 -73 Z" fill="#eab308"/>

      {/* ══ LAYER 5: CANOPY PILLARS ══ */}
      <rect x="90" y="-112" width="7" height="81" rx="3.5" fill="#14532d"/>
      <rect x="175" y="-110" width="7" height="78" rx="3.5" fill="#14532d"/>

      {/* ══ LAYER 6: INTERIOR ══ */}
      {/* Passenger bench seat */}
      <rect x="89"  y="-65" width="56" height="24" rx="5" fill="#6b4f3d"/>
      <rect x="94"  y="-72" width="54" height="18" rx="5" fill="#8b6b4f"/>
      {/* Bench legs */}
      <rect x="91"  y="-38" width="32" height="11" rx="4" fill="#c19a73"/>
      <rect x="155" y="-64" width="30" height="25" rx="5" fill="#5a4537"/>

      {/* ══ LAYER 7: DRIVER ══ */}
      {/* Body / torso */}
      <rect x="50" y="-76" width="18" height="20" rx="4" fill="#1d4ed8"/>
      {/* Head */}
      <circle cx="59" cy="-86" r="10" fill="#fde68a"/>
      {/* Hair */}
      <path d="M 49 -88 Q 50 -100 59 -100 Q 67 -99 69 -88" fill="#1c1917"/>
      {/* Arm on handlebar */}
      <line x1="51" y1="-72" x2="39" y2="-65" stroke="#fde68a" strokeWidth="4" strokeLinecap="round"/>
      {/* Handlebar */}
      <line x1="32" y1="-64" x2="43" y2="-64" stroke="#374151" strokeWidth="5" strokeLinecap="round"/>

      {/* ══ LAYER 8: REAR SECTION ══ */}
      <path d="M 175 -86 Q 196 -78 196 -58 Q 196 -41 182 -31 L 175 -31 Z" fill="#22c55e"/>
      {/* Rear light */}
      <ellipse cx="190" cy="-46" rx="5"  ry="8"  fill="#ef4444"/>
      <ellipse cx="190" cy="-46" rx="8"  ry="11" fill="#ef4444" opacity="0.25"/>
      {/* Exhaust pipe */}
      <rect x="178" y="-32" width="18" height="5" rx="2.5" fill="#6b7280"/>

      {/* ══ LAYER 9: NEAR-SIDE REAR WHEEL (front/visible) ══ */}
      <circle cx="158" cy="-23" r="25" fill="#1a1a1a"/>
      <circle cx="158" cy="-23" r="16" fill="#e5e7eb"/>
      <circle cx="158" cy="-23" r="9"  fill="#9ca3af"/>
      <circle cx="158" cy="-23" r="3"  fill="#f8fafc"/>
      <g style={{ transformOrigin: '158px -23px', animation: 'ars-spin 0.3s linear infinite' }}>
        <line x1="158" y1="-48" x2="158" y2="2"   stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="133" y1="-23" x2="183" y2="-23"  stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="140" y1="-40" x2="176" y2="-6"   stroke="#4b5563" strokeWidth="1.5"/>
        <line x1="140" y1="-6"  x2="176" y2="-40"  stroke="#4b5563" strokeWidth="1.5"/>
      </g>
      {/* Tyre bottom touch-line (connects to ground) */}
      <line x1="158" y1="2" x2="158" y2="0" stroke="#1a1a1a" strokeWidth="3"/>

      {/* ══ LAYER 10: FRONT WHEEL (single, steering) ══ */}
      <path d="M -2 -34 C 9 -51 30 -56 48 -45 C 30 -44 16 -37 5 -25 Z" fill="#22c55e"/>
      <circle cx="34" cy="-22" r="23" fill="#1a1a1a"/>
      <circle cx="34" cy="-22" r="15" fill="#e5e7eb"/>
      <circle cx="34" cy="-22" r="9"  fill="#9ca3af"/>
      <circle cx="34" cy="-22" r="2.5" fill="#f8fafc"/>
      <g style={{ transformOrigin: '34px -22px', animation: 'ars-spin 0.3s linear infinite' }}>
        <line x1="34" y1="-44" x2="34" y2="0"    stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="12" y1="-22" x2="56" y2="-22"  stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="18" y1="-38" x2="50" y2="-6"   stroke="#4b5563" strokeWidth="1.5"/>
        <line x1="18" y1="-6"  x2="50" y2="-38"  stroke="#4b5563" strokeWidth="1.5"/>
      </g>

      {/* ══ EXHAUST PUFFS (trailing to the right) ══ */}
      <circle cx="202" cy="-30" r="7"   fill="#e5e7eb" opacity="0.55"
        style={{ animation: 'ars-puff 1.0s ease-out infinite' }}/>
      <circle cx="216" cy="-25" r="5.5" fill="#e5e7eb" opacity="0.35"
        style={{ animation: 'ars-puff 1.0s ease-out infinite', animationDelay: '0.22s' }}/>
      <circle cx="228" cy="-20" r="4"   fill="#e5e7eb" opacity="0.2"
        style={{ animation: 'ars-puff 1.0s ease-out infinite', animationDelay: '0.44s' }}/>

      {/* ══ GROUND SHADOW ══ */}
      <ellipse cx="100" cy="6" rx="100" ry="6" fill="black" opacity="0.14"/>
    </g>
  )
}

function AutoRickshawScene({ timeOfDay }) {
  const t = SKY[timeOfDay] || SKY.morning
  const skyId  = `sky-${timeOfDay}`
  const sunId  = `sun-${timeOfDay}`
  const textId = `text-bg-${timeOfDay}`

  return (
    <svg
      viewBox="0 0 900 220"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={t.sky[0]}/>
          <stop offset="100%" stopColor={t.sky[1]}/>
        </linearGradient>
        {/* Sun radial */}
        <radialGradient id={sunId}>
          <stop offset="0%"   stopColor="#fffbeb"/>
          <stop offset="55%"  stopColor={t.sunColor}/>
          <stop offset="100%" stopColor={t.sunColor} stopOpacity="0.4"/>
        </radialGradient>
        {/* Left text overlay gradient */}
        <linearGradient id={textId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#0c2461" stopOpacity="0.90"/>
          <stop offset="38%"  stopColor="#0c2461" stopOpacity="0.70"/>
          <stop offset="65%"  stopColor="#0c2461" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#0c2461" stopOpacity="0"/>
        </linearGradient>
        {/* Field depth gradient */}
        <linearGradient id="field-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={t.fieldFar}/>
          <stop offset="100%" stopColor={t.field}/>
        </linearGradient>
        <clipPath id="scene-clip">
          <rect x="0" y="0" width="900" height="220"/>
        </clipPath>
      </defs>

      <g clipPath="url(#scene-clip)">

        {/* ── SKY ── */}
        <rect x="0" y="0" width="900" height="220" fill={`url(#${skyId})`}/>

        {/* Stars */}
        {t.stars && STARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2 : 1.2} fill="white"
            style={{ animation: `ars-twinkle ${1.4 + (i % 5) * 0.35}s ease-in-out infinite`, animationDelay: `${i * 0.15}s`, opacity: 0.7 }}/>
        ))}

        {/* Moon */}
        {!t.showSun && (
          <g>
            <circle cx={t.moonX} cy={t.moonY} r="22" fill="#e2e8f0" opacity="0.25"/>
            <circle cx={t.moonX} cy={t.moonY} r="17" fill="#e2e8f0"/>
            <circle cx={t.moonX + 7} cy={t.moonY - 6} r="12" fill={t.sky[0]}/>
          </g>
        )}

        {/* Sun */}
        {t.showSun && (
          <g style={{ animation: 'ars-sun-pulse 4s ease-in-out infinite' }}>
            <circle cx={t.sunX} cy={t.sunY} r="32" fill={t.sunColor} opacity="0.15"/>
            <circle cx={t.sunX} cy={t.sunY} r="22" fill={`url(#${sunId})`}/>
          </g>
        )}

        {/* ── CLOUDS (seamless loop: 2 copies offset by half duration) ── */}
        {[0, 1].map(i => (
          <g key={`ca${i}`} opacity={t.cloudOp}
            style={{ animation: 'ars-cloud-a 32s linear infinite', animationDelay: i === 1 ? '-16s' : '0s' }}>
            <ellipse cx="200" cy="52" rx="55" ry="22" fill={t.cloudFill}/>
            <ellipse cx="162" cy="62" rx="32" ry="18" fill={t.cloudFill}/>
            <ellipse cx="240" cy="62" rx="38" ry="18" fill={t.cloudFill}/>
          </g>
        ))}
        {[0, 1].map(i => (
          <g key={`cb${i}`} opacity={t.cloudOp * 0.7}
            style={{ animation: 'ars-cloud-b 48s linear infinite', animationDelay: i === 1 ? '-24s' : '0s' }}>
            <ellipse cx="620" cy="38" rx="42" ry="16" fill={t.cloudFill}/>
            <ellipse cx="585" cy="46" rx="25" ry="13" fill={t.cloudFill}/>
            <ellipse cx="658" cy="46" rx="28" ry="13" fill={t.cloudFill}/>
          </g>
        ))}

        {/* ── FIELD ── */}
        {/* Far distance field (horizon, lighter) */}
        <rect x="0" y="145" width="900" height="75" fill={`url(#field-depth)`}/>

        {/* Horizon gentle hill silhouette */}
        <path d="M 0 148 Q 150 138 300 148 Q 450 158 600 145 Q 750 135 900 148 L 900 145 L 0 145 Z"
          fill={t.fieldFar} opacity="0.7"/>

        {/* Distant tree line */}
        {[80,160,240,330,480,570,660,750,840].map((x, i) => (
          <ellipse key={i} cx={x} cy={143} rx={14 + (i % 3) * 4} ry={10 + (i % 2) * 4}
            fill={t.fieldFar} opacity="0.6"/>
        ))}

        {/* Scattered field bushes (foreground) */}
        {[50,200,380,520,680,820].map((x, i) => (
          <ellipse key={i} cx={x} cy={180 + (i % 2) * 8} rx={18 + i * 2} ry={10 + i}
            fill={t.field} opacity="0.6"/>
        ))}

        {/* Small flowers */}
        {[[120,172],[290,185],[450,175],[610,188],[760,178],[880,182]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="3"
            fill={['#fbbf24','#f87171','#c084fc','#34d399','#60a5fa','#fb923c'][i]}
            opacity="0.85"/>
        ))}

        {/* ── AUTO RICKSHAW (driving left) ── */}
        <g style={{ animation: 'ars-drive 11s linear infinite' }}>
          <g style={{ animation: 'ars-bounce-y 0.65s ease-in-out infinite' }}>
            <g transform="translate(0, 155) scale(1 0.82)">
              <AutoBody/>
            </g>
          </g>
        </g>

        {/* ── LEFT TEXT OVERLAY ── */}
        <rect x="0" y="0" width="900" height="220" fill={`url(#${textId})`}/>

      </g>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes ars-drive {
          from { transform: translateX(960px); }
          to   { transform: translateX(-230px); }
        }
        @keyframes ars-bounce-y {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-4px); }
        }
        @keyframes ars-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ars-puff {
          0%   { transform: scale(1)   translateY(0px);  opacity: 0.5; }
          100% { transform: scale(3)   translateY(-10px); opacity: 0; }
        }
        @keyframes ars-cloud-a {
          from { transform: translateX(900px); }
          to   { transform: translateX(-900px); }
        }
        @keyframes ars-cloud-b {
          from { transform: translateX(900px); }
          to   { transform: translateX(-900px); }
        }
        @keyframes ars-sun-pulse {
          0%,100% { transform: scale(1);    opacity: 1; }
          50%     { transform: scale(1.07); opacity: 0.88; }
        }
        @keyframes ars-twinkle {
          0%,100% { opacity: 0.25; }
          50%     { opacity: 0.95; }
        }
      `}</style>
    </svg>
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

      {/* Full-background animated scene */}
      <div className="absolute inset-0">
        <AutoRickshawScene timeOfDay={moment.timeOfDay}/>
      </div>

      {/* Text — floats over the left gradient overlay */}
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
              <Bell size={12} className="text-amber-300"/>
              <span className="text-amber-200">{unreadCount} new</span>
              <span className="text-white/50">notifications</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
              <CalendarDays size={12}/>
              {today}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

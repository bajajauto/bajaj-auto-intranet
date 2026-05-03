import { Bell, CalendarDays } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { notificationService } from '@/services/notificationService'

function getHeroMoment() {
  const h = new Date().getHours()
  if (h >= 0  && h < 5)  return { greeting: 'Good night',     timeOfDay: 'night',     subtitle: 'The roads are quiet — rest well.' }
  if (h >= 5  && h < 7)  return { greeting: 'Good morning',   timeOfDay: 'dawn',      subtitle: 'First light. A fresh road ahead.' }
  if (h >= 7  && h < 11) return { greeting: 'Good morning',   timeOfDay: 'morning',   subtitle: "Morning shift in full swing. Let's go!" }
  if (h >= 11 && h < 14) return { greeting: 'Good afternoon', timeOfDay: 'noon',      subtitle: 'Midday — keep the engine running strong.' }
  if (h >= 14 && h < 19) return { greeting: 'Good afternoon', timeOfDay: 'afternoon', subtitle: 'Steady pace, full speed ahead.' }
  if (h >= 19 && h < 22) return { greeting: 'Good evening',   timeOfDay: 'evening',   subtitle: 'Another great day on the road. Well done.' }
  return                        { greeting: 'Good night',      timeOfDay: 'night',     subtitle: 'Time to park and rest. See you tomorrow.' }
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

// Auto in LOCAL coords — y=0 is ground level (wheel bottom), facing LEFT
// 3-wheeler: single front wheel (left/front) + two rear wheels (right/rear, near+far)
function AutoBody() {
  return (
    <g>
      {/* ══ LAYER 0: FAR-SIDE REAR WHEEL (behind near-side, drawn first) ══ */}
      <circle cx="168" cy="-23" r="23" fill="#111"/>
      <circle cx="168" cy="-23" r="14" fill="#2d2d2d"/>
      <circle cx="168" cy="-23" r="6"  fill="#111"/>
      <circle cx="168" cy="-23" r="2"  fill="#888"/>

      {/* ══ LAYER 1: CHASSIS / FLOOR ══ */}
      {/* Rear axle bar (connects two rear wheels) */}
      <rect x="148" y="-30" width="30" height="7" rx="3" fill="#374151"/>
      {/* Main chassis floor */}
      <rect x="30" y="-32" width="148" height="10" rx="3" fill="#1e3a1e"/>
      {/* Front fork / steering column */}
      <line x1="42" y1="-23" x2="52" y2="-34" stroke="#374151" strokeWidth="6" strokeLinecap="round"/>

      {/* ══ LAYER 2: BODY ══ */}
      {/* Lower green body panels */}
      <rect x="35" y="-65" width="140" height="35" fill="#16a34a"/>
      {/* Upper body */}
      <rect x="35" y="-96" width="140" height="33" fill="#16a34a"/>
      {/* Yellow horizontal stripe (centre band) */}
      <rect x="35" y="-68" width="140" height="11" fill="#fbbf24"/>

      {/* ══ LAYER 3: FRONT SECTION (left = front) ══ */}
      {/* Engine cowl / front face — slanted trapeziod */}
      <path d="M 14 -72 L 14 -32 L 36 -32 L 38 -72 Z" fill="#15803d"/>
      {/* Windshield glass */}
      <path d="M 16 -70 L 16 -36 L 34 -36 L 36 -70 Z" fill="#7dd3fc" opacity="0.80"/>
      {/* Windshield glare streak */}
      <line x1="20" y1="-68" x2="24" y2="-38" stroke="white" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>
      {/* Front bumper nose (rounded) */}
      <path d="M 10 -70 Q 2 -58 2 -50 Q 2 -40 10 -32 L 14 -32 L 14 -70 Z" fill="#166534"/>
      {/* Headlight */}
      <ellipse cx="6"  cy="-46" rx="5" ry="8" fill="#fef9c3"/>
      <ellipse cx="6"  cy="-46" rx="9" ry="13" fill="#fef9c3" opacity="0.18"/>
      {/* Front turn indicator */}
      <ellipse cx="8"  cy="-34" rx="3" ry="5"  fill="#fbbf24" opacity="0.9"/>
      {/* Number plate */}
      <rect x="4" y="-30" width="22" height="8" rx="2" fill="#fef9c3"/>
      <text x="15" y="-24" textAnchor="middle" fontSize="4" fill="#1f2937" fontFamily="monospace" fontWeight="bold">MH 20</text>
      {/* Side mirror arm */}
      <line x1="14" y1="-74" x2="4"  y2="-80" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="3" cy="-82" rx="5" ry="4" fill="#ca8a04"/>

      {/* ══ LAYER 4: CANOPY / ROOF (dome-shaped, yellow) ══ */}
      {/* Canopy dome — tall arch shape */}
      <path d="M 14 -96 Q 14 -136 42 -138 L 162 -138 Q 185 -136 175 -96 Z" fill="#fbbf24"/>
      {/* Canopy interior ceiling edge */}
      <rect x="35" y="-98" width="140" height="5" fill="#d97706"/>
      {/* Top flat section */}
      <rect x="40" y="-142" width="124" height="7" rx="3.5" fill="#b45309"/>
      {/* Front canopy overhang lip */}
      <path d="M 14 -96 Q 8 -100 6 -96 Q 5 -92 10 -90 L 14 -90 Z" fill="#fbbf24"/>
      {/* Rear canopy tail */}
      <path d="M 175 -96 Q 182 -100 184 -96 Q 184 -92 179 -90 L 175 -90 Z" fill="#fbbf24"/>

      {/* ══ LAYER 5: CANOPY PILLARS ══ */}
      <rect x="36" y="-138" width="7" height="70" rx="3.5" fill="#14532d"/>
      <rect x="168" y="-138" width="7" height="70" rx="3.5" fill="#14532d"/>

      {/* ══ LAYER 6: INTERIOR ══ */}
      {/* Passenger bench seat */}
      <rect x="90"  y="-72" width="72" height="28" rx="5" fill="#c2410c"/>
      <rect x="90"  y="-77" width="72" height="10" rx="4" fill="#9a3412"/>
      {/* Bench legs */}
      <rect x="95"  y="-44" width="5" height="14" rx="2" fill="#7c2d12"/>
      <rect x="150" y="-44" width="5" height="14" rx="2" fill="#7c2d12"/>

      {/* ══ LAYER 7: DRIVER ══ */}
      {/* Body / torso */}
      <rect x="46" y="-80" width="18" height="20" rx="4" fill="#1d4ed8"/>
      {/* Head */}
      <circle cx="55" cy="-88" r="11" fill="#fde68a"/>
      {/* Hair */}
      <path d="M 44 -88 Q 46 -102 55 -102 Q 64 -102 66 -88" fill="#1c1917"/>
      {/* Arm on handlebar */}
      <line x1="46" y1="-75" x2="36" y2="-68" stroke="#fde68a" strokeWidth="4" strokeLinecap="round"/>
      {/* Handlebar */}
      <line x1="30" y1="-64" x2="42" y2="-64" stroke="#374151" strokeWidth="5" strokeLinecap="round"/>

      {/* ══ LAYER 8: REAR SECTION ══ */}
      <path d="M 175 -96 Q 188 -80 188 -62 Q 188 -44 175 -32 Z" fill="#15803d"/>
      {/* Rear light */}
      <ellipse cx="183" cy="-44" rx="5"  ry="8"  fill="#ef4444"/>
      <ellipse cx="183" cy="-44" rx="8"  ry="11" fill="#ef4444" opacity="0.25"/>
      {/* Exhaust pipe */}
      <rect x="178" y="-32" width="18" height="5" rx="2.5" fill="#6b7280"/>

      {/* ══ LAYER 9: NEAR-SIDE REAR WHEEL (front/visible) ══ */}
      <circle cx="158" cy="-23" r="25" fill="#1a1a1a"/>
      <circle cx="158" cy="-23" r="16" fill="#374151"/>
      <circle cx="158" cy="-23" r="7"  fill="#1a1a1a"/>
      <circle cx="158" cy="-23" r="3"  fill="#9ca3af"/>
      <g style={{ transformOrigin: '158px -23px', animation: 'ars-spin 0.3s linear infinite' }}>
        <line x1="158" y1="-48" x2="158" y2="2"   stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="133" y1="-23" x2="183" y2="-23"  stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="140" y1="-40" x2="176" y2="-6"   stroke="#4b5563" strokeWidth="1.5"/>
        <line x1="140" y1="-6"  x2="176" y2="-40"  stroke="#4b5563" strokeWidth="1.5"/>
      </g>
      {/* Tyre bottom touch-line (connects to ground) */}
      <line x1="158" y1="2" x2="158" y2="0" stroke="#1a1a1a" strokeWidth="3"/>

      {/* ══ LAYER 10: FRONT WHEEL (single, steering) ══ */}
      <circle cx="42" cy="-22" r="22" fill="#1a1a1a"/>
      <circle cx="42" cy="-22" r="14" fill="#374151"/>
      <circle cx="42" cy="-22" r="6"  fill="#1a1a1a"/>
      <circle cx="42" cy="-22" r="2.5" fill="#9ca3af"/>
      <g style={{ transformOrigin: '42px -22px', animation: 'ars-spin 0.3s linear infinite' }}>
        <line x1="42" y1="-44" x2="42" y2="0"    stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="20" y1="-22" x2="64" y2="-22"  stroke="#4b5563" strokeWidth="2.5"/>
        <line x1="26" y1="-38" x2="58" y2="-6"   stroke="#4b5563" strokeWidth="1.5"/>
        <line x1="26" y1="-6"  x2="58" y2="-38"  stroke="#4b5563" strokeWidth="1.5"/>
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
        {/* Outer group: horizontal drive animation */}
        <g style={{ animation: 'ars-drive 11s linear infinite' }}>
          {/* Inner group: vertical bounce */}
          <g style={{ animation: 'ars-bounce-y 0.65s ease-in-out infinite' }}>
            {/* Auto positioned: wheel bottoms touch field at y=155 */}
            <g transform="translate(0, 155)">
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
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl animate-fade-up" style={{ minHeight: '180px' }}>

      {/* Full-background animated scene */}
      <div className="absolute inset-0">
        <AutoRickshawScene timeOfDay={moment.timeOfDay}/>
      </div>

      {/* Text — floats over the left gradient overlay */}
      <div className="relative z-10 p-6 md:p-8 max-w-sm text-white">
        <p className="mb-1 text-sm font-medium tracking-wide text-white/60">{moment.greeting}</p>
        <h1 className="mb-1 font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
          {user.name}
        </h1>
        <p className="text-sm font-medium text-white/55">
          {user.designation} &middot; {user.department}
        </p>

        <div className="mt-5 max-w-xs rounded-card border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">Bajaj Auto</p>
          <p className="mt-1 text-xs leading-relaxed text-white/65">{moment.subtitle}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
            <Bell size={12} className="text-amber-300"/>
            <span className="text-amber-200">{unreadCount} new</span>
            <span className="text-white/50">notifications</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
            <CalendarDays size={12}/>
            {today}
          </div>
        </div>
      </div>
    </div>
  )
}

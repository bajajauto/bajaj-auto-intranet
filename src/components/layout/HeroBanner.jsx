import { Bell, CalendarDays } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { notificationService } from '@/services/notificationService'

function getHeroMoment() {
  const h = new Date().getHours()
  if (h >= 0 && h < 5)  return { greeting: 'Good night',      timeOfDay: 'night',     subtitle: 'The roads are quiet — rest well.' }
  if (h >= 5 && h < 7)  return { greeting: 'Good morning',    timeOfDay: 'dawn',      subtitle: 'First light. A fresh road ahead.' }
  if (h >= 7 && h < 11) return { greeting: 'Good morning',    timeOfDay: 'morning',   subtitle: 'Morning shift in full swing. Let\'s go!' }
  if (h >= 11 && h < 14)return { greeting: 'Good afternoon',  timeOfDay: 'noon',      subtitle: 'Midday — keep the engine running strong.' }
  if (h >= 14 && h < 19)return { greeting: 'Good afternoon',  timeOfDay: 'afternoon', subtitle: 'Steady pace, full speed ahead.' }
  if (h >= 19 && h < 22)return { greeting: 'Good evening',    timeOfDay: 'evening',   subtitle: "Another great day on the road. Well done." }
  return                        { greeting: 'Good night',      timeOfDay: 'night',     subtitle: 'Time to park and rest. See you tomorrow.' }
}

const SKY = {
  night:     { sky: ['#0b1120', '#1a2f5e'], grass: '#14532d', road: '#1e293b', showSun: false, moonX: 235, moonY: 28, sunX: 0,   sunY: 0,   sunColor: '#fbbf24', cloudFill: '#1e3a8a', cloudOp: 0.45, stars: true },
  dawn:      { sky: ['#4c1d95', '#ea580c'], grass: '#15803d', road: '#374151', showSun: true,  moonX: 0,   moonY: 0,  sunX: 38,  sunY: 108, sunColor: '#ef4444', cloudFill: '#fda4af', cloudOp: 0.85, stars: false },
  morning:   { sky: ['#0369a1', '#7dd3fc'], grass: '#16a34a', road: '#4b5563', showSun: true,  moonX: 0,   moonY: 0,  sunX: 70,  sunY: 38,  sunColor: '#fbbf24', cloudFill: '#ffffff', cloudOp: 0.95, stars: false },
  noon:      { sky: ['#0284c7', '#38bdf8'], grass: '#16a34a', road: '#4b5563', showSun: true,  moonX: 0,   moonY: 0,  sunX: 152, sunY: 18,  sunColor: '#fef08a', cloudFill: '#ffffff', cloudOp: 0.90, stars: false },
  afternoon: { sky: ['#0369a1', '#60a5fa'], grass: '#15803d', road: '#4b5563', showSun: true,  moonX: 0,   moonY: 0,  sunX: 240, sunY: 38,  sunColor: '#fbbf24', cloudFill: '#ffffff', cloudOp: 0.85, stars: false },
  evening:   { sky: ['#7c2d12', '#f97316'], grass: '#166534', road: '#1f2937', showSun: true,  moonX: 0,   moonY: 0,  sunX: 272, sunY: 108, sunColor: '#dc2626', cloudFill: '#fca5a5', cloudOp: 0.80, stars: false },
}

const STAR_POS = [[28,14],[68,24],[108,9],[155,28],[192,11],[222,21],[252,7],[18,44],[98,39],[178,48],[138,18],[60,55]]

function AutoRickshawScene({ timeOfDay }) {
  const t = SKY[timeOfDay] || SKY.morning
  const gId = `sg-${timeOfDay}`

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[340px] overflow-hidden rounded-r-2xl pointer-events-none select-none">
      <svg viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">

        {/* ── DEFS ── */}
        <defs>
          <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.sky[0]} />
            <stop offset="100%" stopColor={t.sky[1]} />
          </linearGradient>
          <radialGradient id={`sun-${timeOfDay}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fffbeb" />
            <stop offset="55%"  stopColor={t.sunColor} />
            <stop offset="100%" stopColor={t.sunColor} stopOpacity="0.5" />
          </radialGradient>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="scene-clip">
            <rect x="0" y="0" width="300" height="170"/>
          </clipPath>
        </defs>

        <g clipPath="url(#scene-clip)">

          {/* ── SKY ── */}
          <rect x="0" y="0" width="300" height="170" fill={`url(#${gId})`} />

          {/* Stars */}
          {t.stars && STAR_POS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill="white"
              style={{ opacity: 0.6, animation: `ars-twinkle ${1.5 + (i % 4) * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.18}s` }} />
          ))}

          {/* Moon */}
          {!t.showSun && (
            <g filter="url(#glow-filter)">
              <circle cx={t.moonX} cy={t.moonY} r="15" fill="#e2e8f0" />
              <circle cx={t.moonX + 5} cy={t.moonY - 5} r="10" fill={t.sky[0]} />
            </g>
          )}

          {/* Sun */}
          {t.showSun && (
            <g style={{ animation: 'ars-sun-pulse 4s ease-in-out infinite' }}>
              <circle cx={t.sunX} cy={t.sunY} r="24" fill={t.sunColor} opacity="0.18" />
              <circle cx={t.sunX} cy={t.sunY} r="16" fill={`url(#sun-${timeOfDay})`} />
            </g>
          )}

          {/* ── CLOUDS (two copies for seamless loop) ── */}
          {/* Cloud A */}
          {[0, 1].map(copy => (
            <g key={`cA-${copy}`}
              style={{ animation: `ars-cloud-a 28s linear infinite`, animationDelay: copy === 1 ? '-14s' : '0s' }}
              opacity={t.cloudOp}>
              <ellipse cx="68"  cy="38" rx="28" ry="13" fill={t.cloudFill}/>
              <ellipse cx="50"  cy="44" rx="17" ry="11" fill={t.cloudFill}/>
              <ellipse cx="87"  cy="44" rx="19" ry="11" fill={t.cloudFill}/>
            </g>
          ))}
          {/* Cloud B */}
          {[0, 1].map(copy => (
            <g key={`cB-${copy}`}
              style={{ animation: `ars-cloud-b 38s linear infinite`, animationDelay: copy === 1 ? '-19s' : '0s' }}
              opacity={t.cloudOp * 0.75}>
              <ellipse cx="220" cy="24" rx="22" ry="10" fill={t.cloudFill}/>
              <ellipse cx="204" cy="29" rx="13" ry="8"  fill={t.cloudFill}/>
              <ellipse cx="236" cy="29" rx="15" ry="8"  fill={t.cloudFill}/>
            </g>
          ))}

          {/* ── GRASS ── */}
          <rect x="0" y="122" width="300" height="18" fill={t.grass} />
          {/* Grass blades detail */}
          {[10,25,40,58,78,96,115,130,150,165,182,200,218,235,252,268,285].map((x,i) => (
            <path key={i} d={`M${x} 122 Q${x+2} 116 ${x+4} 122`} fill={t.grass} stroke="#15803d" strokeWidth="0.8" opacity="0.6"/>
          ))}

          {/* ── ROAD ── */}
          <rect x="0" y="138" width="300" height="32" fill={t.road} />
          {/* Road edges */}
          <line x1="0" y1="140" x2="300" y2="140" stroke="#9ca3af" strokeWidth="1.5" opacity="0.5"/>
          <line x1="0" y1="168" x2="300" y2="168" stroke="#9ca3af" strokeWidth="1.5" opacity="0.5"/>
          {/* Animated road dashes */}
          <g style={{ animation: 'ars-road 0.9s linear infinite' }}>
            {[-30,-8,14,36,58,80,102,124,146,168,190,212,234,256,278,300].map((x,i) => (
              <rect key={i} x={x} y="152" width="14" height="2.5" rx="1.2" fill="white" opacity="0.55"/>
            ))}
          </g>

          {/* ── PERSON WAVING ── */}
          <g style={{ animation: 'ars-sway 2.5s ease-in-out infinite' }}>
            {/* Shadow */}
            <ellipse cx="68" cy="140" rx="10" ry="2.5" fill="black" opacity="0.18"/>
            {/* Shoes */}
            <ellipse cx="63" cy="139" rx="5" ry="2" fill="#111827"/>
            <ellipse cx="73" cy="139" rx="5" ry="2" fill="#111827"/>
            {/* Legs */}
            <line x1="65" y1="127" x2="63" y2="139" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round"/>
            <line x1="71" y1="127" x2="73" y2="139" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round"/>
            {/* Torso */}
            <rect x="61" y="114" width="14" height="14" rx="3" fill="#3b82f6"/>
            {/* Collar */}
            <path d="M64 114 L68 118 L72 114" fill="none" stroke="#93c5fd" strokeWidth="1.2"/>
            {/* Static right arm */}
            <line x1="75" y1="118" x2="82" y2="126" stroke="#fde68a" strokeWidth="3" strokeLinecap="round"/>
            {/* Waving left arm – rotates around shoulder at (63, 118) */}
            <g style={{ transformOrigin: '63px 118px', animation: 'ars-wave 0.65s ease-in-out infinite' }}>
              <line x1="63" y1="118" x2="51" y2="106" stroke="#fde68a" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="51" cy="106" r="3" fill="#fde68a"/>
            </g>
            {/* Head */}
            <circle cx="68" cy="108" r="8" fill="#fde68a"/>
            {/* Hair */}
            <path d="M60 106 Q62 98 68 98 Q74 98 76 106" fill="#292524"/>
            {/* Eyes */}
            <circle cx="65" cy="107" r="1.3" fill="#1c1917"/>
            <circle cx="71" cy="107" r="1.3" fill="#1c1917"/>
            {/* Smile */}
            <path d="M65 111 Q68 114 71 111" fill="none" stroke="#92400e" strokeWidth="1.3" strokeLinecap="round"/>
            {/* Eyebrows (cheerful raised) */}
            <path d="M64 104 Q65.5 102 67 104" fill="none" stroke="#292524" strokeWidth="1" strokeLinecap="round"/>
            <path d="M69 104 Q70.5 102 72 104" fill="none" stroke="#292524" strokeWidth="1" strokeLinecap="round"/>
          </g>

          {/* ── AUTO RICKSHAW ── */}
          <g style={{ animation: 'ars-bounce 0.85s ease-in-out infinite' }}>
            {/* Shadow */}
            <ellipse cx="190" cy="141" rx="58" ry="4" fill="black" opacity="0.18"/>

            {/* === BODY === */}
            {/* Main yellow passenger body */}
            <rect x="142" y="107" width="82" height="21" rx="2" fill="#fcd34d"/>
            {/* Body bottom darker edge */}
            <rect x="142" y="124" width="82" height="4" rx="1" fill="#f59e0b"/>
            {/* Blue accent stripe */}
            <rect x="144" y="117" width="78" height="4" fill="#1d4ed8" opacity="0.8"/>
            {/* Interior suggestion (seats) */}
            <rect x="146" y="109" width="74" height="8" rx="1" fill="#fef9c3" opacity="0.55"/>
            {/* Side open area lines (pillars) */}
            <rect x="144" y="107" width="3" height="17" rx="1" fill="#d97706"/>
            <rect x="219" y="107" width="3" height="17" rx="1" fill="#d97706"/>

            {/* === CANOPY / ROOF === */}
            <path d="M140 107 Q141 98 147 97 L218 97 Q224 98 225 107 Z" fill="#f59e0b"/>
            {/* Canopy top strip (dark amber) */}
            <rect x="145" y="95" width="77" height="4" rx="2" fill="#b45309"/>
            {/* Canopy vent slit */}
            <rect x="175" y="96" width="18" height="1.5" rx="0.7" fill="#92400e" opacity="0.5"/>

            {/* === FRONT SECTION (dark, engine) === */}
            <path d="M222 107 L244 110 L245 128 L222 128 Z" fill="#1f2937"/>
            {/* Windshield */}
            <path d="M223 109 L241 112 L241 123 L223 123 Z" fill="#bfdbfe" opacity="0.85"/>
            {/* Windshield glare */}
            <line x1="226" y1="110" x2="232" y2="121" stroke="white" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
            {/* Front bumper */}
            <path d="M244 110 Q249 113 249 120 Q249 127 244 128" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
            {/* Headlight */}
            <circle cx="247" cy="124" r="3.5" fill="#fef9c3"/>
            <circle cx="247" cy="124" r="5.5" fill="#fef9c3" opacity="0.25"/>
            {/* Number plate */}
            <rect x="223" y="124" width="15" height="5" rx="1" fill="#fef9c3"/>
            <text x="230.5" y="128.2" textAnchor="middle" fontSize="3" fill="#1f2937" fontFamily="monospace" fontWeight="bold">MH 20</text>

            {/* Driver silhouette */}
            <circle cx="216" cy="105" r="5.5" fill="#fde68a"/>
            <path d="M210 105 Q213 99 216 99 Q219 99 222 105" fill="#1f2937"/>

            {/* === EXHAUST PIPE === */}
            <rect x="133" y="124" width="12" height="3" rx="1.5" fill="#6b7280"/>
            {/* Exhaust puff (animated) */}
            <circle cx="128" cy="124" r="4" fill="#d1d5db" opacity="0.4"
              style={{ animation: 'ars-puff 1.2s ease-out infinite' }}/>
            <circle cx="122" cy="121" r="3" fill="#d1d5db" opacity="0.25"
              style={{ animation: 'ars-puff 1.2s ease-out infinite', animationDelay: '0.3s' }}/>

            {/* === REAR WHEEL (radius 12, bottom at y=138) === */}
            <circle cx="158" cy="126" r="12" fill="#111827"/>
            <circle cx="158" cy="126" r="7.5" fill="#6b7280"/>
            <circle cx="158" cy="126" r="3.5" fill="#111827"/>
            <circle cx="158" cy="126" r="1.5" fill="#9ca3af"/>
            {/* Spokes – spin around wheel center */}
            <g style={{ transformOrigin: '158px 126px', animation: 'ars-spin 0.35s linear infinite' }}>
              <line x1="158" y1="114" x2="158" y2="138" stroke="#374151" strokeWidth="1.5"/>
              <line x1="146" y1="126" x2="170" y2="126" stroke="#374151" strokeWidth="1.5"/>
              <line x1="149.5" y1="117.5" x2="166.5" y2="134.5" stroke="#374151" strokeWidth="1"/>
              <line x1="149.5" y1="134.5" x2="166.5" y2="117.5" stroke="#374151" strokeWidth="1"/>
            </g>

            {/* === FRONT WHEEL (radius 9, bottom at y=138) === */}
            <circle cx="232" cy="129" r="9" fill="#111827"/>
            <circle cx="232" cy="129" r="5.5" fill="#6b7280"/>
            <circle cx="232" cy="129" r="2.5" fill="#111827"/>
            <circle cx="232" cy="129" r="1" fill="#9ca3af"/>
            <g style={{ transformOrigin: '232px 129px', animation: 'ars-spin 0.35s linear infinite' }}>
              <line x1="232" y1="120" x2="232" y2="138" stroke="#374151" strokeWidth="1.5"/>
              <line x1="223" y1="129" x2="241" y2="129" stroke="#374151" strokeWidth="1.5"/>
              <line x1="225.5" y1="122.5" x2="238.5" y2="135.5" stroke="#374151" strokeWidth="1"/>
              <line x1="225.5" y1="135.5" x2="238.5" y2="122.5" stroke="#374151" strokeWidth="1"/>
            </g>
          </g>

        </g>{/* end clipPath */}

        {/* ── KEYFRAMES ── */}
        <style>{`
          @keyframes ars-bounce {
            0%,100% { transform: translateY(0px); }
            50%      { transform: translateY(-2.5px); }
          }
          @keyframes ars-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes ars-wave {
            0%,100% { transform: rotate(0deg); }
            50%     { transform: rotate(-40deg); }
          }
          @keyframes ars-sway {
            0%,100% { transform: translateX(0px); }
            50%     { transform: translateX(0.8px); }
          }
          @keyframes ars-road {
            from { transform: translateX(0px); }
            to   { transform: translateX(-22px); }
          }
          @keyframes ars-cloud-a {
            from { transform: translateX(300px); }
            to   { transform: translateX(-300px); }
          }
          @keyframes ars-cloud-b {
            from { transform: translateX(300px); }
            to   { transform: translateX(-300px); }
          }
          @keyframes ars-sun-pulse {
            0%,100% { transform: scale(1);    opacity: 1; }
            50%     { transform: scale(1.06); opacity: 0.88; }
          }
          @keyframes ars-twinkle {
            0%,100% { opacity: 0.3; transform: scale(1);   }
            50%     { opacity: 1;   transform: scale(1.4); }
          }
          @keyframes ars-puff {
            0%   { transform: scale(1)   translateY(0px);  opacity: 0.4; }
            100% { transform: scale(2.5) translateY(-6px); opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
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
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark via-brand-primary to-violet-700 p-6 text-white animate-fade-up md:p-8">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

      {/* Auto rickshaw scene */}
      <AutoRickshawScene timeOfDay={moment.timeOfDay} />

      {/* Text content */}
      <div className="relative z-10 max-w-sm">
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
            <Bell size={12} className="text-amber-300" />
            <span className="text-amber-200">{unreadCount} new</span>
            <span className="text-white/50">notifications</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
            <CalendarDays size={12} />
            {today}
          </div>
        </div>
      </div>
    </div>
  )
}

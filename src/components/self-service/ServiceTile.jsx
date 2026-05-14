import { iconMap } from '@/components/shared/iconMap'

const tileStyles = {
  'team-directory':   { grad: 'from-[#2563EB] to-[#1D4ED8]', glow: 'hover:shadow-[0_18px_40px_rgba(37,99,235,0.55)]' },
  policies:           { grad: 'from-[#374151] to-[#1F2937]', glow: 'hover:shadow-[0_18px_40px_rgba(55,65,81,0.55)]' },
  benefits:           { grad: 'from-[#7C3AED] to-[#6D28D9]', glow: 'hover:shadow-[0_18px_40px_rgba(124,58,237,0.55)]' },
  travel:             { grad: 'from-[#0284C7] to-[#0369A1]', glow: 'hover:shadow-[0_18px_40px_rgba(2,132,199,0.55)]' },
  'leave-attendance': { grad: 'from-[#EA580C] to-[#C2410C]', glow: 'hover:shadow-[0_18px_40px_rgba(234,88,12,0.55)]' },
  compensation:       { grad: 'from-[#059669] to-[#047857]', glow: 'hover:shadow-[0_18px_40px_rgba(5,150,105,0.55)]' },
  'recognition-gem':  { grad: 'from-[#D97706] to-[#B45309]', glow: 'hover:shadow-[0_18px_40px_rgba(217,119,6,0.55)]' },
  'bolt-learning':    { grad: 'from-[#4F46E5] to-[#4338CA]', glow: 'hover:shadow-[0_18px_40px_rgba(79,70,229,0.55)]' },
  'health-wellness':  { grad: 'from-[#E11D48] to-[#BE123C]', glow: 'hover:shadow-[0_18px_40px_rgba(225,29,72,0.55)]' },
  'holiday-calendar': { grad: 'from-[#0D9488] to-[#0F766E]', glow: 'hover:shadow-[0_18px_40px_rgba(13,148,136,0.55)]' },
  documents:          { grad: 'from-[#475569] to-[#334155]', glow: 'hover:shadow-[0_18px_40px_rgba(71,85,105,0.55)]' },
  'idea-hub':         { grad: 'from-[#EAB308] to-[#CA8A04]', glow: 'hover:shadow-[0_18px_40px_rgba(234,179,8,0.55)]' },
  'actions-pending':  { grad: 'from-[#DC2626] to-[#B91C1C]', glow: 'hover:shadow-[0_18px_40px_rgba(220,38,38,0.55)]' },
  'form-16':          { grad: 'from-[#06B6D4] to-[#0891B2]', glow: 'hover:shadow-[0_18px_40px_rgba(6,182,212,0.55)]' },
  'mediclaim':        { grad: 'from-[#A855F7] to-[#9333EA]', glow: 'hover:shadow-[0_18px_40px_rgba(168,85,247,0.55)]' },
  'parental-leave':   { grad: 'from-[#F97316] to-[#EA580C]', glow: 'hover:shadow-[0_18px_40px_rgba(249,115,22,0.55)]' },
}

export default function ServiceTile({ id, label, icon, redirectUrl }) {
  const Icon = iconMap[icon] ?? iconMap.ExternalLink
  const { grad, glow } = tileStyles[id] ?? { grad: 'from-brand-primary to-brand-dark', glow: '' }
  const isClickable = redirectUrl && redirectUrl !== '#'

  function handleClick() {
    if (isClickable) window.location.href = redirectUrl
  }

  return (
    <button
      onClick={handleClick}
      className={`group relative overflow-hidden flex flex-col items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br ${grad} aspect-square w-full p-2 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${glow} active:translate-y-0 focus-ring`}
      aria-label={label}
    >
      {/* decorative corner accent */}
      <span aria-hidden className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />

      {/* icon in glass container */}
      <span className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/25">
        <Icon size={22} strokeWidth={1.6} className="text-white drop-shadow-sm" />
      </span>

      {/* label */}
      <span className="relative z-10 line-clamp-2 px-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide text-white drop-shadow-sm">
        {label}
      </span>
    </button>
  )
}

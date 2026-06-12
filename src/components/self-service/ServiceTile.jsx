import { iconMap } from '@/components/shared/iconMap'

const tileStyles = {
  // Navy — brand core
  'team-directory':   'from-[#1B5DB8] to-[#0E3368]',
  benefits:           'from-[#1A56A8] to-[#133E82]',
  'health-wellness':  'from-[#1665C0] to-[#0E3E88]',
  compensation:       'from-[#1248A2] to-[#0C2E6A]',
  mediclaim:          'from-[#1A56A8] to-[#133E82]',

  // Slate — admin / docs
  policies:           'from-[#3B4E6A] to-[#1C2D42]',
  documents:          'from-[#334460] to-[#192838]',
  'form-16':          'from-[#334460] to-[#192838]',

  // Teal — time / travel
  travel:             'from-[#0D7E98] to-[#09576C]',
  'leave-attendance': 'from-[#0A8FA8] to-[#076878]',
  'holiday-calendar': 'from-[#0D7E98] to-[#09576C]',

  // Amber — recognition / ideas / learning
  'recognition-gem':  'from-[#1A56A8] to-[#133E82]',
  'bolt-learning':    'from-[#B07008] to-[#6E4302]',
  'idea-hub':         'from-[#BF7C08] to-[#7A4D02]',

  // Teal — IT
  'it-summit':        'from-[#0D7E98] to-[#09576C]',
}

export default function ServiceTile({ id, label, icon, redirectUrl }) {
  const Icon = iconMap[icon] ?? iconMap.ExternalLink
  const badge = tileStyles[id] ?? 'from-brand-primary to-brand-dark'
  const isClickable = redirectUrl && redirectUrl !== '#'

  const className =
    'group flex flex-col items-center justify-center gap-1.5 w-full py-1 px-1 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-ring'
  const content = (
    <>
      <span className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${badge} shadow-sm transition-transform duration-200 group-hover:scale-110`}>
        <Icon size={23} strokeWidth={1.65} className="text-white" />
      </span>

      <span className="relative z-10 line-clamp-2 px-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide text-gray-500">
        {label}
      </span>
    </>
  )

  if (isClickable) {
    return (
      <a
        href={redirectUrl}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={className} aria-label={label}>
      {content}
    </button>
  )
}

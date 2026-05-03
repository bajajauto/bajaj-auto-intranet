import { iconMap } from '@/components/shared/iconMap'

export default function ServiceTile({ label, icon, redirectUrl }) {
  const Icon = iconMap[icon] ?? iconMap.ExternalLink

  function handleClick() {
    if (redirectUrl && redirectUrl !== '#') {
      window.location.href = redirectUrl
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-card bg-white border border-gray-100 shadow-card
        hover:shadow-modal hover:-translate-y-0.5 hover:border-brand-primary/30
        active:translate-y-0 transition-all duration-150 focus-ring min-h-[88px] w-full"
      aria-label={label}
    >
      <Icon size={28} className="text-brand-primary flex-shrink-0" />
      <span className="text-xs font-medium text-text-primary text-center leading-tight line-clamp-2">
        {label}
      </span>
    </button>
  )
}

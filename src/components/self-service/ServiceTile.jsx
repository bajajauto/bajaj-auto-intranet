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
      className="group flex flex-col items-center justify-center gap-2 p-4 rounded-card bg-white border border-gray-100 shadow-card
        hover:shadow-modal hover:-translate-y-0.5 hover:border-brand-primary/30
        active:translate-y-0 transition-all duration-150 focus-ring min-h-[88px] w-full"
      aria-label={label}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-card bg-brand-light text-brand-primary ring-1 ring-brand-primary/10 transition-transform duration-150 group-hover:scale-105"
      >
        <Icon size={23} className="flex-shrink-0" />
      </span>
      <span className="text-xs font-medium text-text-primary text-center leading-tight line-clamp-2">
        {label}
      </span>
    </button>
  )
}

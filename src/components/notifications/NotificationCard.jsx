import { iconMap } from '@/components/shared/iconMap'

const PRIORITY_STYLES = {
  Urgent: 'bg-red-100 text-red-700',
  New: 'bg-brand-light text-brand-primary',
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function NotificationCard({ title, timestamp, priority, icon }) {
  const Icon = iconMap[icon] ?? iconMap.Bell

  return (
    <button
      className="w-full flex items-start gap-3 p-3 rounded-card hover:bg-bg-alt transition-colors text-left focus-ring"
      aria-label={title}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-light flex items-center justify-center">
        <Icon size={16} className="text-brand-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-sm font-medium text-text-primary truncate">{title}</p>
          <span className={`flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.New}`}>
            {priority}
          </span>
        </div>
        <p className="text-xs text-text-secondary">{formatTime(timestamp)}</p>
      </div>
    </button>
  )
}

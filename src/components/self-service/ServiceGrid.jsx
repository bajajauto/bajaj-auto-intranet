import { Gauge } from 'lucide-react'
import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

// Pole position → pit lane: most-used tiles lead, occasional ones trail.
const pitstopOrder = [
  // hot — daily drivers
  'team-directory',
  'leave-attendance',
  'holiday-calendar',
  // warm — regular
  'compensation',
  'benefits',
  'recognition-gem',
  'idea-hub',
  'bolt-learning',
  'travel',
  'policies',
  'health-wellness',
  // cool — occasional
  'mediclaim',
  'documents',
  'it-summit',
]

function orderServices(enabled, ids) {
  return ids
    .map((id) => enabled.find((service) => service.id === id))
    .filter(Boolean)
}

export default function ServiceGrid({ title }) {
  const enabled = services.filter((s) => s.enabled)
  const orderedServices = orderServices(enabled, pitstopOrder)

  return (
    <div className="site-surface rounded-card border p-3 sm:p-4">
      {title && (
        <div className="mb-3 flex items-center gap-2.5 sm:mb-4">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-dark text-white shadow-sm ring-1 ring-inset ring-white/20">
            <Gauge size={18} strokeWidth={2} />
          </span>
          <h2 className="text-lg font-bold leading-none text-brand-primary">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-y-5 lg:grid-cols-5">
        {orderedServices.map((service) => (
          <ServiceTile key={service.id} {...service} />
        ))}
      </div>
    </div>
  )
}

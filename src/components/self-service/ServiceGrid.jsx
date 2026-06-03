import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

const pitstopOrder = [
  'team-directory',
  'leave-attendance',
  'benefits',
  'idea-hub',
  'bolt-learning',
  'compensation',
  'travel',
  'policies',
  'recognition-gem',
  'holiday-calendar',
  'health-wellness',
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
        <h2 className="mb-3 text-lg font-bold text-brand-primary sm:mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-y-5 lg:grid-cols-5">
        {orderedServices.map((service) => (
          <ServiceTile key={service.id} {...service} />
        ))}
      </div>
    </div>
  )
}

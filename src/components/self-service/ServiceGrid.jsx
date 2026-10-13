import { services } from '@/config/services.config'
import Shelf from '@/components/shared/Shelf'
import ServiceTile from './ServiceTile'

/*
 * Pitstop runs as one shelf, grouped by errand — each group is one tone, so the
 * groups stay legible as the row scrolls past. Within a group, tiles run
 * most-used first.
 */
const pitstopGroups = [
  {
    tone: 'blue',
    label: 'Work and time',
    ids: ['team-directory', 'leave-attendance', 'holiday-calendar', 'travel', 'policies'],
  },
  {
    tone: 'green',
    label: 'Pay, benefits and health',
    ids: ['compensation', 'benefits', 'documents', 'mediclaim', 'health-wellness'],
  },
  {
    tone: 'amber',
    label: 'Growth and recognition',
    ids: ['recognition-gem', 'idea-hub', 'bolt-learning', 'performance-management', 'it-summit'],
  },
]

// Flatten the groups into render order, carrying each tile's tone with it. A
// disabled service simply drops out of its group.
function orderServices(enabled) {
  return pitstopGroups.flatMap((group) =>
    group.ids
      .map((id) => enabled.find((service) => service.id === id))
      .filter(Boolean)
      .map((service) => ({ ...service, tone: group.tone })),
  )
}

export default function ServiceGrid() {
  const orderedServices = orderServices(services.filter((s) => s.enabled))

  return (
    <Shelf label="Pitstop services" gap="gap-2" className="pb-4 pt-2">
      {orderedServices.map((service) => (
        <div key={service.id} role="listitem" className="flex-none snap-start">
          <ServiceTile {...service} />
        </div>
      ))}
    </Shelf>
  )
}

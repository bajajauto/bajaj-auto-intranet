import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

export default function ServiceGrid() {
  const enabled = services.filter((s) => s.enabled)

  return (
    <div className="site-surface rounded-card border p-4">
      <div className="grid grid-cols-5 gap-x-2 gap-y-5">
        {enabled.map((service) => (
          <ServiceTile key={service.id} {...service} />
        ))}
      </div>
    </div>
  )
}

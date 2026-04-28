import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

export default function ServiceGrid() {
  const enabled = services.filter((s) => s.enabled)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {enabled.map((service) => (
        <ServiceTile key={service.id} {...service} />
      ))}
    </div>
  )
}

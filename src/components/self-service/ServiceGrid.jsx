import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

export default function ServiceGrid() {
  const enabled = services.filter((s) => s.enabled)

  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
      <div className="px-4 pt-3 pb-1">
        <h2 className="text-sm font-semibold text-text-primary tracking-wide">Employee Self Service</h2>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-5 gap-2">
          {enabled.map((service) => (
            <ServiceTile key={service.id} {...service} />
          ))}
        </div>
      </div>
    </div>
  )
}

import { LayoutGrid } from 'lucide-react'
import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

export default function ServiceGrid() {
  const enabled = services.filter((s) => s.enabled)

  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-btn bg-brand-light flex items-center justify-center flex-shrink-0">
            <LayoutGrid size={18} className="text-brand-primary" />
          </span>
          <h2
            id="self-service-heading"
            className="text-sm font-semibold text-text-primary"
          >
            Employee Self-Service
          </h2>
        </div>
        <span className="flex-shrink-0 rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand-primary">
          {enabled.length} services
        </span>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {enabled.map((service) => (
            <ServiceTile key={service.id} {...service} />
          ))}
        </div>
      </div>
    </div>
  )
}

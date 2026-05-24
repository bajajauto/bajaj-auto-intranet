import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

export default function ServiceGrid({ title }) {
  const enabled = services.filter((s) => s.enabled)

  return (
    <div className="site-surface rounded-card border p-3 sm:p-4">
      {title && (
        <h2 className="mb-3 text-lg font-bold text-brand-primary sm:mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-y-5 lg:grid-cols-5">
        {enabled.map((service) => (
          <ServiceTile key={service.id} {...service} />
        ))}
      </div>
    </div>
  )
}

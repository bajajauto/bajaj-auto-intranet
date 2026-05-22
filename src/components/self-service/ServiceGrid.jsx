import { services } from '@/config/services.config'
import ServiceTile from './ServiceTile'

export default function ServiceGrid({ title }) {
  const enabled = services.filter((s) => s.enabled)

  return (
    <div className="site-surface rounded-card border p-4">
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-brand-primary">{title}</h2>
      )}
      <div className="grid grid-cols-5 gap-x-2 gap-y-5">
        {enabled.map((service) => (
          <ServiceTile key={service.id} {...service} />
        ))}
      </div>
    </div>
  )
}

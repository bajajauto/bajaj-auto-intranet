import { BarChart2, Database, ExternalLink, Headphones, Monitor } from 'lucide-react'

const IT_LINKS = [
  { id: 'raise-request', label: 'Raise IT Request', sublabel: 'ServiceNow', icon: ExternalLink, href: '#' },
  { id: 'intercom', label: 'Intercom Support', sublabel: 'Internal ticketing', icon: Headphones, href: '#' },
]

const SYSTEMS = [
  { id: 'qlik', label: 'BI Dashboard', sublabel: 'Qlik Sense', icon: BarChart2, href: '#' },
  { id: 'cdms', label: 'CDMS', sublabel: 'Document Management', icon: Database, href: '#' },
  { id: 'it-portal', label: 'IT Portal', sublabel: 'Self-service portal', icon: Monitor, href: '#' },
]

function ResourceLink({ label, sublabel, icon: Icon, href }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 rounded-card border border-brand-primary/10 bg-brand-light/60 p-3 transition-all duration-200 focus-ring hover:-translate-y-0.5 hover:border-brand-primary/25 hover:bg-white hover:shadow-card"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-card bg-white text-brand-primary shadow-sm">
          <Icon size={17} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text-primary">{label}</p>
          <p className="text-xs text-text-secondary">{sublabel}</p>
        </div>
      </div>
    </a>
  )
}

export default function ITResources() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-card border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-modal">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Support Desk
        </p>

        <div className="space-y-3">
          {IT_LINKS.map((item) => (
            <ResourceLink key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="rounded-card border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-modal">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Systems Available
          </p>
          <h3 className="mt-1 text-xl font-bold text-text-primary">Work tools</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {SYSTEMS.map((item) => (
            <ResourceLink key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

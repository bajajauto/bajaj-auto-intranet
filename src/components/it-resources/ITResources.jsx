import { ExternalLink, Headphones, BarChart2, Database, Monitor } from 'lucide-react'

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
      className="flex items-center gap-3 p-3 rounded-btn hover:bg-brand-light hover:text-brand-primary transition-all duration-200 focus-ring group hover:shadow-sm hover:-translate-x-0.5"
    >
      <div className="w-8 h-8 rounded bg-brand-light flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-brand-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">{label}</p>
        <p className="text-xs text-text-secondary">{sublabel}</p>
      </div>
    </a>
  )
}

export default function ITResources() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-card shadow-card border border-gray-100 p-4 space-y-4 transition-all duration-200 hover:shadow-modal hover:-translate-y-0.5">
        <div className="space-y-1">
          {IT_LINKS.map((item) => <ResourceLink key={item.id} {...item} />)}
        </div>
      </div>
      <div className="bg-white rounded-card shadow-card border border-gray-100 p-4 space-y-4 transition-all duration-200 hover:shadow-modal hover:-translate-y-0.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary px-3">Systems Available</p>
        <div className="space-y-1">
          {SYSTEMS.map((item) => <ResourceLink key={item.id} {...item} />)}
        </div>
      </div>
    </div>
  )
}

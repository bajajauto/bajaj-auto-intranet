import { TrendingUp, Database, Monitor, Headphones, ExternalLink } from 'lucide-react'

const IT_LINKS = [
  {
    id: 'raise-request',
    label: 'Raise IT Request',
    sublabel: 'ServiceNow',
    icon: ExternalLink,
    href: '#',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBorder: 'hover:border-blue-200',
    hoverShadow: 'hover:shadow-blue-100/60',
  },
  {
    id: 'intercom',
    label: 'Intercom Support',
    sublabel: 'Internal ticketing',
    icon: Headphones,
    href: '#',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    hoverBorder: 'hover:border-indigo-200',
    hoverShadow: 'hover:shadow-indigo-100/60',
  },
]

const SYSTEMS = [
  {
    id: 'qlik',
    label: 'BI Dashboard',
    sublabel: 'Qlik Sense',
    icon: TrendingUp,
    href: '#',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hoverBorder: 'hover:border-amber-200',
    hoverShadow: 'hover:shadow-amber-100/60',
  },
  {
    id: 'cdms',
    label: 'CDMS',
    sublabel: 'Document Management',
    icon: Database,
    href: '#',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    hoverBorder: 'hover:border-teal-200',
    hoverShadow: 'hover:shadow-teal-100/60',
  },
  {
    id: 'it-portal',
    label: 'IT Portal',
    sublabel: 'Self-service portal',
    icon: Monitor,
    href: '#',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    hoverBorder: 'hover:border-sky-200',
    hoverShadow: 'hover:shadow-sky-100/60',
  },
]

function ResourceLink({ label, sublabel, icon: Icon, href, iconBg, iconColor, hoverBorder, hoverShadow }) {
  return (
    <a
      href={href}
      onClick={e => e.preventDefault()}
      className={`group flex items-center gap-3 rounded-card border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${hoverBorder} ${hoverShadow} focus-ring cursor-pointer`}
    >
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${iconBg} ring-1 ring-inset ring-black/5 transition-transform duration-200 group-hover:scale-110`}>
        <Icon size={18} className={iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-brand-primary">{label}</p>
        <p className="text-xs text-brand-primary/55">{sublabel}</p>
      </div>
    </a>
  )
}

export default function ITResources() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-card border border-gray-100 bg-white p-5 shadow-card">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-primary/60">
          Support Desk
        </p>
        <div className="space-y-3">
          {IT_LINKS.map((item) => (
            <ResourceLink key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="rounded-card border border-gray-100 bg-white p-5 shadow-card">
        <h3 className="mb-4 text-xl font-bold text-brand-primary">Work Tools</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {SYSTEMS.map((item) => (
            <ResourceLink key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

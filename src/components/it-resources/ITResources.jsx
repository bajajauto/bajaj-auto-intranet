import { Baby, BarChart3, Coffee, DoorOpen, Dumbbell, FileStack, Headphones, Wrench } from 'lucide-react'

function IntercomDeskIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M9 8c0-1 1-1.5 3-1.5s3 .5 3 1.5v2.5" />
      <rect x="3" y="11" width="18" height="2" rx="1" />
      <rect x="5" y="14" width="14" height="7" rx="1.5" />
      <rect x="7" y="16.5" width="2.5" height="2" rx="0.4" />
      <rect x="10.75" y="16.5" width="2.5" height="2" rx="0.4" />
      <rect x="14.5" y="16.5" width="2.5" height="2" rx="0.4" />
    </svg>
  )
}

const IT_LINKS = [
  {
    id: 'raise-request',
    label: 'Raise IT Request',
    sublabel: 'IT Summit Portal',
    icon: Wrench,
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
    icon: IntercomDeskIcon,
    href: '#',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    hoverBorder: 'hover:border-indigo-200',
    hoverShadow: 'hover:shadow-indigo-100/60',
  },
  {
    id: 'visitor-gatepass',
    label: 'Visitor Gatepass',
    sublabel: 'Guest entry request',
    icon: DoorOpen,
    href: '#',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-200',
    hoverShadow: 'hover:shadow-emerald-100/60',
  },
  {
    id: 'qlik',
    label: 'BI Dashboard',
    sublabel: 'Qlik Sense',
    icon: BarChart3,
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
    icon: FileStack,
    href: '#',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    hoverBorder: 'hover:border-teal-200',
    hoverShadow: 'hover:shadow-teal-100/60',
  },
]

const FACILITIES = [
  {
    id: 'utsah',
    label: 'Utsah',
    sublabel: 'Recreation Centre',
    icon: Dumbbell,
    href: '#',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    hoverBorder: 'hover:border-purple-200',
    hoverShadow: 'hover:shadow-purple-100/60',
  },
  {
    id: 'cresh',
    label: 'Cresh',
    sublabel: 'Childcare',
    icon: Baby,
    href: '#',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    hoverBorder: 'hover:border-rose-200',
    hoverShadow: 'hover:shadow-rose-100/60',
  },
  {
    id: 'delicia',
    label: 'Delicia',
    sublabel: 'Canteen',
    icon: Coffee,
    href: '#',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hoverBorder: 'hover:border-amber-200',
    hoverShadow: 'hover:shadow-amber-100/60',
  },
]

function ResourceLink({ label, sublabel, icon: Icon, href, iconBg, iconColor, hoverBorder, hoverShadow }) {
  return (
    <a
      href={href}
      onClick={e => e.preventDefault()}
      className={`site-surface-interactive group flex items-center gap-3 rounded-card border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${hoverBorder} ${hoverShadow} focus-ring cursor-pointer`}
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

export default function ITResources({ title }) {
  return (
    <section className="site-surface rounded-card border p-5">
      <h2 className="mb-5 text-lg font-semibold text-brand-primary">
        {title ?? 'Resources and Support Services'}
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="site-surface rounded-card border p-5">
          <h3 className="mb-4 text-lg font-semibold text-brand-primary">
            Facilities @ Bajaj Auto Limited
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {FACILITIES.map((item) => (
              <ResourceLink key={item.id} {...item} />
            ))}
          </div>
        </div>

        <div className="site-surface rounded-card border p-5">
          <h3 className="mb-4 text-lg font-semibold text-brand-primary">Tools and Services</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {IT_LINKS.map((item) => (
              <ResourceLink key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

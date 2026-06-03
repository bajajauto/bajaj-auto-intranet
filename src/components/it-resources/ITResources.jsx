import { useState } from 'react'
import { Baby, Coffee, Wrench } from 'lucide-react'
import utsahImage from '@/assets/utsah.jpg'
import VisitorGatepassWizard from './VisitorGatepassWizard'

function UtsahIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" className={className} aria-hidden>
      {/* Outer grounds ring */}
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
      {/* Pool surround */}
      <circle cx="12" cy="12" r="8.5" fill="currentColor" opacity="0.18" />
      {/* Yin-yang outer circle */}
      <circle cx="12" cy="12" r="6.5" fill="currentColor" opacity="0.9" />
      {/* Light half of yin-yang (top) */}
      <path d="M12 5.5 a6.5 6.5 0 0 1 0 13 a3.25 3.25 0 0 0 0-6.5 a3.25 3.25 0 0 1 0-6.5Z" fill="white" opacity="0.9" />
      {/* Small dot — dark side dot */}
      <circle cx="12" cy="9.25" r="1.1" fill="currentColor" />
      {/* Small dot — light side dot */}
      <circle cx="12" cy="14.75" r="1.1" fill="white" />
      {/* Greenery dots around perimeter */}
      <circle cx="12" cy="1.8" r="0.9" fill="currentColor" opacity="0.4" />
      <circle cx="4.2" cy="5.5" r="0.7" fill="currentColor" opacity="0.35" />
      <circle cx="19.8" cy="5.5" r="0.7" fill="currentColor" opacity="0.35" />
      <circle cx="2.5" cy="12" r="0.7" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function VisitorGatepassIcon({ size = 24, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={Math.round(size * 1.45)}
      height={size}
      viewBox="0 0 32 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect x="8.5" y="1" width="5" height="5" rx="0.4" fill="#22a7f2" />
      <rect x="1.5" y="5" width="24" height="16" rx="1.8" fill="#eaf7ff" stroke="#0584cc" strokeWidth="2" />
      <rect x="4.2" y="7.8" width="18.5" height="10.4" rx="0.9" fill="#ffffff" stroke="#0b4f7e" strokeWidth="1.2" />
      <circle cx="9.2" cy="11.2" r="2.4" fill="#17324d" />
      <path d="M5.7 17.5c0-2.2 1.4-3.9 3.5-3.9s3.6 1.7 3.6 3.9" fill="#17324d" />
      <path d="M15 10h5.4M15 12.8h5M15 15.6h3.8" stroke="#8aa4b8" strokeWidth="1.25" strokeLinecap="round" />
      <path
        d="M23.6 7.2 30 9.1v5.1c0 4.3-3.1 6.7-6.4 8-3.3-1.3-6.4-3.7-6.4-8V9.1l6.4-1.9Z"
        fill="#17324d"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M20.5 14.2 22.6 16.2 27.2 11.5" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IntercomDeskIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="currentColor" className={className} aria-hidden>
      {/* Person card */}
      <rect x="2" y="2" width="16" height="16" rx="3.2" />
      {/* Person head */}
      <circle cx="10" cy="7.5" r="2.8" fill="white" />
      {/* Person body */}
      <path d="M4 17c0-3 2.4-5 6-5s6 2 6 5" fill="white" />
      {/* Badge dot */}
      <circle cx="18.5" cy="17.5" r="4" fill="currentColor" stroke="white" strokeWidth="1.5" />
      <rect x="17.8" y="15.5" width="1.4" height="3" rx="0.7" fill="white" />
      <rect x="17.8" y="19.2" width="1.4" height="1.4" rx="0.7" fill="white" />
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
    icon: VisitorGatepassIcon,
    href: '#',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-200',
    hoverShadow: 'hover:shadow-emerald-100/60',
  },
]

const FACILITIES = [
  {
    id: 'utsah',
    label: 'Utsah',
    sublabel: 'Recreation Centre',
    icon: UtsahIcon,
    image: utsahImage,
    href: '#',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    hoverBorder: 'hover:border-purple-200',
    hoverShadow: 'hover:shadow-purple-100/60',
  },
  {
    id: 'cresh',
    label: 'Chrèche',
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

function ResourceLink({
  label,
  sublabel,
  icon: Icon,
  image,
  href,
  iconBg,
  iconColor,
  hoverBorder,
  hoverShadow,
  onClick,
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      className={`site-surface-interactive group flex items-center gap-3 rounded-card border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${hoverBorder} ${hoverShadow} focus-ring cursor-pointer`}
    >
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${iconBg} ring-1 ring-inset ring-black/5 transition-transform duration-200 group-hover:scale-110`}>
        {image ? (
          <img src={image} alt="" className="h-full w-full rounded-xl object-cover" />
        ) : (
          <Icon size={18} className={iconColor} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-brand-primary">{label}</p>
        <p className="text-xs text-brand-primary/55">{sublabel}</p>
      </div>
    </a>
  )
}

export default function ITResources({ title }) {
  const [gatepassOpen, setGatepassOpen] = useState(false)

  return (
    <>
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
                <ResourceLink
                  key={item.id}
                  {...item}
                  onClick={item.id === 'visitor-gatepass' ? () => setGatepassOpen(true) : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <VisitorGatepassWizard isOpen={gatepassOpen} onClose={() => setGatepassOpen(false)} />
    </>
  )
}

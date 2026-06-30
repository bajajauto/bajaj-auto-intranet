import { useState } from 'react'
import { Wrench } from 'lucide-react'
import utsahImage from '@/assets/utsah.jpg'
import { DeliciaIcon } from '@/components/shared/ServiceIcons'
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

function CrecheIcon({ size = 24, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 130 96"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Ground */}
      <ellipse cx="65" cy="91" rx="60" ry="7" fill="#57BB5A" />

      {/* Left rainbow — drawn first so children appear on top */}
      <path d="M5,89 C5,30 34,12 57,36" stroke="#E53935" strokeWidth="5" strokeLinecap="round" />
      <path d="M11,89 C11,36 40,18 57,43" stroke="#FF9800" strokeWidth="5" strokeLinecap="round" />
      <path d="M17,89 C17,42 46,24 57,50" stroke="#FDD835" strokeWidth="5" strokeLinecap="round" />
      <path d="M23,89 C23,48 52,30 57,57" stroke="#43A047" strokeWidth="5" strokeLinecap="round" />
      <path d="M29,89 C29,54 58,36 57,64" stroke="#1E88E5" strokeWidth="5" strokeLinecap="round" />

      {/* Right rainbow */}
      <path d="M125,89 C125,30 96,12 73,36" stroke="#E53935" strokeWidth="5" strokeLinecap="round" />
      <path d="M119,89 C119,36 90,18 73,43" stroke="#FF9800" strokeWidth="5" strokeLinecap="round" />
      <path d="M113,89 C113,42 84,24 73,50" stroke="#FDD835" strokeWidth="5" strokeLinecap="round" />
      <path d="M107,89 C107,48 78,30 73,57" stroke="#43A047" strokeWidth="5" strokeLinecap="round" />
      <path d="M101,89 C101,54 72,36 73,64" stroke="#1E88E5" strokeWidth="5" strokeLinecap="round" />

      {/* Tree trunk */}
      <line x1="65" y1="86" x2="65" y2="14" stroke="#6D4C41" strokeWidth="6" strokeLinecap="round" />
      <line x1="65" y1="48" x2="49" y2="32" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" />
      <line x1="65" y1="40" x2="81" y2="27" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" />
      <line x1="65" y1="60" x2="47" y2="51" stroke="#6D4C41" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="65" y1="54" x2="83" y2="46" stroke="#6D4C41" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="65" y1="28" x2="56" y2="15" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="24" x2="74" y2="14" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />

      {/* Hearts — 9, well spaced across canopy */}
      <path d="M49,24.5C48.3,21 43.7,21 43.7,24.85C43.7,28 49,32.9 49,32.9C49,32.9 54.3,28 54.3,24.85C54.3,21 49.7,21 49,24.5Z" fill="#E53935" />
      <path d="M65,6C64.4,3 60.5,3 60.5,6.3C60.5,9 65,13.2 65,13.2C65,13.2 69.5,9 69.5,6.3C69.5,3 65.6,3 65,6Z" fill="#66BB6A" />
      <path d="M81,19.5C80.3,16 75.7,16 75.7,19.85C75.7,23 81,27.9 81,27.9C81,27.9 86.3,23 86.3,19.85C86.3,16 81.7,16 81,19.5Z" fill="#1E88E5" />
      <path d="M47,15.5C46.5,13 43.25,13 43.25,15.75C43.25,18 47,21.5 47,21.5C47,21.5 50.75,18 50.75,15.75C50.75,13 47.5,13 47,15.5Z" fill="#FDD835" />
      <path d="M83,13.5C82.5,11 79.25,11 79.25,13.75C79.25,16 83,19.5 83,19.5C83,19.5 86.75,16 86.75,13.75C86.75,11 83.5,11 83,13.5Z" fill="#FF9800" />
      <path d="M55,7.5C54.5,5 51.25,5 51.25,7.75C51.25,10 55,13.5 55,13.5C55,13.5 58.75,10 58.75,7.75C58.75,5 55.5,5 55,7.5Z" fill="#8E24AA" />
      <path d="M75,5.5C74.5,3 71.25,3 71.25,5.75C71.25,8 75,11.5 75,11.5C75,11.5 78.75,8 78.75,5.75C78.75,3 75.5,3 75,5.5Z" fill="#E91E63" />
      <path d="M88,33.5C87.5,31 84.25,31 84.25,33.75C84.25,36 88,39.5 88,39.5C88,39.5 91.75,36 91.75,33.75C91.75,31 88.5,31 88,33.5Z" fill="#8BC34A" />
      <path d="M42,38.5C41.5,36 38.25,36 38.25,38.75C38.25,41 42,44.5 42,44.5C42,44.5 45.75,41 45.75,38.75C45.75,36 42.5,36 42,38.5Z" fill="#26C6DA" />

      {/* Left child — white halo first so red pops off the rainbow */}
      <circle cx="19" cy="59" r="13" fill="white" />
      <ellipse cx="19" cy="74" rx="17" ry="15" fill="white" />
      <ellipse cx="20" cy="83" rx="18" ry="9" fill="white" />
      <circle cx="19" cy="59" r="12" fill="#E53935" />
      <ellipse cx="19" cy="74" rx="16" ry="14" fill="#E53935" />
      <ellipse cx="20" cy="83" rx="17" ry="8" fill="#E53935" />

      {/* Right child — white halo first */}
      <circle cx="101" cy="78" r="13" fill="none" stroke="white" strokeWidth="5" />
      <circle cx="116" cy="78" r="13" fill="none" stroke="white" strokeWidth="5" />
      <path d="M101,78 L109,60 L116,78" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M109,60 L116,67" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <circle cx="108" cy="50" r="13" fill="white" />
      <path d="M108,63 L106,74" stroke="white" strokeWidth="12" strokeLinecap="round" />
      <path d="M106,73 L101,79" stroke="white" strokeWidth="8" strokeLinecap="round" />
      <path d="M106,73 L112,78" stroke="white" strokeWidth="8" strokeLinecap="round" />
      {/* Blue bicycle + rider on top of halo */}
      <circle cx="101" cy="78" r="12" fill="none" stroke="#1565C0" strokeWidth="3.5" />
      <circle cx="116" cy="78" r="12" fill="none" stroke="#1565C0" strokeWidth="3.5" />
      <path d="M101,78 L109,60 L116,78" stroke="#1565C0" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M109,60 L116,67" stroke="#1565C0" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M105,62 L113,60" stroke="#1565C0" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="108" cy="50" r="12" fill="#1565C0" />
      <path d="M108,62 L106,73" stroke="#1565C0" strokeWidth="10" strokeLinecap="round" />
      <path d="M106,72 L101,78" stroke="#1565C0" strokeWidth="6" strokeLinecap="round" />
      <path d="M106,72 L112,77" stroke="#1565C0" strokeWidth="6" strokeLinecap="round" />
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
    imageClass: 'scale-[3] object-cover object-[48%_40%]',
    floatingIcon: true,
    hoverBorder: 'hover:border-purple-200',
    hoverShadow: 'hover:shadow-purple-100/60',
  },
  {
    id: 'cresh',
    label: 'Chrèche',
    sublabel: 'Childcare',
    icon: CrecheIcon,
    href: '#',
    iconColor: '',
    floatingIcon: true,
    largeIcon: true,
    iconSize: 60,
    hoverBorder: 'hover:border-rose-200',
    hoverShadow: 'hover:shadow-rose-100/60',
  },
  {
    id: 'delicia',
    label: 'Delicia',
    sublabel: 'Canteen',
    icon: DeliciaIcon,
    href: '#',
    iconColor: 'text-[#3E3E40]',
    floatingIcon: true,
    hoverBorder: 'hover:border-amber-200',
    hoverShadow: 'hover:shadow-amber-100/60',
  },
]

function ResourceLink({
  label,
  sublabel,
  icon: Icon,
  image,
  imageClass = 'object-cover object-center',
  href,
  iconBg,
  iconColor,
  floatingIcon = false,
  largeIcon = false,
  iconSize,
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
      <div
        className={`flex flex-shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
          largeIcon ? 'h-14 w-14' : 'h-10 w-10'
        } ${
          floatingIcon
            ? image
              ? 'overflow-hidden rounded-full drop-shadow-[0_5px_7px_rgba(15,23,42,0.2)]'
              : ''
            : `overflow-hidden rounded-xl ${iconBg} ring-1 ring-inset ring-black/5`
        }`}
      >
        {image ? (
          <img
            src={image}
            alt=""
            className={`h-full w-full ${imageClass} mix-blend-multiply dark:bg-white`}
          />
        ) : (
          <Icon
            size={iconSize ?? (floatingIcon ? (largeIcon ? 52 : 36) : 18)}
            className={`${iconColor} ${floatingIcon ? 'drop-shadow-[0_5px_7px_rgba(15,23,42,0.2)]' : ''}`}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-brand-primary">{label}</p>
        <p className="text-xs text-brand-primary/55">{sublabel}</p>
      </div>
    </a>
  )
}

export default function ITResources({ title, stacked = false }) {
  const [gatepassOpen, setGatepassOpen] = useState(false)

  return (
    <>
      <section className="site-surface rounded-card border p-5">
        <h2 className="mb-5 text-lg font-semibold text-brand-primary">
          {title ?? 'Resources and Support Services'}
        </h2>

        <div className={`grid grid-cols-1 gap-5 ${stacked ? '' : 'lg:grid-cols-[0.95fr_1.05fr]'}`}>
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

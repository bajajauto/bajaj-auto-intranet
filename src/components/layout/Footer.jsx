import { Instagram, Linkedin } from 'lucide-react'
import { productBrand } from '@/config/brand.config'
import { services } from '@/config/services.config'
import { footerColumns } from '@/config/navigation.config'
import { CONTAINER } from '@/lib/layout'
import { scrollToSection } from '@/utils/scrollToSection'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/company/bajaj-auto-ltd',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bajaj_auto_ltd',
    icon: Instagram,
  },
]

const CURRENT_YEAR = new Date().getFullYear()

const LINK = 'rounded transition-colors hover:text-brand-primary focus-ring'

function FooterLink({ label, sectionId, serviceId }) {
  if (sectionId) {
    return (
      <a
        href={`#${sectionId}`}
        onClick={(e) => {
          e.preventDefault()
          scrollToSection(sectionId)
        }}
        className={LINK}
      >
        {label}
      </a>
    )
  }

  const href = services.find((s) => s.id === serviceId)?.redirectUrl
  return (
    <a href={href} target="_blank" rel="noreferrer" className={LINK}>
      {label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#ECEEF2] text-[13px] text-[#4A5260] dark:bg-[#0B111E] dark:text-muted">
      <div className={`${CONTAINER} pb-8 pt-12`}>
        <div className="grid grid-cols-2 gap-8 border-b border-[#D7DBE2] pb-8 dark:border-white/10 md:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.heading} className="flex flex-col items-start gap-2.5">
              <p className="mb-1 font-bold text-ink">{column.heading}</p>
              {column.links.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p>© {CURRENT_YEAR} Bajaj Auto Ltd. For internal use only.</p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="opacity-80">{productBrand.developedBy}</p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-primary hover:text-white focus-ring"
                  aria-label={`Visit Bajaj Auto on ${label}`}
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Instagram, Linkedin } from 'lucide-react'
import bajajFooterLockup from '@/assets/bajaj-footer-lockup.png'

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
const FOOTER_DESCRIPTION =
  "With more than 18 million motorcycles sold in over 100 countries, Bajaj Auto is India's No. 1 motorcycle exporter, with two out of three bikes sold internationally carrying a Bajaj badge. The company is the world's largest manufacturer of three-wheelers and the first two/three-wheeler company to reach a market capitalisation of INR 1 trillion."

export default function Footer() {
  return (
    <footer className="mt-8 bg-brand-dark text-white">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />

      <div className="mx-auto max-w-screen-xl px-4 pb-3 pt-4 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.8fr] lg:items-start">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex flex-shrink-0 items-center gap-3">
                <img
                  src={bajajFooterLockup}
                  alt="Bajaj Auto - The World's Favourite Indian"
                  className="h-10 w-auto object-contain sm:h-12"
                />
              </div>
              <div className="hidden h-14 w-px flex-shrink-0 bg-white/25 sm:block" />
              <div className="min-w-0">
                <p className="text-xl font-bold leading-tight text-white sm:text-2xl">
                  Bajaj Auto Ltd.
                </p>
                <p className="mt-0.5 font-ekam text-xs italic tracking-wide text-white/55 sm:text-sm">
                  Born in India. Loved by the World.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primary hover:shadow-lg focus-ring"
                  aria-label={`Visit Bajaj Auto on ${label}`}
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <p className="mt-2 text-xs text-white/40">
              Copyright {CURRENT_YEAR} Bajaj Auto Ltd. All rights reserved.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold leading-tight text-white md:text-2xl">
              The World&apos;s Favourite Indian
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-white/65">{FOOTER_DESCRIPTION}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

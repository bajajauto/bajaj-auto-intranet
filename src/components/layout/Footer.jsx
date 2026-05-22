import { Instagram, Linkedin } from 'lucide-react'
import bajajMark from '@/assets/bajaj-mark-transparent.png'

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
const FOOTER_TITLE = "The World's Favourite Indian"
const FOOTER_DESCRIPTION =
  "With more than 18 million motorcycles sold in over 100 countries, Bajaj Auto is India's No. 1 motorcycle exporter, with two out of three bikes sold internationally carrying a Bajaj badge. The company is the world's largest manufacturer of three-wheelers and the first two/three-wheeler company to reach a market capitalisation of INR 1 trillion."

export default function Footer() {
  return (
    <footer className="mt-8 bg-brand-dark text-white">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />

      <div className="mx-auto max-w-screen-xl px-4 pb-3 pt-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr] lg:items-start">
          <div>
            <div className="flex items-center gap-4">
              <img src={bajajMark} alt="Bajaj Auto" className="h-12 w-auto" />
              <div className="h-10 w-px bg-white/25 flex-shrink-0" />
              <div>
                <p className="font-serif font-semibold text-white text-2xl leading-tight">
                  Bajaj Auto Ltd.
                </p>
                <p className="mt-0.5 font-ekam italic text-white/55 text-sm tracking-wide">
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
            <h2 className="font-serif text-xl font-semibold text-white md:text-2xl">
              {FOOTER_TITLE}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-white/65">{FOOTER_DESCRIPTION}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

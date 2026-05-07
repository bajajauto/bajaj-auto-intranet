import { ExternalLink } from 'lucide-react'

const FEATURED_COVER =
  'https://ting-brochures.netlify.app/bajaj-bytes-vol7-brochure/files/page/01.jpg'

const VOLUMES = [
  {
    id: 'vol-7',
    label: 'Volume 7',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol7-brochure',
  },
  {
    id: 'vol-6',
    label: 'Volume 6',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol6-brochure',
  },
]

export default function BajajBytes() {
  return (
    <div className="h-full rounded-card border border-gray-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-modal">
      <div className="grid gap-4 sm:grid-cols-[10rem_minmax(0,30rem)_1fr]">
        <a
          href={VOLUMES[0].href}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Bajaj Bytes Volume 7"
          className="group block aspect-square overflow-hidden rounded-card border border-brand-primary/10 bg-brand-light focus-ring"
        >
          <img
            src={FEATURED_COVER}
            alt="Bajaj Bytes Volume 7 cover"
            className="h-full w-full object-contain object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </a>

        <div className="min-w-0 self-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Newsletter
          </p>
          <h3 className="mt-1 text-2xl font-bold text-text-primary">Bajaj Bytes</h3>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            Catch the latest internal stories, updates, and highlights from Bajaj Auto.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {VOLUMES.map((volume) => (
              <a
                key={volume.id}
                href={volume.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-btn border border-brand-primary/10 bg-brand-light px-3 py-2.5 text-sm font-medium text-brand-primary transition-all hover:border-brand-primary/30 hover:bg-white hover:shadow-sm focus-ring"
              >
                <span>{volume.label}</span>
                <ExternalLink size={15} className="flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

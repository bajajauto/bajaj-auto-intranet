import { useCallback, useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'

const VOLUMES = [
  {
    id: 'vol-7',
    label: 'Volume 7',
    eyebrow: 'Latest edition',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol7-brochure',
    cover: 'https://ting-brochures.netlify.app/bajaj-bytes-vol7-brochure/files/page/01.jpg',
  },
  {
    id: 'vol-6',
    label: 'Volume 6',
    eyebrow: 'Previous edition',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol6-brochure',
    cover: 'https://ting-brochures.netlify.app/bajaj-bytes-vol6-brochure/files/page/1.jpg',
  },
]

const INTERVAL_MS = 4500

export default function BajajBytes() {
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef(null)
  const activeVolume = VOLUMES[activeIdx]

  const startTimer = useCallback(() => {
    window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setActiveIdx((current) => (current + 1) % VOLUMES.length)
    }, INTERVAL_MS)
  }, [])

  useEffect(() => {
    startTimer()
    return () => window.clearInterval(timerRef.current)
  }, [startTimer])

  return (
    <div className="h-full overflow-hidden rounded-card border border-gray-100 bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-modal">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Newsletter catalog
        </p>
        <span className="rounded-full bg-brand-light px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-brand-primary">
          Bajaj Bytes
        </span>
      </div>

      <div
        className="mt-3 flex gap-3"
        onMouseEnter={() => window.clearInterval(timerRef.current)}
        onMouseLeave={startTimer}
      >
        {/* Featured cover – left panel */}
        <a
          href={activeVolume.href}
          target="_blank"
          rel="noreferrer"
          className="group relative aspect-square w-52 flex-shrink-0 overflow-hidden rounded-xl"
        >
          <img
            key={activeVolume.id}
            src={activeVolume.cover}
            alt={activeVolume.label}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-brand-primary px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white shadow-card">
            {activeVolume.eyebrow}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-sm font-bold leading-tight text-white">{activeVolume.label}</p>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-white/60 transition-colors group-hover:text-white/90">
              Read now <ExternalLink size={9} />
            </p>
          </div>
        </a>

        {/* Edition list – right panel */}
        <div className="flex w-[7.5rem] flex-col gap-1.5">
          <p className="text-[10px] font-medium uppercase tracking-wide text-text-secondary">
            All editions
          </p>
          {VOLUMES.map((volume, index) => (
            <a
              key={volume.id}
              href={volume.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setActiveIdx(index)}
              onFocus={() => setActiveIdx(index)}
              className={`group flex items-center gap-2 rounded-lg border p-1.5 transition-all duration-200 focus-ring ${
                index === activeIdx
                  ? 'border-brand-primary/30 bg-brand-light shadow-sm'
                  : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="relative h-12 w-8 flex-shrink-0 overflow-hidden rounded shadow-sm">
                <img
                  src={volume.cover}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-[11px] font-semibold leading-tight ${
                    index === activeIdx ? 'text-brand-primary' : 'text-text-primary'
                  }`}
                >
                  {volume.label}
                </span>
                <span className="mt-0.5 block text-[9px] leading-tight text-text-secondary">
                  {volume.eyebrow}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <span className="sr-only">Selected newsletter: {activeVolume.label}</span>
    </div>
  )
}

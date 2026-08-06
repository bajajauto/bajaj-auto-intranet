import { useState, useEffect } from 'react'
import bajajMark from '@/assets/bajaj-mark-transparent.png'
import UnionMark from '@/components/layout/UnionMark'
import { productBrand } from '@/config/brand.config'

// The mark assembles itself rather than arriving whole, so the splash has to
// stay up long enough for the crowd to converge and the numeral to settle
// (~1.95s, see UnionMark) before the exit fade starts. These were 2100/2600
// when the mark was a word whose letters cascaded in.
const HOLD_MS = 3380
const DONE_MS = 3880

// The Bajaj logo and its rule hold back until the crowd has collapsed into the
// numeral. They used to lead the splash, but the scene is far wider than the
// mark it settles into and spills well past it on both sides — arriving first,
// the logo simply got driven over. Waiting also gives the splash its reading
// order: the crowd becomes One, and only then is it Bajaj One.
const LOGO_MS = 2300
const RULE_MS = 2440
const TAGLINE_MS = 2580

export default function SplashScreen({ onDone }) {
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true))
    const t1 = setTimeout(() => setExiting(true), HOLD_MS)
    const t2 = setTimeout(onDone, DONE_MS)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-brand-dark
        transition-opacity duration-500 ease-in-out
        ${exiting ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          <img
            src={bajajMark}
            alt="Bajaj Auto"
            className="h-16 w-auto"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 600ms ease-out, transform 600ms ease-out',
              transitionDelay: `${LOGO_MS}ms`,
            }}
          />

          <div
            className="w-px bg-white/30"
            style={{
              // Sized against the numeral rather than the logo — the mark is
              // now the tallest thing on the line.
              height: '4.5rem',
              opacity: entered ? 1 : 0,
              transform: entered ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'opacity 300ms ease-out, transform 350ms ease-out',
              transitionDelay: `${RULE_MS}ms`,
            }}
          />

          {/* The mark is a scene, not a word: people and vehicles converge and
              resolve into the numeral. The full product name is what assistive
              tech reads — the scene itself is decorative. */}
          <span className="select-none">
            <span className="sr-only">{productBrand.name}</span>
            <UnionMark className="h-16 w-auto text-white sm:h-20 md:h-24" />
          </span>
        </div>

        <p
          className="font-wordmark italic text-white/55 text-xl tracking-[0.12em]"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 600ms ease-out, transform 600ms ease-out',
            transitionDelay: `${TAGLINE_MS}ms`,
          }}
        >
          {productBrand.tagline}
        </p>
      </div>
    </div>
  )
}

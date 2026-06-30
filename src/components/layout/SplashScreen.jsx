import { useState, useEffect } from 'react'
import bajajMark from '@/assets/bajaj-mark-transparent.png'
import ekamWordmark from '@/assets/ekam-wordmark-transparent.png'

export default function SplashScreen({ onDone }) {
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true))
    const t1 = setTimeout(() => setExiting(true), 1500)
    const t2 = setTimeout(onDone, 2000)
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
              transitionDelay: '0ms',
            }}
          />

          <div
            className="w-px bg-white/30"
            style={{
              height: '3.5rem',
              opacity: entered ? 1 : 0,
              transform: entered ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'opacity 300ms ease-out, transform 350ms ease-out',
              transitionDelay: '500ms',
            }}
          />

          <img
            src={ekamWordmark}
            alt="EKAM"
            className="mt-4 h-11 w-auto select-none object-contain"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateX(0)' : 'translateX(18px)',
              transition: 'opacity 550ms ease-out, transform 550ms ease-out',
              transitionDelay: '650ms',
            }}
          />
        </div>

        <p
          className="font-ekam italic text-white/55 text-xl tracking-[0.12em]"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 600ms ease-out, transform 600ms ease-out',
            transitionDelay: '900ms',
          }}
        >
          Your Favourite Pitstop
        </p>
      </div>
    </div>
  )
}

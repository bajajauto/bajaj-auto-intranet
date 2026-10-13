import { useEffect, useState } from 'react'
import { SCROLL_TOP_OFFSET } from '@/lib/layout'

// The sticky header plus 10% of the viewport, so a section's title is
// comfortably in view before it counts as the current one.
function getThreshold() {
  return SCROLL_TOP_OFFSET + Math.round(window.innerHeight * 0.1)
}

export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    let frameId = null

    function updateActiveSection() {
      frameId = null
      const threshold = getThreshold()

      const isAtPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4

      const current = isAtPageEnd
        ? sectionIds[sectionIds.length - 1]
        : sectionIds.reduce((active, id) => {
            const el = document.getElementById(id)
            if (!el) return active

            return el.getBoundingClientRect().top <= threshold ? id : active
          }, sectionIds[0] ?? null)

      if (current) {
        setActiveId(current)
        if (window.location.hash !== `#${current}`) {
          window.history.replaceState(null, '', `#${current}`)
        }
      }
    }

    function scheduleUpdate() {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [sectionIds])

  return [activeId, setActiveId]
}

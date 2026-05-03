import { useEffect, useState } from 'react'

const ACTIVE_OFFSET_PX = 140

export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    let frameId = null

    function updateActiveSection() {
      frameId = null

      const isAtPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4

      const current = isAtPageEnd
        ? sectionIds[sectionIds.length - 1]
        : sectionIds.reduce((active, id) => {
            const el = document.getElementById(id)
            if (!el) return active

            return el.getBoundingClientRect().top <= ACTIVE_OFFSET_PX ? id : active
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

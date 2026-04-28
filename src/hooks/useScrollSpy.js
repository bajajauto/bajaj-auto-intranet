import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) {
          setActiveId(visible.target.id)
          window.history.replaceState(null, '', `#${visible.target.id}`)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0, ...options }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

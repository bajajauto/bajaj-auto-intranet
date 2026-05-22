import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({
  as: Component = 'section',
  children,
  className = '',
  ...props
}) {
  const ref = useRef(null)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0.05 }
    )

    const node = ref.current
    if (node) observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={ref}
      className={`
        scroll-mt-28 transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  )
}

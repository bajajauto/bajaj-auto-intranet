import { Headphones } from 'lucide-react'

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return

  // Account for fixed TopBanner (36px) + fixed Header (64px).
  const HEADER_OFFSET_PX = 100
  const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET_PX
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

export default function FloatingSupportButton() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection('feedback')}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-card hover:bg-brand-dark focus-ring"
      aria-label="Support - jump to Feedback & Support"
      title="Support"
    >
      <Headphones size={20} />
    </button>
  )
}


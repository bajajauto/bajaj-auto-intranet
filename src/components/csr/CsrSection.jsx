import { useRef, useState } from 'react'
import CsrHero from './CsrHero'
import ProgramsGrid from './ProgramsGrid'
import VolunteerBlock from './VolunteerBlock'
import CsrStoriesCarousel from './CsrStoriesCarousel'

export default function CsrSection({ title }) {
  const contentRef = useRef(null)
  const [activeView, setActiveView] = useState(null)

  function showView(view) {
    setActiveView(view)
    window.setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <div className="site-surface rounded-card border p-4 sm:p-5">
      {title && (
        <h2 className="mb-4 text-lg font-bold text-brand-primary sm:mb-5">{title}</h2>
      )}

      <div className="space-y-6">
        <CsrHero
          activeView={activeView}
          onShowPrograms={() => showView('programs')}
          onShowVolunteer={() => showView('volunteer')}
        />
        <div ref={contentRef}>
          {activeView === 'programs' && <ProgramsGrid />}
          {activeView === 'volunteer' && <VolunteerBlock />}
        </div>
        <CsrStoriesCarousel />
      </div>
    </div>
  )
}

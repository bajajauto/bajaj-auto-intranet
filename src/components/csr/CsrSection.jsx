import { useRef, useState } from 'react'
import CsrHero from './CsrHero'
import ProgramsGrid from './ProgramsGrid'
import VolunteerBlock from './VolunteerBlock'

export default function CsrSection() {
  const contentRef = useRef(null)
  const [activeView, setActiveView] = useState(null)

  function showView(view) {
    setActiveView(view)
    window.setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <div className="rounded-[28px] bg-surface p-4 shadow-soft sm:p-6">
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
      </div>
    </div>
  )
}

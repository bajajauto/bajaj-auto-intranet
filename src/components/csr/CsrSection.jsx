import { useRef } from 'react'
import CsrHero from './CsrHero'
import ProgramsGrid from './ProgramsGrid'
import VolunteerBlock from './VolunteerBlock'
import CsrStoriesCarousel from './CsrStoriesCarousel'

export default function CsrSection({ title }) {
  const volunteerRef = useRef(null)

  function handleJumpToVolunteer() {
    volunteerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="site-surface rounded-card border p-4 sm:p-5">
      {title && (
        <h2 className="mb-4 text-lg font-bold text-brand-primary sm:mb-5">{title}</h2>
      )}

      <div className="space-y-6">
        <CsrHero onJumpToVolunteer={handleJumpToVolunteer} />
        <ProgramsGrid />
        <VolunteerBlock ref={volunteerRef} />
        <CsrStoriesCarousel />
      </div>
    </div>
  )
}

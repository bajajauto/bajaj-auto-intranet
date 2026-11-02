import { useState } from 'react'
import navCommunity from '@/assets/icons/ocean/nav-community.webp'
import Modal from '@/components/shared/Modal'
import Panel from '@/components/shared/Panel'
import PanelTitle from '@/components/shared/PanelTitle'
import ProgramsGrid from './ProgramsGrid'
import VolunteerBlock from './VolunteerBlock'

/*
 * The Foundation's pitch. "Volunteer with BAF" and "Explore programmes" open
 * in a sheet, so the panel keeps the same height as News & Bajaj Bytes beside it.
 */
export default function CsrSection() {
  const [activeView, setActiveView] = useState(null) // 'programs' | 'volunteer'

  return (
    <Panel
      as="section"
      id="community"
      aria-labelledby="community-heading"
      className="flex min-w-0 scroll-mt-20 flex-col p-5 sm:px-6"
    >
      <PanelTitle
        id="community-heading"
        icon={navCommunity}
        title="CSR"
        action={{ label: 'Explore programmes', onClick: () => setActiveView('programs') }}
      />

      <article className="mt-4 flex flex-1 flex-col rounded-xl bg-gradient-to-r from-[#316887] via-[#4d85a0] to-[#7bbcce] p-5 text-white shadow-ocean-tile">
        <span className="self-start rounded-[5px] bg-[#fefffd] px-3 py-0.5 text-[13px] font-semibold tracking-[0.12em] text-[#000205]">
          BAJAJ AUTO FOUNDATION
        </span>
        <h3 className="mt-5 text-[20px] leading-snug tracking-[-0.01em]">Driving change beyond business.</h3>
        <p className="mt-3 max-w-[420px] text-[13.5px] leading-snug">
          Skills, education, health, livelihoods and environment programmes working across rural India.
        </p>
        <button
          type="button"
          onClick={() => setActiveView('volunteer')}
          className="mt-auto inline-flex h-10 items-center self-start rounded-lg bg-white px-5 text-[13.5px] font-semibold text-ocean-900 shadow-ocean-sm transition-colors hover:bg-ocean-100 focus-ring"
        >
          Volunteer with BAF
        </button>
      </article>

      <Modal
        isOpen={activeView !== null}
        onClose={() => setActiveView(null)}
        title={activeView === 'programs' ? 'CSR programmes' : 'Volunteer with BAF'}
        maxWidth="max-w-5xl"
      >
        {activeView === 'programs' ? <ProgramsGrid /> : activeView === 'volunteer' ? <VolunteerBlock /> : null}
      </Modal>
    </Panel>
  )
}

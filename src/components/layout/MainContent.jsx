import Hero from './Hero'
import ServiceGrid from '@/components/self-service/ServiceGrid'
import HappeningNow from '@/components/dashboard/HappeningNow'
import ITResources from '@/components/it-resources/ITResources'
import CalendarWidget from '@/components/calendar/CalendarWidget'
import HelpSection from '@/components/emergency/HelpSection'
import CsrSection from '@/components/csr/CsrSection'
import LocationsSection from '@/components/locations/LocationsSection'
import FeedbackSection from '@/components/feedback/FeedbackSection'
import ScrollReveal from '@/components/shared/ScrollReveal'
import SectionHeading from '@/components/shared/SectionHeading'
import { CONTAINER } from '@/lib/layout'

const MONTH = new Date().toLocaleDateString('en-IN', { month: 'long' })

/*
 * Page order. The header's scroll spy walks these same ids in this same order
 * (navigation.config's pageSections) — move a section here, move it there too.
 *
 * Shelves (Pitstop, Workplace, Happening now) run the full window width and
 * line their first card up with the column themselves, so only their heading
 * sits in CONTAINER. Everything else lives inside it.
 *
 * Section headings are "Statement. Subtitle" — the subtitle carries no full
 * stop of its own. Bajaj Bytes lives only on the Happening now shelf, and the
 * globe panel sits under the page's own heading voice.
 */
export default function MainContent() {
  return (
    <main className="min-w-0 flex-1">
      <Hero />

      <section id="self-service" aria-labelledby="self-service-heading" className="scroll-mt-28 pt-2">
        <h2 id="self-service-heading" className="sr-only">
          Pitstop
        </h2>
        <ServiceGrid />
      </section>

      <ScrollReveal id="it-resources" aria-labelledby="workplace-heading" className="pt-12">
        <ITResources />
      </ScrollReveal>

      <ScrollReveal id="happening" aria-labelledby="happening-heading" className="pt-6">
        <div className={CONTAINER}>
          <SectionHeading
            id="happening-heading"
            title="Happening now."
            subtitle="What's on at Bajaj this month"
          />
        </div>
        <HappeningNow />
      </ScrollReveal>

      <ScrollReveal
        id="calendar"
        aria-labelledby="calendar-heading"
        className={`${CONTAINER} space-y-6 pt-8`}
      >
        <SectionHeading id="calendar-heading" title="Calendar." subtitle={`${MONTH} at a glance`} />
        <CalendarWidget />
      </ScrollReveal>

      <ScrollReveal
        id="emergency-contacts"
        aria-labelledby="help-heading"
        className={`${CONTAINER} space-y-6 pt-14`}
      >
        <SectionHeading
          id="help-heading"
          title="Help is here."
          subtitle="Whenever, and however, you need it"
        />
        <HelpSection />
      </ScrollReveal>

      <ScrollReveal id="csr" aria-labelledby="csr-heading" className={`${CONTAINER} space-y-6 pt-14`}>
        <SectionHeading id="csr-heading" title="Community & CSR." subtitle="Giving back, together" />
        <CsrSection />
      </ScrollReveal>

      <ScrollReveal
        id="locations"
        aria-labelledby="locations-heading"
        className={`${CONTAINER} space-y-6 pt-14`}
      >
        <SectionHeading id="locations-heading" title="Bajaj Auto." subtitle="Overview and Presence" />
        <LocationsSection />
      </ScrollReveal>

      <ScrollReveal id="feedback" aria-labelledby="feedback-heading" className={`${CONTAINER} pt-10`}>
        <FeedbackSection />
      </ScrollReveal>
    </main>
  )
}

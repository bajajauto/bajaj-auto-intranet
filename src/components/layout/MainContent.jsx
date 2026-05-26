import { useScrollSpy } from '@/hooks/useScrollSpy'
import Sidebar from './Sidebar'
import HeroBanner from './HeroBanner'
import ServiceGrid from '@/components/self-service/ServiceGrid'
import DashboardUpdatesPanel from '@/components/dashboard/DashboardUpdatesPanel'
import CompanyOverview from '@/components/company/CompanyOverview'
import NewsFeed from '@/components/news/NewsFeed'
import BajajBytes from '@/components/news/BajajBytes'
import ITResources from '@/components/it-resources/ITResources'
import EmergencyContacts from '@/components/emergency/EmergencyContacts'
import LocationsSection from '@/components/locations/LocationsSection'
import FeedbackSection from '@/components/feedback/FeedbackSection'
import ScrollReveal from '@/components/shared/ScrollReveal'

const SECTION_IDS = [
  'self-service',
  'bajaj-bytes',
  'company-overview',
  'company-news',
  'locations',
  'it-resources',
  'emergency-contacts',
  'feedback',
]

export default function MainContent() {
  const [activeSection, forceSection] = useScrollSpy(SECTION_IDS)

  return (
    <>
      <Sidebar activeSection={activeSection} onForceSection={forceSection} />

      <main className="flex-1 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-3 py-4 space-y-7 sm:px-4 sm:py-5 sm:space-y-9 md:px-6 lg:py-6 lg:space-y-10">
          <HeroBanner />

          <ScrollReveal id="dashboard" aria-labelledby="dashboard-heading">
            <h2 id="dashboard-heading" className="sr-only">
              Dashboard
            </h2>
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row">
              <div className="flex-1 min-w-0">
                <section id="self-service" aria-labelledby="self-service-heading">
                  <h2 id="self-service-heading" className="sr-only">
                    Pitstop
                  </h2>
                  <ServiceGrid title="Pitstop" />
                  <div id="bajaj-bytes" className="mt-4 scroll-mt-32 sm:mt-6">
                    <h2 id="bajaj-bytes-heading" className="sr-only">
                      Bajaj Bytes
                    </h2>
                    <BajajBytes title="Bajaj Bytes" />
                  </div>
                </section>
              </div>
              <div className="flex w-full flex-col gap-4 sm:gap-6 lg:w-80 lg:flex-shrink-0">
                <DashboardUpdatesPanel />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal id="company-overview" aria-labelledby="company-overview-heading">
            <h2 id="company-overview-heading" className="sr-only">
              Company Overview
            </h2>
            <CompanyOverview title="Company Overview" />
          </ScrollReveal>

          <ScrollReveal id="company-news" aria-labelledby="company-news-heading">
            <h2 id="company-news-heading" className="sr-only">
              Company News
            </h2>
            <NewsFeed title="Company News" />
          </ScrollReveal>
          <ScrollReveal id="locations" aria-labelledby="locations-heading" className="xl:-mr-8 2xl:-mr-16">
            <h2 id="locations-heading" className="sr-only">
              Bajaj Auto Presence
            </h2>
            <LocationsSection title="Bajaj Auto Presence" />
          </ScrollReveal>

          <ScrollReveal id="it-resources" aria-labelledby="it-resources-heading">
            <h2 id="it-resources-heading" className="sr-only">
              Resources and Support Services
            </h2>
            <ITResources title="Resources and Support Services" />
          </ScrollReveal>

          <ScrollReveal id="emergency-contacts" aria-labelledby="emergency-heading">
            <h2 id="emergency-heading" className="sr-only">
              Emergency Contacts
            </h2>
            <EmergencyContacts title="Emergency Contacts" />
          </ScrollReveal>

          <ScrollReveal id="feedback" aria-labelledby="feedback-heading">
            <h2 id="feedback-heading" className="sr-only">
              Feedback and Support
            </h2>
            <FeedbackSection />
          </ScrollReveal>
        </div>
      </main>
    </>
  )
}

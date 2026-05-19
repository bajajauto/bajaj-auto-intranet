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
  'company-overview',
  'company-news',
  'locations',
  'it-resources',
  'feedback',
  'emergency-contacts',
]

export default function MainContent() {
  const [activeSection, forceSection] = useScrollSpy(SECTION_IDS)

  return (
    <>
      <Sidebar activeSection={activeSection} onForceSection={forceSection} />

      <main className="flex-1 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-6 space-y-10">
          <HeroBanner />

          <ScrollReveal id="dashboard" aria-labelledby="dashboard-heading">
            <h2 id="dashboard-heading" className="sr-only">
              Dashboard
            </h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0">
                <section id="self-service" aria-labelledby="self-service-heading">
                  <h2 id="self-service-heading" className="text-lg font-semibold text-brand-primary mb-4">
                    Employee Self Service
                  </h2>
                  <ServiceGrid />
                  <div id="bajaj-bytes" className="mt-6 scroll-mt-32">
                    <h2
                      id="bajaj-bytes-heading"
                      className="text-lg font-semibold text-brand-primary mb-4"
                    >
                      Bajaj Bytes
                    </h2>
                    <BajajBytes />
                  </div>
                </section>
              </div>
              <div className="flex flex-col gap-6 w-full lg:w-80 flex-shrink-0">
                <DashboardUpdatesPanel />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal id="company-overview" aria-labelledby="company-overview-heading">
            <h2
              id="company-overview-heading"
              className="text-lg font-semibold text-brand-primary mb-4"
            >
              Company Overview
            </h2>
            <CompanyOverview />
          </ScrollReveal>

          <ScrollReveal id="company-news" aria-labelledby="company-news-heading">
            <h2 id="company-news-heading" className="text-lg font-semibold text-brand-primary mb-4">
              Company News
            </h2>
            <NewsFeed />
          </ScrollReveal>
          <ScrollReveal id="locations" aria-labelledby="locations-heading">
            <h2 id="locations-heading" className="text-lg font-semibold text-brand-primary mb-4">
              Bajaj Auto Locations
            </h2>
            <LocationsSection />
          </ScrollReveal>

          <ScrollReveal id="it-resources" aria-labelledby="it-resources-heading">
            <h2 id="it-resources-heading" className="text-lg font-semibold text-brand-primary mb-4">
              IT Resources
            </h2>
            <ITResources />
          </ScrollReveal>

          <ScrollReveal id="feedback" aria-labelledby="feedback-heading">
            <h2 id="feedback-heading" className="text-lg font-semibold text-brand-primary mb-4">
              Feedback & Support
            </h2>
            <FeedbackSection />
          </ScrollReveal>

          <ScrollReveal id="emergency-contacts" aria-labelledby="emergency-heading">
            <h2 id="emergency-heading" className="text-lg font-semibold text-brand-primary mb-4">
              Emergency Contacts
            </h2>
            <EmergencyContacts />
          </ScrollReveal>
        </div>
      </main>
    </>
  )
}

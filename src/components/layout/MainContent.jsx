import Greeting from '@/components/dashboard/Greeting'
import Highlights from '@/components/dashboard/Highlights'
import ServiceGrid from '@/components/self-service/ServiceGrid'
import HolidayCalendar from '@/components/calendar/HolidayCalendar'
import ITResources from '@/components/it-resources/ITResources'
import NewsBytes from '@/components/news/NewsBytes'
import CsrSection from '@/components/csr/CsrSection'
import LocationsSection from '@/components/locations/LocationsSection'
import FeedbackSection from '@/components/feedback/FeedbackSection'
import Footer from '@/components/layout/Footer'
import { PAGE } from '@/lib/layout'

/*
 * Page order. The sidebar's scroll spy walks these same ids in this same order
 * (pageSections in navigation.config.js) — keep the two in step.
 *
 * The page sits on the ocean wash: white at the edges deepening to steel blue
 * through the middle, so the white cards stand off it.
 */
export default function MainContent() {
  return (
    <main className="min-h-screen min-w-0 bg-[linear-gradient(90deg,#fefefe_0%,#fff_6%,#e4ebf3_20%,#a1c0d4_38%,#52a3be_53%,#93b9ce_66%,#d6e2ee_80%,#fff_92%)] pt-14 lg:pl-[86px]">
      <div className={`${PAGE} space-y-4 pb-2 pt-4`}>
        <Greeting />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_385px]">
          <div className="min-w-0 space-y-4">
            <ServiceGrid />
            <ITResources />
          </div>
          <div className="flex flex-col gap-4 [&>#holidays]:flex-1">
            <Highlights />
            <HolidayCalendar />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <CsrSection />
          <NewsBytes />
        </div>
        <LocationsSection />
        <FeedbackSection />
        <Footer />
      </div>
    </main>
  )
}

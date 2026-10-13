import { useState } from 'react'
import { BookOpen, Headphones, PlayCircle } from 'lucide-react'
import { podcastService } from '@/services/podcastService'
import NewslettersCarousel from './NewslettersCarousel'
import PodcastSection from './PodcastSection'
import YouTubeSection from './YouTubeSection'
import SectionHeading from '@/components/shared/SectionHeading'

const TABS = [
  { id: 'newsletters', label: 'Newsletters', icon: BookOpen },
  { id: 'podcast', label: 'Podcast', icon: Headphones },
  { id: 'watch', label: 'Watch', icon: PlayCircle },
]

export default function BajajBytesHub({ title, subtitle, headingId }) {
  const [activeTab, setActiveTab] = useState('newsletters')
  const [initialEpisodeId, setInitialEpisodeId] = useState(null)

  /*
   * Switches to the podcast tab on the episode matching a newsletter volume.
   * The tab flips immediately rather than waiting on the lookup — the episode
   * id only decides which player opens, and blocking the tab change on a
   * request would make the button feel broken.
   */
  async function handleListenToVolume(volumeId) {
    setActiveTab('podcast')
    const episode = await podcastService.getByVolume(volumeId)
    setInitialEpisodeId(episode?.id ?? null)
  }

  function handleTabChange(tabId) {
    if (tabId !== 'podcast') setInitialEpisodeId(null)
    setActiveTab(tabId)
  }

  return (
    <>
      <SectionHeading id={headingId} title={title} subtitle={subtitle}>
        <div
          role="tablist"
          aria-label="Bajaj Bytes content type"
          className="scrollbar-none inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-chip p-1"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`bytes-panel-${tab.id}`}
                id={`bytes-tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-all focus-ring ${
                  isActive ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </SectionHeading>

      <div
        role="tabpanel"
        id={`bytes-panel-${activeTab}`}
        aria-labelledby={`bytes-tab-${activeTab}`}
        className="relative mt-6 overflow-hidden rounded-[28px] bg-surface shadow-soft"
      >
        {activeTab === 'newsletters' && (
          <NewslettersCarousel onListenToVolume={handleListenToVolume} />
        )}
        {activeTab === 'podcast' && (
          <PodcastSection key={initialEpisodeId ?? 'default'} initialEpisodeId={initialEpisodeId} />
        )}
        {activeTab === 'watch' && <YouTubeSection />}
      </div>
    </>
  )
}

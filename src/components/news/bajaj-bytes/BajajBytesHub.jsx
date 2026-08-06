import { useState } from 'react'
import { BookOpen, Headphones, PlayCircle } from 'lucide-react'
import { podcastService } from '@/services/podcastService'
import NewslettersCarousel from './NewslettersCarousel'
import PodcastSection from './PodcastSection'
import YouTubeSection from './YouTubeSection'

const TABS = [
  { id: 'newsletters', label: 'Newsletters', icon: BookOpen },
  { id: 'podcast', label: 'Podcast', icon: Headphones },
  { id: 'watch', label: 'Watch', icon: PlayCircle },
]

export default function BajajBytesHub({ title }) {
  const [activeTab, setActiveTab] = useState('newsletters')
  const [initialEpisodeId, setInitialEpisodeId] = useState(null)

  function handleListenToVolume(volumeId) {
    const episode = podcastService.getByVolume(volumeId)
    setInitialEpisodeId(episode?.id ?? null)
    setActiveTab('podcast')
  }

  function handleTabChange(tabId) {
    if (tabId !== 'podcast') setInitialEpisodeId(null)
    setActiveTab(tabId)
  }

  return (
    <div className="site-surface-tint tint-cream relative overflow-hidden rounded-card border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-modal">
      <div className="flex flex-col gap-3 px-5 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-14">
        {title && <h2 className="text-lg font-semibold text-brand-primary">{title}</h2>}

        <div
          role="tablist"
          aria-label="Bajaj Bytes content type"
          className="scrollbar-none inline-flex w-full overflow-x-auto rounded-full bg-bg-alt p-1 sm:w-auto"
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
                className={
                  'flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all focus-ring sm:flex-none ' +
                  (isActive
                    ? 'bg-white text-brand-primary shadow-card'
                    : 'text-text-secondary hover:text-brand-primary')
                }
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`bytes-panel-${activeTab}`}
        aria-labelledby={`bytes-tab-${activeTab}`}
      >
        {activeTab === 'newsletters' && (
          <NewslettersCarousel onListenToVolume={handleListenToVolume} />
        )}
        {activeTab === 'podcast' && (
          <PodcastSection key={initialEpisodeId ?? 'default'} initialEpisodeId={initialEpisodeId} />
        )}
        {activeTab === 'watch' && <YouTubeSection />}
      </div>
    </div>
  )
}

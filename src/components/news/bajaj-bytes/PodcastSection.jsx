import { useState } from 'react'
import { Headphones } from 'lucide-react'
import { usePodcastEpisodes } from '@/hooks/usePodcastEpisodes'
import PodcastCard from './PodcastCard'
import PodcastPlayer from './PodcastPlayer'

export default function PodcastSection() {
  const episodes = usePodcastEpisodes()
  const [activeId, setActiveId] = useState(episodes[0]?.id ?? null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (episodes.length === 0) {
    return (
      <div className="px-5 py-10 sm:px-14">
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-gray-200 bg-bg-alt px-6 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-primary">
            <Headphones size={22} />
          </span>
          <p className="mt-4 text-sm font-semibold text-text-primary">No episodes yet</p>
          <p className="mt-1 max-w-sm text-xs text-text-secondary">
            New podcast episodes drop alongside every Bajaj Bytes newsletter.
          </p>
        </div>
      </div>
    )
  }

  const activeEpisode = episodes.find((ep) => ep.id === activeId) ?? episodes[0]

  function handleSelect(episodeId) {
    if (episodeId === activeId) {
      setIsPlaying((prev) => !prev)
      return
    }
    setActiveId(episodeId)
    setIsPlaying(true)
  }

  return (
    <div className="space-y-5 px-5 py-6 sm:px-14">
      <PodcastPlayer
        episode={activeEpisode}
        isPlaying={isPlaying}
        onPlayingChange={setIsPlaying}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <PodcastCard
            key={episode.id}
            episode={episode}
            isActive={episode.id === activeEpisode.id}
            isPlaying={isPlaying && episode.id === activeEpisode.id}
            onSelect={() => handleSelect(episode.id)}
          />
        ))}
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'

export default function PodcastPlayer({ episode, isPlaying, onPlayingChange }) {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => onPlayingChange(false))
    } else {
      audio.pause()
    }
  }, [episode.id, isPlaying, onPlayingChange])

  return (
    <div className="flex flex-col gap-3 rounded-card border border-brand-primary/15 bg-brand-light/40 p-4 sm:flex-row sm:items-center">
      <div
        className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-btn"
        style={{ background: episode.coverGradient }}
        aria-hidden="true"
      >
        <span
          className="absolute -right-2 -top-2 h-10 w-10 rounded-full"
          style={{ backgroundColor: episode.coverAccent }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          Now playing
        </p>
        <p className="truncate text-sm font-semibold text-text-primary">{episode.title}</p>
      </div>

      <audio
        ref={audioRef}
        src={episode.audioUrl}
        controls
        preload="metadata"
        onPlay={() => onPlayingChange(true)}
        onPause={() => onPlayingChange(false)}
        onEnded={() => onPlayingChange(false)}
        className="w-full sm:w-72"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

import { Headphones } from 'lucide-react'

export default function PodcastSection() {
  return (
    <div className="px-5 py-10 sm:px-14">
      <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-gray-200 bg-bg-alt px-6 py-12 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-primary">
          <Headphones size={22} />
        </span>
        <p className="mt-4 text-sm font-semibold text-text-primary">Podcast episodes coming soon</p>
        <p className="mt-1 max-w-sm text-xs text-text-secondary">
          AI-generated audio versions of every Bajaj Bytes newsletter will land here. Listen on the
          go or while you commute.
        </p>
      </div>
    </div>
  )
}

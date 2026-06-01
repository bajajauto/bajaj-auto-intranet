// Placeholder audio URLs use SoundHelix samples until the NotebookLM-generated
// episodes are uploaded to /public/podcasts/. Swap audioUrl per episode when
// the content team delivers final MP3s.
export const podcastMock = {
  getAll() {
    return [
      {
        id: 'ep-7',
        title: 'Bajaj Bytes · May 2026',
        summary:
          'Q4 highlights, the Chetak 1-lakh sales milestone and a tour of the new Chakan R&D centre.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        durationSec: 720,
        publishedOn: '2026-05-18',
        sourceVolumeId: 'vol-7',
        coverGradient:
          'linear-gradient(135deg, #fbbf24 0%, #f97316 30%, #ec4899 62%, #4c1d95 100%)',
        coverAccent: 'rgba(244, 114, 182, 0.28)',
      },
      {
        id: 'ep-6',
        title: 'Bajaj Bytes · April 2026',
        summary:
          'Inside the Pulsar relaunch campaign, leadership Q&A and what changed in our export markets.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        durationSec: 642,
        publishedOn: '2026-04-20',
        sourceVolumeId: 'vol-6',
        coverGradient: 'linear-gradient(135deg, #0f766e 0%, #115e59 48%, #0f172a 100%)',
        coverAccent: 'rgba(245, 158, 11, 0.28)',
      },
      {
        id: 'ep-5',
        title: 'Bajaj Bytes · March 2026',
        summary:
          'Year-end wrap, employee stories from the plant floor, and a peek at FY27 priorities.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        durationSec: 588,
        publishedOn: '2026-03-22',
        sourceVolumeId: 'vol-5',
        coverGradient: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1f0b37 100%)',
        coverAccent: 'rgba(251, 113, 133, 0.28)',
      },
    ]
  },
  getByVolume(volumeId) {
    return this.getAll().find((ep) => ep.sourceVolumeId === volumeId) ?? null
  },
}

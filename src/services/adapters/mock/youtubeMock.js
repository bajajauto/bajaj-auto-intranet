// Placeholder YouTube IDs reference stable public videos so thumbnails and
// embeds render in the demo. Content team to replace these with actual
// Bajaj Auto channel video IDs.
const VIDEOS = [
  {
    id: 'vid-teams-event-1',
    title: 'Events - Teams video',
    category: 'md-meetings',
    externalUrl:
      'https://teams.microsoft.com/l/message/48:notes/1781256673545?context=%7B%22contextType%22%3A%22chat%22%2C%22oid%22%3A%228%3Aorgid%3A9afb3f05-a891-487e-8051-3ed5274b7eb4%22%7D',
    publishedOn: '2026-06-12',
    description: 'Microsoft Teams event video shared with employees.',
  },
  {
    id: 'vid-1',
    title: 'MD Town Hall · Q4 FY26 results review',
    category: 'md-meetings',
    youtubeId: 'jNQXAC9IVRw',
    durationSec: 1842,
    publishedOn: '2026-05-12',
    description:
      'Rajiv Bajaj walks employees through Q4 highlights, the FY27 roadmap and answers questions from the floor.',
  },
  {
    id: 'vid-2',
    title: 'All-Hands · Chetak 1-lakh milestone celebration',
    category: 'md-meetings',
    youtubeId: '9bZkp7q19f0',
    durationSec: 2616,
    publishedOn: '2026-04-22',
    description:
      'A full-house celebration of the Chetak EV crossing the 1,00,000 sales mark, with recognition for the EV team.',
  },
  {
    id: 'vid-3',
    title: 'Leadership conversation · Inside the Pulsar relaunch',
    category: 'interviews',
    youtubeId: 'kJQP7kiw5Fk',
    durationSec: 924,
    publishedOn: '2026-04-08',
    description:
      'The product lead and chief designer on the thinking behind the new Pulsar lineup and what changed in 2026.',
  },
  {
    id: 'vid-4',
    title: 'In conversation with the CFO · FY27 outlook',
    category: 'interviews',
    youtubeId: 'L_jWHffIx5E',
    durationSec: 1158,
    publishedOn: '2026-05-02',
    description:
      'Capital allocation, the EV investment plan and how the export business is reshaping the P&L.',
  },
  {
    id: 'vid-5',
    title: 'Bajaj Stories · A day at the Chakan plant',
    category: 'stories',
    youtubeId: 'fJ9rUzIMcZQ',
    durationSec: 488,
    publishedOn: '2026-03-30',
    description:
      'A short film following three shopfloor team members across a single shift at the Chakan plant.',
  },
  {
    id: 'vid-6',
    title: 'Bajaj Stories · How the new R&D centre came together',
    category: 'stories',
    youtubeId: 'RgKAFK5djSk',
    durationSec: 612,
    publishedOn: '2026-04-15',
    description:
      'Behind the build of the 42,000 sq ft Chakan R&D centre, told by the engineers who designed it.',
  },
]

export const youtubeMock = {
  getAll() {
    return VIDEOS
  },
  getByCategory(category) {
    return VIDEOS.filter((v) => v.category === category)
  },
}

# components/news/ – Company News Feed

**Epic:** E6 (Tasks 6.1, 6.4)
**Priority:** P1 High

## Components

| Component | Epic Task | Description |
|---|---|---|
| `NewsCard.jsx` | E6-T6.1 | Card: image placeholder, headline, 2-line excerpt, date, source tag |
| `NewsFeed.jsx` | E6-T6.1 | Feed container: 3 visible cards, horizontal scroll on desktop |

## Data Flow

`NewsFeed` → `newsService.getAll()` from `@/services/newsService` → mock adapter → static array

## Card Spec

- Image: `<ImagePlaceholder>` with fixed aspect ratio (16:9)
- Headline: `font-semibold`, single line truncated
- Excerpt: `text-sm text-secondary`, max 2 lines (`line-clamp-2`)
- Date: formatted as "20 Apr 2026"
- Source tag: colored badge (Leadership, Product, Facilities, etc.)

## Branch

`feat/E6-news-feed`, `feat/E6-news-data`

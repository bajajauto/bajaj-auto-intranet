# components/layout/ – Page Shell Components

The shell every content section renders inside. One scrolling page, no sidebar.

## Component Map

| Component | What it renders |
|---|---|
| `TopBanner.jsx` | Navy utility strip: About Us, Vision & Mission, Ethics Helpline, POSH, Bajaj Bytes, and the SOS button (opens the emergency contacts modal). Scrolls away with the page. |
| `Header.jsx` | Sticky translucent bar: Bajaj logo + product mark, section nav (scroll spy highlight), search shortcut, theme toggle, notices, profile menu. Below `xl` the nav folds into a menu sheet. |
| `TodayRibbon.jsx` | One line naming the next company event or holiday. Absent while loading, on error, or when nothing is coming up. |
| `Hero.jsx` | Date, greeting, quick links (Ask Jarvis, Raise an IT request), the site search and "Popular" chips. |
| `MainContent.jsx` | Every section in page order, each with its `id` anchor. |
| `Footer.jsx` | Link columns, brand block, copyright, and the stock ticker along the bottom edge. |
| `SplashScreen.jsx`, `UnionMark.jsx` | The entry splash and the product mark it assembles. |

## Layout Stacking (z-index)

- Header: `z-40`, `sticky top-0`
- Header popovers (notices, profile, menu): `z-50`
- Hero search results: `z-30`
- Modals: `z-50`, portalled into `#modal-root`

## Key Interactions

- Scroll spy lives in `Header` via `useScrollSpy(pageSections)`; each header link
  `covers` one or more section ids (see `navigation.config.js`).
- `scrollToSection()` (utils) applies the sticky-header offset — use it for any
  in-page jump rather than `scrollIntoView`.
- The hero search (`useSiteSearch`) finds Pitstop services and page sections,
  not documents or people. Enter opens the first match; no match offers Jarvis.
- Anything that wants to open Jarvis calls `openJarvis()` from `src/lib/jarvis.js`.

/*
 * Jarvis's rule-based brain. No model, no network: a question is normalised,
 * checked against a handful of fixed intents (greetings, holidays, help), then
 * scored against every knowledge entry by the words it shares with it.
 *
 * Scoring, per query word (the best of the word and its synonym):
 *   +3  the word is in the entry's title
 *   +2  it is one of the entry's keywords
 *   +0.5 it appears in the entry's body prose
 * Generic words ("policy", "rules") never score above 0.5 — every policy has
 * them. On top of that:
 *   +4  a whole multi-word keyword appears in the question ("leave balance")
 *   +3  the question is exactly the title or one keyword ("appraisal")
 *   +boost  entries that are more specific than their neighbours (a policy
 *           topic over the bucket it sits in)
 * The best entry wins if it clears MIN_SCORE; runners-up within reach are
 * offered as "related" chips.
 */

const MIN_SCORE = 3
const RELATED_RATIO = 0.7
const MAX_RELATED = 3

const STOPWORDS = new Set(
  `a an the is are am was were be been i me my mine we our you your its of to for in on at by with from
  and or but if then so do does did can could would should will shall may might how what when where which who
  whom why please pls plz tell know want need get give show find about any some this that these those there
  here have has had kindly help regarding hi hello hey jarvis much many not working issue problem unable`.split(
    /\s+/
  )
)

const GENERIC = new Set(['policy', 'rule', 'scheme', 'process', 'detail', 'information', 'info'])

// Typed shorthand, tried alongside the word itself.
const SYNONYMS = {
  salary: 'payslip',
  payroll: 'payslip',
  vacation: 'leave',
  laptop: 'it',
  computer: 'it',
  printer: 'it',
  wifi: 'it',
  doctor: 'medical',
  hospitalization: 'hospitalisation',
  insurence: 'insurance',
  polices: 'policy',
  policys: 'policy',
  bike: 'vehicle',
  scooter: 'vehicle',
  appraisal: 'performance',
  training: 'learning',
  harrasment: 'harassment',
  deadline: 'timeline',
  timelimit: 'timeline',
  resign: 'resignation',
}

export function normalise(text) {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function stem(word) {
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

function tokens(text) {
  return normalise(text)
    .split(' ')
    .filter((word) => word && !STOPWORDS.has(word))
    .map(stem)
}

// Each query word as the list of forms it may match: itself and its synonym.
function queryWords(text) {
  return normalise(text)
    .split(' ')
    .filter((word) => word && !STOPWORDS.has(word))
    .map((word) => [...new Set([stem(word), ...(SYNONYMS[word] ? [stem(SYNONYMS[word])] : [])])])
}

/*
 * Each entry is indexed once, the first time it is scored, and kept on a
 * WeakMap so rebuilding the knowledge (the policy library landing) re-indexes
 * only what is new.
 */
const INDEX = new WeakMap()

function indexOf(entry) {
  let index = INDEX.get(entry)
  if (index) return index
  const keywordTokens = entry.keywords.map((k) => tokens(k).join(' ')).filter(Boolean)
  index = {
    title: new Set(tokens(entry.title)),
    keywords: new Set(entry.keywords.flatMap(tokens)),
    body: new Set(tokens(entry.body ?? '')),
    phrases: entry.keywords.map(normalise).filter((k) => k.includes(' ')),
    exact: new Set([tokens(entry.title).join(' '), ...keywordTokens]),
  }
  INDEX.set(entry, index)
  return index
}

function score(entry, words, normalisedQuery) {
  const index = indexOf(entry)
  let total = 0
  let hits = 0
  for (const forms of words) {
    let best = 0
    for (const word of forms) {
      let wordScore = 0
      if (index.title.has(word)) wordScore = 3
      else if (index.keywords.has(word)) wordScore = 2
      else if (index.body.has(word)) wordScore = 0.5
      if (GENERIC.has(word)) wordScore = Math.min(wordScore, 0.5)
      best = Math.max(best, wordScore)
    }
    if (best > 0.5) hits += 1
    total += best
  }
  for (const phrase of index.phrases) {
    if (` ${normalisedQuery} `.includes(` ${phrase} `)) total += 4
  }
  const core = words
    .map((forms) => forms[0])
    .filter((word) => !GENERIC.has(word))
    .join(' ')
  if (core && index.exact.has(core)) total += 3
  // FAQ entries are narrow: they only win when most of the question is about them.
  if (entry.faq && hits < Math.min(2, words.length)) total *= 0.5
  if (total === 0) return 0
  // Prefer entries that explain more of what was asked.
  return total + (words.length ? hits / words.length : 0) + (entry.boost ?? 0)
}

// ── Fixed intents ──────────────────────────────────────────────────────────

const GREETING = /^(hi+|hello|hey|hii+|namaste|good (morning|afternoon|evening)|yo)\b[\s!.]*$/
const THANKS =
  /^(thanks?( you)?( so much)?|thank you|thx|ty|great|awesome|perfect|ok(ay)?|cool|got it)$/
const POLICIES = /^(hr |all |company )?(policy|policies|benefits?)( list)?$/
const HELP = /^(help|menu|options|start over|what can you do|what do you know|what can i ask)$/
const NEXT_HOLIDAY =
  /\b(next|upcoming|coming|nearest)\b.*\bholidays?\b|\bholidays?\b.*\b(next|upcoming|coming)\b/
const HOLIDAY_LIST =
  /\b(holiday|holidays)\b.*\b(list|calendar|all|year|20\d\d)\b|\b(list|calendar)\b.*\bholidays?\b|^holidays?$/
const EVENTS = /\b(events?|town ?hall|sports meet|upcoming events?)\b/

const DATE_FORMAT = new Intl.DateTimeFormat('en-IN', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

function parseDay(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function holidayLine(event) {
  const suffix = event.time && event.time !== 'Paid Holiday' ? ` (${event.time})` : ''
  return `${DATE_FORMAT.format(parseDay(event.date))}: ${event.label}${suffix}`
}

const CALENDAR_ACTION = { label: 'Show the calendar', sectionId: 'holidays' }

function nextHoliday(holidays, today) {
  const upcoming = holidays.filter((h) => parseDay(h.date) >= today)
  if (!upcoming.length) {
    return {
      text: "There are no more holidays on this year's calendar.",
      actions: [CALENDAR_ACTION],
    }
  }
  const [next, ...rest] = upcoming
  const days = Math.round((parseDay(next.date) - today) / 86400000)
  const when = days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`
  const lines = [
    `The next holiday is ${next.label}, on ${DATE_FORMAT.format(parseDay(next.date))} (${when}).`,
  ]
  if (next.remarks && next.remarks !== 'Paid Holiday') lines.push(next.remarks)
  if (rest.length)
    lines.push(
      `After that:\n${rest
        .slice(0, 2)
        .map((h) => `• ${holidayLine(h)}`)
        .join('\n')}`
    )
  return {
    text: lines.join('\n\n'),
    actions: [CALENDAR_ACTION, { label: 'Full holiday list', ask: 'Holiday list' }],
  }
}

function holidayList(holidays, today) {
  if (!holidays.length)
    return { text: 'The holiday calendar is on the home page.', actions: [CALENDAR_ACTION] }
  const lines = holidays.map((h) => `${parseDay(h.date) < today ? '◦' : '•'} ${holidayLine(h)}`)
  return {
    text: `Holidays this year (◦ = already passed):\n${lines.join('\n')}`,
    actions: [CALENDAR_ACTION, { label: 'Next holiday', ask: 'Next holiday' }],
  }
}

// Words too common in holiday names to identify one ("day", "next").
const HOLIDAY_FILLER = new Set(['day', 'next', 'year', 'of', 'the', 'holiday', 'when', 'is', 'on'])

// "When is Diwali?", "Republic day holiday": holidays whose name the question uses.
function namedHolidays(holidays, q) {
  const words = new Set(q.split(' ').map((w) => w.replace(/s$/, '')))
  return holidays.filter((h) => {
    const label = normalise(h.label)
    if (` ${q} `.includes(` ${label} `)) return true
    return label
      .split(' ')
      .some(
        (word) => word.length > 3 && !HOLIDAY_FILLER.has(word) && words.has(word.replace(/s$/, ''))
      )
  })
}

function holidayMatches(matches, today) {
  const lines = matches.map((h) => {
    const past = parseDay(h.date) < today ? ' (already passed)' : ''
    const remark =
      h.remarks && h.remarks !== 'Paid Holiday' && h.remarks !== h.time ? `. ${h.remarks}` : ''
    return `• ${holidayLine(h)}${past}${remark}`
  })
  return {
    text: `${matches.length > 1 ? 'These holidays match' : 'Here it is'}:\n${lines.join('\n')}`,
    actions: [CALENDAR_ACTION, { label: 'Full holiday list', ask: 'Holiday list' }],
  }
}

function upcomingEvents(events, today) {
  const upcoming = events.filter((e) => parseDay(e.date) >= today).slice(0, 4)
  if (!upcoming.length)
    return {
      text: 'There are no upcoming company events on the calendar.',
      actions: [CALENDAR_ACTION],
    }
  return {
    text: `Upcoming events:\n${upcoming
      .map((e) => `• ${DATE_FORMAT.format(parseDay(e.date))}: ${e.label}, ${e.location}, ${e.time}`)
      .join('\n')}`,
    actions: [CALENDAR_ACTION],
  }
}

export const SUGGESTIONS = [
  'Leave policy',
  'Next holiday',
  'Bonafide letter',
  'My payslip',
  'Raise IT ticket',
  'Mediclaim card',
]

const HELP_REPLY = {
  text: "Here's what I can help with, using what's on the intranet:\n• HR policies and their FAQs (leave, travel, PF, insurance…)\n• Holidays and upcoming events\n• Employee letters and forms\n• Links to ESS, payslips, IT Summit, BOLT, GEM and more\n• Emergency contacts, Ethics Helpline and POSH",
  actions: SUGGESTIONS.map((label) => ({ label, ask: label })),
}

/**
 * Answers one message. `knowledge` is `{ entries, holidays, events }`.
 * Returns `{ text, actions }`.
 */
export function answer(message, knowledge, now = new Date()) {
  const q = normalise(message)
  const today = startOfDay(now)

  if (!q) return HELP_REPLY
  if (GREETING.test(q)) {
    return {
      text: "Hello! I'm Jarvis. Ask me about policies, holidays, letters or any intranet service.",
      actions: HELP_REPLY.actions,
    }
  }
  if (THANKS.test(q)) {
    return { text: "You're welcome! Anything else I can help with?", actions: [] }
  }
  if (HELP.test(q)) return HELP_REPLY
  if (POLICIES.test(q)) {
    const overview = knowledge.entries.find((entry) => entry.id === 'benefits-overview')
    if (overview) return { text: overview.text, actions: overview.actions, matched: overview.id }
  }
  if (NEXT_HOLIDAY.test(q)) return nextHoliday(knowledge.holidays, today)
  if (HOLIDAY_LIST.test(q)) return holidayList(knowledge.holidays, today)
  const named = namedHolidays(knowledge.holidays, q)
  if (named.length && named.length <= 4) return holidayMatches(named, today)
  if (EVENTS.test(q) && !/\bpolicy\b/.test(q)) return upcomingEvents(knowledge.events, today)

  const words = queryWords(message)
  if (!words.length) return HELP_REPLY

  const ranked = knowledge.entries
    .map((entry) => ({ entry, score: score(entry, words, q) }))
    .filter((r) => r.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)

  if (!ranked.length) {
    return {
      text: "Sorry, I couldn't find that on the intranet. Try asking it another way, or pick one of these:",
      actions: SUGGESTIONS.slice(0, 4).map((label) => ({ label, ask: label })),
      fallback: true,
    }
  }

  const [best, ...rest] = ranked
  const related = rest
    .filter((r) => r.score >= best.score * RELATED_RATIO && r.entry.title !== best.entry.title)
    .filter((r, i, all) => all.findIndex((o) => o.entry.title === r.entry.title) === i)
    .slice(0, MAX_RELATED)
    .map((r) => ({ label: r.entry.title, ask: r.entry.title, related: true }))

  return {
    text: best.entry.text,
    actions: [...best.entry.actions, ...related],
    matched: best.entry.id,
  }
}

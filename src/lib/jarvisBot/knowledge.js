import { services } from '@/config/services.config'
import { pageDestinations } from '@/config/search.config'
import { benefitBuckets } from '@/config/benefits.config'
import { helpLinks } from '@/config/contacts.config'
import { documentForms } from '@/config/documents.config'
import {
  downloadableForms,
  generatedForms,
  letterPurposes,
  letterTypes,
  usefulLinks,
} from '@/config/letters.config'

/*
 * Jarvis's knowledge, assembled from what the intranet already publishes.
 * Nothing is written for the bot alone: every answer is lifted from a config
 * file or a service response, so a policy summary edited for the Policies modal
 * is the same summary Jarvis gives.
 *
 * An entry is
 *   { id, title, keywords, body, text, actions }
 * `keywords` are strong signals (names, aliases), `body` is the longer prose
 * the matcher reads with a lighter hand, `text` is the reply, and `actions` the
 * buttons under it — each one an `href`, a `sectionId`, a shell `action`
 * ('policies' | 'letters' | 'sos' | 'helpline') or an `ask` (send that text).
 */

const isReady = (href) => Boolean(href) && href !== '#'

// Words people type for things whose official names they do not.
const ALIASES = {
  leave: ['vacation', 'el', 'cl', 'sl', 'sick', 'casual', 'earned', 'off'],
  'attendance and wfh': ['wfh', 'work from home', 'remote', 'punch', 'swipe'],
  'maternity leave': ['pregnancy', 'pregnant', 'mother'],
  'paternity leave': ['father', 'dad'],
  tap: ['transfer', 'relocation', 'relocate', 'shifting'],
  'expat separation': ['expat', 'overseas posting', 'deputation'],
  dtp: [
    'domestic travel',
    'tour',
    'business trip',
    'hotel',
    'cab',
    'train',
    'flight',
    'per diem',
    'da',
  ],
  ftp: ['foreign travel', 'international', 'overseas', 'abroad'],
  'travel claims (mmt)': [
    'mmt',
    'mybiz',
    'myclaims',
    'makemytrip',
    'expense',
    'claim',
    'reimbursement',
  ],
  'provident fund': ['pf', 'epf', 'uan', 'pf withdrawal', 'pf advance'],
  'superannuation rules': ['superannuation', 'superannuation fund'],
  'corporate nps': ['nps', 'national pension'],
  'pension rules': ['pension', 'retirement'],
  'esop financing': ['esop', 'shares', 'stock options'],
  'performance reward payout in case of separation': ['bonus', 'payout', 'separation bonus'],
  'corporate hospitalization benefit scheme': [
    'chbs',
    'mediclaim',
    'hospital',
    'hospitalisation',
    'medical insurance',
    'health insurance',
  ],
  'group personal accident': ['gpa', 'accident'],
  'group term life policy': ['gtl', 'life insurance', 'term insurance', 'death'],
  'company car lease policy': ['car lease', 'car'],
  'vehicle policies': ['vehicle', 'bike', 'motorcycle', 'discount'],
  'learning and education assistance policy (leap)': [
    'leap',
    'education',
    'study',
    'course',
    'degree',
    'mba',
  ],
  'internal job posting': ['ijp', 'job', 'opening', 'vacancy', 'internal transfer'],
  'canteen policy': ['canteen', 'food', 'lunch', 'meal'],
  'policy on mobile phones': ['mobile', 'phone', 'sim', 'handset', 'mobile reimbursement'],
  'code of conduct': ['coc', 'conduct', 'ethics'],
  posh: ['harassment', 'sexual harassment', 'icc'],
  'whistleblower policy': ['whistle blower', 'whistleblower', 'fraud', 'report'],
  'notice period policy': ['notice period', 'resignation', 'resign', 'exit', 'relieving'],
  'mis password management': ['password', 'reset password'],
  'mis internet policy': ['internet', 'website blocked'],
  'mis email management policy': ['email', 'outlook', 'mailbox'],
  'mis o365 management policy': ['o365', 'office 365', 'teams', 'onedrive'],
}

const aliasesFor = (name) => ALIASES[name.toLowerCase()] ?? []

// The first `count` sentences of a summary — a chat bubble is not the place
// for the whole paragraph, and the Policies modal is one tap away.
function firstSentences(text = '', count = 2) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)
  if (!sentences) return text
  return sentences.slice(0, count).join('').trim()
}

const bullets = (items) => items.map((item) => `• ${item}`).join('\n')

const openPolicies = { label: 'Browse all policies', action: 'policies' }
const openLetters = { label: 'Open Letters & Forms', action: 'letters' }

function documentActions(documents = [], limit = 3) {
  return documents
    .filter((doc) => isReady(doc.href))
    .slice(0, limit)
    .map((doc) => ({ label: doc.name, href: encodeURI(doc.href), kind: 'document' }))
}

// ── Pitstop services ───────────────────────────────────────────────────────

// Tiles whose `#` means "opens a modal" rather than "not built yet".
const SERVICE_ACTION = {
  policies: 'policies',
  documents: 'letters',
}

const SERVICE_KEYWORDS = {
  'team-directory': ['directory', 'colleague', 'people', 'extension', 'phone number'],
  policies: ['policy', 'policies', 'hr policy'],
  travel: ['travel', 'trip', 'booking', 'makemytrip', 'mmt', 'flight', 'hotel'],
  'recognition-gem': ['gem', 'recognition', 'reward', 'award', 'points', 'xoxoday'],
  compensation: [
    'payslip',
    'pay slip',
    'salary',
    'ctc',
    'compensation',
    'tax',
    'form 16',
    'allsec',
  ],
  'leave-attendance': [
    'leave',
    'leave balance',
    'apply leave',
    'attendance',
    'ess',
    'regularise',
    'portal',
  ],
  'holiday-calendar': ['holiday', 'holidays', 'calendar'],
  'bolt-learning': ['bolt', 'learning', 'training', 'course', 'elearning'],
  'health-wellness': ['health', 'wellness', 'alyve', 'doctor', 'fitness'],
  'idea-hub': ['idea', 'suggestion', 'innovation'],
  documents: ['document', 'documents', 'form', 'forms', 'letter'],
  benefits: ['benefit', 'benefits', 'annexure', 'perks'],
  mediclaim: ['mediclaim', 'ecard', 'e card', 'health card', 'insurance card', 'elephant'],
  'performance-management': [
    'performance',
    'appraisal',
    'pms',
    'top potential',
    'idp',
    '360',
    'development plan',
  ],
  'it-summit': ['it', 'it ticket', 'ticket', 'helpdesk', 'laptop', 'it summit', 'it request'],
}

const SERVICE_TEXT = {
  'leave-attendance':
    "I can't see your leave balance from here yet. You can check it, apply for leave and regularise attendance on the ESS portal.",
  compensation:
    'Your payslips, salary details and tax documents are on the Compensation portal (Allsec).',
  mediclaim: 'Your mediclaim e-card is available on the Elephant EB360 portal.',
  'holiday-calendar':
    'The holiday calendar is on the home page. Ask me "next holiday" or "holiday list" and I\'ll tell you here.',
  'it-summit': 'You can raise an IT ticket on the IT Summit helpdesk.',
  travel: 'Official travel is booked through MakeMyTrip (MyBiz).',
}

function serviceEntries() {
  const itHelpdesk = usefulLinks.find((link) => link.label === 'IT Summit')?.href

  return services
    .filter((service) => service.enabled)
    .map((service) => {
      const href = isReady(service.redirectUrl)
        ? service.redirectUrl
        : service.id === 'it-summit'
          ? itHelpdesk
          : undefined
      const actions = []

      if (service.apps?.length) {
        actions.push(...service.apps.map((app) => ({ label: app.label, href: app.href })))
      } else if (SERVICE_ACTION[service.id]) {
        actions.push({ label: `Open ${service.label}`, action: SERVICE_ACTION[service.id] })
      } else if (service.id === 'holiday-calendar') {
        actions.push({ label: 'Show the calendar', sectionId: 'holidays' })
        actions.push({ label: 'Next holiday', ask: 'Next holiday' })
      } else if (href) {
        actions.push({ label: `Open ${service.label}`, href })
      } else {
        actions.push({ label: 'Go to Pitstop', sectionId: 'pitstop' })
      }

      const text =
        SERVICE_TEXT[service.id] ??
        (service.apps?.length
          ? `${service.label} has ${service.apps.length} applications:\n${bullets(
              service.apps.map((app) => `${app.label}: ${app.description}`)
            )}`
          : href || SERVICE_ACTION[service.id]
            ? `${service.label} is one of the Pitstop services.`
            : `${service.label} is listed in Pitstop. It doesn't have a link yet.`)

      return {
        id: `service-${service.id}`,
        title: service.label,
        keywords: [service.label, ...(SERVICE_KEYWORDS[service.id] ?? [])],
        body: '',
        text,
        actions,
        boost: 1,
      }
    })
}

// ── Places on the page ─────────────────────────────────────────────────────

const DESTINATION_KEYWORDS = {
  emergency: ['emergency', 'emergency number', 'ambulance', 'fire', 'accident at work', 'sos'],
  canteen: ['canteen menu'],
  'it-request': ['intercom'],
}

const DESTINATION_TEXT = {
  emergency:
    'The emergency numbers (Fire, Dispensary & Medical, Security Control and Support Services) are on the SOS sheet.',
  ethics:
    'You can raise a concern confidentially through the Integrity Matters Ethics Helpline. POSH information covers the policy, the committee and how to report.',
  canteen: 'Delicia, the canteen, is listed under Resources & Support Services.',
  'it-request': 'IT requests and Intercom Support are under Resources & Support Services.',
  gatepass: 'You can create a visitor gatepass from Resources & Support Services.',
  utsah: 'Utsah (recreation) and the Crèche are under Resources & Support Services.',
  bytes: 'Bajaj Bytes, the newsletter, podcast and videos, is in the News section.',
  csr: 'CSR programmes and volunteering opportunities are in the CSR section.',
  presence: 'The company overview and the global presence map are in About Bajaj Auto.',
  feedback: 'You can share feedback about the intranet at the bottom of the page.',
}

function destinationEntries() {
  return pageDestinations
    .filter((dest) => dest.id !== 'calendar')
    .map((dest) => {
      const action = dest.action
        ? {
            label: dest.action === 'sos' ? 'Open SOS contacts' : 'Open Helpline',
            action: dest.action,
          }
        : { label: `Go to ${dest.hint}`, sectionId: dest.sectionId }
      return {
        id: `place-${dest.id}`,
        title: dest.label,
        keywords: [dest.label, ...dest.keywords, ...(DESTINATION_KEYWORDS[dest.id] ?? [])],
        body: '',
        text: DESTINATION_TEXT[dest.id] ?? `${dest.label} is under ${dest.hint}.`,
        actions: [action],
        boost: 1,
      }
    })
}

function helpLinkEntries() {
  return helpLinks.map((link) => ({
    id: `help-${link.id}`,
    title: link.label,
    keywords: [link.label, link.eyebrow, link.id],
    body: link.description,
    text: `${link.label}: ${link.description}`,
    actions: [
      isReady(link.href)
        ? { label: `Open ${link.label}`, href: link.href }
        : { label: 'Open Helpline', action: 'helpline' },
    ],
  }))
}

// ── Letters & forms ────────────────────────────────────────────────────────

function letterEntries() {
  const letters = letterTypes.map((type) => {
    const needs = type.fields.filter((field) => field.required).map((field) => field.label)
    const lines = [type.description]
    if (type.usesPurpose)
      lines.push(
        "You'll pick a purpose (for example a bank account, a car loan or a driving licence)."
      )
    if (needs.length) lines.push(`You'll need:\n${bullets(needs)}`)
    lines.push('The letter is generated as a PDF straight away, on your entity’s letterhead.')
    return {
      id: `letter-${type.id}`,
      title: type.label,
      keywords: [type.label, type.id.replace(/-/g, ' '), 'letter', 'certificate'],
      body: type.usesPurpose ? letterPurposes.join(' ') : '',
      text: lines.join('\n\n'),
      actions: [openLetters],
    }
  })

  const generated = generatedForms.map((form) => ({
    id: `form-${form.id}`,
    title: form.label,
    keywords: [form.label, form.title, 'rto', 'pan'],
    body: form.description,
    text: `${form.label} (${form.title}): ${form.description} It's generated for you in Letters & Forms.`,
    actions: [openLetters],
  }))

  const downloads = downloadableForms.map((form) => ({
    id: `download-${form.id}`,
    title: form.label,
    keywords: [form.label, 'form'],
    body: form.description,
    text: `${form.label}: ${form.description} Download it, fill it in by hand and submit it.`,
    actions: [
      { label: `Download ${form.label}`, href: encodeURI(form.href), kind: 'document' },
      openLetters,
    ],
  }))

  const portals = documentForms.map((form) => ({
    id: `docform-${form.id}`,
    title: form.label,
    keywords: [form.label, 'vehicle discount', 'bike discount', 'employee discount'],
    body: form.description,
    text: `${form.label}: ${form.description}.`,
    actions: [{ label: 'Open the portal', href: form.url }],
  }))

  const overview = {
    id: 'letters-overview',
    title: 'Letters & Forms',
    keywords: ['letter', 'letters', 'forms', 'certificate', 'employment letter', 'noc'],
    body: '',
    text: `These letters are generated for you:\n${bullets([
      ...letterTypes.map((t) => t.label),
      ...generatedForms.map((f) => f.label),
    ])}\n\nThese forms can be downloaded:\n${bullets(downloadableForms.map((f) => f.label))}`,
    actions: [openLetters],
  }

  return [overview, ...letters, ...generated, ...downloads, ...portals]
}

function usefulLinkEntries() {
  // EKAM (Android) and EKAM (iOS) answer to one question, so group by name.
  const groups = new Map()
  for (const link of usefulLinks) {
    const name = link.label.replace(/\s*\(.*\)$/, '')
    if (!groups.has(name)) groups.set(name, [])
    groups.get(name).push(link)
  }
  return [...groups].map(([name, links]) => ({
    id: `link-${name.toLowerCase().replace(/\W+/g, '-')}`,
    title: name,
    keywords: [
      name,
      ...(name === 'Happay' ? ['expense', 'card'] : []),
      ...(name === 'VPN' ? ['remote access', 'work from home'] : []),
    ],
    body: '',
    text: links.length > 1 ? `${name} is available on:` : `Here's the link for ${name}.`,
    actions: links.map((link) => ({ label: link.label, href: link.href })),
  }))
}

// ── Benefits buckets ───────────────────────────────────────────────────────

function benefitEntries() {
  const overview = {
    id: 'benefits-overview',
    title: 'Benefits & policies',
    keywords: ['benefits', 'policies', 'perks', 'all policies'],
    body: '',
    text: `Benefits and policies are grouped into:\n${bullets(benefitBuckets.map((b) => b.title))}`,
    actions: [openPolicies],
  }
  const buckets = benefitBuckets.map((bucket) => ({
    id: `bucket-${bucket.id}`,
    title: bucket.title,
    keywords: [bucket.title, ...bucket.categories.flatMap((c) => c.items)],
    body: bucket.categories.map((c) => c.name).join(' '),
    text: `${bucket.title} covers:\n${bullets(
      bucket.categories.map((c) => `${c.name}: ${c.items.join(', ')}`)
    )}`,
    actions: [openPolicies],
  }))
  return [overview, ...buckets]
}

// ── Policy library (from the service) ──────────────────────────────────────

function policyText(item) {
  const parts = [firstSentences(item.summary)]
  if (item.covered?.length) parts.push(`It covers:\n${bullets(item.covered)}`)
  const contacts = (item.contacts ?? []).filter((c) => c.email)
  if (contacts.length)
    parts.push(`Contact: ${contacts.map((c) => `${c.purpose}: ${c.email}`).join('; ')}`)
  return parts.filter(Boolean).join('\n\n')
}

/**
 * One entry per policy topic (or per category that holds its files directly),
 * plus one per FAQ / key point, since those are the questions people ask.
 * `library` is `[{ bucket, categories }]`, categories as the service returns them.
 */
export function buildPolicyEntries(library) {
  const entries = []

  for (const { bucket, categories } of library) {
    for (const category of categories ?? []) {
      const items = category.topics?.length ? category.topics : [category]
      for (const item of items) {
        if (!item.summary && !item.documents?.length) continue
        const topicId = `policy-${bucket.id}-${category.id}-${item.id}`
        entries.push({
          id: topicId,
          title: item.name,
          keywords: [item.name, ...aliasesFor(item.name), ...(item.covered ?? [])],
          body: [category.name, bucket.title, item.summary].join(' '),
          text: policyText(item) || `${item.name} is in the policy library under ${bucket.title}.`,
          actions: [...documentActions(item.documents), openPolicies],
          boost: 1,
        })

        // A folder of several files (the MIS policies, the PF rules) gets one
        // entry per file too, so "password policy" finds its PDF by name.
        if ((item.documents?.length ?? 0) > 1 || !item.summary) {
          for (const doc of item.documents ?? []) {
            if (!isReady(doc.href)) continue
            entries.push({
              id: `${topicId}-doc-${doc.name}`,
              title: doc.name,
              keywords: [doc.name, ...aliasesFor(doc.name)],
              body: `${item.name} ${category.name}`,
              text: `${doc.name} is in the policy library, under ${item.name}.`,
              actions: [
                { label: `Open ${doc.name}`, href: encodeURI(doc.href), kind: 'document' },
                openPolicies,
              ],
              boost: -0.5,
            })
          }
        }

        for (const readable of item.readables ?? []) {
          readable.entries.forEach((qa, index) => {
            entries.push({
              id: `${topicId}-${readable.id}-${index}`,
              title: qa.q,
              keywords: aliasesFor(item.name),
              body: `${qa.q} ${qa.q} ${item.name}`,
              text: `${qa.q}\n\n${bullets(qa.a)}`,
              actions: [{ label: `About ${item.name}`, ask: item.name }, openPolicies],
              source: item.name,
              faq: true,
            })
          })
        }
      }
    }
  }

  return entries
}

export function buildStaticEntries() {
  return [
    ...serviceEntries(),
    ...destinationEntries(),
    ...helpLinkEntries(),
    ...letterEntries(),
    ...usefulLinkEntries(),
    ...benefitEntries(),
  ]
}

export const BUCKET_IDS = benefitBuckets.map((bucket) => ({ id: bucket.id, title: bucket.title }))

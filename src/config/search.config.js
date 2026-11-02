/*
 * What the hero search can find until there is a real search service behind
 * it. Pitstop services are indexed straight from services.config; these are
 * the places on the page that are not services, with the words people are
 * likely to type for them.
 *
 * A destination is a `sectionId` (scroll there), an `href` (open it), or an
 * `action` the shell owns ('sos' opens the emergency sheet, 'helpline' the
 * top bar's Helpline menu).
 */
export const pageDestinations = [
  {
    id: 'calendar',
    label: 'Calendar & holidays',
    hint: 'Calendar',
    sectionId: 'holidays',
    keywords: ['holiday', 'holidays', 'leave', 'events', 'meeting', 'calendar'],
  },
  {
    id: 'emergency',
    label: 'Emergency contacts',
    hint: 'Helpline',
    action: 'sos',
    keywords: ['sos', 'fire', 'medical', 'dispensary', 'security', 'helpline', 'hr'],
  },
  {
    id: 'ethics',
    label: 'Ethics Helpline & POSH',
    hint: 'Helpline',
    action: 'helpline',
    keywords: ['integrity', 'ethics', 'posh', 'complaint', 'harassment'],
  },
  {
    id: 'canteen',
    label: 'Delicia canteen',
    hint: 'Support Services',
    sectionId: 'resources',
    keywords: ['canteen', 'food', 'menu', 'lunch', 'delicia'],
  },
  {
    id: 'it-request',
    label: 'Raise an IT request',
    hint: 'Support Services',
    sectionId: 'resources',
    keywords: ['it', 'laptop', 'ticket', 'support', 'intercom', 'request'],
  },
  {
    id: 'gatepass',
    label: 'Visitor gatepass',
    hint: 'Support Services',
    sectionId: 'resources',
    keywords: ['visitor', 'guest', 'gatepass', 'entry'],
  },
  {
    id: 'utsah',
    label: 'Utsah & Crèche',
    hint: 'Support Services',
    sectionId: 'resources',
    keywords: ['utsah', 'recreation', 'creche', 'childcare', 'gym'],
  },
  {
    id: 'bytes',
    label: 'Bajaj Bytes',
    hint: 'Newsletter, podcast & videos',
    sectionId: 'news',
    keywords: ['newsletter', 'podcast', 'video', 'watch', 'bytes'],
  },
  {
    id: 'csr',
    label: 'CSR',
    hint: 'Volunteer',
    sectionId: 'community',
    keywords: ['csr', 'volunteer', 'community', 'foundation'],
  },
  {
    id: 'presence',
    label: 'Bajaj Auto overview & presence',
    hint: 'About us',
    sectionId: 'about',
    keywords: ['about', 'company', 'plant', 'office', 'location', 'country', 'global', 'map'],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    hint: 'Tell us',
    sectionId: 'feedback',
    keywords: ['feedback', 'suggestion', 'improve'],
  },
]

// The chips under the search box. Each names either a Pitstop service, whose
// link it borrows, or a section to jump to.
export const popularSearches = [
  { label: 'Leave balance', serviceId: 'leave-attendance' },
  { label: 'Payslip', serviceId: 'compensation' },
  { label: 'Holiday list', sectionId: 'holidays' },
  { label: 'Canteen menu', sectionId: 'resources' },
  { label: 'Mediclaim card', serviceId: 'mediclaim' },
]

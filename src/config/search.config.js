/*
 * What the hero search can find until there is a real search service behind
 * it. Pitstop services are indexed straight from services.config; these are
 * the places on the page that are not services, with the words people are
 * likely to type for them.
 *
 * A destination is either a `sectionId` (scroll there) or an `href` (open it).
 */
export const pageDestinations = [
  {
    id: 'calendar',
    label: 'Calendar & holidays',
    hint: 'Calendar',
    sectionId: 'calendar',
    keywords: ['holiday', 'holidays', 'leave', 'events', 'meeting', 'calendar'],
  },
  {
    id: 'emergency',
    label: 'Emergency contacts',
    hint: 'Help',
    sectionId: 'emergency-contacts',
    keywords: ['sos', 'fire', 'medical', 'dispensary', 'security', 'helpline', 'hr'],
  },
  {
    id: 'ethics',
    label: 'Ethics Helpline & POSH',
    hint: 'Help',
    sectionId: 'emergency-contacts',
    keywords: ['integrity', 'ethics', 'posh', 'complaint', 'harassment'],
  },
  {
    id: 'canteen',
    label: 'Delicia canteen',
    hint: 'Workplace',
    sectionId: 'it-resources',
    keywords: ['canteen', 'food', 'menu', 'lunch', 'delicia'],
  },
  {
    id: 'it-request',
    label: 'Raise an IT request',
    hint: 'Workplace',
    sectionId: 'it-resources',
    keywords: ['it', 'laptop', 'ticket', 'support', 'intercom', 'request'],
  },
  {
    id: 'gatepass',
    label: 'Visitor gatepass',
    hint: 'Workplace',
    sectionId: 'it-resources',
    keywords: ['visitor', 'guest', 'gatepass', 'entry'],
  },
  {
    id: 'utsah',
    label: 'Utsah & Crèche',
    hint: 'Workplace',
    sectionId: 'it-resources',
    keywords: ['utsah', 'recreation', 'creche', 'childcare', 'gym'],
  },
  {
    id: 'bytes',
    label: 'Bajaj Bytes',
    hint: 'Newsletter, podcast & videos',
    sectionId: 'happening',
    keywords: ['newsletter', 'podcast', 'video', 'watch', 'bytes'],
  },
  {
    id: 'csr',
    label: 'Community & CSR',
    hint: 'Volunteer',
    sectionId: 'csr',
    keywords: ['csr', 'volunteer', 'community', 'foundation'],
  },
  {
    id: 'presence',
    label: 'Bajaj Auto overview & presence',
    hint: 'About us',
    sectionId: 'locations',
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
  { label: 'Holiday list', sectionId: 'calendar' },
  { label: 'Canteen menu', sectionId: 'it-resources' },
  { label: 'Mediclaim card', serviceId: 'mediclaim' },
]

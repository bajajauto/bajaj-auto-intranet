/*
 * Page order, top to bottom. The scroll spy walks these, so the header's
 * highlight moves down the nav in step with the page and never jumps back.
 * MainContent renders sections in this same order — move one there, move it
 * here too.
 */
export const pageSections = [
  'top',
  'self-service',
  'it-resources',
  'happening',
  'calendar',
  'emergency-contacts',
  'csr',
  'locations',
  'feedback',
]

/*
 * The header's links. Each link `covers` the sections that read as part of it —
 * the hero and Pitstop are both "Home" — and lights up while any of them is in
 * view. Bajaj Bytes has no section of its own any more; its link lands on the
 * Happening now shelf, where the latest issue is a card.
 */
export const headerNav = [
  { id: 'home', label: 'Home', sectionId: 'top', covers: ['top', 'self-service'] },
  { id: 'workplace', label: 'Workplace', sectionId: 'it-resources', covers: ['it-resources'] },
  { id: 'bytes', label: 'Bajaj Bytes', sectionId: 'happening', covers: ['happening'] },
  { id: 'calendar', label: 'Calendar', sectionId: 'calendar', covers: ['calendar'] },
  { id: 'help', label: 'Help', sectionId: 'emergency-contacts', covers: ['emergency-contacts'] },
  { id: 'csr', label: 'CSR', sectionId: 'csr', covers: ['csr'] },
  { id: 'presence', label: 'Presence', sectionId: 'locations', covers: ['locations', 'feedback'] },
]

// Footer link columns. A `sectionId` scrolls the page; a `serviceId` borrows
// that Pitstop service's link, so a URL lives in exactly one place.
export const footerColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', sectionId: 'locations' },
      { label: 'Bajaj Bytes', sectionId: 'happening' },
      { label: 'Community & CSR', sectionId: 'csr' },
    ],
  },
  {
    heading: 'People',
    links: [
      { label: 'Leave & Attendance', serviceId: 'leave-attendance' },
      { label: 'Compensation', serviceId: 'compensation' },
      { label: 'Benefits', serviceId: 'benefits' },
      { label: 'Recognition – GEM', serviceId: 'recognition-gem' },
    ],
  },
  {
    heading: 'Workplace',
    links: [
      { label: 'Utsah', sectionId: 'it-resources' },
      { label: 'Crèche', sectionId: 'it-resources' },
      { label: 'Delicia canteen', sectionId: 'it-resources' },
      { label: 'Visitor gatepass', sectionId: 'it-resources' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Emergency contacts', sectionId: 'emergency-contacts' },
      { label: 'Ethics Helpline', sectionId: 'emergency-contacts' },
      { label: 'POSH Information', sectionId: 'emergency-contacts' },
      { label: 'Support Services', sectionId: 'emergency-contacts' },
      { label: 'Feedback', sectionId: 'feedback' },
    ],
  },
]

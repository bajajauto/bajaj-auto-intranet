import navPitstop from '@/assets/icons/ocean/nav-pitstop.webp'
import navResources from '@/assets/icons/ocean/nav-resources.webp'
import navNews from '@/assets/icons/ocean/nav-news.webp'
import navCommunity from '@/assets/icons/ocean/nav-community.webp'
import navAbout from '@/assets/icons/ocean/nav-about.webp'

/*
 * Page order, top to bottom. The scroll spy walks these, so the sidebar's
 * highlight moves down in step with the page. MainContent renders sections in
 * this same order — move one there, move it here too.
 */
export const pageSections = ['top', 'pitstop', 'resources', 'community', 'news', 'about', 'feedback']

/*
 * The left rail. Each entry `covers` the sections that read as part of it and
 * lights up while any of them is in view. Log out sits apart at the foot.
 */
export const sidebarNav = [
  { id: 'pitstop', label: 'Pitstop', sectionId: 'pitstop', icon: navPitstop, covers: ['top', 'pitstop'] },
  {
    id: 'resources',
    label: 'Resources & Support',
    sectionId: 'resources',
    icon: navResources,
    covers: ['resources'],
  },
  { id: 'news', label: 'News & Bajaj Bytes', sectionId: 'news', icon: navNews, covers: ['news'] },
  {
    id: 'community',
    label: 'CSR',
    sectionId: 'community',
    icon: navCommunity,
    covers: ['community'],
  },
  { id: 'about', label: 'About Bajaj Auto', sectionId: 'about', icon: navAbout, covers: ['about'] },
]

/*
 * The top bar, left to right after the logo. An entry does one of three
 * things: `serviceId` opens that Pitstop service's link (so a URL lives in one
 * place), `sectionId` scrolls to a section, `action` opens something the
 * shell owns (a modal, or the Helpline menu).
 */
export const topNav = [
  { id: 'helpline', label: 'Helpline', action: 'helpline' },
  { id: 'attendance', label: 'Attendance', serviceId: 'leave-attendance' },
  { id: 'payslip', label: 'Payslip', serviceId: 'compensation' },
  { id: 'travel', label: 'Travel', serviceId: 'travel' },
  { id: 'policies', label: 'Policies', action: 'policies' },
  { id: 'letters', label: 'Letters', action: 'letters' },
  { id: 'support', label: 'Support Services', sectionId: 'resources' },
  { id: 'it-request', label: 'IT Request', serviceId: 'it-summit' },
]

/*
 * The Helpline menu. Ethics and POSH borrow their links from helpLinks in
 * contacts.config; SOS opens the emergency sheet rather than a page.
 */
export const helplineMenu = [
  { id: 'ethics', label: 'Integrity Matters – Ethics Helpline', helpLinkId: 'ethics' },
  { id: 'posh', label: 'POSH Information', helpLinkId: 'posh' },
  { id: 'conduct', label: 'Code of Conduct', href: '#' },
  { id: 'sos', label: 'SOS – Emergency contacts', action: 'sos' },
]

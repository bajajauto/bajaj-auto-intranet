/*
 * Sidebar order mirrors the page. Groups run in the same order their sections
 * appear in MainContent, so scrolling the page walks the rail top to bottom and
 * the scroll-spy highlight never jumps backwards. MainContent's SECTION_IDS is
 * the same sequence — if a section moves there, move its group here too.
 *
 * Inside Pitstop, items run in the grid's own order: row by row, and within a
 * row most-used on the left first. That mirrors ServiceGrid's pitstopRows.
 */
export const navGroups = [
  {
    id: 'employee-services',
    label: 'Pitstop',
    description: 'Self-service hub',
    icon: 'PitstopIcon',
    imageIcon: 'pitstopSidebar',
    colorKey: 'blue',
    collapsible: true,
    items: [
      // grid row 1 — work and time
      { id: 'team-directory', label: 'Team Directory', icon: 'Users', sectionId: 'self-service' },
      {
        id: 'leave-attendance',
        label: 'Leave / Attendance',
        icon: 'CalendarCheck',
        sectionId: 'self-service',
      },
      {
        id: 'holiday-calendar',
        label: 'Holiday Calendar',
        icon: 'CalendarDays',
        sectionId: 'self-service',
      },
      { id: 'travel', label: 'Travel', icon: 'Plane', sectionId: 'self-service' },
      { id: 'policies', label: 'Policies', icon: 'ClipboardCheck', sectionId: 'self-service' },

      // grid row 2 — pay, benefits and health
      {
        id: 'compensation',
        label: 'Compensation',
        icon: 'IndianRupee',
        sectionId: 'self-service',
      },
      { id: 'benefits', label: 'Benefits', icon: 'Gift', sectionId: 'self-service' },
      { id: 'documents', label: 'Documents', icon: 'FolderOpen', sectionId: 'self-service' },
      { id: 'mediclaim', label: 'Mediclaim Card', icon: 'Shield', sectionId: 'self-service' },
      {
        id: 'health-wellness',
        label: 'Health & Wellness',
        icon: 'HeartPulse',
        sectionId: 'self-service',
      },

      // grid row 3 — growth and recognition
      {
        id: 'recognition-gem',
        label: 'Recognition - GEM',
        icon: 'Award',
        sectionId: 'self-service',
      },
      { id: 'idea-hub', label: 'Idea Hub', icon: 'Lightbulb', sectionId: 'self-service' },
      {
        id: 'bolt-learning',
        label: 'BOLT - Start Learning',
        icon: 'GraduationCap',
        sectionId: 'self-service',
      },
      {
        id: 'performance-management',
        label: 'Performance Management',
        icon: 'Target',
        sectionId: 'self-service',
      },
      { id: 'it-summit', label: 'IT Summit', icon: 'MonitorSmartphone', sectionId: 'self-service' },

      // No tile in the grid — services.config has no form-16 entry, so this one
      // has no position to mirror and sits last rather than breaking a row run.
      { id: 'form-16', label: 'Forms', icon: 'FileText', sectionId: 'self-service' },
    ],
  },
  {
    id: 'it-resources-group',
    label: 'Resources & Support',
    description: 'IT & support desk',
    icon: 'ResourcesSupportIcon',
    imageIcon: 'resourcesSidebar',
    colorKey: 'teal',
    hideChildren: true,
    items: [
      {
        id: 'telecom-contacts',
        label: 'Resources and Support Services',
        icon: 'Phone',
        sectionId: 'it-resources',
      },
    ],
  },
  {
    id: 'locations-group',
    label: 'Bajaj Auto Presence',
    description: 'Global locations',
    icon: 'PresenceIcon',
    imageIcon: 'presenceSidebar',
    colorKey: 'orange',
    hideChildren: true,
    items: [
      { id: 'locations', label: 'Bajaj Auto Presence', icon: 'Map', sectionId: 'locations' },
    ],
  },
  {
    id: 'company-news-group',
    label: 'News and Announcement',
    description: 'Announcements',
    icon: 'NewsAnnouncementIcon',
    imageIcon: 'newsSidebar',
    colorKey: 'violet',
    hideChildren: true,
    items: [
      {
        id: 'company-news',
        label: 'Company News',
        icon: 'Newspaper',
        sectionId: 'company-news',
      },
    ],
  },
  {
    id: 'bajaj-bytes-group',
    label: 'Bajaj Bytes',
    description: 'News, podcast & watch',
    icon: 'BajajBytesIcon',
    imageIcon: 'bajajBytesSidebar',
    colorKey: 'violet',
    hideChildren: true,
    items: [
      {
        id: 'bajaj-bytes',
        label: 'Bajaj Bytes',
        icon: 'BookOpen',
        sectionId: 'bajaj-bytes',
      },
    ],
  },
  {
    id: 'company-overview-group',
    label: 'Company Overview',
    description: 'About Bajaj Auto',
    icon: 'CompanyOverviewIcon',
    imageIcon: 'companySidebar',
    colorKey: 'violet',
    hideChildren: true,
    items: [
      {
        id: 'company-overview',
        label: 'Company Overview',
        icon: 'Building2',
        sectionId: 'company-overview',
      },
    ],
  },
  {
    id: 'community-csr',
    label: 'CSR',
    description: 'Sustainability & impact',
    icon: 'CsrIcon',
    imageIcon: 'csrSidebar',
    colorKey: 'emerald',
    hideChildren: true,
    items: [
      {
        id: 'csr',
        label: 'Community & CSR',
        icon: 'HeartHandshake',
        sectionId: 'csr',
      },
    ],
  },
  {
    id: 'emergency',
    label: 'Emergency Contacts',
    description: 'Helpline contacts',
    icon: 'EmergencyContactsIcon',
    imageIcon: 'emergencySidebar',
    colorKey: 'rose',
    hideChildren: true,
    items: [
      {
        id: 'emergency-contacts',
        label: 'Emergency Contacts',
        icon: 'PhoneCall',
        sectionId: 'emergency-contacts',
      },
    ],
  },
  {
    id: 'support-engagement',
    label: 'Feedback',
    description: 'Share your thoughts',
    icon: 'FeedbackIcon',
    imageIcon: 'feedbackSidebar',
    colorKey: 'blue',
    hideChildren: true,
    items: [
      {
        id: 'feedback',
        label: 'Feedback / Raise Request',
        icon: 'MessageSquare',
        sectionId: 'feedback',
      },
      { id: 'help-faqs', label: 'Help / FAQs', icon: 'HelpCircle', sectionId: 'feedback' },
    ],
  },
]

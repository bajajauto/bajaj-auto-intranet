export const navGroups = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    items: [
      {
        id: 'dashboard-home',
        label: 'Dashboard',
        icon: 'LayoutDashboard',
        sectionId: 'dashboard',
      },
    ],
  },
  {
    id: 'employee-services',
    label: 'Employee Services',
    items: [
      { id: 'team-directory', label: 'Team Directory', icon: 'Users', sectionId: 'self-service' },
      { id: 'payslip', label: 'Payslip', icon: 'Receipt', sectionId: 'self-service' },
      { id: 'benefits', label: 'Benefits', icon: 'Gift', sectionId: 'self-service' },
      { id: 'travel', label: 'Travel', icon: 'Plane', sectionId: 'self-service' },
      {
        id: 'leave-attendance',
        label: 'Leave / Attendance',
        icon: 'Calendar',
        sectionId: 'self-service',
      },
      {
        id: 'compensation',
        label: 'Compensation',
        icon: 'IndianRupee',
        sectionId: 'self-service',
      },
      {
        id: 'recognition-gem',
        label: 'Recognition – GEM',
        icon: 'Award',
        sectionId: 'self-service',
      },
      {
        id: 'bolt-learning',
        label: 'BOLT – Start Learning',
        icon: 'GraduationCap',
        sectionId: 'self-service',
      },
      { id: 'idea-hub', label: 'Idea Hub', icon: 'Lightbulb', sectionId: 'self-service' },
      { id: 'app-market', label: 'App Market', icon: 'AppWindow', sectionId: 'self-service' },
      {
        id: 'holiday-calendar',
        label: 'Holiday Calendar',
        icon: 'CalendarDays',
        sectionId: 'self-service',
      },
      { id: 'documents', label: 'Documents', icon: 'FolderOpen', sectionId: 'self-service' },
    ],
  },
  {
    id: 'company-resources',
    label: 'Company Resources',
    items: [
      {
        id: 'news-updates',
        label: 'News / Updates',
        icon: 'Newspaper',
        sectionId: 'company-news',
      },
      { id: 'bajaj-ev-map', label: 'Bajaj EV Map', icon: 'Map', sectionId: 'locations' },
      {
        id: 'emergency-contacts',
        label: 'Emergency Contacts',
        icon: 'PhoneCall',
        sectionId: 'emergency-contacts',
      },
      {
        id: 'company-overview',
        label: 'Company Overview',
        icon: 'Building2',
        sectionId: 'company-overview',
      },
    ],
  },
  {
    id: 'support-engagement',
    label: 'Support & Engagement',
    items: [
      {
        id: 'feedback',
        label: 'Feedback / Raise Request',
        icon: 'MessageSquare',
        sectionId: 'feedback',
      },
      {
        id: 'telecom-contacts',
        label: 'Telecom Contacts',
        icon: 'Phone',
        sectionId: 'it-resources',
      },
      { id: 'help-faqs', label: 'Help / FAQs', icon: 'HelpCircle', sectionId: 'feedback' },
      { id: 'chat-bot', label: 'Chat with Bot', icon: 'Bot', sectionId: 'feedback', enabled: false },
    ],
  },
]

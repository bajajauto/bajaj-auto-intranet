export const navGroups = [
  {
    id: 'employee-services',
    label: 'Employee Self-Service',
    icon: 'UserCheck',
    collapsible: true,
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
    icon: 'Newspaper',
    collapsible: true,
    items: [
      {
        id: 'bajaj-bytes',
        label: 'Bajaj Bytes',
        icon: 'BookOpen',
        sectionId: 'bajaj-bytes',
      },
      {
        id: 'company-overview',
        label: 'Company Overview',
        icon: 'Building2',
        sectionId: 'company-overview',
      },
      {
        id: 'company-news',
        label: 'Company News',
        icon: 'Newspaper',
        sectionId: 'company-news',
      },
      { id: 'locations', label: 'Bajaj EV Map', icon: 'Map', sectionId: 'locations' },
    ],
  },
  {
    id: 'it-resources-group',
    label: 'IT Resources',
    icon: 'Monitor',
    hideChildren: true,
    items: [
      {
        id: 'telecom-contacts',
        label: 'Telecom Contacts',
        icon: 'Phone',
        sectionId: 'it-resources',
      },
    ],
  },
  {
    id: 'support-engagement',
    label: 'Support & Engagement',
    icon: 'MessageSquare',
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
  {
    id: 'emergency',
    label: 'Emergency Contacts',
    icon: 'PhoneCall',
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
]

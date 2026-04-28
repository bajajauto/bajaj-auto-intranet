export const notificationsMock = {
  getAll() {
    return [
      {
        id: '1',
        title: 'Q1 Appraisal Cycle Open',
        timestamp: '2026-04-28T09:00:00',
        priority: 'Urgent',
        icon: 'Bell',
      },
      {
        id: '2',
        title: 'New Policy: Work From Home Guidelines',
        timestamp: '2026-04-27T14:30:00',
        priority: 'New',
        icon: 'FileText',
      },
      {
        id: '3',
        title: 'Town Hall – May 5, 2026',
        timestamp: '2026-04-26T11:00:00',
        priority: 'New',
        icon: 'Calendar',
      },
      {
        id: '4',
        title: 'IT Maintenance: Saturday 10pm–2am',
        timestamp: '2026-04-25T08:00:00',
        priority: 'New',
        icon: 'AlertCircle',
      },
    ]
  },
}

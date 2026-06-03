export const noticesMock = {
  getAll() {
    return [
      {
        id: 'notice-1',
        title: 'Scheduled cafeteria maintenance',
        body: 'Cafeteria counters will operate with limited service from 3:00 PM to 5:00 PM today.',
        date: '2026-06-02',
        category: 'Facilities',
        priority: 'Notice',
      },
      {
        id: 'notice-2',
        title: 'Visitor entry process update',
        body: 'All visitor gatepass requests must include host approval before arrival at security.',
        date: '2026-06-01',
        category: 'Admin',
        priority: 'Important',
      },
      {
        id: 'notice-3',
        title: 'Parking bay reassignment',
        body: 'Two-wheeler parking near Gate 2 has moved to the marked east-side bay until further notice.',
        date: '2026-05-31',
        category: 'Campus',
        priority: 'Notice',
      },
    ]
  },
}

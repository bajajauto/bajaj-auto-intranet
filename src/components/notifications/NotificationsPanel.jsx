import { notificationService } from '@/services/notificationService'
import { calendarService } from '@/services/calendarService'
import { CalendarDays } from 'lucide-react'
import NotificationCard from './NotificationCard'

function formatMeetingDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

export default function NotificationsPanel() {
  const notifications = notificationService.getAll()
  const meetings = calendarService
    .getEvents()
    .filter((event) => event.type === 'meeting')

  return (
    <div className="site-surface rounded-card border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
        <span className="text-xs font-medium text-white bg-brand-primary px-2 py-0.5 rounded-full">
          {notifications.length}
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {notifications.map((n) => (
          <NotificationCard key={n.id} {...n} />
        ))}
      </div>
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Meetings
          </h4>
          <CalendarDays size={14} className="text-brand-primary" />
        </div>
        <div className="space-y-2">
          {meetings.map((meeting) => (
            <button
              key={`${meeting.date}-${meeting.label}`}
              className="w-full rounded-card bg-bg-alt px-3 py-2 text-left transition-colors hover:bg-brand-light focus-ring"
              aria-label={meeting.label}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-medium text-text-primary">{meeting.label}</p>
                <span className="flex-shrink-0 text-xs font-semibold text-brand-primary">
                  {formatMeetingDate(meeting.date)}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-text-secondary">
                {meeting.time} &middot; {meeting.location}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 py-2.5 border-t border-gray-100">
        <button className="text-xs font-medium text-brand-primary hover:underline focus-ring rounded">
          View All Notifications
        </button>
      </div>
    </div>
  )
}

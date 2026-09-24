import { CalendarDays } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import { useMeetings } from '@/hooks/useCalendarEvents'
import Skeleton from '@/components/shared/Skeleton'
import QueryBoundary from '@/components/shared/QueryBoundary'
import NotificationCard from './NotificationCard'

function formatMeetingDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

function RowsSkeleton({ count = 3, className = 'divide-y divide-gray-50' }) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="space-y-2 p-3">
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-2.5 w-1/3" />
        </div>
      ))}
    </div>
  )
}

export default function NotificationsPanel() {
  const notificationsQuery = useNotifications()
  const meetingsQuery = useMeetings()
  const notifications = notificationsQuery.data

  return (
    <div className="site-surface rounded-card border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
        {!notificationsQuery.isPending && !notificationsQuery.isError && (
          <span className="text-xs font-medium text-white bg-brand-primary px-2 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </div>
      <div className="divide-y divide-gray-50">
        <QueryBoundary
          query={notificationsQuery}
          skeleton={<RowsSkeleton />}
          label="notifications"
          emptyMessage="You're all caught up."
          compact
        >
          {(items) => items.map((n) => <NotificationCard key={n.id} {...n} />)}
        </QueryBoundary>
      </div>
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Meetings
          </h4>
          <CalendarDays size={14} className="text-brand-primary" />
        </div>
        <QueryBoundary
          query={meetingsQuery}
          skeleton={<RowsSkeleton count={2} className="space-y-2" />}
          label="your meetings"
          emptyMessage="No meetings today."
          compact
        >
          {(meetings) => (
            <div className="space-y-2">
              {meetings.map((meeting) => (
                <button
                  key={`${meeting.date}-${meeting.label}`}
                  className="w-full rounded-card bg-bg-alt px-3 py-2 text-left transition-colors hover:bg-brand-light focus-ring"
                  aria-label={meeting.label}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {meeting.label}
                    </p>
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
          )}
        </QueryBoundary>
      </div>
      <div className="px-4 py-2.5 border-t border-gray-100">
        <button className="text-xs font-medium text-brand-primary hover:underline focus-ring rounded">
          View All Notifications
        </button>
      </div>
    </div>
  )
}

import { notificationService } from '@/services/notificationService'
import NotificationCard from './NotificationCard'

export default function NotificationsPanel() {
  const notifications = notificationService.getAll()

  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100">
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
      <div className="px-4 py-2.5 border-t border-gray-100">
        <button className="text-xs font-medium text-brand-primary hover:underline focus-ring rounded">
          View All Notifications
        </button>
      </div>
    </div>
  )
}

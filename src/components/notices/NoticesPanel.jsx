import { FileText } from 'lucide-react'
import { noticeService } from '@/services/noticeService'

const PRIORITY_STYLES = {
  Important: 'bg-red-100 text-red-700',
  Notice: 'bg-brand-light text-brand-primary',
}

function formatNoticeDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

export default function NoticesPanel() {
  const notices = noticeService.getAll()

  return (
    <div className="site-surface rounded-card border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-brand-primary" />
          <h3 className="text-sm font-semibold text-text-primary">Notices</h3>
        </div>
        <span className="text-xs font-medium text-white bg-brand-primary px-2 py-0.5 rounded-full">
          {notices.length}
        </span>
      </div>

      <div className="max-h-[22rem] divide-y divide-gray-50 overflow-y-auto overscroll-contain">
        {notices.map((notice) => (
          <button
            key={notice.id}
            type="button"
            className="w-full p-3 text-left transition-colors hover:bg-bg-alt focus-ring"
            aria-label={notice.title}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-primary">
                <FileText size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-text-primary">{notice.title}</p>
                  <span
                    className={`flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      PRIORITY_STYLES[notice.priority] ?? PRIORITY_STYLES.Notice
                    }`}
                  >
                    {notice.priority}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">{notice.body}</p>
                <p className="mt-2 text-[11px] font-medium text-brand-primary">
                  {notice.category} &middot; {formatNoticeDate(notice.date)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="px-4 py-2.5 border-t border-gray-100">
        <button className="text-xs font-medium text-brand-primary hover:underline focus-ring rounded">
          View All Notices
        </button>
      </div>
    </div>
  )
}

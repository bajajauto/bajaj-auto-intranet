import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

const STYLES = {
  success: { bg: 'bg-green-50 border-green-200', icon: CheckCircle, iconColor: 'text-green-600', text: 'text-green-800' },
  error: { bg: 'bg-red-50 border-red-200', icon: XCircle, iconColor: 'text-red-600', text: 'text-red-800' },
}

export default function Toast({ message, type = 'success', duration = 3000, onDismiss }) {
  const [visible, setVisible] = useState(true)
  const style = STYLES[type] ?? STYLES.success
  const Icon = style.icon

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-card border shadow-modal max-w-sm ${style.bg}`}
    >
      <Icon size={18} className={`flex-shrink-0 ${style.iconColor}`} />
      <p className={`text-sm font-medium flex-1 ${style.text}`}>{message}</p>
      <button
        onClick={() => { setVisible(false); onDismiss?.() }}
        className="p-0.5 rounded hover:bg-black/5 focus-ring flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X size={14} className={style.iconColor} />
      </button>
    </div>
  )
}

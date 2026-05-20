import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function AccordionGroup({ children, allowMultiple = false }) {
  const [openIds, setOpenIds] = useState([])

  function toggle(id) {
    if (allowMultiple) {
      setOpenIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
    } else {
      setOpenIds((prev) => prev.includes(id) ? [] : [id])
    }
  }

  return (
    <div className="space-y-2">
      {children({ openIds, toggle })}
    </div>
  )
}

export function AccordionItem({ id, title, children, openIds, onToggle }) {
  const isOpen = openIds.includes(id)

  return (
    <div className="site-surface rounded-card border overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-bg-alt transition-colors focus-ring text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-text-primary text-sm">{title}</span>
        <ChevronDown
          size={18}
          className={`text-text-secondary transition-transform duration-accordion ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-accordion ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-50 text-sm text-text-secondary">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

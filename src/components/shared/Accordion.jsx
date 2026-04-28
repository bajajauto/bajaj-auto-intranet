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
    <div className="rounded-card border border-gray-100 shadow-card overflow-hidden">
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
        className={`overflow-hidden transition-all duration-accordion ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-50 text-sm text-text-secondary">
          {children}
        </div>
      </div>
    </div>
  )
}

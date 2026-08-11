import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronRight, Dot } from 'lucide-react'
import { benefitBuckets } from '@/config/benefits.config'
import { iconMap } from '@/components/shared/iconMap'
import { usePolicyLibrary } from '@/hooks/usePolicyLibrary'
import PolicyLibrary from './policies/PolicyLibrary'

const MODAL_TRANSITION_MS = 400

export default function PoliciesBenefitsModal({ onClose }) {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState(benefitBuckets[0].id)
  const [openCategories, setOpenCategories] = useState([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.getElementById('root')?.classList.add('modal-open')
    setVisible(true)

    function handleKeyDown(e) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.getElementById('root')?.classList.remove('modal-open')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, MODAL_TRANSITION_MS)
  }

  const selectBucket = (id) => {
    setActiveId(id)
    setOpenCategories([]) // collapse open categories when switching buckets
  }

  const toggleCategory = (name) => {
    setOpenCategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    )
  }

  const activeBucket = benefitBuckets.find((b) => b.id === activeId)

  // A bucket whose documents have been collected shows the real library —
  // category → topic → files, mirroring the folder they arrived in. The rest
  // still show the benefit list until their documents land.
  const library = usePolicyLibrary(activeId)

  const totalBenefits = activeBucket.categories.reduce((sum, c) => sum + c.items.length, 0)
  const totalDocuments = library
    ? library.reduce(
        (sum, category) =>
          sum +
          (category.topics
            ? category.topics.reduce((n, topic) => n + (topic.documents?.length ?? 0), 0)
            : (category.documents?.length ?? 0)),
        0,
      )
    : 0

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
        visible ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
      }`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-label="Policies and benefits"
    >
      <div
        className={`relative flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-out sm:flex-row ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left rail: bucket list ─────────────────────────── */}
        <aside className="flex flex-shrink-0 flex-col border-b border-gray-100 bg-bg-alt sm:w-72 sm:border-b-0 sm:border-r">
          <div className="bg-gradient-to-br from-brand-primary to-brand-dark px-5 py-4 text-white">
            <h2 className="text-lg font-bold leading-tight">Policies &amp; Benefits</h2>
            <p className="mt-0.5 text-xs text-white/80">Explore every benefit &amp; policy at Bajaj Auto</p>
          </div>

          {/* Mobile: horizontal scroll chips · Desktop: vertical list */}
          <nav className="flex gap-2 overflow-x-auto p-3 sm:flex-col sm:gap-1 sm:overflow-y-auto">
            {benefitBuckets.map((bucket) => {
              const Icon = iconMap[bucket.icon] ?? iconMap.FolderOpen
              const isActive = bucket.id === activeId
              return (
                <button
                  key={bucket.id}
                  type="button"
                  onClick={() => selectBucket(bucket.id)}
                  aria-current={isActive}
                  className={`group flex flex-shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 focus-ring sm:w-full ${
                    isActive
                      ? 'bg-white shadow-sm ring-1 ring-brand-primary/20'
                      : 'hover:bg-white/70'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${bucket.gradient} shadow-sm transition-transform duration-200 group-hover:scale-110`}
                  >
                    <Icon size={18} strokeWidth={1.75} className="text-white" />
                  </span>
                  <span
                    className={`text-[13px] font-semibold leading-tight ${
                      isActive ? 'text-brand-primary' : 'text-text-primary'
                    }`}
                  >
                    {bucket.title}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* ── Right panel: categories → benefit items ────────── */}
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:px-7 sm:py-5">
            <div className="min-w-0">
              <h3 className="text-xl font-bold leading-tight text-text-primary">{activeBucket.title}</h3>
              <p className="mt-1 text-xs text-text-secondary">
                {library
                  ? `${library.length} categories · ${totalDocuments} documents`
                  : `${activeBucket.categories.length} categories · ${totalBenefits} benefits`}
              </p>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="flex-shrink-0 rounded-lg p-2 text-text-secondary transition-all duration-200 hover:bg-bg-alt hover:text-text-primary focus-ring"
            >
              <X size={20} />
            </button>
          </header>

          <div key={activeBucket.id} className="flex-1 space-y-2.5 overflow-y-auto px-5 py-5 sm:px-7">
            {library && <PolicyLibrary categories={library} />}

            {!library && activeBucket.categories.map((category, idx) => {
              const isOpen = openCategories.includes(category.name)
              return (
                <div
                  key={category.name}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.name)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-200 focus-ring ${
                      isOpen ? 'bg-brand-light/50' : 'hover:bg-bg-alt'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <ChevronRight
                        size={16}
                        className={`flex-shrink-0 text-brand-primary transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      />
                      <span className="text-sm font-semibold text-text-primary">{category.name}</span>
                    </span>
                    <span className="flex-shrink-0 rounded-full bg-brand-light px-2 py-0.5 text-[11px] font-semibold text-brand-primary">
                      {category.items.length}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <ul className="space-y-1 border-t border-gray-50 px-3 py-3">
                        {category.items.map((item) => (
                          <li
                            key={item}
                            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors duration-150 hover:bg-brand-light/40 hover:text-brand-primary"
                          >
                            <Dot size={18} className="flex-shrink-0 text-brand-primary" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>,
    document.getElementById('modal-root'),
  )
}

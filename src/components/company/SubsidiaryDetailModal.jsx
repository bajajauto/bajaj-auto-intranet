import { useEffect, useState } from 'react'
import { X, Users, TrendingUp, Zap } from 'lucide-react'

export default function SubsidiaryDetailModal({ subsidiary, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Lock body scroll so the page doesn't jump behind the modal
    document.body.style.overflow = 'hidden'
    setVisible(true)
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 400)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-500 ${
        visible ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-out ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-primary to-brand-dark px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl backdrop-blur-sm border border-white/30 flex-shrink-0">
                {subsidiary.code[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold leading-tight">{subsidiary.fullName}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <Users size={12} />
                    <span>XX,XXX employees</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <TrendingUp size={12} />
                    <span>{subsidiary.segments.length} segments</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90 flex-shrink-0"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Body — two-column, no scrolling needed */}
        <div className="grid grid-cols-2 divide-x divide-gray-100">

          {/* Left column: About + Strategic Focus */}
          <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: '80ms' }}>
            {/* About */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2">About</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{subsidiary.description}</p>
            </section>

            {/* Strategic Focus */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">Strategic Focus</h3>
              <div className="space-y-2">
                {subsidiary.keyFocus.map((focus, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-2.5 p-2.5 rounded-lg bg-brand-light/30 border border-brand-light hover:bg-brand-light hover:border-brand-primary transition-all duration-300 cursor-default animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${200 + idx * 50}ms` }}
                  >
                    <Zap
                      size={14}
                      className="text-brand-primary flex-shrink-0 mt-0.5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-200"
                    />
                    <p className="text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-200 leading-relaxed">
                      {focus}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: Business Segments */}
          <div className="p-6 animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: '140ms' }}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">Business Segments</h3>
            <div className="space-y-2">
              {subsidiary.segments.map((segment, idx) => (
                <div
                  key={segment.id}
                  className="group flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-brand-primary hover:bg-brand-light/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${180 + idx * 70}ms` }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300 inline-block">
                    {segment.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors duration-200">
                      {segment.name}
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5">{segment.focus}</p>
                    {segment.highlights && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {segment.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary group-hover:bg-brand-light group-hover:text-brand-primary transition-all duration-200"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

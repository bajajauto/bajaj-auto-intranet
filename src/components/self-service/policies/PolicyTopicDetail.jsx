import { useState } from 'react'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import PolicyDocumentRow from './PolicyDocumentRow'

/*
 * Some of the source documents are prose rather than policy — the DTP's FAQ
 * sheet and its list of frequently missed points. Those read far better opened
 * here than downloaded as a .docx that a browser will not render, so their
 * content is rendered inline; the original file still sits in the document list
 * above for anyone who wants to forward it on.
 */
function ReadableSection({ readable }) {
  const [openIndex, setOpenIndex] = useState(null)
  const Icon = iconMap[readable.icon] ?? iconMap.HelpCircle
  const isNumbered = readable.kind === 'points'

  return (
    <section className="rounded-xl border border-gray-100 bg-white">
      <header className="flex items-center gap-2.5 border-b border-gray-50 px-4 py-3">
        <Icon size={16} className="flex-shrink-0 text-brand-primary" />
        <h5 className="text-sm font-semibold text-text-primary">{readable.title}</h5>
        <span className="ml-auto rounded-full bg-brand-light px-2 py-0.5 text-[11px] font-semibold text-brand-primary">
          {readable.entries.length}
        </span>
      </header>

      <ul className="divide-y divide-gray-50">
        {readable.entries.map((entry, idx) => {
          const isOpen = openIndex === idx
          return (
            <li key={entry.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className={`flex w-full items-start gap-2.5 px-4 py-3 text-left transition-colors duration-200 focus-ring ${
                  isOpen ? 'bg-brand-light/40' : 'hover:bg-bg-alt'
                }`}
              >
                {isNumbered ? (
                  <span className="mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-[11px] font-bold text-brand-primary">
                    {idx + 1}
                  </span>
                ) : (
                  <ChevronRight
                    size={15}
                    className={`mt-0.5 flex-shrink-0 text-brand-primary transition-transform duration-200 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                )}
                <span className="text-[13px] font-medium leading-snug text-text-primary">
                  {entry.q}
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="space-y-1.5 px-4 pb-3.5 pl-11">
                    {entry.a.map((line) => (
                      <p key={line} className="text-[13px] leading-relaxed text-text-secondary">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function PolicyTopicDetail({ category, topic, onBack }) {
  const Icon = iconMap[topic.icon] ?? iconMap.FileText

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <button
        type="button"
        onClick={onBack}
        className="group flex items-center gap-1.5 rounded-lg py-1 text-[12px] font-semibold text-text-secondary transition-colors hover:text-brand-primary focus-ring"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        {category.name}
      </button>

      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark shadow-sm">
          <Icon size={20} strokeWidth={1.75} className="text-white" />
        </span>
        <div className="min-w-0">
          <h4 className="text-lg font-bold leading-tight text-text-primary">{topic.name}</h4>
          {topic.subtitle && (
            <p className="mt-0.5 text-[13px] font-medium text-brand-primary">{topic.subtitle}</p>
          )}
        </div>
      </div>

      {topic.summary && (
        <p className="text-[13px] leading-relaxed text-text-secondary">{topic.summary}</p>
      )}

      {topic.covered?.length > 0 && (
        <section>
          <h5 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
            What is covered
          </h5>
          <ul className="flex flex-wrap gap-1.5">
            {topic.covered.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-full bg-brand-light/70 px-2.5 py-1 text-[12px] font-medium text-brand-primary"
              >
                <Check size={12} strokeWidth={2.5} className="flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {topic.documents?.length > 0 && (
        <section>
          <h5 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
            Documents · {topic.documents.length}
          </h5>
          <ul className="space-y-1.5">
            {topic.documents.map((doc) => (
              <PolicyDocumentRow key={doc.href} document={doc} />
            ))}
          </ul>
        </section>
      )}

      {topic.readables?.length > 0 && (
        <div className="space-y-3">
          {topic.readables.map((readable) => (
            <ReadableSection key={readable.id} readable={readable} />
          ))}
        </div>
      )}
    </div>
  )
}

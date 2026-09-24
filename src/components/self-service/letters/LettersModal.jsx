/*
 * Documents & Forms — the hub's replacement for the Jarvis Teams bot.
 *
 * The bot's four menu items become four tabs. Within Letters, the bot's
 * two-step flow (pick a type, then fill it) is kept as pick → request →
 * preview, because the fields genuinely depend on the type and showing all of
 * them at once would put passport and vehicle-purchase questions in front of
 * someone who wants an address proof.
 *
 * Follows the modal shape used by PoliciesBenefitsModal — portal into
 * #modal-root, body scroll locked, `modal-open` on #root, Escape to close, and
 * a mount transition rather than an instant appear.
 */

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, Check, Download, ExternalLink, FileText, Printer, X } from 'lucide-react'
import {
  downloadableForms,
  generatedForms,
  letterTypes,
  usefulLinks,
} from '@/config/letters.config'
import { documentForms } from '@/config/documents.config'
import Skeleton from '@/components/shared/Skeleton'
import ErrorState from '@/components/shared/ErrorState'
import { iconMap } from '@/components/shared/iconMap'
import { useEmployeeLetters } from '@/hooks/useEmployeeLetters'
import LetterRequestForm from './LetterRequestForm'
import LetterPreview, { Form60Preview } from './LetterPreview'

const MODAL_TRANSITION_MS = 400

const tabs = [
  { id: 'letters', label: 'Employee Letters' },
  { id: 'forms', label: 'Forms' },
  { id: 'links', label: 'Useful Links' },
]

/* ── Picker card, shared by letters and Form 60 ────────────── */
function PickerCard({ item, onSelect }) {
  const Icon = iconMap[item.icon] ?? FileText
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      // The label lives in a nested span alongside the description, so the
      // button's own name has to be stated — without it the accessibility tree
      // reports five unnamed buttons.
      aria-label={item.label}
      className="group flex w-full items-start gap-3 rounded-xl border border-gray-100 bg-bg-main px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-card focus-ring"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-dark text-white shadow-sm">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-text-primary group-hover:text-brand-primary">
          {item.label}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
          {item.description}
        </span>
      </span>
    </button>
  )
}

/* ── Generated-document view ───────────────────────────────── */
function GeneratedView({ document: doc, isForm, onBack, onStartOver }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-green-600/20 bg-green-50 px-4 py-3 dark:bg-green-900/20">
        <span className="flex items-center gap-2 text-sm font-semibold text-green-800 dark:text-green-300">
          <Check size={16} strokeWidth={2.5} />
          Your document is ready
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-btn border border-gray-200 bg-bg-main px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors duration-200 hover:border-brand-primary/40 hover:text-brand-primary focus-ring"
          >
            <Printer size={14} />
            Print / Save as PDF
          </button>
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex items-center gap-1.5 rounded-btn border border-gray-200 bg-bg-main px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors duration-200 hover:border-brand-primary/40 hover:text-brand-primary focus-ring"
          >
            Generate another
          </button>
        </div>
      </div>

      {/*
        Phase 1 has no PDF service, so the letter is rendered as a real page and
        handed to the browser's print pipeline. That produces a correct A4 PDF
        today and is the piece Phase 2 replaces with a server-rendered file.
      */}
      <div className="rounded-card bg-bg-alt p-3 sm:p-5">
        {isForm ? <Form60Preview document={doc} /> : <LetterPreview document={doc} />}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline focus-ring"
      >
        <ArrowLeft size={15} />
        Back to the form
      </button>
    </div>
  )
}

/* ── Letters tab ───────────────────────────────────────────── */
function LettersTab({ employee, entity, generate }) {
  const [selected, setSelected] = useState(null)
  const [document, setDocument] = useState(null)

  if (document) {
    return (
      <GeneratedView
        document={document}
        onBack={() => setDocument(null)}
        onStartOver={() => {
          setDocument(null)
          setSelected(null)
        }}
      />
    )
  }

  if (selected) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline focus-ring"
        >
          <ArrowLeft size={15} />
          All letters
        </button>
        <LetterRequestForm
          letterType={selected}
          employee={employee}
          entity={entity}
          onGenerate={async (input) => setDocument(await generate(selected.id, input))}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      <p className="text-sm text-text-secondary">
        Pick the letter you need. Your employment details are filled in from your record — you only
        supply what the letter is for.
      </p>
      {letterTypes.map((type) => (
        <PickerCard key={type.id} item={type} onSelect={setSelected} />
      ))}
    </div>
  )
}

/* ── Forms tab ─────────────────────────────────────────────── */
function FormsTab({ employee, entity, signatories, generateForm }) {
  const [selected, setSelected] = useState(null)
  const [document, setDocument] = useState(null)

  if (document) {
    return (
      <GeneratedView
        document={document}
        isForm
        onBack={() => setDocument(null)}
        onStartOver={() => {
          setDocument(null)
          setSelected(null)
        }}
      />
    )
  }

  if (selected) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline focus-ring"
        >
          <ArrowLeft size={15} />
          All forms
        </button>
        <LetterRequestForm
          letterType={selected}
          employee={employee}
          entity={entity}
          signatories={signatories}
          declaration={selected.declaration}
          submitLabel={`Generate ${selected.label}`}
          onGenerate={async (input) => setDocument(await generateForm(selected.id, input))}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="space-y-2.5">
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-secondary">
          Generated for you
        </h3>
        {generatedForms.map((form) => (
          <PickerCard key={form.id} item={form} onSelect={setSelected} />
        ))}
      </section>

      <section className="space-y-2.5">
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-secondary">
          Blank forms to download
        </h3>
        {/*
          These eight are scanned PDFs with no text layer, so they cannot be
          pre-filled — they are downloaded, printed and completed by hand.
        */}
        {downloadableForms.map((form) => (
          <a
            key={form.id}
            href={encodeURI(form.href)}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-bg-main px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-card focus-ring"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#334460] to-[#192838] text-white">
              <FileText size={18} strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-text-primary group-hover:text-brand-primary">
                {form.label}
              </span>
              <span className="mt-0.5 block text-xs text-text-secondary">{form.description}</span>
            </span>
            <Download
              size={16}
              className="flex-shrink-0 text-text-secondary transition-colors duration-200 group-hover:text-brand-primary"
            />
          </a>
        ))}
      </section>
    </div>
  )
}

/* ── Useful links tab ──────────────────────────────────────── */
function LinkRow({ label, description, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full items-center justify-between gap-3 rounded-xl border border-gray-100 bg-bg-main px-4 py-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-card focus-ring"
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-text-primary group-hover:text-brand-primary">
          {label}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs text-text-secondary">{description}</span>
        )}
      </span>
      <ExternalLink size={14} className="flex-shrink-0 text-text-secondary" />
    </a>
  )
}

function LinksTab() {
  return (
    <div className="space-y-6">
      {/*
        The vehicle discount portal is a full application rather than a link to
        a system employees already have — it sits above the systems list so it
        is not lost among thirteen bookmarks.
      */}
      {documentForms.length > 0 && (
        <section className="space-y-2.5">
          <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-secondary">
            Portals
          </h3>
          <ul className="grid gap-2">
            {documentForms.map((doc) => (
              <li key={doc.id}>
                <LinkRow label={doc.label} description={doc.description} href={doc.url} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-2.5">
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-text-secondary">
          Systems
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {usefulLinks.map((link) => (
            <li key={link.label}>
              <LinkRow label={link.label} href={link.href} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

/*
 * Every letter is built from the employee record, so both tabs wait on it. The
 * modal chrome stays up regardless — an unopenable, undismissable dialog is a
 * far worse failure than a delayed list.
 */
function EmployeeRecordSkeleton() {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-16 w-full" rounded="rounded-card" />
      ))}
    </div>
  )
}

export default function LettersModal({ onClose }) {
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('letters')
  const { employee, entity, signatories, generate, generateForm, isPending, isError, refetch } =
    useEmployeeLetters()

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, MODAL_TRANSITION_MS)
  }, [onClose])

  useEffect(() => {
    window.document.body.style.overflow = 'hidden'
    window.document.getElementById('root')?.classList.add('modal-open')
    setVisible(true)

    function handleKeyDown(e) {
      if (e.key === 'Escape') handleClose()
    }
    window.document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.document.removeEventListener('keydown', handleKeyDown)
      window.document.body.style.overflow = ''
      window.document.getElementById('root')?.classList.remove('modal-open')
    }
  }, [handleClose])

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 transition-all duration-300 sm:p-6 ${
        visible ? 'bg-black/40 backdrop-blur-sm' : 'pointer-events-none bg-transparent'
      }`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-label="Documents and forms"
    >
      <div
        className={`relative flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-bg-main shadow-2xl transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex-shrink-0 bg-gradient-to-br from-brand-primary to-brand-dark px-5 pt-4 text-white sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold leading-tight">Documents &amp; Forms</h2>
              <p className="mt-0.5 text-xs text-white/80">
                {entity
                  ? `Letters, forms and links — issued on your ${entity.id} letterhead`
                  : 'Letters, forms and links'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="-mr-1 rounded-lg p-2 transition-all duration-300 hover:rotate-90 hover:bg-white/20 focus-ring"
              aria-label="Close documents and forms"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-3 flex gap-1 overflow-x-auto" aria-label="Document categories">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex-shrink-0 rounded-t-lg px-4 py-2 text-[13px] font-semibold transition-colors duration-200 focus-ring ${
                    isActive ? 'bg-bg-main text-brand-primary' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-bg-alt p-4 sm:p-5">
          <div className="mx-auto w-full max-w-3xl">
            {activeTab === 'letters' &&
              (isPending ? (
                <EmployeeRecordSkeleton />
              ) : isError || !entity ? (
                <ErrorState label="your employee record" onRetry={refetch} />
              ) : (
                <LettersTab employee={employee} entity={entity} generate={generate} />
              ))}
            {activeTab === 'forms' &&
              (isPending ? (
                <EmployeeRecordSkeleton />
              ) : isError || !entity ? (
                <ErrorState label="your employee record" onRetry={refetch} />
              ) : (
                <FormsTab
                  employee={employee}
                  entity={entity}
                  signatories={signatories}
                  generateForm={generateForm}
                />
              ))}
            {activeTab === 'links' && <LinksTab />}
          </div>
        </div>
      </div>
    </div>,
    window.document.getElementById('modal-root')
  )
}

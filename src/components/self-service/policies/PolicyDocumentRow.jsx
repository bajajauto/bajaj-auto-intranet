import { Download, ExternalLink, FileText } from 'lucide-react'

const TYPE_STYLES = {
  pdf: { label: 'PDF', chip: 'bg-red-50 text-red-700 ring-red-100' },
  docx: { label: 'DOC', chip: 'bg-blue-50 text-blue-700 ring-blue-100' },
}

function formatSize(bytes) {
  if (!bytes) return null
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

/*
 * The files keep the names they have on disk — spaces, commas, ampersands and
 * all — so the href is encoded here rather than stored pre-escaped, and the
 * download attribute hands the browser a filename a person can read.
 *
 * Only a PDF gets an "Open" action: a browser renders one inline, whereas a
 * .docx would download under either label, and offering "Open" for something
 * that cannot open is worse than not offering it.
 */
export default function PolicyDocumentRow({ document: doc }) {
  const type = TYPE_STYLES[doc.type] ?? TYPE_STYLES.pdf
  const href = encodeURI(doc.href)
  const size = formatSize(doc.size)
  const fileName = doc.href.split('/').pop()

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2.5 transition-all duration-200 hover:border-brand-primary/30 hover:bg-brand-light/30 hover:shadow-sm">
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ring-1 ${type.chip}`}
      >
        <FileText size={16} strokeWidth={1.75} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-text-primary">
          {doc.name}
        </span>
        <span className="mt-0.5 block text-[11px] font-medium text-text-secondary">
          {type.label}
          {size ? ` · ${size}` : ''}
        </span>
      </span>

      <span className="flex flex-shrink-0 items-center gap-1">
        {doc.type === 'pdf' && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white focus-ring"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Open</span>
          </a>
        )}
        <a
          href={href}
          download={fileName}
          aria-label={`Download ${doc.name}`}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-text-secondary transition-colors hover:bg-bg-alt hover:text-text-primary focus-ring"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Download</span>
        </a>
      </span>
    </li>
  )
}

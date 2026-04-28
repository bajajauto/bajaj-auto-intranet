export default function TopBanner() {
  const links = [
    { label: 'Integrity Matters – Ethics Helpline', href: '#' },
    { label: 'POSH Information', href: '#' },
    { label: 'Vision & Mission', href: '#' },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-brand-light border-b border-brand-primary/20 flex items-center justify-center px-4">
      <nav className="flex items-center gap-6" aria-label="Policy links">
        {links.map((link, i) => (
          <span key={link.label} className="flex items-center gap-6">
            <a
              href={link.href}
              className="text-xs text-brand-primary hover:underline focus-ring rounded"
            >
              {link.label}
            </a>
            {i < links.length - 1 && (
              <span className="text-brand-primary/40 text-xs select-none">|</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  )
}

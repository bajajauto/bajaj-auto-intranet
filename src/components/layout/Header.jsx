import { useCallback, useEffect, useRef, useState } from 'react'
import { AlertTriangle, ArrowUpRight, Bell, ChevronDown, Menu, X } from 'lucide-react'
import { useNotices } from '@/hooks/useNotices'
import { useSiteSearch } from '@/hooks/useSiteSearch'
import NoticesPanel from '@/components/notices/NoticesPanel'
import PoliciesBenefitsModal from '@/components/self-service/PoliciesBenefitsModal'
import LettersModal from '@/components/self-service/letters/LettersModal'
import bajajLockupBlue from '@/assets/bajaj-lockup-blue.png'
import jarvisAvatar from '@/assets/jarvis-blue.png'
import { services } from '@/config/services.config'
import { helpLinks } from '@/config/contacts.config'
import { helplineMenu, topNav } from '@/config/navigation.config'
import { SITE_SEARCH_ID } from '@/lib/layout'
import { openJarvis } from '@/lib/jarvis'
import { openSos } from '@/lib/sos'
import { scrollToSection } from '@/utils/scrollToSection'

// Where a top-bar or Helpline entry goes: a link to open, or nothing yet.
function hrefFor(item) {
  if (item.serviceId) return services.find((s) => s.id === item.serviceId)?.redirectUrl
  if (item.helpLinkId) return helpLinks.find((l) => l.id === item.helpLinkId)?.href
  return item.href
}

const isReady = (href) => Boolean(href) && href !== '#'

const NAV_LINK =
  'inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-lg px-2 text-[13px] font-medium text-[#2e1a30] transition-colors hover:bg-ocean-100 hover:text-ocean-700 focus-ring'
const ICON_BUTTON =
  'relative flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-ocean-line bg-ocean-50 text-[#2d4357] shadow-ocean-sm transition-colors hover:bg-ocean-100 focus-ring'
const PANEL =
  'absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border border-ocean-line bg-white shadow-ocean'

function SiteSearch({ onAction }) {
  const [query, setQuery] = useState('')
  const results = useSiteSearch(query)
  const open = query.trim().length > 0

  function pick(result) {
    setQuery('')
    if (result.href) window.open(result.href, '_blank', 'noopener,noreferrer')
    else if (result.action) onAction(result.action)
    else if (result.sectionId) scrollToSection(result.sectionId)
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        if (results[0]) pick(results[0])
      }}
      className="relative w-full"
    >
      <label htmlFor={SITE_SEARCH_ID} className="sr-only">
        Search the intranet
      </label>
      <div className="flex h-10 items-center gap-1.5 rounded-xl border border-ocean-line bg-ocean-50 pl-1 pr-3 shadow-ocean-sm focus-within:ring-2 focus-within:ring-ocean-600/40">
        {/* Jarvis stands in for the magnifier: the search finds places on the
            page, and anything it cannot find is a question for Jarvis. */}
        <button
          type="button"
          onClick={openJarvis}
          title="Ask Jarvis"
          aria-label="Ask Jarvis"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full transition-transform hover:scale-110 focus-ring"
        >
          <img src={jarvisAvatar} alt="" className="h-7 w-7 rounded-full object-cover" />
        </button>
        <input
          id={SITE_SEARCH_ID}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
          placeholder="Search services, policies…"
          autoComplete="off"
          aria-controls="site-search-results"
          aria-expanded={open}
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-[13px] text-ocean-ink outline-none placeholder:text-[#587d8c]"
        />
      </div>

      {open && (
        <div id="site-search-results" className={`${PANEL} right-0 w-[min(360px,calc(100vw-2rem))] p-1.5`}>
          {results.length > 0 ? (
            <ul aria-label="Search results">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={() => pick(result)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-ocean-100 focus-ring"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-ocean-ink">
                        {result.label}
                      </span>
                      <span className="block text-[11px] text-ocean-sub">{result.hint}</span>
                    </span>
                    {result.href && <ArrowUpRight size={15} className="flex-none text-ocean-sub" />}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-between gap-3 px-3 py-2">
              <p className="text-[13px] text-ocean-sub">Nothing matches “{query.trim()}”.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  openJarvis()
                }}
                className="flex-none rounded-lg bg-ocean-100 px-3 py-1.5 text-xs font-semibold text-ocean-700 hover:bg-ocean-200 focus-ring"
              >
                Ask Jarvis
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  )
}

function HelplineItems({ onPick }) {
  return helplineMenu.map((item) => {
    if (item.action === 'sos') {
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onPick(item)}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-[#bc271b] transition-colors hover:bg-[#fdeceb] focus-ring"
        >
          <AlertTriangle size={15} strokeWidth={2.2} />
          {item.label}
        </button>
      )
    }
    const href = hrefFor(item)
    return isReady(href) ? (
      <a
        key={item.id}
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={() => onPick(item)}
        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13px] text-ocean-ink transition-colors hover:bg-ocean-100 focus-ring"
      >
        {item.label}
        <ArrowUpRight size={14} className="text-ocean-sub" />
      </a>
    ) : (
      <span
        key={item.id}
        title="Link coming soon"
        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13px] text-ocean-sub"
      >
        {item.label}
        <span className="text-[11px]">Soon</span>
      </span>
    )
  })
}

/*
 * The one bar across the top: the Bajaj Auto lockup, the everyday shortcuts,
 * the site search with Jarvis and notices. Below xl the
 * shortcuts fold into a menu sheet so phones keep the same reach.
 */
export default function Header() {
  const notices = useNotices().data
  const noticeCount = notices.length

  const [openMenu, setOpenMenu] = useState(null) // 'helpline' | 'notices' | 'mobile'
  const [noticesSeen, setNoticesSeen] = useState(false)
  const [modal, setModal] = useState(null) // 'policies' | 'letters'
  const barRef = useRef(null)

  const close = useCallback(() => setOpenMenu(null), [])
  const toggle = (name) => setOpenMenu((current) => (current === name ? null : name))

  useEffect(() => {
    if (!openMenu) return undefined
    function onMouseDown(e) {
      if (!barRef.current?.contains(e.target)) close()
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openMenu, close])

  function runAction(action) {
    close()
    if (action === 'sos') openSos()
    else if (action === 'helpline') setOpenMenu('helpline')
    else if (action === 'policies' || action === 'letters') setModal(action)
  }

  function pickHelpline(item) {
    if (item.action) runAction(item.action)
    else close()
  }

  function renderNavItem(item, { mobile = false } = {}) {
    const cls = mobile
      ? 'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-ocean-ink transition-colors hover:bg-ocean-100 focus-ring'
      : NAV_LINK

    if (item.action === 'helpline') {
      if (mobile) return null
      return (
        <div key={item.id} className="relative">
          <button
            type="button"
            onClick={() => toggle('helpline')}
            aria-expanded={openMenu === 'helpline'}
            aria-haspopup="true"
            className={`${NAV_LINK} ${openMenu === 'helpline' ? 'bg-ocean-100 text-ocean-700' : ''}`}
          >
            {item.label}
            <ChevronDown
              size={14}
              className={`transition-transform ${openMenu === 'helpline' ? 'rotate-180' : ''}`}
            />
          </button>
          {openMenu === 'helpline' && (
            <div className={`${PANEL} left-0 w-72 p-1.5`}>
              <HelplineItems onPick={pickHelpline} />
            </div>
          )}
        </div>
      )
    }

    if (item.action) {
      return (
        <button key={item.id} type="button" onClick={() => runAction(item.action)} className={cls}>
          {item.label}
        </button>
      )
    }

    if (item.sectionId) {
      return (
        <a
          key={item.id}
          href={`#${item.sectionId}`}
          onClick={(e) => {
            e.preventDefault()
            close()
            scrollToSection(item.sectionId)
          }}
          className={cls}
        >
          {item.label}
        </a>
      )
    }

    const href = hrefFor(item)
    return isReady(href) ? (
      <a key={item.id} href={href} target="_blank" rel="noreferrer" onClick={close} className={cls}>
        {item.label}
      </a>
    ) : (
      <span
        key={item.id}
        title="Link coming soon"
        aria-disabled="true"
        className={`${cls} cursor-default opacity-60 hover:bg-transparent hover:text-[#2e1a30]`}
      >
        {item.label}
      </span>
    )
  }

  return (
    <>
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#e3ecef] bg-[#fffefa]/95 backdrop-blur-md"
      >
        <div className="flex h-14 items-center gap-3 px-3 sm:px-5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              close()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex flex-none items-center rounded-lg focus-ring"
            aria-label="Bajaj Auto intranet home"
          >
            <img src={bajajLockupBlue} alt="" className="h-8 w-auto object-contain sm:h-9" />
          </a>

          <span className="mx-1 hidden h-7 w-px bg-[#c9cfd6] xl:block" aria-hidden="true" />

          <nav aria-label="Shortcuts" className="hidden items-center gap-0.5 xl:flex">
            {topNav.map((item) => renderNavItem(item))}
          </nav>

          <div className="ml-auto flex min-w-0 items-center gap-2">
            <div className="hidden w-72 sm:block xl:w-[22rem] 2xl:w-[32rem]">
              <SiteSearch onAction={runAction} />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  toggle('notices')
                  setNoticesSeen(true)
                }}
                aria-label={noticeCount > 0 && !noticesSeen ? `Notices, ${noticeCount} unread` : 'Notices'}
                aria-expanded={openMenu === 'notices'}
                aria-haspopup="true"
                className={ICON_BUTTON}
              >
                <Bell size={16} strokeWidth={1.9} />
                {noticeCount > 0 && !noticesSeen && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#e33b35]" />
                )}
              </button>
              {openMenu === 'notices' && (
                <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)]">
                  <NoticesPanel />
                </div>
              )}
            </div>

            <div className="relative xl:hidden">
              <button
                type="button"
                onClick={() => toggle('mobile')}
                aria-label={openMenu === 'mobile' ? 'Close menu' : 'Open menu'}
                aria-expanded={openMenu === 'mobile'}
                aria-haspopup="true"
                className={ICON_BUTTON}
              >
                {openMenu === 'mobile' ? <X size={18} /> : <Menu size={18} />}
              </button>
              {openMenu === 'mobile' && (
                <div className={`${PANEL} right-0 max-h-[calc(100vh-5rem)] w-72 overflow-y-auto p-2`}>
                  <div className="mb-2 sm:hidden">
                    <SiteSearch onAction={runAction} />
                  </div>
                  <nav aria-label="Shortcuts">{topNav.map((item) => renderNavItem(item, { mobile: true }))}</nav>
                  <p className="mt-2 border-t border-ocean-line px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ocean-sub">
                    Helpline
                  </p>
                  <HelplineItems onPick={pickHelpline} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {modal === 'policies' && <PoliciesBenefitsModal onClose={() => setModal(null)} />}
      {modal === 'letters' && <LettersModal onClose={() => setModal(null)} />}
    </>
  )
}

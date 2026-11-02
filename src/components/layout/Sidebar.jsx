import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { pageSections, sidebarNav } from '@/config/navigation.config'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { scrollToSection } from '@/utils/scrollToSection'

const TOOLTIP =
  'pointer-events-none absolute left-full ml-2 -translate-x-1 whitespace-nowrap rounded-lg bg-[#1b2740] px-2.5 py-1 text-xs text-white opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100'

function RailButton({ item, active }) {
  return (
    <a
      href={`#${item.sectionId}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(item.sectionId)
      }}
      aria-label={item.label}
      aria-current={active ? 'location' : undefined}
      className="group relative flex h-16 w-16 items-center justify-center rounded-2xl transition-colors hover:bg-white/10 focus-ring"
    >
      {active && <span className="absolute -left-2.5 h-7 w-1 rounded-full bg-white/80" aria-hidden="true" />}
      <img
        src={item.icon}
        alt=""
        className={`h-12 w-12 object-contain transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 ${
          active ? 'drop-shadow-[0_0_8px_rgba(147,195,215,0.7)]' : ''
        }`}
      />
      <span className={TOOLTIP}>
        {item.label}
      </span>
    </a>
  )
}

/*
 * Disabled while VITE_AUTH_MODE=off: there is no session to end, and a button
 * that seems to work but does nothing is worse than one that plainly cannot.
 */
function LogOutButton() {
  const { enabled, signOut } = useAuth()
  const label = enabled ? 'Log out' : 'Log out (sign-in is not enabled)'
  return (
    <button
      type="button"
      onClick={enabled ? signOut : undefined}
      aria-disabled={!enabled}
      aria-label={label}
      className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-colors focus-ring ${
        enabled ? 'hover:bg-white/10' : 'cursor-not-allowed opacity-60'
      }`}
    >
      <LogOut size={24} strokeWidth={1.9} />
      <span className={TOOLTIP}>{label}</span>
    </button>
  )
}

/*
 * The icon rail down the left, from lg up. Each icon scrolls to its section and
 * lights while that section is in view; below lg the top bar's menu covers it.
 */
export default function Sidebar() {
  const [activeSection] = useScrollSpy(pageSections)
  const isActive = (item) => item.covers.includes(activeSection)

  return (
    <aside
      aria-label="Sections"
      className="fixed bottom-0 left-0 top-14 z-40 hidden w-[86px] flex-col items-center border-r border-[#d6e3ea] bg-gradient-to-b from-[#052e42] via-[#1a546c] to-[#1f86a7] py-5 lg:flex"
    >
      <nav className="flex flex-col items-center gap-2">
        {sidebarNav.map((item) => (
          <RailButton key={item.id} item={item} active={isActive(item)} />
        ))}
      </nav>
      <div className="mt-auto flex flex-col items-center">
        <LogOutButton />
      </div>
    </aside>
  )
}

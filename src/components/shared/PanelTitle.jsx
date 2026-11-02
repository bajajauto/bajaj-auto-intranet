import { scrollToSection } from '@/utils/scrollToSection'

/*
 * A section card's heading row: the section's 3D icon, its name, and an
 * optional link on the right ("View all →"). The link takes `onClick`, an
 * `href`, or a `sectionId` to scroll to.
 */
export default function PanelTitle({ id, icon, title, action, size = 'lg' }) {
  const text = size === 'lg' ? 'text-[21px]' : 'text-[17px]'

  let link = null
  if (action) {
    const cls = 'flex-none rounded text-[11.5px] text-ocean-sub transition-colors hover:text-ocean-700 hover:underline focus-ring'
    if (action.href) {
      link = (
        <a href={action.href} target="_blank" rel="noreferrer" className={cls}>
          {action.label} →
        </a>
      )
    } else {
      link = (
        <button
          type="button"
          onClick={action.onClick ?? (() => scrollToSection(action.sectionId))}
          className={cls}
          aria-expanded={action.expanded}
        >
          {action.label} →
        </button>
      )
    }
  }

  return (
    <div className="flex items-center gap-3">
      {icon && <img src={icon} alt="" className="h-10 w-10 flex-none object-contain" />}
      <h2 id={id} className={`min-w-0 flex-1 font-semibold tracking-[-0.01em] text-ocean-head ${text}`}>
        {title}
      </h2>
      {link}
    </div>
  )
}

/*
 * The page's one heading voice: a short statement in ink, then a muted line
 * that says what the section is for — "Calendar. October at a glance." Set in
 * the display face at 22px, the same as the hero greeting.
 *
 * `children` is an optional right-hand slot (a tab switcher, a link) that sits
 * level with the heading's last line and wraps beneath it on narrow screens.
 */
export default function SectionHeading({ id, title, subtitle, children, className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-6 gap-y-4 ${className}`}>
      <h2
        id={id}
        className="font-display text-[22px] font-semibold leading-tight tracking-[-0.015em] text-ink"
      >
        {title}
        {subtitle && <span className="text-muted/80"> {subtitle}</span>}
      </h2>
      {children}
    </div>
  )
}

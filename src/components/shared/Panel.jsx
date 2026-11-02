/*
 * The redesign's section card: near-white with a faint cool fall-off, an 18px
 * radius and a firm drop shadow, so each section sits up off the ocean wash
 * behind the page. `as` lets a section render as <section> with its id;
 * `surface` swaps the fill for a card that wants its own wash.
 */
const SURFACE = 'bg-gradient-to-b from-[#fcfdff] to-[#f6fbfe]'

export default function Panel({ as: Tag = 'div', surface = SURFACE, className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-[18px] border border-ocean-line shadow-ocean ${surface} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

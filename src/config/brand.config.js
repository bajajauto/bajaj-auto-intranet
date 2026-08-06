// The intranet product's own identity — the lockup shown beside the Bajaj
// Auto logo in the header and on the splash screen. Everything that names the
// product reads from here.
//
// Renamed from EKAM to Bajaj One.
//
// The lockup draws only the mark — the numeral one. "Bajaj" is already carried
// by the Auto logo sitting immediately to its left, so spelling it again read
// as a stutter: the logo is the parent brand, the mark is the product.
//
// The mark itself is not a string. It is a drawn glyph, so no font is trusted
// to shape it and the splash can assemble it out of the people and vehicles it
// stands for (components/shared/OneGlyph.jsx, components/layout/UnionMark.jsx).
// `name` here is the full product name: it is the lockup's accessible name and
// the string to use anywhere the product is named in prose.
export const productBrand = {
  name: 'Bajaj One',
  tagline: 'Your Favourite Pitstop',
  // Build credit. Lives here rather than inline in the footer so the same
  // string can be dropped anywhere else it is wanted without drifting.
  developedBy: 'Developed by the HR Digitization Team',
}

// The mark's geometry. It lives here rather than in OneGlyph.jsx because the
// splash draws the same outline inside its own, far wider scene — and a file
// that exports both a component and the constants beside it loses fast refresh.
//
// `ink` is where the drawn shape actually sits inside `path`, with the air the
// viewBox leaves around it. The splash needs those numbers to crop its viewBox
// to the numeral alone; without that, the empty stage either side of the mark
// opens a void next to the Bajaj logo once the crowd has gone.
// `stem` is the upright alone, without the flag or the serif. The splash grows
// the mark out of the handshake and needs to know how wide that first sliver
// should be, so that what rises from the clasped hands is the stem exactly and
// not a stripe that happens to sit near it.
export const productMark = {
  path: 'M63 6 L63 138 L88 138 L88 154 L16 154 L16 138 L41 138 L41 48 L20 57 Z',
  ink: { x: 16, y: 6, width: 72, height: 148, pad: 4 },
  stem: { x: 41, width: 22 },
  viewBox: '12 2 80 156',
}

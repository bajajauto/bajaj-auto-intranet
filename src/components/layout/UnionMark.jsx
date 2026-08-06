import { useId } from 'react'
import { productMark } from '@/config/brand.config'

// The splash's opening beat, and the reason the product is called One: a
// motorcycle and a three-wheeler roll in from the edges while two people walk
// toward each other and shake hands at centre — then the crowd is drawn into
// the numeral the header carries.
//
// Everything is line art at one weight. An earlier pass built the cast out of
// heavy pictogram strokes and filled discs for heads, which put bathroom-sign
// icons next to a serif numeral and an italic tagline — three voices in a
// lockup that needs one. Weight is what holds it together now, so STROKE is
// shared by the figures, the vehicles and the ground rules alike.
//
// The two figures do not hand over to the mark, they become it. Once they have
// shaken hands they keep closing, each arm retracting into its shoulder at
// exactly the rate its body advances so the clasp never leaves the centre line
// — and because a body is half the width of the numeral's upright, the pair
// lands as that upright, edge to edge, with nothing to dissolve. The tinted
// figure whitens on the way in, so two tones arrive as one. Only then does the
// stem run up to the apex and open out into the flag and the serif.
//
// Earlier passes crossfaded a finished numeral over the crowd, then grew one
// out of the join. Both read as a substitution because the figures were still
// being thrown away; here they are the material.
//
// The choreography lives in the `union-*` classes in index.css. Only each
// figure's delay and travel distance are set here, inline as custom
// properties, so the scene stays a data detail rather than a class per figure.
const VEHICLES_IN_MS = 40
const PEOPLE_IN_MS = 180
const CLASP_MS = 860
const MERGE_MS = 1020
const HEAD_MS = 1360
const VEHICLES_OUT_MS = 1060
const REVEAL_MS = 1640
const BLOOM_MS = 2050

// Compact runs the same merge and reveal at header size, and nothing else. The
// crowd cannot come with it: the stage is four times the mark's own width, so
// at 32px tall the cast would be a few illegible pixels *and* would trample the
// Bajaj lockup beside it. What survives the shrink is the part that carries the
// idea — two halves closing into one upright, which then opens into the mark.
const COMPACT_MERGE_MS = 140
const COMPACT_REVEAL_MS = 720

// The people are solid slab shapes drawn from a supplied reference: a detached
// disc for a head over a bare upright body, with a single arm cut off the top
// of it at an angle. The vehicles keep to strokes, but heavy and round-capped,
// which is the same flat vocabulary at a different density — a hairline cast
// beside slab figures would be the mismatch all over again.
const VEHICLE_STROKE = 3.4

// Two tones, as in the reference: one figure carries full white, the other a
// wash of it, and the vehicles sit further back still so the handshake is what
// the eye lands on. Everything is currentColor over the splash's dark blue, so
// the wash is opacity rather than a second colour token.
const TONE_LEAD = 1
const TONE_SOFT = 0.6
const TONE_SUPPORT = 0.5

// Scene geometry. Everything stands on a common baseline at y=154 and is laid
// out around the centre line, which is where the handshake lands and where the
// numeral's stem falls. Each figure is drawn to its own local baseline at
// y=106 and placed by the difference.
const CENTRE_X = 170
const BASELINE_Y = 154
const FIGURE_BASE = 106
const FIGURE_Y = BASELINE_Y - FIGURE_BASE
const CLASP_Y = 94

// The three numbers the merge turns on. A body is half the upright's width, so
// two of them close into it exactly; the reach is how far each figure still has
// to travel once hands are joined, and the arm retracts over the same distance
// so the clasp stays pinned to the centre line throughout.
const BODY_W = productMark.stem.width / 2
const REACH = 31.5
const SHOULDER_Y = 24
// Where the merged pair tops out, and so where the stem carries on from.
const MERGE_TOP_Y = FIGURE_Y + SHOULDER_Y

// The scene is 340 units wide, but only the numeral is laid out: the viewBox is
// cropped to the glyph and the crowd is allowed to overflow it (see
// `overflow-visible` below). That keeps the settled mark sitting as tightly
// against the Bajaj logo as the header's does, instead of the stage's empty
// shoulders holding it an inch away.
const INK = productMark.ink
const GLYPH_X = CENTRE_X - INK.x - INK.width / 2
const GLYPH_TRANSFORM = `translate(${GLYPH_X} 0)`
const FRAME = {
  x: GLYPH_X + INK.x - INK.pad,
  y: INK.y - INK.pad,
  width: INK.width + INK.pad * 2,
  height: INK.height + INK.pad * 2,
}
const SCENE_VIEW_BOX = [FRAME.x, FRAME.y, FRAME.width, FRAME.height].join(' ')

// The reveal is one rect scaled about the point the merged pair tops out at:
// first to a stem-wide sliver running the full height — which over the joined
// bodies only shows as the upright carrying on up to the apex — then out to the
// frame for the flag and the serif. Expressed against the rect's own box, since
// that is what `transform-box: fill-box` measures the origin in.
const REVEAL_ORIGIN = `${((CENTRE_X - FRAME.x) / FRAME.width) * 100}% ${
  ((MERGE_TOP_Y - FRAME.y) / FRAME.height) * 100
}%`
// A string, not a number: React only knows to leave custom properties unitless
// when it is not handed a bare number to guess about.
const REVEAL_SEED = String(productMark.stem.width / FRAME.width)

// Pictograms are drawn facing right and mirrored into place, so a single
// Person is used for both sides of the handshake.
//
// A disc and two polygons, per the reference: the head floats free above the
// shoulders, the body is a bare upright, and a single arm is cut off the top of
// it at an angle. No legs, no second arm — the upright runs unbroken to the
// baseline, which is what lets it stand in for half the numeral's stem.
//
// Head and arm are separate elements because the merge takes them away
// independently: the arm retracts into the shoulder as the bodies close, and
// the head — which the numeral has no room for — lifts and fades just before
// they touch.
const SHOULDER_X = REACH + BODY_W
const HAND_X = SHOULDER_X + REACH
const ARM_PATH = `M${SHOULDER_X} ${SHOULDER_Y} L${HAND_X} 40 L${HAND_X} 53 L${SHOULDER_X} 37 Z`
// The body runs a hair past the shoulder line on its inner edge. Two shapes
// meeting exactly leave an antialiased seam down the middle of the merged
// upright; overlapping them buries it, and the outer edges — which are what
// set the upright's width — are untouched.
const BODY_OVERLAP = 0.75
const BODY_PATH = `M${SHOULDER_X - BODY_W} ${SHOULDER_Y} H${SHOULDER_X + BODY_OVERLAP} V${
  FIGURE_BASE
} H${SHOULDER_X - BODY_W} Z`

function Person() {
  return (
    <g fill="currentColor" stroke="none">
      <circle
        className="union-head"
        cx={SHOULDER_X - BODY_W / 2}
        cy="13"
        r="6.5"
        style={{ animationDelay: `${HEAD_MS}ms` }}
      />
      <path className="union-arm" d={ARM_PATH} style={{ animationDelay: `${MERGE_MS}ms` }} />
      <path d={BODY_PATH} />
    </g>
  )
}

// The vehicles stay drawn rather than solid, held back at a low tone: solid in
// front and linear behind reads as depth, where a slab motorcycle beside slab
// figures only read as a cruder version of them. Built as real skeletons —
// everything hangs off the headstock at (70 54) — because at any weight a line
// that meets nothing looks like a mistake.
function Motorcycle() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={VEHICLE_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="90" r="14" />
      <circle cx="82" cy="90" r="14" />
      <path d="M22 62 L30 64 L48 62 L62 57 L70 54" />
      <path d="M70 54 L58 76 L44 82 L18 90" />
      <path d="M70 54 L82 90" />
      {/* Riser and bar sit clear above the tank line. Run back into it and the
          front end reads as a hook rather than a handlebar. */}
      <path d="M70 54 L66 44" />
      <path d="M60 41 L72 46" />
    </g>
  )
}

function ThreeWheeler() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={VEHICLE_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rear canopy, then the roof falling away to a cowl over a single small
          front wheel. The open side rail and the raked windscreen are what
          separate an auto from a generic domed car at this size. */}
      <path d="M14 90 V66 Q14 46 34 44 L58 44 Q68 44 70 54 L74 72 V84" />
      <path d="M16 72 H62" />
      <path d="M58 45 L66 70" />
      <circle cx="30" cy="90" r="14" />
      <circle cx="74" cy="92" r="12" />
    </g>
  )
}

// Three nested groups because each stage owns its own transform: the outer one
// places the figure (a plain attribute), the middle two are animated by CSS —
// which overrides an attribute transform on the same element, hence the
// nesting — and the innermost mirrors figures that face left.
function Vehicle({ x, from, to, flip = false, children }) {
  return (
    <g className="union-figure" transform={`translate(${x} ${FIGURE_Y})`}>
      <g
        className="union-arrive"
        style={{ '--union-from': `${from}px`, animationDelay: `${VEHICLES_IN_MS}ms` }}
      >
        <g
          className="union-depart"
          style={{ '--union-to': `${to}px`, animationDelay: `${VEHICLES_OUT_MS}ms` }}
        >
          <g opacity={TONE_SUPPORT} transform={flip ? 'scale(-1 1)' : undefined}>
            {children}
          </g>
        </g>
      </g>
    </g>
  )
}

// Placed so the outstretched hand lands on the centre line, and merged by
// exactly the reach — which puts the body against the centre line too, since
// that is how far it was standing off it.
// `bare` drops the head, the arm and the walk-on, leaving the upright and the
// close — which is all that reads at header size.
function Partner({ tone, flip = false, bare = false }) {
  const travel = flip ? -REACH : REACH
  const mergeAt = bare ? COMPACT_MERGE_MS : MERGE_MS

  const closing = (
    <g className="union-merge" style={{ '--union-to': `${travel}px`, animationDelay: `${mergeAt}ms` }}>
      <g className="union-tone" style={{ '--union-tone': tone, animationDelay: `${mergeAt}ms` }}>
        <g transform={flip ? 'scale(-1 1)' : undefined}>
          {bare ? <path fill="currentColor" d={BODY_PATH} /> : <Person />}
        </g>
      </g>
    </g>
  )

  return (
    <g
      className="union-figure"
      transform={`translate(${flip ? CENTRE_X + HAND_X : CENTRE_X - HAND_X} ${FIGURE_Y})`}
    >
      {bare ? (
        closing
      ) : (
        <g
          className="union-arrive"
          style={{ '--union-from': `${flip ? 46 : -46}px`, animationDelay: `${PEOPLE_IN_MS}ms` }}
        >
          {closing}
        </g>
      )}
    </g>
  )
}

export default function UnionMark({ className = '', compact = false }) {
  // Colons are legal in an id but awkward to reference.
  const revealClip = `${useId().replace(/:/g, '')}-reveal`

  return (
    <svg
      viewBox={SCENE_VIEW_BOX}
      fill="none"
      aria-hidden="true"
      // Compact stays inside its box: with no crowd to spill, letting it
      // overflow would only give it licence to paint over the lockup.
      className={compact ? className : `union-bloom overflow-visible ${className}`}
      style={compact ? undefined : { animationDelay: `${BLOOM_MS}ms` }}
    >
      <defs>
        <clipPath id={revealClip}>
          <rect
            className="union-reveal"
            {...FRAME}
            style={{
              transformOrigin: REVEAL_ORIGIN,
              '--union-seed': REVEAL_SEED,
              animationDelay: `${compact ? COMPACT_REVEAL_MS : REVEAL_MS}ms`,
            }}
          />
        </clipPath>
      </defs>

      {!compact && (
        <>
          <Vehicle x={0} from={-124} to={104}>
            <Motorcycle />
          </Vehicle>
          <Vehicle x={340} from={124} to={-104} flip>
            <ThreeWheeler />
          </Vehicle>
        </>
      )}

      <Partner tone={TONE_LEAD} bare={compact} />
      <Partner tone={TONE_SOFT} flip bare={compact} />

      {/* A ring opening out of the clasped hands on contact — the beat that
          marks the meeting, and the point the mark then grows from. */}
      {!compact && (
        <circle
          className="union-figure union-clasp"
          cx={CENTRE_X}
          cy={CLASP_Y}
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          style={{ animationDelay: `${CLASP_MS}ms` }}
        />
      )}

      {/* The numeral, revealed through a clip that starts as nothing where the
          joined bodies top out: it runs to a stem-wide sliver top and bottom
          first, then opens sideways into the flag and the serif. */}
      <g clipPath={`url(#${revealClip})`}>
        <path d={productMark.path} transform={GLYPH_TRANSFORM} fill="currentColor" />
      </g>
    </svg>
  )
}

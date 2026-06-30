function Svg({ size, strokeWidth, className, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

// Filled two-tone glyphs: solid white silhouette (currentColor) + a lighter
// same-colour accent over the badge, and dark "engraved" detail on white.
function FilledSvg({ size, className, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

// engraved detail tone — reads on white regardless of badge colour
const INK = '#0A1A2E'

// Filled two-tone: a faint figure behind a solid one — reads as "team".
export function TeamDirectoryIcon({ size = 24, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <g fillOpacity="0.4">
        <circle cx="16.4" cy="8" r="2.5" />
        <path d="M16.4 12c-2.8 0-4.7 1.9-4.7 4.2 0 .6.5 1.1 1.1 1.1h7.2c.6 0 1.1-.5 1.1-1.1 0-2.3-1.9-4.2-4.7-4.2z" />
      </g>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M9 13c-3.4 0-5.8 2.3-5.8 5.1 0 .8.6 1.4 1.4 1.4h8.8c.8 0 1.4-.6 1.4-1.4 0-2.8-2.4-5.1-5.8-5.1z" />
    </svg>
  )
}

// Clipboard — solid board, engraved clip + ruled lines.
export function PoliciesIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2.6" />
      <path
        fill={INK}
        fillOpacity="0.22"
        d="M9 4.2a3 3 0 0 1 6 0h.4a1 1 0 0 1 1 1V6a1.2 1.2 0 0 1-1.2 1.2H8.8A1.2 1.2 0 0 1 7.6 6v-.8a1 1 0 0 1 1-1H9z"
      />
      <g fill={INK} fillOpacity="0.22">
        <rect x="8" y="10.6" width="8" height="1.7" rx="0.85" />
        <rect x="8" y="14" width="8" height="1.7" rx="0.85" />
        <rect x="8" y="17.4" width="5" height="1.7" rx="0.85" />
      </g>
    </FilledSvg>
  )
}

// Gift box — lighter body, solid lid + ribbon + bow.
export function BenefitsIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <path fillOpacity="0.4" d="M5 11.6h14V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6.4z" />
      <rect x="3.6" y="8" width="16.8" height="3.9" rx="1.1" />
      <rect x="10.8" y="8" width="2.4" height="12" />
      <path d="M12 8c-.6-1.8-1.8-3-3.2-3-1.05 0-1.8.75-1.8 1.7C7 8 8.6 8 12 8zM12 8c.6-1.8 1.8-3 3.2-3 1.05 0 1.8.75 1.8 1.7C17 8 15.4 8 12 8z" />
    </FilledSvg>
  )
}

// Aeroplane — solid plane silhouette, banked for a touch of motion.
export function TravelIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <path
        transform="rotate(18 12 12)"
        d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </FilledSvg>
  )
}

// Calendar — solid body, engraved header + check, white binding rings.
export function LeaveAttendanceIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2.6" />
      <path fill={INK} fillOpacity="0.18" d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5V9.6H3V7.5z" />
      <rect x="6.9" y="3" width="1.8" height="4.2" rx="0.9" />
      <rect x="15.3" y="3" width="1.8" height="4.2" rx="0.9" />
      <path
        fill={INK}
        fillOpacity="0.22"
        d="M10.6 16.6 8.9 14.9l-1.3 1.3 3 3 5.2-5.2-1.3-1.3z"
      />
    </FilledSvg>
  )
}

// Rupee coin — solid disc with a crisp, stroked ₹.
export function CompensationIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <circle cx="12" cy="12" r="9.2" />
      <g
        fill="none"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.6 7.6h6.8" />
        <path d="M8.6 10.4h6.8" />
        <path d="M10.2 7.6c3.4 0 3.9 4.2-0.8 4.2l4.6 5.2" />
        <path d="M8.6 11.8h2.6" />
      </g>
    </FilledSvg>
  )
}

export function RecognitionGemIcon({ size = 24, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <g fill="currentColor" transform="translate(16 16) scale(1.14) translate(-16 -16)">
        <path d="M15.2 2.7 20 8.4l-5.5 4.9-3.1-6.8z" />
        <path d="M22 7.8 29.2 8.5l-4.3 5.5-7.2.2z" />
        <path d="M8.8 8.5 14 13.6l-7.1.4-3.8-5.9z" />
        <path d="M17.8 16.4 26 18l-4.7 5.9-5.2-3.7z" />
        <path d="M11.8 16.8 8.1 24l-5-5.2 6.4-3.8z" />
        <path d="M14.5 14.8 18 13l2 3.2-3.5 2.5-3.4-.9z" />
      </g>
    </svg>
  )
}

// Filled two-tone: solid mortarboard, faint head-band, with a tassel.
export function BoltLearningIcon({ size = 24, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M11.55 3.1 2.3 7.4c-.73.34-.73 1.32 0 1.66l9.25 4.27c.28.13.6.13.88 0l9.27-4.27c.73-.34.73-1.32 0-1.66L12.43 3.1a1.05 1.05 0 0 0-.88 0z" />
      <path fillOpacity="0.4" d="M6 11.4v3.1c0 1.66 2.69 3 6 3s6-1.34 6-3v-3.1l-5.62 2.59c-.24.11-.52.11-.76 0L6 11.4z" />
      <path d="M20.1 8.7h.9v4.1h-.9z" />
      <circle cx="20.55" cy="14" r="1.15" />
    </svg>
  )
}

// Heart with an ECG pulse cut through it.
export function HealthWellnessIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <path d="M12 20.6 10.3 19C5.4 14.6 2 11.5 2 7.6 2 4.5 4.4 2.1 7.5 2.1c1.74 0 3.4.8 4.5 2.1 1.1-1.3 2.76-2.1 4.5-2.1C19.6 2.1 22 4.5 22 7.6c0 3.9-3.4 7-8.3 11.4L12 20.6z" />
      <path
        fill="none"
        stroke={INK}
        strokeOpacity="0.24"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.4 11.4h2.8l1.4-2.9 2.1 5.2 1.3-2.5h3.4"
      />
    </FilledSvg>
  )
}

// Sun — solid disc with lighter rays; reads clearly as "holiday / day off".
export function HolidayCalendarIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <g fillOpacity="0.5">
        <rect x="11.1" y="1.5" width="1.8" height="3.4" rx="0.9" />
        <rect x="11.1" y="19.1" width="1.8" height="3.4" rx="0.9" />
        <rect x="1.5" y="11.1" width="3.4" height="1.8" rx="0.9" />
        <rect x="19.1" y="11.1" width="3.4" height="1.8" rx="0.9" />
        <rect x="5.1" y="4.3" width="1.8" height="3.4" rx="0.9" transform="rotate(45 6 6)" />
        <rect x="17.1" y="4.3" width="1.8" height="3.4" rx="0.9" transform="rotate(-45 18 6)" />
        <rect x="5.1" y="16.3" width="1.8" height="3.4" rx="0.9" transform="rotate(-45 6 18)" />
        <rect x="17.1" y="16.3" width="1.8" height="3.4" rx="0.9" transform="rotate(45 18 18)" />
      </g>
      <circle cx="12" cy="12" r="5.2" />
    </FilledSvg>
  )
}

// Document — solid page, lighter folded corner, engraved text lines.
export function DocumentsIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <path d="M6 3h7l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path fillOpacity="0.4" d="M13 3l5 5h-4a1 1 0 0 1-1-1V3z" />
      <g fill={INK} fillOpacity="0.22">
        <rect x="7.5" y="12" width="7" height="1.6" rx="0.8" />
        <rect x="7.5" y="15.2" width="7" height="1.6" rx="0.8" />
        <rect x="7.5" y="18.4" width="4.5" height="1.6" rx="0.8" />
      </g>
    </FilledSvg>
  )
}

// Lightbulb — glowing yellow bulb with yellow rays and an engraved base.
export function IdeaHubIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <g fill="#FFD43B" fillOpacity="0.75">
        <rect x="11.2" y="1.4" width="1.6" height="3" rx="0.8" />
        <rect x="2.6" y="9.6" width="3" height="1.6" rx="0.8" />
        <rect x="18.4" y="9.6" width="3" height="1.6" rx="0.8" />
        <rect x="4.6" y="3.9" width="1.6" height="3" rx="0.8" transform="rotate(-45 5.4 5.4)" />
        <rect x="17.8" y="3.9" width="1.6" height="3" rx="0.8" transform="rotate(45 18.6 5.4)" />
      </g>
      <path
        fill="#FFD43B"
        d="M12 4a6 6 0 0 0-3.65 10.76c.5.38.85.98.95 1.62l.16 1.02h5.08l.16-1.02c.1-.64.45-1.24.95-1.62A6 6 0 0 0 12 4z"
      />
      <path fill={INK} fillOpacity="0.28" d="M9.4 18.4h5.2v.5a1.5 1.5 0 0 1-1.5 1.5h-2.2a1.5 1.5 0 0 1-1.5-1.5v-.5z" />
    </FilledSvg>
  )
}

export function ActionsPendingIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
      <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
      <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
      <path d="M11 6l9 0" />
      <path d="M11 12l9 0" />
      <path d="M11 18l9 0" />
    </Svg>
  )
}

export function Form16Icon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M9 12h6" />
      <path d="M9 15h6" />
      <path d="M9 18h4" />
    </Svg>
  )
}

// Health shield — solid shield with an engraved medical cross.
export function MediclaimIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <path d="M12 2.4 4.4 5.3v5.3c0 4.8 3.2 8.6 7.6 10 4.4-1.4 7.6-5.2 7.6-10V5.3L12 2.4z" />
      <path fill={INK} fillOpacity="0.24" d="M10.8 7.4h2.4v3.4h3.4v2.4h-3.4v3.4h-2.4v-3.4H7.4v-2.4h3.4z" />
    </FilledSvg>
  )
}

// Monitor — solid body, dark screen inset with white bar chart, white stand.
export function ItSummitIcon({ size = 24, className = '' }) {
  return (
    <FilledSvg size={size} className={className}>
      <rect x="2.4" y="4" width="19.2" height="12" rx="2.2" />
      <rect x="4.5" y="6" width="15" height="8" rx="1.2" fill={INK} fillOpacity="0.2" />
      <g>
        <rect x="6.8" y="10" width="1.9" height="2.6" rx="0.5" />
        <rect x="10.4" y="8.4" width="1.9" height="4.2" rx="0.5" />
        <rect x="14" y="9.3" width="1.9" height="3.3" rx="0.5" />
      </g>
      <path d="M8.8 17.4h6.4l1 2.6H7.8z" />
    </FilledSvg>
  )
}

export function DeliciaIcon({ size = 24, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M27.2 7.4C15.8 7.4 6.6 18.4 6.6 32s9.2 24.6 20.6 24.6V45.5C21.1 45.5 16 39.5 16 32s5.1-13.5 11.2-13.5V7.4z" />
      <path d="M27.2 20.5C22.1 20.5 18 25.7 18 32s4.1 11.5 9.2 11.5v-23z" />
      <path d="M37.4 7.4c-1 0-1.8.8-1.8 1.8V26c0 2.4 1.2 4.6 3.2 5.9 1.3.9 2.1 2.3 2.1 3.9l-1.2 17a4.3 4.3 0 0 0 8.6 0l-1.2-17c0-1.6.8-3 2.1-3.9 2-1.3 3.2-3.5 3.2-5.9V9.2c0-1-.8-1.8-1.8-1.8s-1.8.8-1.8 1.8v15.7c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6V9.2c0-1-.8-1.8-1.8-1.8S42 8.2 42 9.2v15.7c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6V9.2c.4-1-.4-1.8-1.4-1.8z" />
      <path d="M58.4 9.5c-.2-1.2-1.7-1.7-2.6-.8-3 3-4.8 7.4-4.8 11.8v9.1c0 1.5 1.2 2.7 2.7 2.7h.7l-1.8 20.3a4 4 0 0 0 8 0L58.4 9.5z" />
    </svg>
  )
}

export function CsrIcon({ size = 24, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="translate(0 -1)">
        <path
          d="M16 2.8C10.4 8.4 7.7 12.7 7.7 17.1c0 5.1 3.7 8.4 8.3 8.4s8.3-3.3 8.3-8.4c0-4.4-2.7-8.7-8.3-14.3z"
          fill="#1D63FF"
          stroke="#082A8C"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <ellipse cx="16" cy="15.4" rx="5.8" ry="2.2" fill="#8EC5FF" opacity="0.85" />
      </g>
      <g transform="translate(0 0.6)">
        <path
          d="M15.4 24.8C10.4 23.6 6.8 20.9 4.7 17c4.6-.5 8.1.9 10.7 4.1z"
          fill="#43D613"
          stroke="#169D00"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16.6 24.8c5-1.2 8.6-3.9 10.7-7.8c-4.6-.5-8.1.9-10.7 4.1z"
          fill="#43D613"
          stroke="#169D00"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M16 21.2v6.3" stroke="#0E8E00" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

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

export function TeamDirectoryIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
      <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M17 10h2a2 2 0 0 1 2 2v1" />
      <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
    </Svg>
  )
}

export function PoliciesIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" />
      <path d="M6 9l4 4" />
      <path d="M13 10l-4 -4" />
      <path d="M3 21h7" />
      <path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" />
    </Svg>
  )
}

export function BenefitsIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
      <path d="M12 8l0 13" />
      <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
    </Svg>
  )
}

export function TravelIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </Svg>
  )
}

export function LeaveAttendanceIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h9a2 2 0 0 1 2 2v9m-.184 3.839a2 2 0 0 1 -1.816 1.161h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 1.158 -1.815" />
      <path d="M16 3v4" />
      <path d="M8 3v1" />
      <path d="M4 11h7m4 0h5" />
      <path d="M3 3l18 18" />
    </Svg>
  )
}

export function CompensationIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
      <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
    </Svg>
  )
}

export function RecognitionGemIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 21l8 0" />
      <path d="M12 17l0 4" />
      <path d="M7 4l10 0" />
      <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
      <path d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    </Svg>
  )
}

export function BoltLearningIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
      <path d="M19 16h-12a2 2 0 0 0 -2 2" />
      <path d="M9 8h6" />
    </Svg>
  )
}

export function HealthWellnessIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" />
      <path d="M3 13h2l2 3l2 -6l1 3h3" />
    </Svg>
  )
}

export function HolidayCalendarIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 21h-5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3.5" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h11" />
      <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
    </Svg>
  )
}

export function DocumentsIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
    </Svg>
  )
}

export function IdeaHubIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17l4.6 0" />
    </Svg>
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

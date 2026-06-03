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
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
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
      <g transform="rotate(-28 12 12)">
        <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
      </g>
    </Svg>
  )
}

export function LeaveAttendanceIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v5.5" />
      <path d="M4 10h14" />
      <path d="M8 3v4" />
      <path d="M14 3v4" />
      <path d="M4 10v8a2 2 0 0 0 2 2h6.5" />
      <path d="M8 14h2" />
      <path d="M15.5 17.5m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M15.5 15.5v2.2l1.7 1" />
    </Svg>
  )
}

export function CompensationIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 5h10" />
      <path d="M7 9h10" />
      <path d="M9 5c5 0 6 6 -1 6l7 8" />
      <path d="M8 11h3" />
    </Svg>
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
      <g fill="#FFD43B" transform="translate(16 16) scale(1.14) translate(-16 -16)">
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

export function BoltLearningIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9l9 -4l9 4l-9 4z" />
      <path d="M7 11v4.5c0 1.4 2.2 2.5 5 2.5s5 -1.1 5 -2.5v-4.5" />
      <path d="M21 9v5" />
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
      <path d="M4 6h14a2 2 0 0 1 2 2v4" />
      <path d="M4 6v15h9" />
      <path d="M4 10h16" />
      <path d="M7 3v5" />
      <path d="M11 3v5" />
      <path d="M15 3v5" />
      <path d="M7.5 13.5h1" />
      <path d="M11.5 13.5h1" />
      <path d="M7.5 17.5h1" />
      <path d="M16 16a3.6 3.6 0 0 1 7.2 0" />
      <path d="M19.6 16v4.4" />
      <path d="M16.5 20.5h5.2" />
      <path d="M15.5 22h7.2" />
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

export function MediclaimIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3c-1.657 0 -3 1.343 -3 3v2h-4a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-10a2 2 0 0 0 -2 -2h-4v-2c0 -1.657 -1.343 -3 -3 -3z" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </Svg>
  )
}

export function ItSummitIcon({ size = 24, strokeWidth = 2, className = '' }) {
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
      <path d="M7 20h10" />
      <path d="M9 16v4" />
      <path d="M15 16v4" />
      <path d="M8 11l3 -3l2 2l3 -3" />
    </Svg>
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

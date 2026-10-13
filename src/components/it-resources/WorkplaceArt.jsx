/*
 * Glossy "3D" artwork for the Workplace shelf, drawn to sit beside the
 * Pitstop's rendered icons: brand-blue bodies, white enamel, gold trim, and a
 * soft highlight on each top-left face. Gradients carry the volume; the
 * pedestal comes from the tile, not from here.
 *
 * Gradient ids are prefixed per icon so they never collide on the page.
 */

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0" stopColor="#6FA0EA" />
        <stop offset="0.45" stopColor="#2F6BC4" />
        <stop offset="1" stopColor="#123F86" />
      </linearGradient>
      <linearGradient id={`${id}-white`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#D5E1F3" />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0" stopColor="#FFE08A" />
        <stop offset="0.5" stopColor="#F5B935" />
        <stop offset="1" stopColor="#C9820F" />
      </linearGradient>
      <radialGradient id={`${id}-shine`} cx="0.3" cy="0.25" r="0.6">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

function Svg({ size, className, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function UtsahArt({ size = 80, className = '' }) {
  const id = 'wa-utsah'
  return (
    <Svg size={size} className={className}>
      <Defs id={id} />
      <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#8FDB7A" />
        <stop offset="1" stopColor="#2E8B47" />
      </linearGradient>
      <path d="M14 62c-6-10-2-20 8-22 2 9-1 17-8 22Z" fill={`url(#${id}-leaf)`} />
      <path d="M66 62c6-10 2-20-8-22-2 9 1 17 8 22Z" fill={`url(#${id}-gold)`} />
      <circle cx="40" cy="38" r="25" fill={`url(#${id}-blue)`} />
      <path
        d="M40 13a25 25 0 0 1 0 50a12.5 12.5 0 0 1 0-25a12.5 12.5 0 0 0 0-25Z"
        fill={`url(#${id}-white)`}
      />
      <circle cx="40" cy="25.5" r="4.5" fill={`url(#${id}-gold)`} />
      <circle cx="40" cy="50.5" r="4.5" fill={`url(#${id}-blue)`} />
      <circle cx="40" cy="38" r="25" fill={`url(#${id}-shine)`} />
    </Svg>
  )
}

export function CrecheArt({ size = 80, className = '' }) {
  const id = 'wa-creche'
  return (
    <Svg size={size} className={className}>
      <Defs id={id} />
      {/* mobile */}
      <path d="M56 8v14" stroke={`url(#${id}-blue)`} strokeWidth="3" strokeLinecap="round" />
      <path d="M44 14h20" stroke={`url(#${id}-blue)`} strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="m46 14 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5Z"
        fill={`url(#${id}-gold)`}
      />
      <path d="M64 16a4 4 0 1 1-3 6.6 3.2 3.2 0 0 0 3-6.6Z" fill="#E6ECF7" />
      {/* teddy */}
      <circle cx="27" cy="31" r="4" fill="#B97A3F" />
      <circle cx="41" cy="31" r="4" fill="#B97A3F" />
      <circle cx="34" cy="37" r="9" fill="#D69A55" />
      <ellipse cx="34" cy="40" rx="4" ry="3" fill="#F2D2A4" />
      <circle cx="30.5" cy="35.5" r="1.2" fill="#3B2A1A" />
      <circle cx="37.5" cy="35.5" r="1.2" fill="#3B2A1A" />
      {/* cradle */}
      <path d="M12 42h56l-4 14a8 8 0 0 1-7.7 6H23.7A8 8 0 0 1 16 56Z" fill={`url(#${id}-white)`} />
      <path d="M12 42h56" stroke={`url(#${id}-blue)`} strokeWidth="4" strokeLinecap="round" />
      {[22, 30, 38, 46, 54].map((x) => (
        <path
          key={x}
          d={`M${x + 2} 46v12`}
          stroke="#3B74CC"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ))}
      <path
        d="M58 42c0-14 6-22 12-22"
        stroke={`url(#${id}-blue)`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 66c10 6 42 6 52 0"
        stroke={`url(#${id}-gold)`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M12 42h56l-4 14a8 8 0 0 1-7.7 6H23.7A8 8 0 0 1 16 56Z" fill={`url(#${id}-shine)`} />
    </Svg>
  )
}

export function DeliciaArt({ size = 80, className = '' }) {
  const id = 'wa-delicia'
  return (
    <Svg size={size} className={className}>
      <Defs id={id} />
      <circle cx="33" cy="22" r="4" fill={`url(#${id}-gold)`} />
      <path d="M8 52a25 27 0 0 1 50 0Z" fill={`url(#${id}-blue)`} />
      <path d="M8 52a25 27 0 0 1 50 0Z" fill={`url(#${id}-shine)`} />
      <rect x="4" y="51" width="58" height="7" rx="3.5" fill={`url(#${id}-gold)`} />
      {/* fork */}
      <path
        d="M66 22v12a3 3 0 0 1-6 0V22M63 22v10M63 34v28"
        stroke={`url(#${id}-gold)`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* knife */}
      <path
        d="M73 20c-3 4-3 14 0 18v24"
        stroke={`url(#${id}-gold)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function RaiseItArt({ size = 80, className = '' }) {
  const id = 'wa-raiseit'
  return (
    <Svg size={size} className={className}>
      <Defs id={id} />
      <rect x="8" y="14" width="50" height="34" rx="4" fill={`url(#${id}-blue)`} />
      <rect x="12" y="18" width="42" height="26" rx="2" fill="#1C4E9E" />
      <path d="M4 50h58l-4 6H8Z" fill={`url(#${id}-white)`} />
      {/* gear */}
      <g transform="translate(33 31)" fill="#FFFFFF">
        {[0, 45, 90, 135].map((a) => (
          <rect
            key={a}
            x="-1.8"
            y="-9"
            width="3.6"
            height="18"
            rx="1.2"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="6.5" />
        <circle r="2.8" fill="#1C4E9E" />
      </g>
      <rect x="8" y="14" width="50" height="34" rx="4" fill={`url(#${id}-shine)`} />
      {/* ticket */}
      <rect
        x="50"
        y="30"
        width="24"
        height="30"
        rx="3.5"
        fill={`url(#${id}-white)`}
        stroke="#C6D5EE"
      />
      <path
        d="M55 38h14M55 44h14M55 50h9"
        stroke="#2F6BC4"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function IntercomArt({ size = 80, className = '' }) {
  const id = 'wa-intercom'
  return (
    <Svg size={size} className={className}>
      <Defs id={id} />
      <rect
        x="14"
        y="8"
        width="36"
        height="58"
        rx="7"
        fill={`url(#${id}-white)`}
        stroke="#C6D5EE"
      />
      <circle cx="32" cy="28" r="10" fill={`url(#${id}-blue)`} />
      <circle cx="32" cy="28" r="4.5" fill="#123F86" />
      <circle cx="29.5" cy="25.5" r="2" fill="#FFFFFF" fillOpacity="0.8" />
      <path d="M23 46h18M23 52h18" stroke="#2F6BC4" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="14" y="8" width="36" height="58" rx="7" fill={`url(#${id}-shine)`} />
      <path
        d="M57 26c4 4 4 12 0 16M63 21c7 7 7 19 0 26M69 16c10 10 10 26 0 36"
        stroke={`url(#${id}-blue)`}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function GatepassArt({ size = 80, className = '' }) {
  const id = 'wa-gatepass'
  return (
    <Svg size={size} className={className}>
      <Defs id={id} />
      <rect
        x="31"
        y="4"
        width="14"
        height="12"
        rx="4"
        stroke={`url(#${id}-gold)`}
        strokeWidth="3.5"
      />
      <rect x="12" y="12" width="50" height="58" rx="7" fill={`url(#${id}-blue)`} />
      <rect x="17" y="22" width="40" height="42" rx="4" fill={`url(#${id}-white)`} />
      <circle cx="37" cy="36" r="7" fill="#2F6BC4" />
      <path d="M24 58a13 11 0 0 1 26 0Z" fill="#2F6BC4" />
      <rect x="12" y="12" width="50" height="58" rx="7" fill={`url(#${id}-shine)`} />
      {/* shield */}
      <path
        d="M62 44l12 4v8c0 8-5.5 13-12 16-6.5-3-12-8-12-16v-8Z"
        fill={`url(#${id}-gold)`}
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <path
        d="m56.5 57 4 4 7-8"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

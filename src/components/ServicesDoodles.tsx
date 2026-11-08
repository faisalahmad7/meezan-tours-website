/**
 * Line-doodle wallpaper for the Services section: the things a pilgrimage is made of
 * (aircraft, luggage, Kaaba, hotel bed, prayer beads, passport, coach, mosque, crescent).
 * One consistent stroke weight and a repeating 440px tile; drawn in muted gold so it never fights the cards.
 */
const PLANE = 'M12 0 L4 -2 L-1 -10 L-4 -10 L-2 -2 L-8 -2 L-10 -5 L-12 -5 L-11 0 L-12 5 L-10 5 L-8 2 L-2 2 L-4 10 L-1 10 L4 2 Z'
const BEADS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2
  return [Math.cos(a) * 19, Math.sin(a) * 19] as const
})

function Doodle({ x, y, r = 0, s = 1, children }: { x: number; y: number; r?: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>{children}</g>
}

export default function ServicesDoodles({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id="svc-doodles" width="440" height="440" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#b8923a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {/* aircraft */}
            <Doodle x={62} y={64} r={-24} s={2.3}><path d={PLANE} strokeWidth="0.8" /></Doodle>
            {/* suitcase */}
            <Doodle x={206} y={56} r={8}>
              <rect x="-22" y="-14" width="44" height="32" rx="5" />
              <path d="M-9 -14v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6M-10 -14V18M10 -14V18M-22 2h44" />
            </Doodle>
            {/* Kaaba */}
            <Doodle x={346} y={70} r={-6}>
              <rect x="-18" y="-14" width="36" height="30" rx="1.5" />
              <path d="M-18 -6H18M-18 -2H18" />
              <rect x="4" y="3" width="8" height="13" rx="1" />
            </Doodle>
            {/* hotel bed */}
            <Doodle x={108} y={196} r={10}>
              <path d="M-26 -12V18M-26 6H26V18M26 6V-2a8 8 0 0 0-8-8H-26" />
              <rect x="-21" y="-6" width="13" height="7" rx="3" />
            </Doodle>
            {/* prayer beads */}
            <Doodle x={262} y={188}>
              {BEADS.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="2.6" />)}
              <path d="M0 19v10M-3 29h6l-3 8z" />
            </Doodle>
            {/* passport */}
            <Doodle x={392} y={206} r={14}>
              <rect x="-16" y="-22" width="32" height="44" rx="3" />
              <circle cx="0" cy="-5" r="8" />
              <path d="M-8-5h16M0-13v16M-9 12h18" />
            </Doodle>
            {/* coach */}
            <Doodle x={70} y={338} r={-8}>
              <rect x="-26" y="-16" width="52" height="30" rx="6" />
              <path d="M-26 3H26M-20-10h12v9h-12zM-5-10h12v9H-5zM10-10h11v9H10z" />
              <circle cx="-14" cy="16" r="4.2" /><circle cx="14" cy="16" r="4.2" />
            </Doodle>
            {/* mosque */}
            <Doodle x={214} y={330}>
              <path d="M-22 16V6a20 20 0 0 1 40 0v10zM-2-14v-8M-2-22l2-3 2 3" />
              <path d="M24 16V-14l3-5 3 5V16M24-4h6" />
            </Doodle>
            {/* crescent and star */}
            <Doodle x={352} y={346} r={-14}>
              <path d="M6-17a18 18 0 1 0 0 34 14 14 0 1 1 0-34z" />
              <path d="M17-5l2 5 5 .5-4 3.5 1.5 5-4.5-3-4.5 3 1.5-5-4-3.5 5-.5z" />
            </Doodle>
            {/* fillers */}
            <path d="M150 120l4 4-4 4-4-4zM316 140l4 4-4 4-4-4zM170 270l4 4-4 4-4-4zM26 232l3 3-3 3-3-3zM420 306l3 3-3 3-3-3zM288 410l3 3-3 3-3-3z" strokeWidth="1.2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#svc-doodles)" />
    </svg>
  )
}

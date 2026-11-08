/**
 * Hero route: one slim gold aircraft flies a clean arc from Mumbai to Makkah while the route draws itself behind it.
 * No trail, no loop: the line is simply "the part already flown", then it fades and the flight starts again.
 * Decorative only. Sized and placed by the parent. The plane and the drawing line share one timeline (see .fp-* in index.css).
 */
const ROUTE = 'M14 124 C 104 -8, 282 -8, 386 70'
const PLANE = 'M12 0 L4 -2 L-1 -10 L-4 -10 L-2 -2 L-8 -2 L-10 -5 L-12 -5 L-11 0 L-12 5 L-10 5 L-8 2 L-2 2 L-4 10 L-1 10 L4 2 Z'

export default function FlightPath({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 150" aria-hidden="true" focusable="false" className={`fp ${className}`}>
      <defs>
        <linearGradient id="fp-line" x1="0" x2="1"><stop offset="0" stopColor="#f0d588" stopOpacity=".25" /><stop offset="1" stopColor="#fff1c2" stopOpacity="1" /></linearGradient>
      </defs>
      {/* the full route, always faintly visible */}
      <path d={ROUTE} fill="none" stroke="#e9d8a6" strokeOpacity=".5" strokeWidth="1.2" strokeDasharray="1.5 6" strokeLinecap="round" />
      {/* the part already flown */}
      <path d={ROUTE} pathLength="1" fill="none" stroke="url(#fp-line)" strokeWidth="2" strokeLinecap="round" className="fp-draw" />

      {/* origin */}
      <circle cx="14" cy="124" r="4.5" fill="#fbf8f0" stroke="#d9b96a" strokeWidth="1.5" />
      <text x="14" y="143" fill="#fff7dc" fontSize="9.5" fontWeight="700" letterSpacing="1.6" style={{ paintOrder: 'stroke', stroke: 'rgba(8,42,33,.65)', strokeWidth: 3 }}>MUMBAI</text>
      {/* destination: a tiny Kaaba */}
      <g transform="translate(386 70)">
        <rect x="-7" y="-7" width="14" height="14" rx="1.5" fill="#101a16" stroke="#d9b96a" strokeWidth="1.3" />
        <rect x="-7" y="-3.2" width="14" height="2.4" fill="#d9b96a" />
      </g>
      <text x="392" y="94" textAnchor="end" fill="#fff7dc" fontSize="9.5" fontWeight="700" letterSpacing="1.6" style={{ paintOrder: 'stroke', stroke: 'rgba(8,42,33,.65)', strokeWidth: 3 }}>MAKKAH</text>

      <g className="fp-plane" style={{ offsetPath: `path('${ROUTE}')` }}>
        <g transform="scale(.62)"><path d={PLANE} fill="#fff7dc" stroke="#d9b96a" strokeWidth="1.1" strokeLinejoin="round" /></g>
      </g>
    </svg>
  )
}

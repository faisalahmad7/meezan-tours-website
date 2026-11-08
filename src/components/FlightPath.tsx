/**
 * Pilgrim route, drawn as a clean loop:
 *   Mumbai -> Jeddah (flight), Jeddah -> Makkah (coach), Makkah -> Madinah (coach), Madinah -> Jeddah (coach), Jeddah -> Mumbai (flight).
 * Static geometry, gently flowing dashes show the direction of travel. No moving aircraft to drift out of line.
 * Purely illustrative (not to scale). Sized by the parent; see .fp-* in revisions.css.
 */
const PLANE = 'M12 0 L4 -2 L-1 -10 L-4 -10 L-2 -2 L-8 -2 L-10 -5 L-12 -5 L-11 0 L-12 5 L-10 5 L-8 2 L-2 2 L-4 10 L-1 10 L4 2 Z'
const M = [30, 104] as const
const J = [250, 100] as const
const K = [330, 152] as const
const D = [352, 46] as const
const OUT = `M${M[0]} ${M[1]} C 96 36, 180 36, ${J[0]} ${J[1]}`
const BACK = `M${J[0]} ${J[1]} C 180 172, 96 172, ${M[0]} ${M[1]}`
const J_K = `M${J[0]} ${J[1]} Q 296 112, ${K[0]} ${K[1]}`
const K_D = `M${K[0]} ${K[1]} Q 372 100, ${D[0]} ${D[1]}`
const D_J = `M${D[0]} ${D[1]} Q 306 56, ${J[0]} ${J[1]}`
function Bus({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="11" fill="#134234" stroke="#e8c767" strokeWidth="1.2" />
      <g fill="none" stroke="#fff1c2" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-6" y="-5" width="12" height="9" rx="1.6" />
        <path d="M-6 -1h12M-3.5 4v1.6M3.5 4v1.6" />
      </g>
    </g>
  )
}
function Plane({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <circle r="12" fill="#134234" stroke="#e8c767" strokeWidth="1.2" />
      <g transform="scale(.6)"><path d={PLANE} fill="#fff1c2" stroke="#e8c767" strokeWidth="1" strokeLinejoin="round" /></g>
    </g>
  )
}
const label = { fill: '#fff7dc', fontSize: 10, fontWeight: 700, letterSpacing: 1.6, paintOrder: 'stroke', stroke: 'rgba(8,42,33,.85)', strokeWidth: 3.5 } as const
export default function FlightPath({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 200" role="img" aria-label="Pilgrim route: Mumbai to Jeddah by flight, coach from Jeddah to Makkah, Makkah to Madinah and Madinah back to Jeddah, then flight from Jeddah to Mumbai." className={`fp ${className}`}>
      <g fill="none" strokeLinecap="round">
        {/* flights: solid gold, flowing */}
        <path d={OUT} stroke="#f0d588" strokeWidth="2" strokeDasharray="5 5" className="fp-flow" />
        <path d={BACK} stroke="#f0d588" strokeWidth="2" strokeDasharray="5 5" className="fp-flow" />
        {/* coaches: lighter, shorter dashes */}
        <path d={J_K} stroke="#fbf8f0" strokeOpacity=".85" strokeWidth="1.8" strokeDasharray="2 5" className="fp-flow" />
        <path d={K_D} stroke="#fbf8f0" strokeOpacity=".85" strokeWidth="1.8" strokeDasharray="2 5" className="fp-flow" />
        <path d={D_J} stroke="#fbf8f0" strokeOpacity=".85" strokeWidth="1.8" strokeDasharray="2 5" className="fp-flow" />
      </g>
      <Plane x={134} y={55} r={0} />
      <Plane x={134} y={153} r={180} />
      <Bus x={284} y={119} />
      <Bus x={346} y={99} />
      <Bus x={296} y={64} />
      {/* cities */}
      {[M, J, K, D].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#e8c767" fillOpacity=".25" className="fp-pulse" />
          <circle cx={x} cy={y} r="5.5" fill="#fbf8f0" stroke="#e8c767" strokeWidth="1.8" />
        </g>
      ))}
      <text x={M[0] - 8} y={M[1] + 22} style={label}>MUMBAI</text>
      <text x={J[0] - 6} y={J[1] + 24} textAnchor="middle" style={label}>JEDDAH</text>
      <text x={K[0]} y={K[1] + 22} textAnchor="middle" style={label}>MAKKAH</text>
      <text x={D[0]} y={D[1] - 12} textAnchor="middle" style={label}>MADINAH</text>
      {/* legend */}
      <g transform="translate(14 176)" style={{ fontSize: 9, fontWeight: 600 }} fill="#fff7dc">
        <path d="M0 0h18" stroke="#f0d588" strokeWidth="2" strokeDasharray="5 5" />
        <text x="24" y="3" style={{ ...label, strokeWidth: 3, letterSpacing: 0.6 }}>Flight</text>
        <path d="M70 0h18" stroke="#fbf8f0" strokeOpacity=".85" strokeWidth="1.8" strokeDasharray="2 5" />
        <text x="94" y="3" style={{ ...label, strokeWidth: 3, letterSpacing: 0.6 }}>Coach</text>
      </g>
    </svg>
  )
}

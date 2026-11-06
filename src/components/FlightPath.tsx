/**
 * Hero flight lane: a gold plane leaves Mumbai, trails a glowing line over the Kaaba arch and lands at Makkah,
 * then the whole sequence repeats. Soft clouds drift underneath. Pure CSS/SVG, decorative only.
 * One SVG for large screens and one tuned for phones, so labels stay readable on both.
 */
const PLANE = 'M24 0 L8 -3.5 L-1 -19 L-7 -19 L-3 -3.5 L-15 -3.5 L-19 -9 L-23 -9 L-20 0 L-23 9 L-19 9 L-15 3.5 L-3 3.5 L-7 19 L-1 19 L8 3.5 Z'

interface Cfg { vb: string; d: string; from: [number, number]; to: [number, number]; cls: string; label: number }
const DESK: Cfg = { vb: '0 0 1440 230', d: 'M64 150 C 340 0, 1000 -8, 1376 138', from: [64, 150], to: [1376, 138], cls: 'hidden lg:block', label: 13 }
const MOB: Cfg = { vb: '0 0 400 130', d: 'M34 104 C 110 -16, 280 -18, 352 88', from: [34, 104], to: [352, 88], cls: 'lg:hidden', label: 9 }

function Lane({ c }: { c: Cfg }) {
  const id = c.cls.startsWith('hidden') ? 'd' : 'm'
  return (
    <svg viewBox={c.vb} preserveAspectRatio="xMidYMin meet" aria-hidden="true" focusable="false" className={`flight-lane pointer-events-none absolute inset-x-0 top-0 z-[1] mx-auto h-auto w-full max-w-[1600px] ${c.cls}`}>
      <defs>
        <linearGradient id={`fl-trail-${id}`} gradientUnits="userSpaceOnUse" x1={c.from[0]} x2={c.to[0]} y1="0" y2="0"><stop offset="0" stopColor="#d9b96a" stopOpacity="0" /><stop offset=".6" stopColor="#f0d588" /><stop offset="1" stopColor="#fff7dc" /></linearGradient>
        <radialGradient id={`fl-halo-${id}`}><stop offset="0" stopColor="#f0d588" stopOpacity=".65" /><stop offset="1" stopColor="#f0d588" stopOpacity="0" /></radialGradient>
        <filter id={`fl-blur-${id}`} x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id={`fl-cloud-${id}`}><feGaussianBlur stdDeviation="14" /></filter>
      </defs>

      {/* drifting clouds */}
      <g filter={`url(#fl-cloud-${id})`} fill="#fff" fillOpacity=".09">
        <ellipse className="fl-cloud fl-cloud-1" cx="200" cy={c.from[1] - 40} rx="150" ry="22" />
        <ellipse className="fl-cloud fl-cloud-2" cx="800" cy={c.from[1] - 70} rx="210" ry="26" />
        <ellipse className="fl-cloud fl-cloud-3" cx="1150" cy={c.from[1] - 20} rx="130" ry="18" />
      </g>

      {/* the route: faint dotted guide, then the glowing trail that draws itself as the plane flies */}
      <path d={c.d} fill="none" stroke="#d9b96a" strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" />
      <path d={c.d} pathLength="1" fill="none" stroke="#f0d588" strokeOpacity=".7" strokeWidth="7" strokeLinecap="round" filter={`url(#fl-blur-${id})`} className="fl-trail" />
      <path d={c.d} pathLength="1" fill="none" stroke={`url(#fl-trail-${id})`} strokeWidth="2.6" strokeLinecap="round" className="fl-trail" />

      {/* airports */}
      {([[c.from, 'MUMBAI'], [c.to, 'MAKKAH']] as const).map(([[x, y], name], i) => (
        <g key={name}>
          <circle cx={x} cy={y} r="22" fill={`url(#fl-halo-${id})`} className={i ? 'fl-arrive' : ''} />
          <circle cx={x} cy={y} r="5" fill="#f0d588" />
          <circle cx={x} cy={y} r="11" fill="none" stroke="#f0d588" strokeOpacity=".5" className={i ? 'fl-ring' : ''} />
          <text x={x} y={y + 30 + c.label} textAnchor="middle" fill="#fbf8f0" fillOpacity=".85" fontSize={c.label} letterSpacing={c.label / 4}>{name}</text>
        </g>
      ))}

      {/* the plane: follows the same path, nose along the tangent */}
      <g className="fl-plane" style={{ offsetPath: `path('${c.d}')` }}>
        <circle r="30" fill={`url(#fl-halo-${id})`} />
        <g transform={c.cls.startsWith('hidden') ? 'scale(1.15)' : 'scale(.75)'}><path d={PLANE} fill="#fff7dc" stroke="#d9b96a" strokeWidth="1.2" strokeLinejoin="round" /></g>
      </g>
    </svg>
  )
}

export default function FlightPath() {
  return (<><Lane c={DESK} /><Lane c={MOB} /></>)
}

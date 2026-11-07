/**
 * Hero orbit: a slim gold aircraft circles the Kaaba arch on a fine elliptical track, leaving a fading comet trail,
 * the way pilgrims circle the Kaaba. Purely decorative; sized and placed by the parent stage.
 */
const TRACK = 'M100 10 A92 110 0 1 1 99.99 10'
const PLANE = 'M12 0 L4 -2 L-1 -10 L-4 -10 L-2 -2 L-8 -2 L-10 -5 L-12 -5 L-11 0 L-12 5 L-10 5 L-8 2 L-2 2 L-4 10 L-1 10 L4 2 Z'

export default function FlightPath({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true" focusable="false" className={`orbit pointer-events-none ${className}`}>
      <defs>
        <radialGradient id="orbit-halo"><stop offset="0" stopColor="#f0d588" stopOpacity=".8" /><stop offset="1" stopColor="#f0d588" stopOpacity="0" /></radialGradient>
        <filter id="orbit-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>
      {/* tracks */}
      <ellipse cx="100" cy="120" rx="92" ry="110" fill="none" stroke="#d9b96a" strokeOpacity=".32" strokeWidth=".5" strokeDasharray=".6 3" strokeLinecap="round" />
      <ellipse cx="100" cy="120" rx="98" ry="117" fill="none" stroke="#d9b96a" strokeOpacity=".14" strokeWidth=".4" />
      {/* comet trail: three nested dashes, longest faintest, all ending at the aircraft */}
      <g fill="none" strokeLinecap="round">
        <path d={TRACK} pathLength="1" stroke="#f0d588" strokeOpacity=".18" strokeWidth="1.2" className="orbit-tail orbit-tail-1" />
        <path d={TRACK} pathLength="1" stroke="#f0d588" strokeOpacity=".42" strokeWidth="1.6" className="orbit-tail orbit-tail-2" />
        <path d={TRACK} pathLength="1" stroke="#fff7dc" strokeOpacity=".95" strokeWidth="1.9" filter="url(#orbit-blur)" className="orbit-tail orbit-tail-3" />
      </g>
      <g className="orbit-plane" style={{ offsetPath: `path('${TRACK}')` }}>
        <circle r="7" fill="url(#orbit-halo)" />
        <g transform="scale(.52)"><path d={PLANE} fill="#fff7dc" stroke="#d9b96a" strokeWidth="1" strokeLinejoin="round" /></g>
      </g>
      {/* two tiny fixed stars on the track */}
      <g fill="#f0d588"><circle cx="100" cy="10" r="1.2" className="orbit-twinkle" /><circle cx="100" cy="230" r="1.2" className="orbit-twinkle" style={{ animationDelay: '1.2s' }} /></g>
    </svg>
  )
}

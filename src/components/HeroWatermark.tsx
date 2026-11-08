/**
 * Hero watermark: ONE large, calm Meezan seal behind the headline. Fewer lines than before (no tick marks, no dashed
 * rings) so the hero stays clean. The brand name is set in English around the rim and again in the centre, under the
 * Arabic "" (the balance). Soft gold, fading toward the photos. Sized and placed by .hero-wm in revisions.css.
 */
const R = 408
const CIRCLE = `M500 500 m-${R} 0 a${R} ${R} 0 1 1 ${R * 2} 0 a${R} ${R} 0 1 1 -${R * 2} 0`
const RIM = 'MEEZAN TOURS & TRAVELS  HAJJ & UMRAH  PUNE  '
export default function HeroWatermark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 1000" aria-hidden="true" focusable="false" className={`hero-wm pointer-events-none ${className}`}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="500" cy="500" r="488" strokeWidth="3" />
        <circle cx="500" cy="500" r="466" strokeWidth="1.2" />
        <circle cx="500" cy="500" r="350" strokeWidth="2" />
        <circle cx="500" cy="500" r="338" strokeWidth="1" />
        <g className="hero-wm-star">
          <path d="M500 190L810 500L500 810L190 500Z" strokeWidth="1.8" />
          <path d="M296 296H704V704H296Z" strokeWidth="1.8" />
        </g>
        <circle cx="500" cy="500" r="206" strokeWidth="1.6" />
      </g>
      <defs><path id="hero-wm-rim" d={CIRCLE} /></defs>
      <g className="hero-wm-rim" fill="currentColor">
        <text fontFamily="'Playfair Display Variable','Playfair Display',Georgia,serif" fontSize="44" fontWeight="800">
          <textPath href="#hero-wm-rim" textLength={Math.floor(2 * Math.PI * R) - 8} lengthAdjust="spacing">{RIM + RIM}</textPath>
        </text>
      </g>
      {/* centre: Arabic above, English below, on a plain disc so nothing crosses the lettering */}
      <circle cx="500" cy="500" r="196" fill="#134234" fillOpacity=".9" />
      <text x="500" y="505" textAnchor="middle" fill="currentColor" fontFamily="Amiri,'Noto Naskh Arabic',serif" fontSize="132" direction="rtl"></text>
      <path d="M410 552H590" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <text x="500" y="618" textAnchor="middle" fill="currentColor" fontFamily="'Playfair Display Variable','Playfair Display',Georgia,serif" fontSize="68" fontWeight="800" letterSpacing="10">MEEZAN</text>
    </svg>
  )
}

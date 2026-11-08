/**
 * Hero watermark: one large, complete Meezan seal (fine geometric rings, an eight-pointed star, the brand name set
 * around the rim and "ميزان", Arabic for the balance/scale, at the centre). It sits behind the headline in soft gold
 * and fades toward the photos, so the hero reads as Meezan's without competing with the text.
 */
const R = 415
const CIRCLE = `M500 500 m-${R} 0 a${R} ${R} 0 1 1 ${R * 2} 0 a${R} ${R} 0 1 1 -${R * 2} 0`
const RIM = 'MEEZAN TOURS & TRAVELS ✦ HAJJ & UMRAH ✦ PUNE ✦ '

export default function HeroWatermark({ className = '' }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5)
  return (
    <svg viewBox="0 0 1000 1000" aria-hidden="true" focusable="false" className={`hero-wm pointer-events-none ${className}`}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* outer rings */}
        <circle cx="500" cy="500" r="486" strokeWidth="2" />
        <circle cx="500" cy="500" r="476" strokeWidth="1" strokeDasharray="2 9" />
        <circle cx="500" cy="500" r="352" strokeWidth="1.6" />
        <circle cx="500" cy="500" r="344" strokeWidth="1" />
        {/* minute ticks between the rim text and the inner ring */}
        {ticks.map((a) => (
          <line key={a} x1="500" y1={a % 15 === 0 ? 120 : 130} x2="500" y2="140" strokeWidth={a % 15 === 0 ? 2.2 : 1.2} transform={`rotate(${a} 500 500)`} />
        ))}
        {/* eight-pointed star (two squares) and nested rings */}
        <g className="hero-wm-star">
          <path d="M290 290H710V710H290Z" strokeWidth="1.6" />
          <path d="M500 190L810 500L500 810L190 500Z" strokeWidth="1.6" />
          <path d="M500 250L750 500L500 750L250 500Z" strokeWidth="1" />
        </g>
        <circle cx="500" cy="500" r="232" strokeWidth="1.4" />
        <circle cx="500" cy="500" r="168" strokeWidth="1" strokeDasharray="1.5 7" />
      </g>
      {/* brand name around the rim */}
      <defs><path id="hero-wm-rim" d={CIRCLE} /></defs>
      <g className="hero-wm-rim" fill="currentColor">
        <text fontFamily="'Playfair Display Variable','Playfair Display',Georgia,serif" fontSize="38" fontWeight="700">
          <textPath href="#hero-wm-rim" textLength={Math.floor(2 * Math.PI * R) - 6} lengthAdjust="spacing">{RIM + RIM}</textPath>
        </text>
      </g>
      {/* centre: the balance */}
      <text x="500" y="548" textAnchor="middle" fill="currentColor" fontFamily="Amiri,'Noto Naskh Arabic',serif" fontSize="150" direction="rtl">ميزان</text>
    </svg>
  )
}

/** Thin gold divider with a small eight-point star: the site's one ornamental motif. */
export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold-500 ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500" />
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9Z" /></svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500" />
    </div>
  )
}

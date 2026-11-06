import { SITE } from '@/data/site'

const items = [
  '18+ Years of Experience',
  'Serving Pilgrims Across India',
  'Hajj and Umrah Expertise',
  'Personal Attention Throughout the Journey',
  'Mumbai-to-Mumbai Group Arrangements',
  'Dedicated Pilgrim Guidance',
]

const Row = ({ dup }: { dup?: boolean }) => (
  <ul className={`flex shrink-0 items-center ${dup ? 'ticker-dup' : ''}`} aria-hidden={dup || undefined}>
    {items.map((t) => (
      <li key={t} className="flex items-center whitespace-nowrap font-display text-base font-medium text-ivory sm:text-lg">
        <span className="px-6 sm:px-8">{t}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" className="text-gold-400" fill="currentColor" aria-hidden="true"><path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9Z" /></svg>
      </li>
    ))}
  </ul>
)

/** Emerald ribbon: one slow ticker (paused on hover, static for reduced motion) plus a licence line. */
export default function TrustRibbon() {
  return (
    <section aria-label="Credentials" className="on-dark relative bg-brand-900 text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      <div className="ticker overflow-hidden py-4"><div className="ticker-track"><Row /><Row dup /></div></div>
      <div className="border-t border-gold-500/25 py-2.5 text-center text-xs text-white/70">
        <div className="container">
          Registered Hajj Group Organiser &middot; Licence{' '}
          <a href={SITE.licence.certificateUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-300 underline decoration-dotted underline-offset-2">{SITE.licence.number}</a>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
    </section>
  )
}

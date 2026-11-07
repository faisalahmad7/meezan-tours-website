import { ShieldCheck } from 'lucide-react'
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

/** Emerald ribbon: one continuous ticker, with the licence badge raised so it straddles the ribbon's lower edge. */
export default function TrustRibbon() {
  return (
    <section aria-label="Credentials" className="on-dark relative z-10 bg-brand-900 text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      <div className="ticker overflow-hidden pb-8 pt-4"><div className="ticker-track"><Row /><Row dup /></div></div>
      <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center px-4">
        <p className="inline-flex max-w-full items-center gap-3 rounded-full border-2 border-gold-500 bg-ivory px-5 py-2.5 text-center text-[0.8rem] leading-snug text-ink-700 shadow-lift sm:px-7 sm:text-[0.86rem]">
          <ShieldCheck className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
          <span>Registered Hajj Group Organiser <span className="mx-1 text-gold-600" aria-hidden="true">&middot;</span> Licence{' '}
            <a href={SITE.licence.certificateUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-800 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-brand-600">{SITE.licence.number}</a>
          </span>
        </p>
      </div>
    </section>
  )
}

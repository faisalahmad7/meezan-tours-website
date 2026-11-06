import { SITE } from '@/data/site'

export default function StatsBand() {
  return (
    <section aria-label="Meezan in numbers" className="pattern-dark on-dark text-white">
      <div className="container pb-6 pt-12 sm:pb-8 sm:pt-16">
        <dl className="grid grid-cols-3 divide-x divide-gold-500/30">
          {SITE.stats.map((s) => (
            <div key={s.label} data-reveal className="px-2 text-center sm:px-8">
              <dd className="font-display text-4xl font-semibold text-gold-400 sm:text-6xl">{s.value}</dd>
              <dt className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-white/80 sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

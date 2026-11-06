import { useState } from 'react'
import Button from '@/components/Button'
import CtaBand from '@/components/CtaBand'
import PackageCard from '@/components/PackageCard'
import PageHero from '@/components/PageHero'
import Seo from '@/components/Seo'
import type { PackageKind } from '@/data/types'
import { breadcrumbSchema } from '@/lib/schema'
import { getPackages } from '@/services/content'

const tabs: { id: 'all' | PackageKind; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hajj', label: 'Hajj' },
  { id: 'umrah', label: 'Umrah' },
]

export default function Packages() {
  const [filter, setFilter] = useState<'all' | PackageKind>('all')
  const list = getPackages(filter === 'all' ? undefined : filter)
  return (
    <>
      <Seo path="/packages" title="Hajj & Umrah Packages from Pune | Meezan Tours" description="Compare current Hajj and Umrah packages from Meezan Tours & Travels, Pune: duration, dates, accommodation, inclusions and starting prices." jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Packages', path: '/packages' }])]} />
      <PageHero eyebrow="Packages" title="Hajj and Umrah packages" crumbs={[{ name: 'Packages', path: '/packages' }]} intro="Choose a listed departure or ask for a package built around your family, dates and budget. 18+ years of experience, serving pilgrims across India." />
      <section className="section">
        <div className="container">
          <div role="group" aria-label="Filter packages" className="mb-8 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button key={t.id} type="button" aria-pressed={filter === t.id} onClick={() => setFilter(t.id)} className={`min-h-[2.75rem] rounded-full border px-5 text-sm font-semibold transition ${filter === t.id ? 'border-brand-600 bg-brand-600 text-white' : 'border-sand-300 bg-white text-ink-700 hover:border-brand-600'}`}>{t.label}</button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <PackageCard key={p.id} pkg={p} />)}
            <article className="card flex flex-col justify-center border-dashed bg-sand-100 p-8 text-center">
              <h3 className="text-2xl">Need a custom package?</h3>
              <p className="mt-3 text-ink-500">Tell us your dates, group size, budget and hotel preferences and we will design a package for you.</p>
              <div className="mt-6"><Button to="/contact" variant="primary">Request a custom quote</Button></div>
            </article>
          </div>
          <p className="mt-8 text-sm text-ink-500">Prices and dates shown are those currently listed and may change; our team will confirm the latest details before you book.</p>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

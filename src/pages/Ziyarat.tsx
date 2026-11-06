import Button from '@/components/Button'
import CtaBand from '@/components/CtaBand'
import PageHero from '@/components/PageHero'
import Picture from '@/components/Picture'
import SectionHeading from '@/components/SectionHeading'
import Seo from '@/components/Seo'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'

const desc = 'Guided Ziyarat in Makkah and Madinah with Meezan Tours & Travels, Pune. Visit historic sites with experienced guides as part of your Hajj or Umrah journey.'
const makkah = ['Jabal al-Nur and the Cave of Hira', 'Jabal Thawr', 'Mina, Muzdalifah and Arafat', 'Masjid al-Jinn and other historic sites']
const madinah = ['Masjid Quba', 'Masjid al-Qiblatayn', 'Mount Uhud and the martyrs of Uhud', 'Other historic locations of Madinah']

export default function Ziyarat() {
  return (
    <>
      <Seo path="/ziyarat" title="Ziyarat in Makkah & Madinah | Meezan Tours Pune" description={desc} jsonLd={[serviceSchema('Ziyarat tours', desc, '/ziyarat'), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Ziyarat', path: '/ziyarat' }])]} />
      <PageHero eyebrow="Ziyarat" title="Guided visits to the historic sites" crumbs={[{ name: 'Ziyarat', path: '/ziyarat' }]} intro="Our guides accompany pilgrims on ziyarat and share the history of each place, a detail our pilgrims often mention in their feedback." />
      <section className="section">
        <div className="container grid items-start gap-10 lg:grid-cols-2">
          <div className="grid gap-6">
            <div data-reveal className="card p-7"><h2 className="text-2xl">Makkah</h2><ul className="mt-4 list-disc space-y-2 pl-5">{makkah.map((m) => <li key={m}>{m}</li>)}</ul></div>
            <div data-reveal className="card p-7"><h2 className="text-2xl">Madinah</h2><ul className="mt-4 list-disc space-y-2 pl-5">{madinah.map((m) => <li key={m}>{m}</li>)}</ul></div>
            <p className="text-sm text-ink-500">Sites visited depend on the package, season and local conditions. Your itinerary is confirmed by our team before travel.</p>
          </div>
          <div className="grid gap-4">
            <Picture slug="group-mosque" alt="Meezan pilgrims with their banner in front of a white-domed mosque" ratio="4/3" sizes="(min-width:1024px) 45vw, 100vw" className="rounded-xl2 shadow-lift" />
            <Picture slug="group-hilltop" alt="Meezan group standing in front of a hill with large shade umbrellas" ratio="4/3" sizes="(min-width:1024px) 45vw, 100vw" className="rounded-xl2 shadow-lift" />
          </div>
        </div>
      </section>
      <section className="section pattern-light text-center"><div className="container"><SectionHeading title="Add ziyarat to your journey" intro="Ask about ziyarat when you enquire about Hajj or Umrah." center /><Button to="/contact" variant="primary">Enquire now</Button></div></section>
      <CtaBand />
    </>
  )
}

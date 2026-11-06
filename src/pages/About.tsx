import Button from '@/components/Button'
import CtaBand from '@/components/CtaBand'
import PageHero from '@/components/PageHero'
import Picture from '@/components/Picture'
import SectionHeading from '@/components/SectionHeading'
import Seo from '@/components/Seo'
import StatsBand from '@/components/StatsBand'
import { SITE } from '@/data/site'
import { breadcrumbSchema } from '@/lib/schema'

const offers = [
  'Fully managed Hajj and Umrah packages, group and private departures',
  'Flights, visas, accommodation and ground transport coordination',
  'Guided spiritual itineraries and local support staff',
  'Pre-departure briefings and in-trip assistance',
]

export default function About() {
  return (
    <>
      <Seo path="/about" title="About Meezan Tours & Travels | Pune Hajj & Umrah" description="Meet Meezan Tours & Travels, a Pune-based Hajj and Umrah tour operator registered with the MOMA Hajj Cell as a Hajj Group Organiser." jsonLd={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]} />
      <PageHero eyebrow="About us" title="A Pune team devoted to pilgrims" crumbs={[{ name: 'About', path: '/about' }]} intro="Based in Pune, trusted by pilgrims across India. For 18+ years we have worked to make every Hajj and Umrah journey safe, accessible and well coordinated." />
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who we are" title="18+ years of helping Indians complete their sacred journey" />
            <div className="-mt-6 space-y-4 text-ink-500">
              <p>Meezan Tours is a trusted Hajj and Umrah tour operator based in Pune, Maharashtra. We are registered with the Government of India, Ministry of Minority Affairs (MOMA) Hajj Cell, as a Hajj Group Organiser.</p>
              <p>We focus on comfortable travel, reliable guidance and personal attention, from your first call to your return home.</p>
              <p className="rounded-xl border border-sand-300 bg-white p-4 text-sm text-ink-700">Registration No. <a className="font-semibold text-brand-700 underline" href={SITE.licence.certificateUrl} target="_blank" rel="noopener noreferrer">{SITE.licence.number}</a><br />{SITE.licence.role} &middot; {SITE.licence.authority}</p>
            </div>
          </div>
          <Picture slug="group-banner-hill" alt="Meezan pilgrims holding a green Meezan Tours & Travels banner" ratio="4/3" sizes="(min-width:1024px) 45vw, 100vw" className="rounded-xl2 shadow-lift" />
        </div>
      </section>
      <StatsBand />
      <section className="section pattern-light">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div data-reveal className="card p-8"><h2 className="text-2xl">Our mission</h2><p className="mt-3 text-ink-500">To make every Hajj and Umrah journey safe, accessible and spiritually fulfilling through reliable travel arrangements and sincere service.</p></div>
          <div data-reveal className="card p-8"><h2 className="text-2xl">What we offer</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-ink-500">{offers.map((o) => <li key={o}>{o}</li>)}</ul></div>
        </div>
      </section>
      <section className="section text-center"><div className="container"><SectionHeading title="Come and meet us" intro={`Our office is in ${SITE.address.line2}, ${SITE.address.city}.`} center /><Button to="/contact" variant="primary">Contact and directions</Button></div></section>
      <CtaBand />
    </>
  )
}

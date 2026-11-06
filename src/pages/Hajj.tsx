import { Bed, ClipboardList, Plane, Users } from 'lucide-react'
import CtaBand from '@/components/CtaBand'
import JourneyTimeline from '@/components/JourneyTimeline'
import Faq from '@/components/Faq'
import PackageCard from '@/components/PackageCard'
import PageHero from '@/components/PageHero'
import Picture from '@/components/Picture'
import SectionHeading from '@/components/SectionHeading'
import Seo from '@/components/Seo'
import VideoTestimonials from '@/components/VideoTestimonials'
import WrittenTestimonials from '@/components/WrittenTestimonials'
import Button from '@/components/Button'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'
import { getPackages } from '@/services/content'

const crumbs = [{ name: 'Hajj', path: '/hajj' }]
const desc = 'Hajj packages for pilgrims across India from Meezan Tours & Travels, Pune: a registered Hajj Group Organiser with 18+ years of experience. Flights, visas, hotels, transport and guided support.'
const faqs = [
  { q: 'Which Hajj packages are available?', a: 'We currently list a long-duration package with 5-star accommodation in Makkah and a shorter Aziziya non-shifting package. Details and prices are on our packages page; confirm availability with our team.' },
  { q: 'When should I enquire for Hajj?', a: 'As early as possible. Hajj seats, documentation and hotel allocation are limited, so contact our office to learn the current timeline and requirements.' },
  { q: 'Do you help with visas and documents?', a: 'Yes. Our packages coordinate flights, visas, accommodation and ground transport, and we brief pilgrims before departure.' },
]
const services = [
  { icon: Plane, title: 'Flights & visas', text: 'Travel and visa coordination handled by our team.' },
  { icon: Bed, title: 'Accommodation', text: 'Hotels in Makkah and Madinah chosen for proximity and comfort.' },
  { icon: Users, title: 'Guided support', text: 'Local guides and support staff throughout the journey.' },
  { icon: ClipboardList, title: 'Pre-departure briefing', text: 'Preparation for the rites and practical travel advice.' },
]

export default function Hajj() {
  return (
    <>
      <Seo path="/hajj" title="Hajj Packages from Pune & India | Meezan Tours" description={desc} jsonLd={[serviceSchema('Hajj packages', desc, '/hajj'), breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs.map((c) => ({ name: 'Hajj', path: c.path }))])]} />
      <PageHero eyebrow="Hajj" title="A journey of faith. A responsibility we honour." crumbs={crumbs} intro="Over 18 years of dedicated pilgrim service, as a registered Hajj Group Organiser. We handle the arrangements; you focus on the pilgrimage." actions={<><Button to="/contact" variant="light">Enquire about Hajj</Button><Button to="/packages" variant="ghost-light">See packages</Button></>} />
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Hajj services" title="Everything arranged, step by step" />
            <div className="-mt-6 grid gap-5 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.title} data-reveal><s.icon className="h-7 w-7 text-brand-600" aria-hidden="true" /><h3 className="mt-3 text-lg">{s.title}</h3><p className="mt-1 text-sm text-ink-500">{s.text}</p></div>
              ))}
            </div>
          </div>
          <Picture slug="mina-tent" alt="Pilgrims in ihram resting inside a tent in Mina during Hajj 2025" ratio="4/3" sizes="(min-width:1024px) 45vw, 100vw" className="rounded-xl2 shadow-lift" />
        </div>
      </section>
      <section className="section pattern-light">
        <div className="container">
          <SectionHeading eyebrow="Hajj packages" title="Current Hajj options" />
          <div className="grid gap-6 lg:grid-cols-2">{getPackages('hajj').map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
          <p className="mt-8 text-sm text-ink-500">Hajj dates, quotas and final pricing are confirmed with each pilgrim at the time of booking.</p>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="Preparation" title="Getting ready for Hajj" />
          <ul className="-mt-4 list-disc space-y-3 pl-5 text-ink-700">
            <li>Keep your passport and recent photographs ready; our team will confirm the exact documents required.</li>
            <li>Attend our pre-departure briefing to understand the rites, the schedule and the group arrangements.</li>
            <li>Discuss health, mobility and family needs with us in advance so arrangements can be planned.</li>
          </ul>
        </div>
      </section>
      <section className="section pattern-dark on-dark text-white"><div className="container"><SectionHeading eyebrow="Pilgrim stories" title="Hajj pilgrims on video" /><VideoTestimonials kind="hajj" /></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="Testimonials" title="In their own words" center /><WrittenTestimonials kind="hajj" /></div></section>
      <section className="section bg-sand-100"><div className="container"><SectionHeading eyebrow="FAQ" title="Hajj questions" center /><Faq items={faqs} /></div></section>
      <JourneyTimeline />
      <CtaBand />
    </>
  )
}

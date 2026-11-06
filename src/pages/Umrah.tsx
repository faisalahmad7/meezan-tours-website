import { Bus, Hotel, Plane, Users } from 'lucide-react'
import Button from '@/components/Button'
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
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'
import { getPackages } from '@/services/content'

const desc = 'Umrah packages for pilgrims across India by Meezan Tours & Travels, Pune, with 18+ years of experience: flights, visas, Makkah and Madinah hotels, ground transport and guided support for groups and families.'
const faqs = [
  { q: 'Do you run Umrah groups from Pune?', a: 'Our office is in Pune and we organise departures from Mumbai and other exit points across India. Ask which departure suits you.' },
  { q: 'Can families travel together?', a: 'Yes. We arrange group and private departures; tell us your family size and needs and we will propose options.' },
  { q: 'How do I know the next departure date?', a: 'Upcoming departures are listed on our packages page. Dates for other seasons are shared as they are confirmed, so please enquire.' },
]
const items = [
  { icon: Plane, title: 'Flights', text: 'Airline options including direct flights, as listed per package.' },
  { icon: Hotel, title: 'Hotels', text: 'Stays in Makkah and Madinah, with distance to the Haram stated.' },
  { icon: Bus, title: 'Transport', text: 'Ground transport and ziyarat arranged by our team.' },
  { icon: Users, title: 'Group leaders', text: 'Experienced guides who accompany the group.' },
]

export default function Umrah() {
  return (
    <>
      <Seo path="/umrah" title="Umrah Packages from Pune | Meezan Tours & Travels" description={desc} jsonLd={[serviceSchema('Umrah packages', desc, '/umrah'), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Umrah', path: '/umrah' }])]} />
      <PageHero eyebrow="Umrah" title="Make room for ibadah. We'll help with the journey." crumbs={[{ name: 'Umrah', path: '/umrah' }]} intro="18+ years of experience arranging Umrah for pilgrims across India: flights, visas, hotels and ziyarat, so you can concentrate on worship." actions={<><Button to="/contact" variant="light">Enquire about Umrah</Button><Button to="/packages" variant="ghost-light">See packages</Button></>} />
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <Picture slug="flight-akasa" alt="Pilgrims in ihram holding red Meezan bags beside an aircraft" ratio="4/3" sizes="(min-width:1024px) 45vw, 100vw" className="order-2 rounded-xl2 shadow-lift lg:order-1" />
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Umrah services" title="What we arrange" />
            <div className="-mt-6 grid gap-5 sm:grid-cols-2">
              {items.map((s) => <div key={s.title} data-reveal><s.icon className="h-7 w-7 text-brand-600" aria-hidden="true" /><h3 className="mt-3 text-lg">{s.title}</h3><p className="mt-1 text-sm text-ink-500">{s.text}</p></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section pattern-light">
        <div className="container">
          <SectionHeading eyebrow="Umrah packages" title="Current Umrah departures" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{getPackages('umrah').map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
          <p className="mt-8 text-sm text-ink-500">Looking for Ramadan or another season? Dates are shared as they are confirmed. Contact our team to register your interest.</p>
        </div>
      </section>
      <section className="section pattern-dark on-dark text-white"><div className="container"><SectionHeading eyebrow="Pilgrim stories" title="Umrah pilgrims on video" /><VideoTestimonials kind="umrah" /></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="Testimonials" title="In their own words" center /><WrittenTestimonials kind="umrah" /></div></section>
      <section className="section bg-sand-100"><div className="container"><SectionHeading eyebrow="FAQ" title="Umrah questions" center /><Faq items={faqs} /></div></section>
      <JourneyTimeline />
      <CtaBand />
    </>
  )
}

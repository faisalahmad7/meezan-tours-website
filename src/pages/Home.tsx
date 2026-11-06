import { ArrowRight, BadgeCheck, HeartHandshake, ShieldCheck, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import AllIndia from '@/components/AllIndia'
import Button from '@/components/Button'
import CtaBand from '@/components/CtaBand'
import Faq from '@/components/Faq'
import HeroSlides from '@/components/HeroSlides'
import JourneyTimeline from '@/components/JourneyTimeline'
import PackageCard from '@/components/PackageCard'
import Picture from '@/components/Picture'
import SectionHeading from '@/components/SectionHeading'
import ServicesShowcase from '@/components/ServicesShowcase'
import Seo from '@/components/Seo'
import StatsBand from '@/components/StatsBand'
import TrustRibbon from '@/components/TrustRibbon'
import VideoTestimonials from '@/components/VideoTestimonials'
import WrittenTestimonials from '@/components/WrittenTestimonials'
import { heroMain, heroSide } from '@/data/hero'
import { SITE } from '@/data/site'
import { businessSchema, faqSchema, websiteSchema } from '@/lib/schema'
import { getFaqs, getHomeGallery, getPackages } from '@/services/content'

const reasons = [
  { icon: BadgeCheck, title: 'Proven experience', text: 'Specialists focused on Hajj and Umrah travel, with 18+ years of organising group and personalised departures for Indian pilgrims.' },
  { icon: HeartHandshake, title: 'Personal attention', text: 'Clear communication and a familiar face from booking to return.' },
  { icon: ShieldCheck, title: 'Safety and comfort', text: 'Accommodation and transport partners selected with care for comfort and safety.' },
  { icon: Wallet, title: 'Transparent pricing', text: 'Prices, inclusions and taxes explained plainly, so there are no surprises.' },
]
export default function Home() {
  const gallery = getHomeGallery().slice(0, 5)
  return (
    <>
      <Seo
        path="/"
        title="Hajj & Umrah Tour Operator in Pune | Meezan Tours"
        description="Meezan Tours & Travels, Pune: licensed Hajj Group Organiser with 18+ years of experience, arranging Hajj, Umrah and Ziyarat packages for pilgrims across India."
        jsonLd={[businessSchema(), websiteSchema(), faqSchema(getFaqs())]}
      />

      {/* HERO */}
      <section className="pattern-dark on-dark relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-transparent to-brand-950/60" aria-hidden="true" />
        <div className="container relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-16">
          <div data-hero className="max-w-xl">
            <p className="eyebrow mb-5">Based in Pune. Trusted by pilgrims across India.</p>
            <h1 className="font-display text-display-xl text-white">Your sacred journey, guided with care.</h1>
            <p className="mt-4 font-display text-xl italic text-gold-300 sm:text-2xl">From your first intention to your safe return.</p>
            <p className="mt-5 text-lg text-white/85">With 18+ years of experience, Meezan Tours arranges flights, visas, stay and ziyarat for Hajj and Umrah, so you can give your full attention to worship.</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Button to="/hajj" variant="gold">Explore Hajj Packages <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
              <Button to="/umrah" variant="ghost-light">Explore Umrah Packages</Button>
            </div>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 underline decoration-dotted underline-offset-4 hover:text-white">Speak to our team <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[1.2fr_1fr] lg:grid-rows-[auto_1fr]">
            <div className="col-span-2 mx-auto w-full max-w-md lg:col-span-1 lg:row-span-2 lg:max-w-none">
              <div className="arch gold-frame overflow-hidden">
                <HeroSlides slides={heroMain} ratio="3/4" sizes="(min-width:1024px) 34vw, 90vw" priority className="h-full" />
              </div>
            </div>
            <HeroSlides slides={heroSide} ratio="4/3" sizes="(min-width:1024px) 26vw, 50vw" delayMs={3200} intervalMs={5200} className="rounded-xl2 border border-gold-500/50 shadow-lift" />
            <div className="flex flex-col justify-center rounded-xl2 border border-gold-500/50 bg-brand-950/70 p-4 text-center sm:p-6">
              <p className="font-display text-5xl font-semibold leading-none text-gold-400 sm:text-6xl">18+</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">Years of experience</p>
              <p className="mt-3 hidden text-sm text-white/70 sm:block">A commitment to every Haji, from every corner of India.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustRibbon />

      {/* ABOUT */}
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="grid grid-cols-5 gap-3 sm:gap-4">
            <Picture slug="group-plaza" alt="Meezan pilgrims holding the Meezan Tours banner in a paved plaza" sizes="(min-width:1024px) 30vw, 60vw" ratio="4/5" className="col-span-3 rounded-t-[5rem] rounded-b-xl2 shadow-lift" />
            <Picture slug="buffet" alt="Hotel buffet with rice and vegetable dishes" sizes="(min-width:1024px) 20vw, 40vw" ratio="4/5" className="col-span-2 mt-10 rounded-xl2 shadow-lift" />
          </div>
          <div>
            <SectionHeading eyebrow="18+ years of dedicated pilgrim service" title="A trusted partner for sacred journeys" />
            <div className="-mt-8 space-y-4 text-ink-500">
              <p>Meezan Tours is a Hajj and Umrah tour operator based in Pune, Maharashtra. We are registered with the Ministry of Minority Affairs (MOMA) Hajj Cell as a Hajj Group Organiser.</p>
              <p>We combine professional planning, local expertise and deep respect for the nature of each journey, so pilgrims can focus on worship while we handle the details.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3"><Button to="/about" variant="outline">Our story</Button><Button to="/contact" variant="primary">Visit our office</Button></div>
          </div>
        </div>
      </section>

      <StatsBand />
      <AllIndia />

      {/* PATHWAYS: editorial composition */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Pilgrimage" title="Hajj, Umrah and Ziyarat" center />
          <div className="grid gap-5 lg:grid-cols-2 lg:grid-rows-2">
            {[
              { to: '/hajj', title: 'Hajj', text: 'Long and short duration group departures, with managed travel, stay and guidance.', slug: 'mina-tent', big: true },
              { to: '/umrah', title: 'Umrah', text: 'Umrah tours with flights, hotels and transport arranged.', slug: 'group-mosque' },
              { to: '/ziyarat', title: 'Ziyarat', text: 'Guided visits to the historic sites of Makkah and Madinah.', slug: 'group-hilltop' },
            ].map((p) => (
              <Link key={p.to} to={p.to} data-reveal className={`group relative isolate flex min-h-[18rem] items-end overflow-hidden rounded-xl2 shadow-lift ${p.big ? 'min-h-[22rem] lg:row-span-2' : ''}`}>
                <Picture slug={p.slug} alt="" className="absolute inset-0 -z-10 h-full" sizes="(min-width:1024px) 50vw, 100vw" imgClassName="transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
                <div className="on-dark p-6 text-white sm:p-8">
                  <h3 className="text-3xl font-semibold">{p.title}</h3>
                  <p className="mt-2 max-w-sm text-white/85">{p.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">Explore {p.title} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section bg-sand-100">
        <div className="container">
          <SectionHeading eyebrow="Packages" title="Choose your sacred journey" intro="Prices are per person. Tap Full details on a card, then book or ask us on WhatsApp." center />
          <div className="grid gap-6 lg:grid-cols-3">{getPackages().map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
          <div data-reveal className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 rounded-xl2 border border-gold-500/50 bg-white p-8 text-center shadow-soft sm:flex-row sm:text-left">
            <div className="flex-1"><h3 className="text-2xl">Need a custom package?</h3><p className="mt-1 text-ink-500">Tell us your dates, group size and budget and our experts will design a package around you.</p></div>
            <Button to="/contact" variant="primary">Request a custom quote</Button>
          </div>
        </div>
      </section>

      <ServicesShowcase />

      {/* WHY MEEZAN */}
      <section className="section pattern-dark on-dark text-white">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><SectionHeading eyebrow="Why Meezan" title="18+ years of experience. A commitment to every Haji." intro="Our attention to detail and personal care are why pilgrims return to Meezan." /></div>
          <ul className="divide-y divide-gold-500/30 border-y border-gold-500/30">
            {reasons.map((r) => (
              <li key={r.title} data-reveal className="flex gap-5 py-6">
                <r.icon className="mt-1 h-7 w-7 shrink-0 text-gold-400" aria-hidden="true" />
                <div><h3 className="text-xl font-semibold">{r.title}</h3><p className="mt-1 text-white/75">{r.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JourneyTimeline />

      {/* VIDEO TESTIMONIALS */}
      <section className="section pattern-dark on-dark text-white">
        <div className="container">
          <SectionHeading eyebrow="Pilgrim stories" title="Hear it from our pilgrims" intro="Real video feedback from pilgrims who travelled with Meezan. Each card opens the video on YouTube." />
          <VideoTestimonials />
        </div>
      </section>

      {/* WRITTEN TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="In their own words" center />
          <WrittenTestimonials />
          <p className="mt-4 text-center"><a className="text-sm font-semibold text-brand-700 underline underline-offset-4" href={SITE.mapLink} target="_blank" rel="noopener noreferrer">Read our reviews on Google{SITE.googleReviews.rating ? ` (${SITE.googleReviews.rating} stars${SITE.googleReviews.reviewCount ? `, ${SITE.googleReviews.reviewCount} reviews` : ''})` : ''}</a></p>
        </div>
      </section>

      {/* GALLERY PREVIEW: mosaic */}
      <section className="section bg-sand-100">
        <div className="container">
          <SectionHeading eyebrow="Gallery" title="Moments from our pilgrims' journeys" />
          <div className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:gap-4">
            {gallery.map((g, i) => (
              <Picture key={g.id} slug={g.slug} alt={g.alt} sizes={i === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 25vw, 50vw'} className={`h-full rounded-xl2 shadow-soft ${i === 0 ? 'col-span-2 row-span-2' : ''}`} focus={i === 0 ? '50% 60%' : undefined} />
            ))}
          </div>
          <div className="mt-10 text-center"><Button to="/gallery" variant="outline">Open the gallery</Button></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="FAQ" title="Common questions" center />
          <Faq items={getFaqs()} />
        </div>
      </section>

      <CtaBand text={`Visit us at ${SITE.address.line2}, ${SITE.address.city}, or speak to our team today.`} />
    </>
  )
}

import { ArrowRight, BadgeCheck, HeartHandshake, Landmark, MoonStar, ShieldCheck, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import AllIndia from '@/components/AllIndia'
import Button from '@/components/Button'
import CtaBand from '@/components/CtaBand'
import FlightPath from '@/components/FlightPath'
import GalleryMosaic from '@/components/GalleryMosaic'
import SocialLinks from '@/components/SocialLinks'
import HeroSlides from '@/components/HeroSlides'
import HeroWatermark from '@/components/HeroWatermark'
import JourneyTimeline from '@/components/JourneyTimeline'
import PackageCard from '@/components/PackageCard'
import Picture from '@/components/Picture'
import SectionHeading from '@/components/SectionHeading'
import ServicesShowcase from '@/components/ServicesShowcase'
import Seo from '@/components/Seo'
import StatsBand from '@/components/StatsBand'
import TrustRibbon from '@/components/TrustRibbon'
import VideoTestimonials from '@/components/VideoTestimonials'
import TestimonialRibbon from '@/components/TestimonialRibbon'
import { heroMain, heroSide } from '@/data/hero'
import { SITE } from '@/data/site'
import { businessSchema, websiteSchema } from '@/lib/schema'
import { getGalleryImages, getHomeGallery, getPackages } from '@/services/content'

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
        jsonLd={[businessSchema(), websiteSchema()]}
      />

      {/* HERO */}
      <section className="pattern-dark on-dark relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/80 via-transparent to-brand-950/60" aria-hidden="true" />
        <HeroWatermark />
        <div className="container relative grid items-center gap-12 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-16">
          <div data-hero className="max-w-xl">
            <p className="eyebrow mb-5">Based in Pune. Trusted by pilgrims across India.</p>
            <h1 className="font-display text-display-xl text-white">Your sacred journey, guided with care.</h1>
            <p className="mt-4 font-display text-xl italic text-gold-300 sm:text-2xl">From your first intention to your safe return.</p>
            <p className="mt-5 text-lg text-white/85">With 18+ years of experience, Meezan Tours arranges flights, visas, stay and ziyarat for Hajj and Umrah, so you can give your full attention to worship.</p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <Link to="/hajj" className="hero-cta hero-cta-gold"><Landmark className="h-6 w-6 shrink-0" aria-hidden="true" /><span className="min-w-0"><span className="block whitespace-nowrap text-base font-semibold leading-tight sm:text-lg">Hajj packages</span><span className="block text-xs opacity-75">Group departures</span></span><span className="btn-chip ml-auto"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>
              <Link to="/umrah" className="hero-cta hero-cta-glass"><MoonStar className="h-6 w-6 shrink-0" aria-hidden="true" /><span className="min-w-0"><span className="block whitespace-nowrap text-base font-semibold leading-tight sm:text-lg">Umrah packages</span><span className="block text-xs opacity-75">All year round</span></span><span className="btn-chip ml-auto"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>
            </div>
            <Link to="/contact" className="hero-link mt-5 inline-block">Speak to our team</Link>
            <div className="mt-10 flex items-center gap-5 border-t border-gold-500/30 pt-6">
              <p className="font-display text-5xl font-semibold leading-none text-gold-400 sm:text-6xl">18+</p>
              <p className="max-w-[16rem] text-sm leading-snug text-white/80 sm:text-base"><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white">Years of experience</span>A commitment to every Haji, from every corner of India.</p>
            </div>
          </div>

          {/* Stage: arch + one overlapping group photo + a slow orbit ring */}
          <div className="relative mx-auto w-full max-w-md pb-10 lg:max-w-none lg:pb-8">
            <FlightPath className="pointer-events-none absolute -top-5 left-[-5%] z-20 w-[110%] sm:-top-7" />
            <div className="relative ml-auto w-[84%]">
              <div className="arch gold-frame overflow-hidden">
                <HeroSlides slides={heroMain} ratio="3/4" sizes="(min-width:1024px) 34vw, 80vw" priority className="h-full" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-[52%] sm:w-[48%]">
              <HeroSlides slides={heroSide} ratio="4/3" sizes="(min-width:1024px) 20vw, 46vw" delayMs={3200} intervalMs={5200} className="rounded-xl2 border-2 border-gold-400/80 shadow-lift" />
            </div>
          </div>
        </div>
      </section>

      <TrustRibbon />

      {/* ABOUT */}
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="relative pb-10 sm:pb-12">
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              <Picture slug="haram-group-portrait" alt="Meezan pilgrims in ihram standing together in front of the Kaaba in Makkah" sizes="(min-width:1024px) 28vw, 56vw" ratio="4/5" className="col-span-3 rounded-t-[5rem] rounded-b-xl2 shadow-lift" focus="50% 45%" />
              <Picture slug="airport-banner-group" alt="Meezan Tours pilgrims holding the Meezan banner at the airport on departure day" sizes="(min-width:1024px) 20vw, 40vw" ratio="4/5" className="col-span-2 mt-10 rounded-xl2 shadow-lift" focus="62% 60%" />
            </div>
            <div className="absolute bottom-0 left-3 right-3 flex items-center gap-3 rounded-xl2 border border-gold-500/50 bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:left-6 sm:right-auto sm:max-w-sm">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-900 text-gold-400"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span>
              <p className="text-sm leading-snug text-ink-700"><span className="block font-semibold text-ink-900">Registered Hajj Group Organiser</span>Ministry of Minority Affairs, Govt. of India</p>
            </div>
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
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-2 lg:grid-rows-2">
            {[
              { to: '/hajj', title: 'Hajj', text: 'Long and short duration group departures, with managed travel, stay and guidance.', slug: 'mina-tent', big: true },
              { to: '/umrah', title: 'Umrah', text: 'Umrah tours with flights, hotels and transport arranged.', slug: 'group-mosque' },
              { to: '/ziyarat', title: 'Ziyarat', text: 'Guided visits to the historic sites of Makkah and Madinah.', slug: 'group-hilltop' },
            ].map((p) => (
              <Link key={p.to} to={p.to} data-reveal className={`group relative isolate flex min-h-[20rem] shrink-0 basis-[82%] snap-start items-end overflow-hidden rounded-xl2 shadow-lift md:basis-auto ${p.big ? 'lg:min-h-[22rem] lg:row-span-2' : ''}`}>
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
      <section className="section bg-sand-100 pb-10 sm:pb-12 lg:pb-14">
        <div className="container">
          <SectionHeading eyebrow="Packages" title="Choose your sacred journey" intro="Prices are per person. Tap Full details on a card, then book or ask us on WhatsApp." center />
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">{getPackages().map((p) => <div key={p.id} className="flex shrink-0 basis-[86%] snap-start md:basis-auto [&>*]:w-full"><PackageCard pkg={p} /></div>)}</div>
          <p className="mt-2 text-center text-sm font-semibold text-brand-700 md:hidden">Swipe sideways to compare &rarr;</p>
          <div className="mt-8 text-center"><Button to="/packages" variant="outline">View all packages</Button></div>
          <div data-reveal className="gs-frame mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex-1"><h3 className="text-2xl font-bold">Need a custom package?</h3><p className="mt-1 text-ink-500">Tell us your dates, group size and budget and our experts will design a package around you.</p></div>
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

      {/* GALLERY PREVIEW: emerald arch lattice, mosaic */}
      <section className="gallery-bg on-dark relative isolate overflow-hidden border-y-2 border-gold-500/60 py-16 text-white sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeading eyebrow="Gallery" title="Moments from our pilgrims' journeys" intro="Real pilgrims, real moments: from the airport to the Haram, captured on Meezan journeys." center />
          <GalleryMosaic items={gallery} />
          <div className="mt-10 text-center"><Button to="/gallery" variant="gold">Open the full gallery ({getHomeGallery().length > 0 ? getGalleryImages().length : 0} photographs)</Button></div>
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

      {/* WRITTEN TESTIMONIALS: moving ribbon */}
      <section className="section overflow-hidden">
        <div className="container"><SectionHeading eyebrow="Testimonials" title="In their own words" center /></div>
        <div className="-mt-4"><TestimonialRibbon /></div>
        <div className="container"><SocialLinks /><p className="mt-8 text-center"><a className="text-sm font-semibold text-brand-700 underline underline-offset-4" href={SITE.mapLink} target="_blank" rel="noopener noreferrer">Read our reviews on Google{SITE.googleReviews.rating ? ` (${SITE.googleReviews.rating} stars${SITE.googleReviews.reviewCount ? `, ${SITE.googleReviews.reviewCount} reviews` : ''})` : ''}</a></p></div>
      </section>

      <CtaBand text={`Visit us at ${SITE.address.line2}, ${SITE.address.city}, or speak to our team today.`} />
    </>
  )
}

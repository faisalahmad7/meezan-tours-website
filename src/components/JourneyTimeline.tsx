import { ArrowRight, Plane } from 'lucide-react'
import SectionHeading from './SectionHeading'
import JourneyBackdrop from './JourneyBackdrop'

const steps = [
  ['Enquiry and guidance', 'Speak to our team and choose the right package.'],
  ['Registration and documentation', 'Your details and documents are collected and checked.'],
  ['Visa and travel preparation', 'Visa processing and a pre-departure briefing.'],
  ['Mumbai airport departure', 'The group departs together on the scheduled flight.'],
  ['Arrival in the Holy Lands', 'Welcomed and coordinated on arrival in Saudi Arabia.'],
  ['Hotel accommodation and transfers', 'Hotels and transport as listed for your package.'],
  ['Hajj / Umrah guidance and ziyarat', 'Group guidance through the rites and visits.'],
  ['Return journey to Mumbai', 'The group flies back together to Mumbai airport.'],
  ['Assistance until completion', 'Support continues until the journey is complete.'],
]

export default function JourneyTimeline() {
  return (
    <section className="section relative overflow-hidden">
      <JourneyBackdrop />
      <div className="container relative">
        <SectionHeading eyebrow="The complete journey" title="From your first intention to your safe return" intro="Based in Pune, Meezan coordinates the whole pilgrimage. Our group journeys are organised from Mumbai airport to Saudi Arabia and back to Mumbai airport." center />
        <div data-reveal className="on-dark mx-auto mb-12 flex max-w-3xl items-center justify-between gap-2 rounded-full bg-brand-900 px-5 py-4 text-sm font-semibold text-white shadow-lift sm:px-8 sm:text-base">
          <span>Mumbai Airport</span>
          <ArrowRight className="h-4 w-4 text-gold-400" aria-hidden="true" />
          <Plane className="h-5 w-5 text-gold-400" aria-hidden="true" />
          <ArrowRight className="h-4 w-4 text-gold-400" aria-hidden="true" />
          <span>Saudi Arabia</span>
          <ArrowRight className="hidden h-4 w-4 text-gold-400 sm:block" aria-hidden="true" />
          <span className="hidden sm:inline">Mumbai Airport</span>
        </div>
        <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} data-reveal className="flex gap-4 border-t border-gold-500/40 pt-5">
              <span className="font-display text-4xl font-semibold leading-none text-gold-500">{String(i + 1).padStart(2, '0')}</span>
              <div><h3 className="text-lg font-semibold leading-snug">{t}</h3><p className="mt-1 text-sm text-ink-500">{d}</p></div>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-500">Services and their order depend on the package. Not every package departs from Pune airport, and home pickup is not included unless a package says so. Our team confirms what applies to yours.</p>
      </div>
    </section>
  )
}

import { BadgeCheck, Backpack, Bed, Briefcase, Droplets, FileText, HeartPulse, Landmark, MapPin, MoonStar } from 'lucide-react'
import type { ComponentType } from 'react'
import Button from '@/components/Button'
import CtaBand from '@/components/CtaBand'
import Faq from '@/components/Faq'
import PageHero from '@/components/PageHero'
import Seo from '@/components/Seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { whatsappLink } from '@/data/site'
import { getAllFaqs, getFaqSections } from '@/services/content'

const ICONS: Record<string, ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>> = {
  hajj: Landmark, umrah: MoonStar, ziyarat: MapPin, documents: FileText, luggage: Briefcase,
  zamzam: Droplets, kit: Backpack, stay: Bed, health: HeartPulse, about: BadgeCheck,
}

const desc = 'Answers to common questions about Hajj, Umrah, ziyarat, documents, luggage, Zamzam, the Hajj kit, hotels, meals and health, from Meezan Tours & Travels, Pune.'

export default function FaqPage() {
  const sections = getFaqSections()
  return (
    <>
      <Seo
        path="/faq"
        title="Hajj & Umrah FAQ: Luggage, Zamzam, Hajj Kit | Meezan Tours"
        description={desc}
        jsonLd={[faqSchema(getAllFaqs()), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])]}
      />
      <PageHero
        eyebrow="Frequently asked questions"
        title="Everything you want to know before you travel"
        crumbs={[{ name: 'FAQ', path: '/faq' }]}
        intro="Pick a topic on the right to jump straight to it. Package inclusions differ, so where an answer depends on your package, our team will confirm the details."
      />

      {/* Mobile: topic chips that stay under the header */}
      <nav aria-label="FAQ topics" className="sticky top-[4.25rem] z-20 border-b border-gold-500/30 bg-ivory/95 backdrop-blur lg:hidden">
        <ul className="no-scrollbar container flex gap-2 overflow-x-auto py-3">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0"><a href={`#${s.id}`} className="inline-flex rounded-full border border-gold-500/50 bg-white px-4 py-2 text-sm font-bold text-ink-900 shadow-soft hover:bg-brand-900 hover:text-white">{s.title}</a></li>
          ))}
        </ul>
      </nav>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
          <div className="space-y-14">
            {sections.map((s) => {
              const Icon = ICONS[s.icon] ?? BadgeCheck
              return (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-36 lg:scroll-mt-32">
                  <div data-reveal className="mb-5 flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-900 text-gold-400"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                    <div>
                      <h2 id={`${s.id}-h`} className="text-display-md font-bold">{s.title}</h2>
                      <p className="text-sm text-ink-500">{s.blurb}</p>
                    </div>
                  </div>
                  <Faq items={s.items} className="" />
                </section>
              )
            })}
          </div>

          {/* Desktop: sticky list of topics on the right */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 rounded-xl2 border border-gold-500/50 bg-white p-5 shadow-soft">
              <p className="eyebrow mb-3">Jump to a topic</p>
              <ul className="space-y-1">
                {sections.map((s) => {
                  const Icon = ICONS[s.icon] ?? BadgeCheck
                  return (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex items-center gap-3 rounded-lg px-3 py-2 font-bold text-ink-900 transition hover:bg-sand-100 hover:text-brand-700">
                        <Icon className="h-4 w-4 text-gold-600" aria-hidden="true" />{s.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-5 border-t border-sand-200 pt-5">
                <p className="text-sm text-ink-500">Cannot find your question?</p>
                <Button href={whatsappLink('Assalamu Alaikum, I have a question about Hajj / Umrah.')} variant="whatsapp" className="mt-3 w-full">Ask on WhatsApp</Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

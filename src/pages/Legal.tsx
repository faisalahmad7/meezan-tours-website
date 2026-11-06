import type { ReactNode } from 'react'
import PageHero from '@/components/PageHero'
import Seo from '@/components/Seo'
import { SITE } from '@/data/site'

function LegalPage({ path, title, children }: { path: string; title: string; children: ReactNode }) {
  return (
    <>
      <Seo path={path} title={`${title} | Meezan Tours & Travels`} description={`${title} for the Meezan Tours & Travels website.`} />
      <PageHero eyebrow="Legal" title={title} crumbs={[{ name: title, path }]} intro="Please read this page carefully." />
      <section className="section">
        <div className="container max-w-3xl space-y-5 text-ink-700 [&_h2]:mt-8 [&_h2]:text-2xl">
          {children}
          <p className="rounded-xl border border-sand-300 bg-sand-100 p-4 text-sm">This page is a plain-language draft for the website owner to review with a legal adviser before launch.</p>
        </div>
      </section>
    </>
  )
}

export const Privacy = () => (
  <LegalPage path="/privacy-policy" title="Privacy Policy">
    <p>{SITE.name} respects your privacy. This policy explains what we collect through this website and how we use it.</p>
    <h2>Information you give us</h2>
    <p>When you contact us by phone, email or WhatsApp, or use the enquiry form (which opens WhatsApp with your message), we receive the details you choose to share, such as your name, phone number and travel requirements.</p>
    <h2>How we use it</h2>
    <p>We use your details only to respond to your enquiry and to arrange the services you request. We do not sell your information.</p>
    <h2>Third-party services</h2>
    <p>The contact page embeds Google Maps, and enquiry buttons open WhatsApp. Those services have their own privacy policies.</p>
    <h2>Contact</h2>
    <p>Questions about privacy: <a className="text-brand-700 underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
  </LegalPage>
)

export const Terms = () => (
  <LegalPage path="/terms" title="Terms of Service">
    <p>By using this website you agree to these terms.</p>
    <h2>Information on this website</h2>
    <p>Package details, dates and prices shown here are provided for guidance and may change. A booking is confirmed only after written confirmation from {SITE.name}.</p>
    <h2>Bookings and payments</h2>
    <p>Booking, payment, cancellation and refund conditions are explained to you by our team when you book.</p>
    <h2>Content</h2>
    <p>Photographs and text on this site belong to {SITE.name} unless stated otherwise and may not be reused without permission.</p>
    <h2>Contact</h2>
    <p>{SITE.name}, Nana Peth, Pune. Email <a className="text-brand-700 underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
  </LegalPage>
)

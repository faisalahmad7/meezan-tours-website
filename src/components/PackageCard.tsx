import { CalendarDays, Check, ChevronDown, Clock, MapPin, MessageCircle, Star, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatInr } from '@/data/packages'
import { whatsappLink } from '@/data/site'
import type { TravelPackage } from '@/data/types'
import { useIsPast } from '@/lib/useIsPast'
import Button from './Button'
import Picture from './Picture'

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  const past = useIsPast(pkg.departureDate)
  const saving = pkg.previousPriceInr && pkg.priceInr ? pkg.previousPriceInr - pkg.priceInr : 0
  const d = pkg.details
  const rows = d
    ? ([['Hotel', d.hotel], ['Distance from Haram', d.distanceFromHaram], ['Flight', d.flight], ['Transport', d.transport], ['Meals', d.meals]] as const).filter((r) => r[1])
    : []
  const msg = `Assalamu Alaikum, I would like to enquire about the "${pkg.name}" package${pkg.dates ? ` (${pkg.dates})` : ''}.`
  return (
    <article data-reveal className="card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <Picture slug={pkg.image.slug} alt="" ratio="16/11" focus={pkg.image.focus} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-brand-950/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-gold-300 backdrop-blur">{pkg.kind === 'hajj' ? 'Hajj' : 'Umrah'}</span>
          {pkg.badge && <span className="rounded-full bg-gold-400 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-950">{pkg.badge}</span>}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{pkg.name}</h3>
          {pkg.rating && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/90">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden="true" />
              <span className="font-semibold">{pkg.rating}</span>
              {pkg.reviewCount && <span className="text-white/70">({pkg.reviewCount} reviews)</span>}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ul className="grid gap-2 text-sm text-ink-700">
          <li className="flex items-start gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" /><span><span className="sr-only">Duration: </span>{pkg.duration}</span></li>
          <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" /><span><span className="sr-only">Destinations: </span>{pkg.destinations}</span></li>
          <li className="flex items-start gap-2.5"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" /><span><span className="sr-only">Dates: </span>{pkg.dates ?? 'Dates shared on enquiry'}</span></li>
        </ul>
        {past && (
          <p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />This departure date has passed. Ask us about the next batch.
          </p>
        )}
        <ul className="mt-4 space-y-2 border-t border-sand-200 pt-4 text-sm">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-logo-green" aria-hidden="true" />{h}</li>
          ))}
        </ul>

        <details className="group mt-4 rounded-xl border border-sand-200 bg-sand-50">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-brand-800 [&::-webkit-details-marker]:hidden">
            Full details and inclusions
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="space-y-3 border-t border-sand-200 px-4 py-4 text-sm">
            {rows.length > 0 && (
              <dl className="grid gap-2">
                {rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-2"><dt className="text-ink-500">{k}</dt><dd className="font-medium text-ink-900">{v}</dd></div>
                ))}
              </dl>
            )}
            {d?.inclusions && d.inclusions.length > 0 && <ul className="list-disc space-y-1 pl-5">{d.inclusions.map((i) => <li key={i}>{i}</li>)}</ul>}
            {d?.exclusions && d.exclusions.length > 0 && <div><p className="font-semibold text-ink-900">Not included</p><ul className="list-disc space-y-1 pl-5">{d.exclusions.map((i) => <li key={i}>{i}</li>)}</ul></div>}
            {pkg.taxNote && <p className="font-medium text-ink-900">{pkg.taxNote}</p>}
            <p className="text-ink-500">The complete inclusions and exclusions are shared by our team. Ask on WhatsApp.</p>
          </div>
        </details>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            {pkg.priceInr ? (
              <>
                <p className="font-display text-4xl font-semibold leading-none text-brand-800 sm:text-[2.6rem]"><span className="sr-only">Price: </span>{formatInr(pkg.priceInr)}</p>
                {pkg.previousPriceInr && <p className="pb-0.5 text-base text-ink-400 line-through"><span className="sr-only">Previous price: </span>{formatInr(pkg.previousPriceInr)}</p>}
              </>
            ) : (
              <p className="font-display text-3xl text-brand-800">Price on request</p>
            )}
          </div>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            {pkg.priceNote}
            {saving > 0 && <span className="rounded-full bg-gold-300/60 px-2.5 py-0.5 font-semibold text-brand-900">Save {formatInr(saving)}</span>}
          </p>
          {pkg.taxNote && <p className="mt-1 text-xs font-medium text-ink-700">{pkg.taxNote}</p>}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link to={`/contact?package=${pkg.id}`} className="btn btn-primary">Book this package</Link>
            <Button href={whatsappLink(msg)} variant="whatsapp"><MessageCircle className="h-4 w-4" aria-hidden="true" />WhatsApp</Button>
          </div>
        </div>
      </div>
    </article>
  )
}

import type { TravelPackage } from '@/data/types'
import { ImagePicker } from '../ImagePicker'
import { Errors, Lines, ListEditor, NumberInput, PageHeader, Panel, SaveBar, Select, Spinner, Text, slugifyText, useUnsavedWarning } from '../ui'
import { useDoc } from '../useDoc'

const inr = (n?: number) => (n ? '₹' + n.toLocaleString('en-IN') : 'price on request')

export default function Packages() {
  const d = useDoc<TravelPackage[]>('packages')
  useUnsavedWarning(d.dirty)
  if (d.loadError) return <Errors title="Could not load" errors={[d.loadError]} />
  if (!d.data) return <Spinner />
  return (
    <>
      <PageHeader title="Packages" intro="Hajj and Umrah packages shown on /packages, /hajj, /umrah and the home page. Prices and dates appear exactly as entered: double-check them before saving." />
      <div className="mb-6"><Errors errors={d.errors} onClose={() => d.setErrors([])} /></div>
      <ListEditor<TravelPackage>
        items={d.data}
        onChange={d.setData}
        max={40}
        addLabel="Add package"
        itemTitle={(p) => <>{p.name || 'New package'} <span className="font-normal text-ink-500">· {p.kind === 'hajj' ? 'Hajj' : 'Umrah'} · {inr(p.priceInr)}</span></>}
        create={() => ({ id: `package-${Date.now().toString(36)}`, kind: 'umrah', name: '', duration: '', destinations: 'Makkah & Madinah', highlights: [], image: { slug: '' } })}
        render={(p, up) => {
          const det = p.details ?? {}
          const upd = (patch: Partial<NonNullable<TravelPackage['details']>>) => up({ details: { ...det, ...patch } })
          return (
            <>
              <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
                <Text label="Package name" value={p.name} onChange={(v) => up({ name: v })} max={140} />
                <Select<'hajj' | 'umrah'> label="Type" value={p.kind} onChange={(v) => up({ kind: v })} options={[{ value: 'umrah', label: 'Umrah' }, { value: 'hajj', label: 'Hajj' }]} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Text label="Duration" value={p.duration} onChange={(v) => up({ duration: v })} placeholder="16 days" />
                <Text label="Destinations" value={p.destinations} onChange={(v) => up({ destinations: v })} />
                <Text label="Badge (optional)" value={p.badge} onChange={(v) => up({ badge: v || undefined })} placeholder="Most popular" max={30} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label="Dates (as shown)" value={p.dates} onChange={(v) => up({ dates: v || undefined })} placeholder="Departure 12 Nov 2026 - Return 27 Nov 2026" />
                <Text label="Departure date" type="date" value={p.departureDate} onChange={(v) => up({ departureDate: v || undefined })} hint="After this date the card says the departure has passed." />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <NumberInput label="Price (₹)" value={p.priceInr} onChange={(v) => up({ priceInr: v })} min={0} hint="Leave empty for 'price on request'." />
                <NumberInput label="Previous price (₹)" value={p.previousPriceInr} onChange={(v) => up({ previousPriceInr: v })} min={0} hint="Optional; shown struck through." />
                <Text label="Price note" value={p.priceNote} onChange={(v) => up({ priceNote: v || undefined })} placeholder="Per person" />
              </div>
              <Text label="Tax note" value={p.taxNote} onChange={(v) => up({ taxNote: v || undefined })} placeholder="Includes 5% GST. TCS 2% extra." />
              <Lines label="Highlights (on the card)" value={p.highlights} onChange={(v) => up({ highlights: v })} rows={3} />
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput label="Rating (optional)" value={p.rating} onChange={(v) => up({ rating: v })} min={0} max={5} step={0.1} hint="Only figures you can verify." />
                <NumberInput label="Number of reviews" value={p.reviewCount} onChange={(v) => up({ reviewCount: v })} min={0} />
              </div>
              <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
                <ImagePicker value={p.image.slug} onChange={(slug) => up({ image: { ...p.image, slug } })} />
                <Text label="Crop focus" value={p.image.focus} onChange={(v) => up({ image: { ...p.image, focus: v || undefined } })} placeholder="50% 40%" />
              </div>
              <Panel title="Full details (expandable on the card)" className="!p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="Hotel" value={det.hotel} onChange={(v) => upd({ hotel: v || undefined })} />
                  <Text label="Distance from Haram" value={det.distanceFromHaram} onChange={(v) => upd({ distanceFromHaram: v || undefined })} />
                  <Text label="Flight" value={det.flight} onChange={(v) => upd({ flight: v || undefined })} />
                  <Text label="Transport" value={det.transport} onChange={(v) => upd({ transport: v || undefined })} />
                  <Text label="Meals" value={det.meals} onChange={(v) => upd({ meals: v || undefined })} />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Lines label="Inclusions" value={det.inclusions} onChange={(v) => upd({ inclusions: v.length ? v : undefined })} />
                  <Lines label="Exclusions" value={det.exclusions} onChange={(v) => upd({ exclusions: v.length ? v : undefined })} />
                </div>
              </Panel>
              <Text label="Internal id" value={p.id} onChange={(v) => up({ id: slugifyText(v) })} hint="Used by the website code; change only if you know why." />
            </>
          )
        }}
      />
      <SaveBar dirty={d.dirty} saving={d.saving} onSave={d.save} onDiscard={d.discard} />
    </>
  )
}

import type { SiteSettings as Site } from '@/data/site'
import { Area, Errors, ListEditor, NumberInput, PageHeader, Panel, SaveBar, Spinner, Text, useUnsavedWarning } from '../ui'
import { useDoc } from '../useDoc'

export default function SiteSettings() {
  const d = useDoc<Site>('site')
  useUnsavedWarning(d.dirty)
  if (d.loadError) return <Errors title="Could not load" errors={[d.loadError]} />
  if (!d.data) return <Spinner />
  const s = d.data
  const set = (p: Partial<Site>) => d.setData({ ...s, ...p })
  return (
    <>
      <PageHeader title="Business details" intro="Name, licence, phone numbers, address and hours. Used across the whole website, in Google's structured data and in llms.txt. Keep them identical to your Google Business Profile." />
      <div className="mb-6"><Errors errors={d.errors} onClose={() => d.setErrors([])} /></div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Business">
          <div className="space-y-4">
            <Text label="Business name" value={s.name} onChange={(v) => set({ name: v })} />
            <Text label="Short name" value={s.shortName} onChange={(v) => set({ shortName: v })} />
            <Text label="Tagline" value={s.tagline} onChange={(v) => set({ tagline: v })} max={160} />
            <Area label="Description" value={s.description} onChange={(v) => set({ description: v })} rows={4} max={400} hint="Used for Google's business information." />
            <Text label="Website address" value={s.url} onChange={(v) => set({ url: v })} hint="Change only when the domain changes." />
          </div>
        </Panel>
        <Panel title="Licence">
          <div className="space-y-4">
            <Text label="Licence number" value={s.licence.number} onChange={(v) => set({ licence: { ...s.licence, number: v } })} />
            <Text label="Role" value={s.licence.role} onChange={(v) => set({ licence: { ...s.licence, role: v } })} />
            <Text label="Issued by" value={s.licence.authority} onChange={(v) => set({ licence: { ...s.licence, authority: v } })} />
            <Text label="Certificate link" value={s.licence.certificateUrl} onChange={(v) => set({ licence: { ...s.licence, certificateUrl: v } })} type="url" />
          </div>
        </Panel>
        <Panel title="Phone and WhatsApp">
          <ListEditor items={s.phones} onChange={(phones) => set({ phones })} max={6} addLabel="Add phone number" collapsible={false}
            create={() => ({ label: 'Alternate', display: '', tel: '+91' })}
            itemTitle={(p) => `${p.label}: ${p.display || 'new number'}`}
            render={(p, up) => (
              <div className="grid gap-3 sm:grid-cols-3">
                <Text label="Label" value={p.label} onChange={(v) => up({ label: v })} />
                <Text label="As shown" value={p.display} onChange={(v) => up({ display: v })} placeholder="+91 92703 30016" />
                <Text label="For dialling" value={p.tel} onChange={(v) => up({ tel: v.replace(/[^\d+]/g, '') })} placeholder="+919270330016" />
              </div>
            )} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Text label="WhatsApp number" value={s.whatsapp.number} onChange={(v) => set({ whatsapp: { ...s.whatsapp, number: v.replace(/\D/g, '') } })} hint="Digits only with country code, e.g. 919270330016." />
            <Text label="WhatsApp, as shown" value={s.whatsapp.display} onChange={(v) => set({ whatsapp: { ...s.whatsapp, display: v } })} />
          </div>
          <Text className="mt-4" label="Email" value={s.email} onChange={(v) => set({ email: v })} type="email" />
        </Panel>
        <Panel title="Address and map">
          <div className="space-y-4">
            <Text label="Address line 1" value={s.address.line1} onChange={(v) => set({ address: { ...s.address, line1: v } })} />
            <Text label="Address line 2" value={s.address.line2} onChange={(v) => set({ address: { ...s.address, line2: v } })} />
            <div className="grid grid-cols-2 gap-3">
              <Text label="City" value={s.address.city} onChange={(v) => set({ address: { ...s.address, city: v } })} />
              <Text label="PIN code" value={s.address.postalCode} onChange={(v) => set({ address: { ...s.address, postalCode: v } })} />
            </div>
            <Text label="State" value={s.address.region} onChange={(v) => set({ address: { ...s.address, region: v } })} />
            <Text label="Google Maps link" value={s.mapLink} onChange={(v) => set({ mapLink: v })} type="url" />
            <Text label="Map embed link" value={s.mapEmbed} onChange={(v) => set({ mapEmbed: v })} type="url" />
          </div>
        </Panel>
        <Panel title="Opening hours">
          <ListEditor<Site['hours'][number]> items={s.hours} onChange={(hours) => set({ hours })} max={7} addLabel="Add row" collapsible={false}
            create={() => ({ days: '', time: '' })} itemTitle={(h) => `${h.days || 'Days'}: ${h.time || 'time'}`}
            render={(h, up) => (
              <div className="grid gap-3 sm:grid-cols-2">
                <Text label="Days" value={h.days} onChange={(v) => up({ days: v })} placeholder="Monday to Saturday" />
                <Text label="Hours, as shown" value={h.time} onChange={(v) => up({ time: v })} placeholder="10:00 AM - 7:00 PM" />
                <Text label="Opens (24h)" value={h.open} onChange={(v) => up({ open: v || undefined })} placeholder="10:00" />
                <Text label="Closes (24h)" value={h.close} onChange={(v) => up({ close: v || undefined })} placeholder="19:00" />
              </div>
            )} />
        </Panel>
        <Panel title="Figures and social profiles">
          <ListEditor items={s.stats} onChange={(stats) => set({ stats })} max={6} addLabel="Add figure" collapsible={false}
            create={() => ({ value: '', label: '' })} itemTitle={(x) => `${x.value} ${x.label}`}
            render={(x, up) => (
              <div className="grid gap-3 sm:grid-cols-2">
                <Text label="Figure" value={x.value} onChange={(v) => up({ value: v })} placeholder="18+" />
                <Text label="Label" value={x.label} onChange={(v) => up({ label: v })} placeholder="Years of experience" />
              </div>
            )} />
          <p className="mt-2 text-xs text-ink-500">Only figures you can stand behind.</p>
          <div className="mt-5">
            <ListEditor items={s.social} onChange={(social) => set({ social })} max={10} addLabel="Add profile" collapsible={false}
              create={() => ({ label: '', url: 'https://' })} itemTitle={(x) => x.label || 'Profile'}
              render={(x, up) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Text label="Network" value={x.label} onChange={(v) => up({ label: v })} hint="YouTube, Facebook, Instagram or Threads get their icon." />
                  <Text label="Link" value={x.url} onChange={(v) => up({ url: v })} type="url" />
                </div>
              )} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <NumberInput label="Google rating" value={s.googleReviews.rating} onChange={(v) => set({ googleReviews: { ...s.googleReviews, rating: v ?? null } })} min={0} max={5} step={0.1} hint="Copy from your live Google profile, or leave empty." />
            <NumberInput label="Google review count" value={s.googleReviews.reviewCount} onChange={(v) => set({ googleReviews: { ...s.googleReviews, reviewCount: v ?? null } })} min={0} />
          </div>
        </Panel>
      </div>
      <SaveBar dirty={d.dirty} saving={d.saving} onSave={d.save} onDiscard={d.discard} />
    </>
  )
}

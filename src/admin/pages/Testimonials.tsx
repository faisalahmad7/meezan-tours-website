import type { Testimonial } from '@/data/types'
import { Area, Errors, ListEditor, PageHeader, SaveBar, Select, Spinner, Text, useUnsavedWarning } from '../ui'
import { useDoc } from '../useDoc'

/** Accepts a full YouTube link or just the id. */
const youtubeId = (v: string) => (/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{6,20})/.exec(v)?.[1] ?? v.trim())

export default function Testimonials() {
  const d = useDoc<Testimonial[]>('testimonials')
  useUnsavedWarning(d.dirty)
  if (d.loadError) return <Errors title="Could not load" errors={[d.loadError]} />
  if (!d.data) return <Spinner />
  return (
    <>
      <PageHeader title="Testimonials" intro="Pilgrims' video and written testimonials. Publish only with the pilgrim's permission, and use their words exactly." />
      <div className="mb-6"><Errors errors={d.errors} onClose={() => d.setErrors([])} /></div>
      <ListEditor<Testimonial> items={d.data} onChange={d.setData} max={60} addLabel="Add testimonial"
        create={() => ({ id: `t${Date.now().toString(36)}`, youtubeId: '', name: '', place: '', trip: '', lang: 'en', quote: '' })}
        itemTitle={(t) => <>{t.name || 'New testimonial'} <span className="font-normal text-ink-500">· {t.trip}</span></>}
        render={(t, up) => (
          <div className="grid gap-4 md:grid-cols-[1fr_14rem]">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label="Name" value={t.name} onChange={(v) => up({ name: v })} max={80} />
                <Text label="Place" value={t.place} onChange={(v) => up({ place: v })} placeholder="Beed, Maharashtra" />
                <Text label="Trip" value={t.trip} onChange={(v) => up({ trip: v })} placeholder="Hajj 2026" />
                <Select<'en' | 'hi'> label="Language of the quote" value={t.lang ?? 'en'} onChange={(v) => up({ lang: v })} options={[{ value: 'en', label: 'English' }, { value: 'hi', label: 'Hindi / Urdu (Devanagari)' }]} />
              </div>
              <Area label="Quote" value={t.quote} onChange={(v) => up({ quote: v })} rows={6} max={3000} />
              <Text label="YouTube video" value={t.youtubeId} onChange={(v) => up({ youtubeId: youtubeId(v) })} hint="Paste the YouTube link; only the video id is stored." />
            </div>
            {t.youtubeId && <img src={`https://i.ytimg.com/vi/${t.youtubeId}/hqdefault.jpg`} alt="" className="aspect-video w-full rounded-lg object-cover" loading="lazy" />}
          </div>
        )} />
      <SaveBar dirty={d.dirty} saving={d.saving} onSave={d.save} onDiscard={d.discard} />
    </>
  )
}

import type { HeroSlide } from '@/data/hero'
import { ImagePicker, Thumb } from '../ImagePicker'
import { Area, Errors, ListEditor, PageHeader, Panel, SaveBar, Spinner, Text, useUnsavedWarning } from '../ui'
import { useDoc } from '../useDoc'

function Slides({ items, onChange, hint }: { items: HeroSlide[]; onChange: (s: HeroSlide[]) => void; hint: string }) {
  return (
    <>
      <p className="mb-3 text-sm text-ink-500">{hint}</p>
      <ListEditor<HeroSlide> items={items} onChange={onChange} max={8} addLabel="Add photo" create={() => ({ slug: '', alt: '' })}
        itemTitle={(s) => <span className="flex min-w-0 items-center gap-3">{s.slug && <Thumb slug={s.slug} focus={s.focus} className="h-9 w-12 shrink-0" />}<span className="truncate">{s.alt || s.slug || 'New photo'}</span></span>}
        render={(s, up) => (
          <>
            <ImagePicker value={s.slug} onChange={(slug) => up({ slug })} />
            <Area label="Description (alt text)" value={s.alt} onChange={(v) => up({ alt: v })} rows={2} max={300} />
            <Text label="Crop focus" value={s.focus} onChange={(v) => up({ focus: v || undefined })} placeholder="50% 60%" />
          </>
        )} />
    </>
  )
}

export default function HomeHero() {
  const d = useDoc<{ main: HeroSlide[]; side: HeroSlide[] }>('hero')
  useUnsavedWarning(d.dirty)
  if (d.loadError) return <Errors title="Could not load" errors={[d.loadError]} />
  if (!d.data) return <Spinner />
  const h = d.data
  return (
    <>
      <PageHeader title="Home page photos" intro="The rotating photos at the top of the home page." />
      <div className="mb-6"><Errors errors={d.errors} onClose={() => d.setErrors([])} /></div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Main arch (portrait)"><Slides items={h.main} onChange={(main) => d.setData({ ...h, main })} hint="Tall photos work best. The first photo is shown first." /></Panel>
        <Panel title="Side frame (landscape)"><Slides items={h.side} onChange={(side) => d.setData({ ...h, side })} hint="Group photos of Meezan pilgrims." /></Panel>
      </div>
      <SaveBar dirty={d.dirty} saving={d.saving} onSave={d.save} onDiscard={d.discard} />
    </>
  )
}

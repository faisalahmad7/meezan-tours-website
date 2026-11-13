import type { GalleryImage, GalleryVideo } from '@/data/types'
import { ImagePicker, Thumb } from '../ImagePicker'
import { Area, Check, Errors, ListEditor, PageHeader, Panel, SaveBar, Select, Spinner, Text, useUnsavedWarning } from '../ui'
import { useDoc } from '../useDoc'

const CATS: GalleryImage['category'][] = ['Hajj', 'Kaaba', 'Journey', 'Groups', 'Ziyarat', 'Stay & Food', 'Events']

export default function Gallery() {
  const d = useDoc<{ images: GalleryImage[]; videos: GalleryVideo[]; homeIds: string[] }>('gallery')
  useUnsavedWarning(d.dirty)
  if (d.loadError) return <Errors title="Could not load" errors={[d.loadError]} />
  if (!d.data) return <Spinner />
  const g = d.data
  const toggleHome = (id: string, on: boolean) => d.setData({ ...g, homeIds: on ? [...g.homeIds, id] : g.homeIds.filter((x) => x !== id) })
  return (
    <>
      <PageHeader title="Gallery" intro="Photos on the /gallery page, in this order. Tick up to six to show on the home page. Add new photos to the photo library first, or upload them from the photo chooser." />
      <div className="mb-6"><Errors errors={d.errors} onClose={() => d.setErrors([])} /></div>
      <Panel title={`Photos (${g.images.length})`} intro={`${g.homeIds.length} of 6 chosen for the home page.`}>
        <ListEditor<GalleryImage> items={g.images} onChange={(images) => d.setData({ ...g, images, homeIds: g.homeIds.filter((h) => images.some((i) => i.id === h)) })} max={300} addLabel="Add photo"
          create={() => ({ id: `g${Date.now().toString(36)}`, slug: '', title: '', alt: '', category: 'Groups' })}
          itemTitle={(i) => (
            <span className="flex min-w-0 items-center gap-3">
              {i.slug ? <Thumb slug={i.slug} className="h-9 w-12 shrink-0" /> : null}
              <span className="truncate">{i.title || 'New photo'}</span>
              <span className="shrink-0 font-normal text-ink-500">· {i.category}{g.homeIds.includes(i.id) ? ' · Home page' : ''}</span>
            </span>
          )}
          render={(i, up) => (
            <>
              <ImagePicker value={i.slug} onChange={(slug) => up({ slug })} />
              <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
                <Text label="Title" value={i.title} onChange={(v) => up({ title: v })} max={120} />
                <Select<GalleryImage['category']> label="Category" value={i.category} onChange={(v) => up({ category: v })} options={CATS.map((c) => ({ value: c, label: c }))} />
              </div>
              <Area label="Description (alt text)" value={i.alt} onChange={(v) => up({ alt: v })} rows={2} max={300} />
              <Check label="Show on the home page" checked={g.homeIds.includes(i.id)} onChange={(on) => toggleHome(i.id, on)} />
            </>
          )} />
      </Panel>
      <SaveBar dirty={d.dirty} saving={d.saving} onSave={d.save} onDiscard={d.discard} />
    </>
  )
}

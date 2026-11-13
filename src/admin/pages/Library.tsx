import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Thumb, UploadPhoto, useLibrary } from '../ImagePicker'
import { PageHeader, Spinner } from '../ui'

export default function Library() {
  const { lib } = useLibrary()
  const [q, setQ] = useState('')
  const slugs = useMemo(() => Object.keys(lib ?? {}).filter((s) => s.includes(q.toLowerCase())).reverse(), [lib, q])
  return (
    <>
      <PageHeader title="Photo library" intro="Every photo the website can use. Upload a photo once, then choose it anywhere: blog posts, packages, gallery and home page." />
      <UploadPhoto />
      <div className="relative mt-6 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name" aria-label="Search photos" className="w-full rounded-lg border border-sand-300 bg-white py-2 pl-9 pr-3 text-sm" />
      </div>
      {!lib ? <Spinner /> : (
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {slugs.map((s) => (
            <li key={s} className="overflow-hidden rounded-xl border border-sand-200 bg-white">
              <Thumb slug={s} className="aspect-[4/3] w-full rounded-none" />
              <div className="px-3 py-2">
                <p className="truncate text-sm font-semibold text-ink-900">{s}</p>
                <p className="text-xs text-ink-500">{lib[s].w} × {lib[s].h} · {lib[s].widths.join('/')} px</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

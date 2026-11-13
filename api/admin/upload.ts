import { getConfig } from '../_lib/config.js'
import { MANIFEST_FILE } from '../_lib/docs.js'
import { adminRoute, HttpError, json, readJson } from '../_lib/http.js'
import { getStore, readJsonFile, toJson } from '../_lib/store.js'
import { SLUG } from '../_lib/validate.js'

interface Upload {
  slug: string
  /** Original width/height and the placeholder colour, measured in the browser. */
  w: number
  h: number
  color: string
  /** WebP files resized in the browser: one per width. */
  files: { width: number; data: string }[]
}

const WEBP = (b64: string) => Buffer.from(b64.slice(0, 24), 'base64').subarray(8, 12).toString('ascii') === 'WEBP'

/**
 * Add a photo to the library: the resized WebP files go to public/images/gallery/<slug>-<width>.webp
 * and the size/colour entry to src/content/image-manifest.json, in a single commit.
 */
export const POST = adminRoute(async (req) => {
  const u = await readJson<Upload>(req, 4_200_000)
  const errors: string[] = []
  if (!SLUG.test(u.slug ?? '') || u.slug.length > 60) errors.push('The photo name must use lowercase letters, numbers and hyphens.')
  if (!Number.isInteger(u.w) || !Number.isInteger(u.h) || u.w < 200 || u.h < 200) errors.push('The photo is too small (at least 200 px on each side).')
  if (!/^#[0-9a-f]{6}$/i.test(u.color ?? '')) errors.push('Invalid placeholder colour.')
  if (!Array.isArray(u.files) || !u.files.length || u.files.length > 4) errors.push('Expected one to four resized files.')
  for (const f of u.files ?? []) {
    if (![480, 960, 1600, 1920].includes(f.width) && f.width !== u.w) errors.push(`Unexpected width ${f.width}.`)
    if (typeof f.data !== 'string' || !WEBP(f.data)) errors.push(`The ${f.width}px file is not a WebP image.`)
  }
  if (errors.length) throw new HttpError(422, 'The photo could not be added.', errors)

  const store = getStore(getConfig())
  const manifest = await readJsonFile<Record<string, unknown>>(store, MANIFEST_FILE)
  if (manifest[u.slug]) throw new HttpError(409, `A photo named "${u.slug}" already exists. Choose another name.`)
  const widths = [...new Set(u.files.map((f) => f.width))].sort((a, b) => a - b)
  manifest[u.slug] = { w: u.w, h: u.h, widths, color: u.color.toLowerCase() }

  const result = await store.commit(
    [
      ...u.files.map((f) => ({ path: `public/images/gallery/${u.slug}-${f.width}.webp`, content: f.data, encoding: 'base64' as const })),
      { path: MANIFEST_FILE, content: toJson(manifest) },
    ],
    `content: add photo ${u.slug} (admin)`,
  )
  return json({ ok: true, slug: u.slug, meta: manifest[u.slug], ...result })
})

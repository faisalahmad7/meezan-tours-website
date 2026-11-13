import { getConfig } from '../_lib/config.js'
import { DOCS, POSTS_FILE } from '../_lib/docs.js'
import { adminRoute, HttpError, json, readJson } from '../_lib/http.js'
import { getStore, readJsonFile, toJson } from '../_lib/store.js'
import { validate, validators } from '../_lib/validate.js'

const docOf = (req: Request) => {
  const id = new URL(req.url).searchParams.get('doc') ?? ''
  const doc = DOCS[id]
  if (!doc) throw new HttpError(404, `Unknown document "${id}".`)
  return { id, ...doc }
}

/** Read one document as it is now in the content store (not as it was at the last deploy). */
export const GET = adminRoute(async (req) => {
  const doc = docOf(req)
  const store = getStore(getConfig())
  return json({ data: await readJsonFile(store, doc.file) })
})

type Post = { slug: string; category: string; authorId: string }

/** Save one document after validating it and checking it stays consistent with the blog posts. */
export const PUT = adminRoute(async (req) => {
  const doc = docOf(req)
  if (doc.readOnly) throw new HttpError(400, `${doc.label} cannot be edited here.`)
  const { data } = await readJson<{ data: unknown }>(req)
  const errors = validate(validators[doc.id], data, doc.id)
  const store = getStore(getConfig())

  if (doc.id === 'blog-categories' && !errors.length) {
    const d = data as { categories: { id: string }[]; authors: { id: string }[] }
    const posts = await readJsonFile<Post[]>(store, POSTS_FILE)
    for (const p of posts) {
      if (!d.categories.some((c) => c.id === p.category)) errors.push(`Category "${p.category}" is still used by the post "${p.slug}". Move that post first.`)
      if (!d.authors.some((a) => a.id === p.authorId)) errors.push(`Author "${p.authorId}" is still used by the post "${p.slug}".`)
    }
  }
  if (doc.id === 'reading-path' && !errors.length) {
    const slugs = new Set((await readJsonFile<Post[]>(store, POSTS_FILE)).map((p) => p.slug))
    for (const s of (data as { slugs: string[] }[]).flatMap((x) => x.slugs)) if (!slugs.has(s)) errors.push(`No post with the address "${s}".`)
  }
  if (doc.id === 'gallery' && !errors.length) {
    const d = data as { images: { id: string }[]; homeIds: string[] }
    const ids = new Set(d.images.map((i) => i.id))
    if (ids.size !== d.images.length) errors.push('Two gallery photos have the same id.')
    for (const h of d.homeIds) if (!ids.has(h)) errors.push(`Home page photo "${h}" is not in the gallery.`)
  }
  if (errors.length) throw new HttpError(422, 'Please fix the highlighted problems.', errors)

  const result = await store.commit([{ path: doc.file, content: toJson(data) }], `content: update ${doc.label} (admin)`)
  return json({ ok: true, ...result })
})

import { SITE } from '@/data/site'

export interface HeadData {
  title: string
  description: string
  /** Route path, e.g. "/hajj". Used for the canonical URL. */
  path: string
  image?: string
  noindex?: boolean
  jsonLd?: object[]
}

let serverHead: HeadData | null = null
export const resetServerHead = () => {
  serverHead = null
}
export const setServerHead = (d: HeadData) => {
  serverHead = d
}
export const getServerHead = () => serverHead

const abs = (p: string) => (p.startsWith('http') ? p : SITE.url + p)
export const canonicalFor = (path: string) => abs(path === '/' ? '/' : path)
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

interface Tag {
  kind: 'meta-name' | 'meta-prop' | 'link'
  key: string
  value: string
}

function tags(d: HeadData): Tag[] {
  const url = canonicalFor(d.path)
  const image = abs(d.image ?? '/og-image.jpg')
  return [
    { kind: 'meta-name', key: 'description', value: d.description },
    { kind: 'meta-name', key: 'robots', value: d.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' },
    { kind: 'link', key: 'canonical', value: url },
    { kind: 'meta-prop', key: 'og:type', value: 'website' },
    { kind: 'meta-prop', key: 'og:site_name', value: SITE.name },
    { kind: 'meta-prop', key: 'og:locale', value: 'en_IN' },
    { kind: 'meta-prop', key: 'og:title', value: d.title },
    { kind: 'meta-prop', key: 'og:description', value: d.description },
    { kind: 'meta-prop', key: 'og:url', value: url },
    { kind: 'meta-prop', key: 'og:image', value: image },
    { kind: 'meta-prop', key: 'og:image:width', value: '1200' },
    { kind: 'meta-prop', key: 'og:image:height', value: '630' },
    { kind: 'meta-name', key: 'twitter:card', value: 'summary_large_image' },
    { kind: 'meta-name', key: 'twitter:title', value: d.title },
    { kind: 'meta-name', key: 'twitter:description', value: d.description },
    { kind: 'meta-name', key: 'twitter:image', value: image },
  ]
}

/** Build-time: returns the <head> markup injected into every prerendered page. */
export function headToHtml(d: HeadData): string {
  const out = [`<title>${esc(d.title)}</title>`]
  for (const t of tags(d)) {
    if (t.kind === 'link') out.push(`<link rel="${t.key}" href="${esc(t.value)}" />`)
    else if (t.kind === 'meta-name') out.push(`<meta name="${t.key}" content="${esc(t.value)}" />`)
    else out.push(`<meta property="${t.key}" content="${esc(t.value)}" />`)
  }
  for (const ld of d.jsonLd ?? []) {
    out.push(
      `<script type="application/ld+json" data-seo-ld>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return out.join('\n    ')
}

/** Client-side: keep <head> in sync on route changes. */
export function applyHead(d: HeadData) {
  document.title = d.title
  for (const t of tags(d)) {
    const sel =
      t.kind === 'link'
        ? `link[rel="${t.key}"]`
        : t.kind === 'meta-name'
          ? `meta[name="${t.key}"]`
          : `meta[property="${t.key}"]`
    let el = document.head.querySelector(sel)
    if (!el) {
      el = document.createElement(t.kind === 'link' ? 'link' : 'meta')
      if (t.kind === 'link') el.setAttribute('rel', t.key)
      else el.setAttribute(t.kind === 'meta-name' ? 'name' : 'property', t.key)
      document.head.appendChild(el)
    }
    el.setAttribute(t.kind === 'link' ? 'href' : 'content', t.value)
  }
  document.head.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove())
  for (const ld of d.jsonLd ?? []) {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-seo-ld', '')
    s.text = JSON.stringify(ld)
    document.head.appendChild(s)
  }
}

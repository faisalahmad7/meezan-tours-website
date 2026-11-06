// Run from the root of meezan-tours-website:  node apply_frontend_polish.mjs
// Every replacement is checked first, so nothing is half-applied if a file differs.
import fs from 'node:fs'
import path from 'node:path'

const read = (p) => fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s, 'utf8') }
const swap = (p, oldS, newS) => {
  const s = read(p)
  if (s.includes(newS)) return console.log('already applied:', p)
  if (!s.includes(oldS)) throw new Error('Could not find expected text in ' + p + ':\n' + oldS.slice(0, 80))
  write(p, s.replace(oldS, () => newS)); console.log('patched', p)
}

// 1. .gitignore
write('.gitignore', 'node_modules\ndist\ndist-ssr\n.env\n.env.*\n!.env.example\n.DS_Store\n')
console.log('rewrote .gitignore')

// 2. Header: move mobile menu out of <header>
{
  const p = 'src/components/Header.tsx'
  let s = read(p)
  if (!s.includes('pt-[4.25rem]')) {
    const a = s.indexOf('        <div id="mobile-menu"')
    const b = s.indexOf('      </header>')
    if (a < 0 || b < 0) throw new Error('Header.tsx: mobile menu not found')
    let block = s.slice(a, b).replace(
      'fixed inset-x-0 bottom-0 top-[4.25rem] z-30 overflow-y-auto bg-ivory lg:hidden',
      'fixed inset-0 z-30 overflow-y-auto bg-ivory pt-[4.25rem] md:pt-[6.25rem] lg:hidden')
    if (!block.includes('pt-[4.25rem]')) throw new Error('Header.tsx: menu classes differ')
    block = block.split('\n').map((l) => (l.startsWith('  ') ? l.slice(2) : l)).join('\n')
    s = s.slice(0, a) + s.slice(b)
    s = s.replace('      </header>\n', () => '      </header>\n' + block)
    write(p, s); console.log('patched', p)
  } else console.log('already applied:', p)
}

// 3. Hero entrance in CSS instead of gsap.from
swap('src/lib/useMotion.ts',
  "        gsap.from('[data-hero] > *', { opacity: 0, y: 28, duration: 0.9, ease: 'power3.out', stagger: 0.12 })\n", '')
{
  let css = read('src/index.css')
  if (!css.includes('data-hero')) {
    css += `
/* Hero entrance: transform only, so text is visible from first paint (better LCP). */
@keyframes rise { from { transform: translateY(1.25rem); } to { transform: none; } }
[data-hero] > * { animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
[data-hero] > :nth-child(2) { animation-delay: 0.06s; }
[data-hero] > :nth-child(3) { animation-delay: 0.12s; }
[data-hero] > :nth-child(4) { animation-delay: 0.18s; }
[data-hero] > :nth-child(5) { animation-delay: 0.24s; }
`
    write('src/index.css', css); console.log('patched src/index.css')
  }
}

// 4. head.ts
swap('src/lib/head.ts',
  "    { kind: 'meta-name', key: 'twitter:card', value: 'summary_large_image' },",
  "    { kind: 'meta-prop', key: 'og:image:alt', value: d.title },\n" +
  "    { kind: 'meta-name', key: 'geo.region', value: 'IN-MH' },\n" +
  "    { kind: 'meta-name', key: 'geo.placename', value: 'Pune' },\n" +
  "    { kind: 'meta-name', key: 'twitter:card', value: 'summary_large_image' },\n" +
  "    { kind: 'meta-name', key: 'twitter:image:alt', value: d.title },")

// 5. schema.ts + Home.tsx
swap('src/lib/schema.ts',
  "  areaServed: [{ '@type': 'AdministrativeArea', name: 'Maharashtra' }, { '@type': 'Country', name: 'India' }],",
  "  identifier: { '@type': 'PropertyValue', name: `${SITE.licence.role} licence (MOMA Hajj Cell)`, value: SITE.licence.number },\n" +
  "  contactPoint: SITE.phones.map((ph) => ({ '@type': 'ContactPoint', contactType: 'customer service', telephone: ph.tel, areaServed: 'IN', availableLanguage: ['English', 'Hindi', 'Urdu'] })),\n" +
  "  areaServed: [{ '@type': 'AdministrativeArea', name: 'Maharashtra' }, { '@type': 'Country', name: 'India' }],")
{
  let s = read('src/lib/schema.ts')
  if (!s.includes('faqSchema')) {
    s += `
/** FAQPage structured data: lets search and AI answer engines quote the answers. */
export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
})
`
    write('src/lib/schema.ts', s); console.log('patched src/lib/schema.ts')
  }
}
swap('src/pages/Home.tsx', "import { businessSchema, websiteSchema } from '@/lib/schema'", "import { businessSchema, faqSchema, websiteSchema } from '@/lib/schema'")
swap('src/pages/Home.tsx', 'jsonLd={[businessSchema(), websiteSchema()]}', 'jsonLd={[businessSchema(), websiteSchema(), faqSchema(getFaqs())]}')

// 6. robots.txt with explicit AI crawlers
swap('scripts/prerender.mjs',
  "`User-agent: *\\nAllow: /\\n\\nSitemap: ${SITE}/sitemap.xml\\n`",
  "[\n    'User-agent: *\\nAllow: /\\nDisallow: /admin',\n" +
  "    ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'].map((b) => `User-agent: ${b}\\nAllow: /`),\n" +
  "    `Sitemap: ${SITE}/sitemap.xml`,\n  ].join('\\n\\n') + '\\n'")

// 7. llms.txt
write('public/llms.txt', `# Meezan Tours & Travels

> Pune-based Hajj and Umrah tour operator, 18+ years of experience. Registered with the Ministry of Minority Affairs (MOMA) Hajj Cell, Government of India, as a Hajj Group Organiser (licence MH03572726/Cat-II/9943/2026).

## Key facts
- Services: Hajj packages, Umrah packages, Ziyarat, flights, visas, hotels, ground transport, guided support
- Serves pilgrims from across India; group journeys depart from Mumbai airport
- Office: Shop No. 8, 549, Kulsum Complex, Nana Peth, Pune, Maharashtra 411002, India
- Hours: Monday to Saturday 10:00 AM to 7:00 PM, closed Sunday
- Phone / WhatsApp: +91 92703 30016
- Email: meezantour@gmail.com

## Pages
- [Home](https://www.meezantours.com/)
- [Hajj packages](https://www.meezantours.com/hajj)
- [Umrah packages](https://www.meezantours.com/umrah)
- [All packages](https://www.meezantours.com/packages)
- [Ziyarat](https://www.meezantours.com/ziyarat)
- [About](https://www.meezantours.com/about)
- [Contact](https://www.meezantours.com/contact)
`)
console.log('wrote public/llms.txt\nDone. Now run: npm install && npm run typecheck && npm run build && npm run preview')

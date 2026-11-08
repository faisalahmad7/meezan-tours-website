// Run once from the project root:  node apply_gallery_silver.mjs
// Turns the home-page gallery section into silver and ivory white (dark text, silver arch lattice).
import { readFileSync, writeFileSync } from 'node:fs'

const LATTICE = "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%3E%3Cg%20fill='none'%20stroke='%238f969b'%20stroke-opacity='.3'%20stroke-width='1.2'%20stroke-linejoin='round'%3E%3Cpath%20d='M10%20100V55C10%2028%2035%2014%2050%200C65%2014%2090%2028%2090%2055V100'/%3E%3Cpath%20d='M24%20100V58C24%2040%2040%2027%2050%2014C60%2027%2076%2040%2076%2058V100'/%3E%3C/g%3E%3Cg%20fill='%238f969b'%20fill-opacity='.4'%3E%3Ccircle%20cx='0'%20cy='50'%20r='1.6'/%3E%3Ccircle%20cx='100'%20cy='50'%20r='1.6'/%3E%3Ccircle%20cx='50'%20cy='0'%20r='1.6'/%3E%3C/g%3E%3C/svg%3E\")"
const NEW_CSS = `.gallery-bg { background-color: #f7f4ea;
  background-image: ${LATTICE}, radial-gradient(60% 50% at 50% 0%, rgb(255 255 255 / 0.85), transparent 70%), radial-gradient(45% 40% at 100% 100%, rgb(176 184 190 / 0.35), transparent 70%), radial-gradient(45% 40% at 0% 70%, rgb(200 206 211 / 0.4), transparent 70%), linear-gradient(160deg, #fbf8f0 0%, #e9ebed 45%, #f6f2e8 70%, #dfe3e6 100%); }
.gallery-bg .eyebrow-strong { color: #17503d; }`

function edit(file, fn) {
  const before = readFileSync(file, 'utf8')
  const after = fn(before)
  if (after === before) { console.log('Nothing changed in', file, '(already applied?)'); return }
  writeFileSync(file, after)
  console.log('Updated', file)
}

edit('src/index.css', (css) => css
  .replace(/\.gallery-bg \{[\s\S]*?\}\n\.gallery-bg \.eyebrow-strong \{[^}]*\}/, NEW_CSS)
  .replace(/\/\* gallery: [^*]*?lattice/, '/* gallery: silver and ivory white with a silver arch lattice'))
edit('src/pages/Home.tsx', (t) => t
  .replace('gallery-bg on-dark relative isolate overflow-hidden border-y-2 border-gold-500/60 py-16 text-white', 'gallery-bg relative isolate overflow-hidden border-y-2 border-[#b9bfc4] py-16 text-ink-900')
  .replace('a soft red (close to the logo red, lighter) with the same gold arch lattice', 'silver and ivory white with a silver arch lattice'))
edit('src/components/GalleryMosaic.tsx', (t) => t.replace('bg-[#7d2128]', 'bg-brand-900'))

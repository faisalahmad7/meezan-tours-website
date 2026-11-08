// Run once from the project root:  node apply_gallery_colour.mjs
// Changes the gallery section background in src/index.css from midnight navy to a soft red.
import { readFileSync, writeFileSync } from 'node:fs'
const file = 'src/index.css'
let css = readFileSync(file, 'utf8')
const before = css
css = css.replace('.gallery-bg { background-color: #0c1633;', '.gallery-bg { background-color: #9c2d34;')
css = css.replace('radial-gradient(45% 40% at 0% 70%, rgb(96 120 200 / 0.18), transparent 70%)', 'radial-gradient(45% 40% at 0% 70%, rgb(255 140 130 / 0.18), transparent 70%)')
css = css.replace('/* gallery: midnight navy with the gold arch lattice', '/* gallery: soft red (close to the logo red, lighter) with the gold arch lattice')
if (css === before) { console.log('Nothing changed. Is it already applied, or are you not in the project root?'); process.exit(1) }
writeFileSync(file, css)
console.log('Gallery colour updated in', file)

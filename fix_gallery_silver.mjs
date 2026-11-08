// Run once from the project root:  node fix_gallery_silver.mjs
// Replaces the red gallery background in src/index.css with silver and ivory white.
// (Works with Windows line endings. The earlier script missed them.)
import { readFileSync, writeFileSync } from 'node:fs'

const LATTICE = "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%3E%3Cg%20fill='none'%20stroke='%238f969b'%20stroke-opacity='.3'%20stroke-width='1.2'%20stroke-linejoin='round'%3E%3Cpath%20d='M10%20100V55C10%2028%2035%2014%2050%200C65%2014%2090%2028%2090%2055V100'/%3E%3Cpath%20d='M24%20100V58C24%2040%2040%2027%2050%2014C60%2027%2076%2040%2076%2058V100'/%3E%3C/g%3E%3Cg%20fill='%238f969b'%20fill-opacity='.4'%3E%3Ccircle%20cx='0'%20cy='50'%20r='1.6'/%3E%3Ccircle%20cx='100'%20cy='50'%20r='1.6'/%3E%3Ccircle%20cx='50'%20cy='0'%20r='1.6'/%3E%3C/g%3E%3C/svg%3E\")"

const file = 'src/index.css'
const css = readFileSync(file, 'utf8')
const nl = css.includes('\r\n') ? '\r\n' : '\n'
const block = [
  '.gallery-bg { background-color: #f7f4ea;',
  `  background-image: ${LATTICE}, radial-gradient(60% 50% at 50% 0%, rgb(255 255 255 / 0.85), transparent 70%), radial-gradient(45% 40% at 100% 100%, rgb(176 184 190 / 0.35), transparent 70%), radial-gradient(45% 40% at 0% 70%, rgb(200 206 211 / 0.4), transparent 70%), linear-gradient(160deg, #fbf8f0 0%, #e9ebed 45%, #f6f2e8 70%, #dfe3e6 100%); }`,
  '.gallery-bg .eyebrow-strong { color: #17503d; }',
].join(nl)

const re = /\.gallery-bg \{[\s\S]*?\}\r?\n\.gallery-bg \.eyebrow-strong \{[^}]*\}/
if (!re.test(css)) { console.log('Could not find the gallery block in src/index.css. Are you in the project root?'); process.exit(1) }
const out = css.replace(re, () => block)
if (out === css) { console.log('Already silver. Nothing to change.'); process.exit(0) }
writeFileSync(file, out)
console.log('Gallery background is now silver and ivory white.')

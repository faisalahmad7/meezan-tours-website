# TECH_STACK.md

React 18, TypeScript, Vite 5, Tailwind 3, React Router 6, lucide-react, GSAP (lazy), Fontsource. ESLint + Prettier.

## Setup
```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # client build + SSR build + prerender (dist/)
npm run preview
```
Node 18.18+.

## Architecture
- `src/data/` typed content (site, packages, gallery, testimonials, FAQs, navigation).
- `src/services/content.ts` the only place components read content from. Swap for a backend later.
- `src/pages/`, `src/components/`, `src/lib/` (head/SEO, JSON-LD, motion).
- **Prerendering:** `vite build --ssr src/entry-server.tsx` then `scripts/prerender.mjs` writes `dist/<route>/index.html`, `404.html`, `sitemap.xml`, `robots.txt`. The browser then hydrates.
- `public/images/` optimised WebP at 480/960/1600 px; `src/data/imageManifest.ts` holds sizes for the `<Picture>` component. To add photos: export WebP files in those sizes, add a manifest entry, add an item to `data/gallery.ts`.

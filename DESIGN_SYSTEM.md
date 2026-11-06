# DESIGN_SYSTEM.md

Tokens live in `tailwind.config.ts`; shared classes in `src/index.css`.

- **Colours:** `brand-*` emerald (600 `#207E5D` primary, 900/950 dark sections), `logo-green #008038`, `accent #E01820` (sparingly: rules, numbers), `gold-400/500` (highlights on dark), `sand-*` warm backgrounds, `ink-*` text.
- **Type:** Playfair Display Variable for headings (`font-display`), Amiri for Arabic (`font-arabic`), system sans for body. Fluid sizes `text-display-xl/lg/md`. Fonts are self-hosted via Fontsource (no Google Fonts requests).
- **Components:** `.btn` + `.btn-primary|accent|outline|light|ghost-light|whatsapp`, `.card`, `.eyebrow`, `.section`, `.input`, `.pattern-dark` / `.pattern-light` (geometric star lattice).
- **Radius/shadow:** `rounded-xl2`, `shadow-soft`, `shadow-lift`.
- **Motion:** GSAP only: hero entrance, scroll reveal (`data-reveal`), hero parallax (`data-parallax`, md+). Skipped with `prefers-reduced-motion`.
- **Breakpoints:** Tailwind defaults (sm 640, md 768, lg 1024). Touch targets at least 44 px.

# PROJECT_PLAN.md

| Stage | Status |
|---|---|
| 1 Audit | Done (MHTML only) |
| 2 Architecture | Done |
| 3 Core design (header, footer, buttons, layout) | Done |
| 4 Pages (10 routes + 404) | Written |
| 5 SEO (meta, JSON-LD, sitemap, robots, canonical) | Implemented in code |
| 6 Performance (WebP srcset, lazy GSAP, self-hosted fonts) | Implemented in code |
| 7 Testing | **PENDING: `npm run build` and Lighthouse have not been run** (sandbox had no npm access) |
| 8 Handoff | Done (this file set) |

## Next
1. `npm install && npm run typecheck && npm run build` and fix anything reported.
2. Test the 320 to 1440 px widths and run Lighthouse.
3. Confirm the owner questions in HANDOFF.md.
4. Deploy, 301 apex to www, request reindexing in Search Console.
5. Phase 2: connect Supabase or another backend through `src/services/content.ts`.

# PROJECT_AUDIT.md - Meezan Tours & Travels

Audit date: 6 Nov 2026.

## What was inspected
| Material | Status |
|---|---|
| MHTML snapshot of https://www.meezantours.com/ (saved 5 Nov 2026) | Inspected: HTML, CSS, 16 photos, 3 logos |
| Contact sheet of all photos (`all.jpg`) | Inspected |
| Source repository | **Not provided. Not inspected.** |
| Live site, sitemap.xml, robots.txt, redirects, Search Console | **Not inspected** (no network in the build sandbox) |
| Existing admin dashboard / Supabase schema | **Not inspected** |
| Videos | None in the snapshot |

## Existing site (inferred from built output)
Lovable-built Vite + React SPA, Tailwind + shadcn tokens, single route `/`, nav items are buttons not links, Supabase storage for gallery images, tawk.to chat widget, Google Fonts (Playfair Display, Amiri), Google Maps iframe, footer credit "Developed by Muverity".

## Brand preserved
Emerald green (site primary `hsl(159 59% 31%)`, logo green `#008038`), logo red `#E01820`, Playfair Display + Amiri, the horizontal Meezan logo and round badge, the original photographs.

## Problems found on the old site
- Conflicting claims: "25K+ pilgrims" (hero) vs "2500+" (meta). Ratings and review counts with no visible source. "18+ years" unverified. **None of these were carried over.**
- Stale 2024 title/keywords/footer, placeholder `google-site-verification="YOUR_CODE"`, no JSON-LD, generic Pune city-centre geo coordinates, `format-detection: telephone=no`, obsolete meta tags, OG image size mismatch.
- Single URL only, nav not crawlable, gallery serves originals up to 6.3 MB, tawk.to and 6 Google font weights add load.
- The "community-centre" wording from Search Console was not found anywhere in the snapshot (probably a stale index copy; check live).
- Only 16 of about 28 gallery items were in the snapshot.

## Decision
Clean rebuild of the frontend (multipage, prerendered). The old project is untouched.

## Photos deliberately NOT used
Part 4 (clock tower), 13 and 18 (Kaaba / Madinah) look like stock images; 17 looks like stock/AI artwork; 15 is a Miqat map watermarked "Islamic Landmarks". Replace with the owner's own photos if wanted.

## Owner must confirm before launch
See HANDOFF.md "Owner questions".

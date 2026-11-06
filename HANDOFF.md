# HANDOFF.md

**Project:** Meezan Tours & Travels modernisation. **Live:** https://www.meezantours.com/
**Repository:** this folder (no git yet: run `git init`). **Updated:** 6 Nov 2026

## v1.1 patch (6 Nov 2026)
Redesign + restored features. See MEEZAN_FEATURE_COMPARISON.md. `npm run typecheck` and `npm run build` still have NOT been run by me.

## Status
All 10 pages + 404, header/footer, design system, SEO and prerender script are **written**.
**Not verified:** the sandbox had no npm access, so `npm install`, `typecheck`, `build`, Lighthouse and visual checks have **not been run**. Expect a few small type/build fixes on first run.

## EXACT NEXT ACTION
```bash
npm install
npm run typecheck   # fix any errors
npm run build       # must print "prerendered /" ... "done"
npm run preview
```
Then check each route at 320/360/375/390/430/768/1024/1280/1440 px and run Lighthouse.

## Pages
Done: `/`, `/hajj`, `/umrah`, `/packages`, `/ziyarat`, `/about`, `/gallery`, `/contact`, `/privacy-policy`, `/terms`, 404. Remaining: none planned.

## Reused assets
11 real photos, 2 logos (from the MHTML), OG image generated from the hero photo.

## Owner questions (nothing below was invented, but all needs confirming)
1. WhatsApp number (assumed = primary +91 92703 30016). Socials now taken from the old site.
2. Package prices/dates (copied from the live site; the Umrah departs 12 Nov 2026).
3. Licence number current? (shown in header bar, footer, About, FAQ)
4. Real pilgrim count / founding year / any genuine reviews (none shown for now).
5. Is Ziyarat sold as a service? The site lists typical sites; edit `src/pages/Ziyarat.tsx`.
6. Written consent for the 3 testimonials (copied from the live site).
7. Legal pages are plain drafts: have them reviewed.
8. Missing gallery photos/videos (only 16 of about 28 items were in the snapshot).

## Known limitations
- Enquiry form opens WhatsApp (no backend). Package edits need a code change until the backend phase.
- Hosting: any static host (Cloudflare Pages / Netlify). `public/_headers` sets caching.
- Env vars: none required.

## Resume instructions for another Claude session
Read this file, PROJECT_AUDIT.md, PROJECT_PLAN.md, DESIGN_SYSTEM.md, TECH_STACK.md. Check `git status`, run the next action above, verify files rather than trusting this log. Do not restart.

## Added in v1.1
- Provide the hidden package inclusions/exclusions for `src/data/packages.ts` (`details.inclusions`, `details.exclusions`).
- Confirm 18 years / 25K+ / 4.9 and per-package ratings.
- Provide high-resolution Kaaba / Madinah photos you own the rights to (replace `kaaba-clock`).
- Old `/guides/*` and city pages: rebuild only if they ranked on Google.

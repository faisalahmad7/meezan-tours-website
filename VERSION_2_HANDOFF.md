# VERSION_2_HANDOFF.md

## Build status
`npm run typecheck` / `npm run build` NOT run by me (no npm in my sandbox). I validated imports, data files and syntax balance only. Run both and report errors.

## Not done (could not be done offline)
- Facebook / Instagram / Google research: see SOCIAL_MEDIA_RESEARCH.md.
- New high-resolution photographs. Hero uses the owner's two Kaaba photos (900 px and 736 px wide, portrait, shown in a portrait frame so they are not stretched). Madinah / Green Dome / Clock Tower slides need photos: see the shopping list; drop-in slots are in `src/data/hero.ts`.
- India outline map: deliberately not hand-traced (borders are legally sensitive in India). A journey line is used. Supply an official SVG if wanted.

## Outstanding confirmations
1. Mumbai-to-Mumbai applies to which packages (text says "our group journeys"; per-package flag not added).
2. Food and laundry per package, then add `details.meals` / `details.inclusions` in `src/data/packages.ts`.
3. Google rating and review count (`SITE.googleReviews`).
4. Hidden package inclusions (still missing from V1.1).
5. Take a Git checkpoint before applying: `git init && git add . && git commit -m "v1.1"` (or copy the folder).

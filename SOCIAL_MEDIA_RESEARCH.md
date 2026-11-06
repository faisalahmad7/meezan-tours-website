# SOCIAL_MEDIA_RESEARCH.md

**Honest status: the Facebook page, the Instagram profile and the Google Business Profile were NOT inspected.** The build environment has no internet access, so nothing from those three platforms could be opened, and no photograph could be downloaded. Nothing below is guessed.

| Source | Inspected? | What is known |
|---|---|---|
| www.meezantours.com (MHTML snapshot, 5 Nov 2026) | Yes | Links to YouTube @MeezanTours, Facebook meezantoursonline, Threads @meezantours; 8 YouTube testimonial ids; 16 photos; licence certificate link |
| Facebook meezantoursonline | No | Link added to header/footer/contact/JSON-LD |
| Instagram meezantours | No | URL supplied by the owner; added to the same places |
| Google Business Profile | No | Owner-supplied link now used for "Open in Google Maps" and "Read our reviews on Google". No rating or review count is shown (cannot be read). Fill `SITE.googleReviews` in `src/data/site.ts` after checking the live profile. |

## What the owner's brief says about customers (not verified by me)
Customers mention Indian food and buffets, laundry, and a team that checks on pilgrims. These are shown as services labelled **"Varies by package"**, never as universal inclusions.

## Photo shopping list (to replace later, owner-supplied or licensed)
1. High-resolution landscape Kaaba / Masjid al-Haram (2400 px wide or more), for a full-bleed hero.
2. Masjid an-Nabawi with the Green Dome, no watermark.
3. Makkah Clock Tower, Madinah courtyard, Mina, Arafat.
4. Meezan vehicles, hotel rooms, laundry service, buffet close-ups.
Add via `src/data/imageManifest.ts` + `src/data/hero.ts` / `gallery.ts`.

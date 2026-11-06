# MEEZAN_FEATURE_COMPARISON.md

**Source note:** the supplied MHTML was saved from the live site https://www.meezantours.com/ on 5 Nov 2026, so it is the *original* site (a Lovable/React build), not a recreation. My first build (v1.0) simplified it; this patch (v1.1) restores what the snapshot contains. The live site itself, its other pages and the admin dashboard could not be opened from the build sandbox (no network).

| Feature | Original (snapshot) | v1.0 build | v1.1 patch | Status |
|---|---|---|---|---|
| Licence number + certificate link (Google Drive) | In top bar, linked | Text only | Linked in top bar, ribbon, footer, About | Restored |
| 18 years / 25K+ pilgrims / 4.9 rating | Hero badges | Removed (conflicting) | Stats band + hero, from `SITE.stats` | Restored, **owner to confirm** |
| Package: Long Hajj, 30-35 d, 5-star, VIP, 4.9 (245), ₹7,24,999 to ₹6,99,999 | Yes | Price only | All fields + saving + rating | Restored |
| Package: Short Hajj Aziziya, 17-20 d, 4.7 (189), ₹6,99,999 to ₹6,49,999, GST 5% / TCS 2% | Yes | Partial | All fields + tax note | Restored |
| Package: Saudi Airlines Semi Deluxe Umrah, 16 d, 12-27 Nov 2026, 4.9 (316), ₹1,05,000 to ₹1,03,000, "Most Popular" | Yes | Partial | All fields; auto "date passed" flag | Restored |
| Expandable "+11 / +6 / +2 More" inclusions | Present, but hidden text **not in snapshot** | Missing | Expander built; shows verified fields only | **Data missing: owner must supply** |
| Package booking button | "Book This Package" | WhatsApp only | "Book" opens `/contact?package=` pre-filled + WhatsApp pre-filled | Restored |
| Custom package CTA | Yes | Yes | Yes | OK |
| 8 YouTube video testimonials | Thumbnail cards with ids | Missing | Carousel, each card opens its own video | Restored |
| 8 written testimonials (Hindi kept in Hindi) | Yes | 3 | All 8, verbatim, expandable | Restored |
| Gallery with categories | 28 items | 11 | 13 (all usable snapshot photos) | Partial: ~15 not in snapshot |
| Social links | YouTube, Facebook, Threads | None | Header, footer, contact, JSON-LD | Restored |
| Contact details, hours, map, form | Yes | Yes | Yes + package prefill | OK |
| Old URLs: /hajj-packages, /umrah-packages, -from-pune, -from-mumbai, /15-, /20-days-umrah-package, /guides/*, /terms-of-service, /cookie-policy | Linked in footer; page content **not in snapshot** | Dropped | 301 redirects in `public/_redirects` | Redirected. Content not rebuilt |
| tawk.to chat | Yes | Removed | Removed (WhatsApp used) | Intentional |
| Admin dashboard / Supabase gallery | Existing | Not integrated | Not integrated | **Needs the source repo** |

## Price check
Snapshot (newest, 5 Nov 2026) shows ₹1,05,000 to ₹1,03,000 for the Umrah. The ₹95,000 / ₹90,000 figures in the brief are not in the snapshot, so they were not used. Confirm which is current.

## Photos left out
Miqat map (third-party watermark) and the Madinah photo (watermark handle). I did not remove watermarks. High-resolution Kaaba/Nabawi photos could not be downloaded (no network); the hero uses the Kaaba photo from the owner's gallery (900 px wide).

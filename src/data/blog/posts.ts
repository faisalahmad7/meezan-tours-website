import type { BlogPostMeta } from './types'

/**
 * Post index (metadata only). Each post's body lives in ./articles/<slug>.ts.
 * To add a post: add an entry here, create ./articles/<slug>.ts, add a 1200x630 JPG at
 * public/images/blog/og/<slug>.jpg (scripts/blog-og.py makes one from a gallery photo), then build.
 */
export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'how-to-perform-umrah',
    title: 'How to Perform Umrah: A Step-by-Step Guide',
    seoTitle: 'How to Perform Umrah: Step-by-Step Guide | Meezan Tours',
    description:
      'How to perform Umrah step by step: ihram and intention at the miqat, seven circuits of tawaf, sa\'i between Safa and Marwah, and halq or taqsir, with practical tips.',
    excerpt:
      'Umrah has four main rites. Here is each one in order, what to say, what to avoid, and the small practical details that make the day easier.',
    category: 'umrah-guides',
    tags: ['umrah', 'ihram', 'tawaf', "sa'i", 'miqat', 'first umrah'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 8,
    authorId: 'meezan-team',
    image: {
      slug: 'haram-group-wide',
      alt: 'Meezan pilgrims in ihram standing together on the marble courtyard of Masjid al-Haram with the Kaaba behind them',
      caption: 'A Meezan group in ihram at Masjid al-Haram, Makkah.',
      focus: '50% 45%',
    },
    ogImage: '/images/blog/og/how-to-perform-umrah.jpg',
    featured: true,
    cta: { title: 'Perform Umrah with a guide beside you.', text: 'Meezan group leaders walk pilgrims through every rite in Makkah. Ask our Pune team about the next departure.' },
  },
  {
    slug: 'umrah-packing-list',
    title: 'What to Pack for Umrah: A Practical Packing List',
    seoTitle: 'Umrah Packing List for Men, Women and Elders | Meezan Tours',
    description:
      'A practical Umrah packing list for pilgrims from India: documents, ihram and clothing for men and women, medicines, toiletries for ihram, and what to leave at home.',
    excerpt:
      'Pack light and pack for walking. A tick-as-you-go list for documents, ihram, clothing, medicines and the small items pilgrims wish they had brought.',
    category: 'preparation',
    tags: ['packing', 'umrah', 'ihram', 'women', 'elderly', 'luggage', 'zamzam'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 6,
    authorId: 'meezan-team',
    image: {
      slug: 'airport-family',
      alt: 'Pilgrims and a Meezan team member at the airport with red Meezan Tours luggage',
      caption: 'Meezan pilgrims with their luggage at the airport.',
      focus: '50% 55%',
    },
    ogImage: '/images/blog/og/umrah-packing-list.jpg',
    featured: true,
    cta: { title: 'Not sure what your package includes?', text: 'Our team will tell you exactly what Meezan provides, from bags to ihram, so you pack only what you need.' },
  },
  {
    slug: 'hajj-guide-for-indian-pilgrims',
    title: 'Hajj from India: A Guide for First-Time Pilgrims',
    seoTitle: 'Hajj Guide for Indian Pilgrims: Process and Rites | Meezan',
    description:
      'How Hajj works for pilgrims from India: Haj Committee or a registered Hajj Group Organiser, documents and health checks, and the rites from 8 to 13 Dhul Hijjah.',
    excerpt:
      'Two routes, one pilgrimage. How Indian pilgrims book Hajj, how to check an operator is registered, and what happens on each of the days of Hajj.',
    category: 'hajj',
    tags: ['hajj', 'india', 'hajj group organiser', 'haj committee', 'mina', 'arafat'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 6,
    authorId: 'meezan-team',
    image: {
      slug: 'mina-tent',
      alt: 'Pilgrims in ihram resting with their bags inside a large white tent in Mina during Hajj',
      caption: 'Meezan pilgrims resting in their tent in Mina, Hajj 2025.',
    },
    ogImage: '/images/blog/og/hajj-guide-for-indian-pilgrims.jpg',
    featured: true,
    cta: { title: 'Thinking about Hajj?', text: 'Meezan is a registered Hajj Group Organiser. Speak to our Pune office about the next Hajj season and the documents you will need.' },
  },
  {
    slug: 'first-umrah-things-to-know',
    title: 'First Umrah: What to Know Before You Travel to Makkah and Madinah',
    seoTitle: 'First Umrah: What to Know Before Makkah & Madinah | Meezan',
    description:
      'First Umrah? What to expect in Makkah and Madinah: Nusuk and Rawdah permits, prayer-time crowds, heat, money, phones, etiquette and staying with your group.',
    excerpt:
      'The rites are only part of the journey. What first-time pilgrims from India wish someone had told them about daily life around the two Harams.',
    category: 'umrah-guides',
    tags: ['first umrah', 'makkah', 'madinah', 'nusuk', 'rawdah', 'umrah'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 6,
    authorId: 'meezan-team',
    image: {
      slug: 'haram-group-wide-2',
      alt: 'Group of Meezan Tours pilgrims in ihram on the Masjid al-Haram courtyard with the Kaaba in the background',
      caption: 'Together in Makkah: a Meezan group at Masjid al-Haram.',
    },
    ogImage: '/images/blog/og/first-umrah-things-to-know.jpg',
    cta: { title: 'Your first Umrah, well looked after.', text: 'Meezan groups travel with experienced leaders who know Makkah and Madinah. Ask us about dates and packages.' },
  },
  {
    slug: 'umrah-preparation-checklist',
    title: 'Umrah Preparation Checklist: What to Do and When',
    seoTitle: 'Umrah Preparation Checklist for Pilgrims from India | Meezan',
    description:
      'An Umrah preparation checklist for pilgrims from India, as a timeline: passport, visa, vaccinations, money, learning the rites and the final week before you fly.',
    excerpt:
      'A timeline, not a pile of tasks: what to sort out three months before, one month before and in the final week before your Umrah flight.',
    category: 'preparation',
    tags: ['checklist', 'umrah', 'documents', 'vaccination', 'passport', 'india'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 5,
    authorId: 'meezan-team',
    image: {
      slug: 'orientation-camp-tables',
      alt: 'Attendees seated at tables during a Meezan pre-departure briefing under a green banner',
      caption: 'A Meezan pre-departure briefing before travel.',
    },
    ogImage: '/images/blog/og/umrah-preparation-checklist.jpg',
    cta: { title: 'Let us handle the paperwork.', text: 'Meezan packages coordinate flights, visas and hotels, and every group gets a pre-departure briefing. Start with a call.' },
  },
  {
    slug: 'best-time-for-umrah',
    title: 'Best Time to Perform Umrah: Seasons, Weather and Crowds',
    seoTitle: 'Best Time for Umrah: Weather, Crowds and Seasons | Meezan',
    description:
      'The best time to perform Umrah: Ramadan, winter, summer and school holidays compared by weather, crowds and cost, plus when Umrah pauses for Hajj.',
    excerpt:
      'Ramadan, winter or the quiet months after Hajj? How weather, crowds, cost and the annual Hajj pause shape the right time for your Umrah.',
    category: 'planning',
    tags: ['best time', 'umrah', 'ramadan', 'weather', 'seasons', 'planning'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 5,
    authorId: 'meezan-team',
    image: {
      slug: 'hill-group-blue-sky',
      alt: 'Meezan pilgrims holding a green Meezan Tours banner under a bright sky with a rocky hill behind them',
      caption: 'A Meezan group on ziyarat under a clear sky.',
    },
    ogImage: '/images/blog/og/best-time-for-umrah.jpg',
    cta: { title: 'Choose your season, we will plan the rest.', text: 'Tell us when you would like to travel and we will share the departures and options that fit.' },
  },
  {
    slug: 'umrah-visa-for-indians',
    title: 'Umrah Visa for Indian Citizens: Requirements and Process',
    seoTitle: 'Umrah Visa for Indians: Requirements and Process | Meezan',
    description:
      'How Indian citizens get an Umrah visa: documents, applying through licensed agents or Nusuk, the 30-day entry rule, vaccinations and the annual Hajj pause.',
    excerpt:
      'What Indian passport holders need for an Umrah visa, how the application actually works, and the rules that change from season to season.',
    category: 'planning',
    tags: ['visa', 'umrah', 'india', 'nusuk', 'documents', 'passport'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 5,
    authorId: 'meezan-team',
    image: {
      slug: 'airport-banner-group-2',
      alt: 'Group of pilgrims with the Meezan Tours banner and luggage trolleys inside the airport terminal',
      caption: 'Departure day: a Meezan group inside the airport terminal.',
    },
    ogImage: '/images/blog/og/umrah-visa-for-indians.jpg',
    cta: { title: 'Visa questions? Ask before you book.', text: 'Meezan coordinates visas as part of every package. Our team will give you the current document list for your dates.' },
  },
  {
    slug: 'hajj-vs-umrah',
    title: 'Hajj vs Umrah: The Differences Explained',
    seoTitle: 'Hajj vs Umrah: Key Differences Explained | Meezan Tours',
    description:
      'Hajj vs Umrah explained: obligation, timing, rites, duration, places visited and how booking works for pilgrims from India, with a side-by-side comparison table.',
    excerpt:
      'Both begin in ihram and both include tawaf and sa\'i, but they differ in obligation, timing, rites and length. A side-by-side comparison.',
    category: 'hajj',
    tags: ['hajj', 'umrah', 'differences', 'arafat', 'rites'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 5,
    authorId: 'meezan-team',
    image: {
      slug: 'arafat-banner-wide',
      alt: 'A large Meezan Tours group in ihram holding the Meezan banner in front of a rocky hill',
      caption: 'A Meezan group with their banner during the pilgrimage.',
    },
    ogImage: '/images/blog/og/hajj-vs-umrah.jpg',
    cta: { title: 'Hajj or Umrah, we can guide you.', text: 'Meezan arranges both. Talk to our team about which journey suits you this year.' },
  },
  {
    slug: 'umrah-with-family',
    title: 'Umrah with Family: Travelling with Children and Elderly Parents',
    seoTitle: 'Umrah with Family, Children and Elderly Parents | Meezan',
    description:
      'Umrah with children or elderly parents: practical advice on the season, hotel distance, wheelchairs, pacing the rites, health rules and keeping the family together.',
    excerpt:
      'Pacing, hotel distance, wheelchairs and keeping everyone together: practical advice for families travelling with young children or elderly parents.',
    category: 'umrah-guides',
    tags: ['family', 'children', 'elderly', 'women', 'umrah', 'wheelchair'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 5,
    authorId: 'meezan-team',
    image: {
      slug: 'group-building-family',
      alt: 'A group of pilgrims in ihram and abayas standing in a row with a child in front of a stone building',
      caption: 'Families travelling together with Meezan.',
    },
    ogImage: '/images/blog/og/umrah-with-family.jpg',
    cta: { title: 'Travelling with parents or children?', text: 'Tell us about your family before you book. Our guides assist elderly pilgrims, and we plan around mobility needs.' },
  },
  {
    slug: 'how-to-choose-umrah-package',
    title: 'How to Choose an Umrah Package: 10 Questions to Ask',
    seoTitle: 'How to Choose an Umrah Package: 10 Questions | Meezan Tours',
    description:
      'How to choose an Umrah package: ten questions to ask any operator about hotels, distance to the Haram, flights, guides, meals, ziyarat and what the price includes.',
    excerpt:
      'Two packages with the same price can be very different trips. Ten questions that reveal what you are really paying for, and what to get in writing.',
    category: 'planning',
    tags: ['umrah package', 'planning', 'hotels', 'flights', 'operator', 'umrah'],
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-13',
    readingMinutes: 5,
    authorId: 'meezan-team',
    image: {
      slug: 'group-jabal',
      alt: 'Meezan pilgrims in ihram standing behind a Meezan Tours banner in front of a rocky hill',
      caption: 'Meezan pilgrims in ihram with the group banner.',
    },
    ogImage: '/images/blog/og/how-to-choose-umrah-package.jpg',
    cta: { title: 'Ask us all ten questions.', text: 'We are happy to answer every one of them for our current packages, in writing, before you pay.' },
  },
]

import type { BlogArticle } from '../types'

const article: BlogArticle = {
  slug: 'best-time-for-umrah',
  summary:
    'There is no single best time; it depends on what matters most to you. **Ramadan** carries special reward but brings the biggest crowds and highest prices. **Winter** (roughly November to February) is the most comfortable for walking, especially with elderly parents. **Summer** is extremely hot but quieter. Umrah also pauses for international pilgrims around Hajj: this season, the last day to enter Saudi Arabia on an Umrah visa is **23 March 2027**.',
  blocks: [
    {
      type: 'p',
      text: 'Umrah can be performed through most of the year, and families from India usually choose their dates around four things: the weather in Makkah, the size of the crowds, school and work holidays, and price. Below we compare the seasons honestly, including the weeks when Umrah is not possible for international visitors.',
    },
    {
      type: 'table',
      caption: 'Umrah seasons compared (1448 AH, 2026-27)',
      head: ['Season', 'Approximate dates', 'Weather in Makkah', 'Crowds', 'Best for'],
      rows: [
        ['Winter', 'November to February', 'Warm days, mild nights; January averages about 30°C by day and 19°C at night', 'Busy around Indian winter holidays', 'Families, elderly pilgrims, first-timers'],
        ['Ramadan', 'About 8 February to 9 March 2027', 'Mild to warm', 'The busiest weeks of the year, especially the last ten nights', 'Pilgrims seeking the reward of Umrah in Ramadan'],
        ['Before the Hajj pause', 'March 2027', 'Getting hotter', 'Busy after Ramadan, then the season closes', 'Last chance before Hajj'],
        ['Hajj pause', 'Late March to May 2027', 'Hot', 'No Umrah visas for international pilgrims', 'Not possible'],
        ['Summer', 'June to September', 'Extremely hot; June averages about 44°C by day', 'Quieter', 'Healthy adults who cope well with heat'],
        ['Autumn', 'October', 'Very hot, easing slowly', 'Moderate', 'Pilgrims who prefer smaller crowds'],
      ],
    },
    {
      type: 'callout',
      tone: 'note',
      text: 'Islamic months move about 11 days earlier each year against the Gregorian calendar, so Ramadan and the Hajj pause fall at different times each year. The dates here are for the 1448 AH season and are expected dates, subject to the sighting of the moon.',
    },

    { type: 'h2', text: 'Umrah in Ramadan' },
    {
      type: 'p',
      text: 'The Prophet ﷺ told a woman who had missed Hajj that **"Umrah in Ramadan is equal to Hajj"** in reward (Sahih al-Bukhari 1782). Scholars explain that this concerns reward: it does not replace the obligatory Hajj for someone who is able to perform it. For many pilgrims, praying taraweeh in the Haram and breaking the fast there is the experience of a lifetime.',
    },
    {
      type: 'p',
      text: 'The cost is crowds. Masjid al-Haram is at its fullest in Ramadan, particularly in the last ten nights, and hotels near the mosque are booked months ahead at their highest prices. In 1448, Ramadan is expected to begin around **8 February 2027**, with Eid al-Fitr around 9 or 10 March.',
    },
    {
      type: 'ul',
      items: [
        'Book early: several months ahead is normal for Ramadan.',
        'Expect to walk further, because roads near the Haram are closed to traffic at busy times.',
        'Plan tawaf for hours when the crowd thins; your group leader will know the current pattern.',
        'Ramadan is hard work for elderly pilgrims who are fasting. Discuss it honestly as a family.',
      ],
    },

    { type: 'h2', text: 'Winter: the most comfortable months' },
    {
      type: 'p',
      text: 'From November to February, Makkah\'s weather is at its kindest. Average January temperatures are around 30°C during the day and 19°C at night. Madinah is cooler still, with January nights around 12°C, so pack a warm layer. For first-time pilgrims and anyone travelling with elderly parents or young children, winter is usually our first suggestion.',
    },
    {
      type: 'p',
      text: 'December is popular because it lines up with Indian winter school holidays and the year-end break. Book early for those weeks. January and early February are often a little calmer.',
    },
    {
      type: 'image',
      image: {
        slug: 'dua-circle',
        alt: 'Pilgrims in white standing close together with hands raised in prayer',
        caption: 'A moment of dua with the group.',
      },
    },

    { type: 'h2', text: 'The pause around Hajj' },
    {
      type: 'p',
      text: 'Each year Saudi Arabia stops Umrah for international visitors in the weeks before Hajj, so that Makkah can prepare for Hajj pilgrims. The Ministry of Hajj and Umrah publishes the deadlines for each season. For the 1448 season:',
    },
    {
      type: 'facts',
      items: [
        { label: 'Last day for Umrah visas to be issued', value: '9 March 2027' },
        { label: 'Last day to enter Saudi Arabia', value: '23 March 2027' },
        { label: 'Last day to leave', value: '7 April 2027' },
      ],
    },
    {
      type: 'p',
      text: 'Umrah reopens after Hajj. In 2026, Umrah visas were issued again from 31 May, and pilgrims could enter Makkah from 1 June. Hajj 2027 itself is expected in mid-May, with the Day of Arafah around **15 May 2027**. This matters for Indian families: the long summer school holidays in May and June overlap with the pause and then with the hottest weeks.',
    },

    { type: 'h2', text: 'Summer: quieter, but very hot' },
    {
      type: 'p',
      text: 'June to September brings Makkah\'s fiercest heat, with average highs around 44°C in June and warm nights. In return, the mosques are calmer and hotel availability is better. If you travel in summer, plan tawaf and sa\'i for the early morning or night, carry water and an umbrella, and rest through the middle of the day. Summer is not a good choice for anyone with heart or breathing problems.',
    },

    { type: 'h2', text: 'Choosing the right time for your family' },
    {
      type: 'ul',
      items: [
        '**Travelling with elderly parents?** Winter, and a hotel close to the Haram. Avoid Ramadan unless they are strong walkers.',
        '**First Umrah, flexible dates?** January or February, outside Ramadan.',
        '**Want Ramadan?** Book months ahead, and consider the first two weeks rather than the last ten nights.',
        '**Smallest budget?** Ask about departures outside Ramadan and the holiday weeks.',
        '**Short on leave?** Weekdays are generally calmer than Fridays, when the Jumu\'ah prayer fills the mosque and the streets.',
      ],
    },
    {
      type: 'callout',
      tone: 'verify',
      text: 'Umrah season deadlines are announced by the Saudi Ministry of Hajj and Umrah and can be adjusted. Islamic dates depend on the moon. Confirm the dates with your operator before booking flights.',
    },
    {
      type: 'cta',
      title: 'Tell us when you want to travel',
      text: 'We will share the departures that fit your dates, and explain what to expect in that season.',
      link: { label: 'See current packages', to: '/packages' },
    },
  ],
  faqs: [
    {
      q: 'What is the best month for Umrah?',
      a: 'For comfort, the winter months from November to February, when Makkah averages around 30°C by day in January. For reward, many pilgrims choose Ramadan, which in 1448 is expected around 8 February to 9 March 2027, but it is also the busiest and most expensive time.',
    },
    {
      q: 'Is Umrah in Ramadan equal to Hajj?',
      a: 'The Prophet ﷺ said Umrah in Ramadan is equal to Hajj in reward (Sahih al-Bukhari 1782). Scholars agree it does not replace the obligatory Hajj for someone who is able to perform it.',
    },
    {
      q: 'When is Umrah closed before Hajj 2027?',
      a: 'For the 1448 AH season, the last date to enter Saudi Arabia on an Umrah visa is 23 March 2027, and pilgrims must leave by 7 April 2027. Umrah visas are expected to reopen shortly after Hajj.',
    },
    {
      q: 'Can I perform Umrah in summer?',
      a: 'Yes. Summer is quieter, but Makkah averages around 44°C by day in June. Healthy adults manage well by doing the rites early in the morning or at night and resting in the afternoon. It is not recommended for people with heart or breathing problems.',
    },
  ],
  sources: [
    { label: 'Umrah season 1448 calendar: visa, entry and departure deadlines', publisher: 'Arab News Pakistan', url: 'https://www.arabnews.pk/node/2645656' },
    { label: 'Ramadan, Eid al-Fitr and Eid al-Adha 2027: likely dates', publisher: 'Khaleej Times', url: 'https://www.khaleejtimes.com/uae/ramadan-eid-al-fitr-eid-al-adha-2027-likely-dates' },
    { label: 'Climate of Mecca (Jeddah Regional Climate Center data)', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Climate_of_Mecca' },
    { label: '"Umrah in Ramadan is equal to Hajj", Sahih al-Bukhari 1782', publisher: 'Sunnah.com', url: 'https://sunnah.com/bukhari:1782' },
    { label: 'Nusuk Umrah', publisher: 'Ministry of Hajj and Umrah', url: 'https://umrah.nusuk.sa/' },
  ],
}

export default article

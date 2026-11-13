import type { BlogArticle } from '../types'

const article: BlogArticle = {
  slug: 'first-umrah-things-to-know',
  summary:
    'Expect large crowds, long walks and, for much of the year, strong heat. Install the **Nusuk app** before you travel: it holds your Umrah permit and is how you book a visit to the **Rawdah** in Madinah (once every 365 days). Plan your day around the five prayers, carry a small bag and a charged phone, agree meeting points with your group, and keep the hotel address with you at all times.',
  blocks: [
    {
      type: 'p',
      text: 'Our [step-by-step guide](/blog/how-to-perform-umrah) covers the rites themselves. This one is about everything around them: how the days work in Makkah and Madinah, what catches first-time pilgrims off guard, and the small habits that keep a group calm and together.',
    },

    { type: 'h2', text: 'The day is shaped by the five prayers' },
    {
      type: 'p',
      text: 'Life in both cities turns around the prayer times. Before each prayer, the streets fill with people walking towards the mosque, and at busy times the prayer rows spill out into the courtyards and roads. If you want a place inside, arrive well before the adhan, especially for Fajr, Maghrib and the Friday prayer. After the prayer, the crowd leaves all at once; waiting ten minutes is often quicker than joining the rush.',
    },
    {
      type: 'ul',
      items: [
        'Men and women pray in separate areas. Agree where to meet afterwards **before** you split up.',
        'Funeral prayers are often held straight after the obligatory prayer. Stay in your place and join them.',
        'Keep walkways clear: do not sit or pray in the paths that security staff keep open.',
      ],
    },

    { type: 'h2', text: 'Install Nusuk before you fly' },
    {
      type: 'p',
      text: '**Nusuk** is the official Saudi platform for pilgrims. Every Umrah pilgrim needs an Umrah permit on it, with dates that match their package; your operator usually arranges this. You also use Nusuk to book a visit to the **Rawdah** in Masjid an-Nabawi, and to access other services in both cities.',
    },
    {
      type: 'callout',
      tone: 'important',
      title: 'Booking the Rawdah',
      items: [
        'A permit on Nusuk is required to enter the Rawdah. Without one, you will be turned away.',
        'Each person can currently book one Rawdah visit every 365 days.',
        'Men and women visit at separate times, and Friday timings differ.',
        'Slots go quickly. Book as soon as your Madinah dates are confirmed, and ask your group leader to help.',
      ],
    },

    { type: 'h2', text: 'Madinah: a different pace' },
    {
      type: 'p',
      text: 'Most Umrah trips from India include several days in Madinah, either before or after Makkah. Visiting Masjid an-Nabawi is not part of Umrah, but for many pilgrims it is the most moving part of the journey. Madinah is calmer, the mosque is surrounded by shaded courtyards with giant umbrellas, and hotels are often a short, level walk away.',
    },
    {
      type: 'p',
      text: 'The **Rawdah** is the area between the Prophet\'s ﷺ house and his minbar. Visits are short, timed and closely managed, so be patient with the queues and the staff. Speak softly in the mosque and around the Prophet\'s ﷺ grave, and move on when asked so that others can have their turn.',
    },
    {
      type: 'image',
      image: {
        slug: 'night-gate-pilgrims',
        alt: 'Pilgrims in ihram and volunteers in high-visibility vests walking toward a lit entrance gate at night',
        caption: 'Crowds are managed by staff and volunteers: follow their directions.',
      },
    },

    { type: 'h2', text: 'Crowds, gates and staying together' },
    {
      type: 'p',
      text: 'Masjid al-Haram has dozens of entrances, each with a number and a name. It is very easy to come out of a different gate from the one you went in by, and every gate looks alike at night. Groups that never lose anyone have a few simple habits:',
    },
    {
      type: 'ul',
      items: [
        'Agree **one fixed meeting point** outside the mosque, such as a gate number or the hotel lobby, and a time.',
        'Carry the hotel\'s card, with its name and address in Arabic, to show a taxi driver or an officer.',
        'Wear your group ID card. Many groups also give pilgrims a coloured scarf or bag.',
        'Pair up elderly relatives with a younger family member. Nobody goes out alone.',
        'Save your group leader\'s number, and keep your phone charged with a power bank.',
        'If you are lost, stay where you are, call your group, or ask the security staff for help.',
      ],
    },

    { type: 'h2', text: 'Heat, rest and health' },
    {
      type: 'p',
      text: 'Makkah is hot for most of the year: average highs in June are around 44°C, and even in January they are around 30°C. Madinah is similar in summer but noticeably cooler on winter nights, around 12°C in January.',
    },
    {
      type: 'ul',
      items: [
        'Drink water often. Zamzam is available free throughout both mosques.',
        'Do the rites early in the morning or at night in the hot months, and rest after Dhuhr.',
        'Use an umbrella for shade, and unscented sunscreen while in ihram.',
        'Watch for heat exhaustion: dizziness, headache, nausea or heavy sweating. Get into the shade, drink and ask for help.',
        'Air-conditioned buildings can be cold. A light shawl helps.',
        'Blisters are the most common problem. Wear sandals you have already walked in and treat sore spots early.',
      ],
    },

    { type: 'h2', text: 'Money, phones and getting around' },
    {
      type: 'ul',
      items: [
        '**Currency:** the Saudi riyal (SAR). Cards are widely accepted in shops and hotels, but carry some cash for small purchases.',
        '**Phones:** buy a local SIM or eSIM on arrival with your passport, or arrange international roaming before you leave India.',
        '**Plugs:** most Saudi sockets take the three-pin UK type (Type G). Bring an adapter.',
        '**Transport:** your package normally covers airport transfers and the journey between Makkah and Madinah. Taxis and ride-hailing apps operate in both cities, and the Haramain high-speed railway links Makkah, Jeddah and Madinah.',
      ],
    },

    { type: 'h2', text: 'Dress, conduct and photographs' },
    {
      type: 'ul',
      items: [
        'Dress modestly at all times, not only in the mosque.',
        'Be gentle in crowds: give way to the elderly, and never push near the Kaaba or the Black Stone.',
        'Keep photographs to a minimum, and never photograph or film other worshippers without permission. The mosque authorities ask pilgrims not to take photos that disturb others.',
        'Follow instructions from security staff and volunteers. Routes are one-way at busy times for everyone\'s safety.',
        'Look after your belongings, as you would in any crowded place.',
      ],
    },

    { type: 'h2', text: 'Ziyarat, food and rest days' },
    {
      type: 'p',
      text: 'Many packages include guided [ziyarat](/ziyarat), visits to historic places such as Masjid Quba and Mount Uhud in Madinah, and Jabal al-Nur and Arafat near Makkah. Indian food is easy to find near both mosques; many Meezan pilgrims mention the Indian-style meals in their feedback. Above all, pace yourself. A rest afternoon is not time wasted if it keeps you well enough to pray in the Haram that night.',
    },
    {
      type: 'cta',
      title: 'Your first Umrah, well looked after',
      text: 'Meezan groups travel with experienced leaders who know Makkah and Madinah, and who help with permits, meeting points and ziyarat.',
      link: { label: 'See Umrah tours', to: '/umrah' },
    },
  ],
  faqs: [
    {
      q: 'Do I need a permit to visit the Rawdah?',
      a: 'Yes. A visit to the Rawdah in Masjid an-Nabawi must be booked on the Nusuk app. Each person can currently book one visit every 365 days, and men and women have separate times.',
    },
    {
      q: 'How far should my hotel be from the Haram?',
      a: 'It depends on who is travelling. A hotel within a few hundred metres means less walking five times a day, which matters most for elderly pilgrims and in the hot months. Always ask for the walking distance in metres and the nearest gate, in writing.',
    },
    {
      q: 'Can I use my Indian SIM card in Saudi Arabia?',
      a: 'Yes, if you activate international roaming before you leave, but it can be expensive. Many pilgrims buy a local SIM or eSIM on arrival, which needs your passport.',
    },
    {
      q: 'What should I do if I get separated from my group?',
      a: 'Stay calm and stay where you are, or go to your group\'s agreed meeting point. Call your group leader, and show your hotel card to security staff if you need directions.',
    },
    {
      q: 'Do I visit Madinah before or after Makkah?',
      a: 'Either is common, depending on flights. If you go to Madinah first, you travel there in normal clothes and enter ihram before leaving for Makkah, at the Madinah miqat (Dhul Hulayfah).',
    },
  ],
  sources: [
    { label: 'Nusuk Umrah', publisher: 'Ministry of Hajj and Umrah', url: 'https://umrah.nusuk.sa/' },
    { label: 'Makkah and Madinah: miqat points and holy sites', publisher: 'Nusuk', url: 'https://umrah.nusuk.sa/MakkahAndMadinah' },
    { label: 'Umrah visa valid for a year, but bookings required for every visit (Rawdah booking rules)', publisher: 'Gulf News', url: 'https://gulfnews.com/world/gulf/saudi/saudi-umrah-visa-valid-for-365-days-but-bookings-required-for-every-visit-1.500642585' },
    { label: 'Health requirements for Umrah pilgrims', publisher: 'Saudi Ministry of Health', url: 'https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf' },
    { label: 'Climate of Mecca (Jeddah Regional Climate Center data)', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Climate_of_Mecca' },
  ],
}

export default article

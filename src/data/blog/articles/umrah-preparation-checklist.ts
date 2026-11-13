import type { BlogArticle } from '../types'

const article: BlogArticle = {
  slug: 'umrah-preparation-checklist',
  summary:
    'Start about three months before you fly: check that your passport has at least six months\' validity, choose your dates and a licensed operator, and speak to your doctor. Get the meningitis vaccine at least 10 days before arrival. About a month out, confirm your visa (it must be used within 30 days of issue), hotels, money and phone. In the final week, attend your group briefing, pack and learn the rites.',
  blocks: [
    {
      type: 'facts',
      title: 'Dates and limits to plan around',
      items: [
        { label: 'Passport validity', value: 'At least 6 months' },
        { label: 'Meningitis vaccine', value: 'At least 10 days before arrival' },
        { label: 'Umrah visa', value: 'Enter Saudi Arabia within 30 days of issue' },
        { label: 'Last entry this season', value: '23 March 2027' },
      ],
    },
    {
      type: 'p',
      text: 'Most of the stress before Umrah comes from leaving things late: a passport that expires too soon, a vaccination booked the week before, money that will not work abroad. This checklist puts each task where it belongs on the calendar. If you travel with an operator, they handle the visa, flights and hotels, but the items marked for you still need your attention.',
    },

    { type: 'h2', text: 'Three months before you travel' },
    {
      type: 'checklist',
      id: 'three-months',
      title: 'Three months before',
      items: [
        'Check your passport is valid for at least six months beyond your return',
        'Choose a season and dates that suit your family',
        'Shortlist operators and compare packages in writing',
        'See your doctor about fitness for long walks and any chronic condition',
        'Arrange leave from work and school',
        'Start walking every day to build stamina',
        'Begin learning the steps of Umrah',
      ],
    },
    {
      type: 'p',
      text: 'If you are still deciding when to go, our guide to the [best time to perform Umrah](/blog/best-time-for-umrah) compares the seasons. To compare packages, use our [ten questions to ask an operator](/blog/how-to-choose-umrah-package). Renewing an Indian passport can take weeks, so do it first.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Walk now, thank yourself later',
      text: 'Tawaf and sa\'i together cover several kilometres, and you will walk to and from the mosque five times a day. Building up to 45 minutes of brisk walking a day before you travel makes a real difference, especially for older pilgrims.',
    },

    { type: 'h2', text: 'Six to eight weeks before' },
    {
      type: 'checklist',
      id: 'six-weeks',
      title: 'Six to eight weeks before',
      items: [
        'Book your package and pay the deposit',
        'Give your operator a clear passport scan and a photograph',
        'Book the meningitis (ACYW) vaccination',
        'If you are over 65, pregnant or have a chronic illness, arrange proof of COVID-19 vaccination',
        'Ask your doctor about the seasonal flu vaccine',
        'Note your allergies, conditions and medicines on a card',
      ],
    },
    {
      type: 'p',
      text: 'Saudi Arabia\'s Ministry of Health requires every Umrah pilgrim to be vaccinated against meningitis (the quadrivalent ACYW vaccine). The vaccine must be taken at least 10 days before you arrive. A conjugate vaccine is valid for five years and a polysaccharide vaccine for three; if your certificate does not state the type, it is treated as valid for three years. Ask for a certificate that names the vaccine.',
    },

    { type: 'h2', text: 'One month before' },
    {
      type: 'checklist',
      id: 'one-month',
      title: 'One month before',
      items: [
        'Receive your visa and check that every detail matches your passport',
        'Get flight times, hotel names and distances in writing',
        'Install the Nusuk app and create your account',
        'Order Saudi riyals and tell your bank you will travel',
        'Choose a roaming pack, or plan to buy a local SIM on arrival',
        'Settle any debts and make arrangements at home',
        'Buy unscented toiletries and, for men, two sets of ihram',
      ],
    },
    {
      type: 'callout',
      tone: 'important',
      title: 'The 30-day rule',
      text: 'Since November 2025, an Umrah visa is cancelled automatically if you do not enter Saudi Arabia within 30 days of it being issued. Once you arrive, you can stay for up to 90 days. This is why operators apply for the visa close to departure. Read more in our [Umrah visa guide](/blog/umrah-visa-for-indians).',
    },
    {
      type: 'p',
      text: '**Nusuk** is the official Saudi platform for pilgrims. Your Umrah permit is linked to it, and it is also how you book a visit to the Rawdah in Masjid an-Nabawi in Madinah. Create your account before you travel, while you have time and a reliable connection.',
    },
    {
      type: 'image',
      image: {
        slug: 'orientation-camp-stage',
        alt: 'Speaker on stage under a Meezan Tours & Travels Hajj Orientation Camp banner with an audience in front',
        caption: 'A Meezan orientation camp, where pilgrims learn the rites before they travel.',
      },
    },

    { type: 'h2', text: 'The final week' },
    {
      type: 'checklist',
      id: 'final-week',
      title: 'The final week',
      items: [
        'Attend your group\'s pre-departure briefing',
        'Pack using the packing list, and weigh your bags',
        'Put documents, medicines and ihram in your hand luggage',
        'Share your itinerary and hotel details with family at home',
        'Save your group leader\'s number and the hotel address on your phone',
        'Revise the steps of Umrah and the talbiyah',
        'Clip nails and remove unwanted hair shortly before ihram',
      ],
    },
    {
      type: 'p',
      text: 'Our [Umrah packing list](/blog/umrah-packing-list) has a printable list for every bag. The [step-by-step guide](/blog/how-to-perform-umrah) is worth reading twice: once now, and again on the flight.',
    },

    { type: 'h2', text: 'Departure day' },
    {
      type: 'ul',
      items: [
        'Reach the airport in good time for an international flight, usually three hours before departure.',
        'If you fly to **Jeddah**, men change into ihram before boarding, and everyone makes the intention on the plane when the crew announces the miqat.',
        'If you fly to **Madinah** first, travel in normal clothes. Ihram comes later, before you leave Madinah for Makkah.',
        'Keep your passport, visa and boarding pass in one pouch you can reach easily.',
        'Drink water on the flight and walk the aisle when you can.',
      ],
    },

    { type: 'h2', text: 'Preparing the heart as well as the bags' },
    {
      type: 'p',
      text: 'Pilgrims have long prepared for the journey in other ways too: making a sincere intention, seeking forgiveness from family and friends, settling debts and returning anything borrowed. Many write a list of duas for the people they love, so that nothing is forgotten in front of the Kaaba. Learning the meaning of each rite, not only its steps, makes the day itself calmer and more present.',
    },
    {
      type: 'callout',
      tone: 'verify',
      text: 'Visa, vaccination and permit rules are set by the Saudi authorities and are reviewed every season. The dates above are for the 1448 AH Umrah season. Check the current rules with your operator or the official sources listed below before you book.',
    },
    {
      type: 'cta',
      title: 'Let our team take care of the paperwork',
      text: 'Meezan packages coordinate visas, flights and hotels, and every group attends a briefing before departure.',
      link: { label: 'See Umrah tours', to: '/umrah' },
    },
  ],
  faqs: [
    {
      q: 'How early should I book Umrah?',
      a: 'Book several months ahead for Ramadan and Indian school holidays, when seats and hotels near the Haram fill early. The visa itself is applied for closer to departure, because it must be used to enter Saudi Arabia within 30 days of being issued.',
    },
    {
      q: 'Which vaccinations do I need for Umrah from India?',
      a: 'The meningitis ACYW vaccine is required, taken at least 10 days before arrival. Under the current Saudi health rules, pilgrims over 65, pregnant women and people with chronic illnesses also need proof of COVID-19 vaccination, and the seasonal flu vaccine is recommended for everyone.',
    },
    {
      q: 'What is the Nusuk app?',
      a: 'Nusuk is the official Saudi platform for Umrah and Hajj pilgrims. It is used for Umrah permits and for booking a visit to the Rawdah in Madinah. Install it and create an account before you travel.',
    },
    {
      q: 'I have diabetes or a heart condition. Can I still go?',
      a: 'Many pilgrims with long-term conditions perform Umrah safely. See your doctor well before travel, carry enough medicine with copies of prescriptions, and tell your operator so that hotel distance and pacing can be planned around you.',
    },
    {
      q: 'When does the Umrah season close before Hajj 2027?',
      a: 'For the 1448 AH season, the last day to enter Saudi Arabia on an Umrah visa is 23 March 2027 and the last day to leave is 7 April 2027, according to the Ministry of Hajj and Umrah\'s published calendar.',
    },
  ],
  sources: [
    { label: 'Health requirements for Umrah pilgrims (1447H / 2026)', publisher: 'Saudi Ministry of Health', url: 'https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf' },
    { label: 'Umrah visa entry period reduced to one month', publisher: 'Gulf News', url: 'https://gulfnews.com/world/gulf/saudi/saudi-arabia-announces-new-amendments-to-umrah-visa-rules-1.500328262' },
    { label: 'Umrah season 1448 calendar: visa, entry and departure deadlines', publisher: 'Arab News Pakistan', url: 'https://www.arabnews.pk/node/2645656' },
    { label: 'Nusuk Umrah: packages, permits and the steps of Umrah', publisher: 'Ministry of Hajj and Umrah', url: 'https://umrah.nusuk.sa/' },
  ],
}

export default article

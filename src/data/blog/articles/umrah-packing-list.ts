import type { BlogArticle } from '../types'

const article: BlogArticle = {
  slug: 'umrah-packing-list',
  summary:
    'Pack for walking, heat and ihram. Bring your passport and printed documents, two sets of ihram for men (loose, breathable clothes for women), sandals you have already walked in, a small cross-body bag, **unscented** toiletries, your prescription medicines in your hand luggage, and a reusable bottle. Keep the main bag light: check your airline\'s allowance and leave room for Zamzam and gifts.',
  blocks: [
    {
      type: 'p',
      text: 'The best Umrah bag is a light one. You will walk several kilometres a day, often share a hotel room, and move between Makkah and Madinah at least once. Everything you pack has to earn its place. The lists below are the ones our team goes through with pilgrims before departure. Tick items off as you pack: your ticks are saved in this browser only, and you can print each list.',
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'Check what your package provides first',
      text: 'Some packages include travel bags, an ihram set or a small kit. Meezan pilgrims commonly receive branded bags, but contents differ by package, so ask before you buy anything. Baggage allowances are set by the airline and your ticket, not by the operator.',
    },

    { type: 'h2', text: 'Documents and money' },
    {
      type: 'checklist',
      id: 'documents',
      title: 'Documents and money',
      items: [
        'Passport, valid for at least six months',
        'Printed Umrah visa and a copy on your phone',
        'Flight tickets and hotel details, printed',
        'Meningitis (ACYW) vaccination certificate',
        'Photocopies of passport and visa, kept apart from the originals',
        'A few passport-size photographs',
        'Saudi riyals in cash for small purchases',
        'A debit, credit or forex card enabled for use abroad',
        'Your group leader\'s phone number on paper',
        'A card with your hotel name and address',
      ],
    },
    {
      type: 'p',
      text: 'Keep the originals in a zipped pouch in your hand luggage, never in the checked suitcase. If you are over 65, pregnant or have a chronic illness, also carry proof of COVID-19 vaccination: Saudi Arabia\'s health rules for the current season ask for it from these groups. See our [Umrah preparation checklist](/blog/umrah-preparation-checklist) for when to arrange each document.',
    },

    { type: 'h2', text: 'Ihram and clothing for men' },
    {
      type: 'checklist',
      id: 'men',
      title: 'For men',
      items: [
        'Two sets of ihram, so one can be washed',
        'An ihram belt or money pouch',
        'Sandals that leave the top of the foot uncovered',
        'Three or four kurtas, thobes or shirts and trousers for after Umrah',
        'A prayer cap',
        'Underwear and socks (not worn in ihram)',
        'A light shawl or jacket for air-conditioned rooms and winter nights',
      ],
    },
    {
      type: 'p',
      text: 'Ihram towels come in different weights. A medium-weight cotton set is comfortable in most seasons and does not turn transparent when wet. Practise tying the lower sheet at home: a secure knot or a belt saves a lot of adjusting in the crowd.',
    },

    { type: 'h2', text: 'Clothing for women' },
    {
      type: 'checklist',
      id: 'women',
      title: 'For women',
      items: [
        'Three or four loose abayas or modest outfits, in breathable fabric',
        'Lightweight scarves and under-scarf caps',
        'Comfortable walking shoes or sandals, with socks',
        'A prayer garment that is quick to put on',
        'A light cardigan or shawl',
        'A small cross-body bag that stays closed',
      ],
    },
    {
      type: 'p',
      text: 'Women do not wear special ihram clothing. Any modest clothing is fine, in any colour. While in ihram, the face and hands stay uncovered, so a niqab and gloves are not worn until Umrah is complete. Light colours are cooler in the sun.',
    },
    {
      type: 'image',
      image: {
        slug: 'ihram-seated-group',
        alt: 'Five Meezan pilgrims in white ihram with pilgrim ID cards seated together beside a red and yellow Meezan bag',
        caption: 'Pilgrims in ihram with their ID cards and Meezan bag.',
      },
    },

    { type: 'h2', text: 'Medicines and health' },
    {
      type: 'checklist',
      id: 'health',
      title: 'Medicines and first aid',
      items: [
        'Regular medicines for the whole trip, plus a few extra days',
        'Copies of your prescriptions',
        'Pain relief and fever medicine',
        'Oral rehydration (ORS) sachets',
        'Plasters and blister pads',
        'Unscented petroleum jelly, against chafing',
        'Antacid and any stomach medicine your doctor advises',
        'Face masks for crowded places',
        'Spare glasses, if you wear them',
      ],
    },
    {
      type: 'callout',
      tone: 'important',
      text: 'Keep all regular medicines in your hand luggage with the prescription, in their original packs. Some medicines need a prescription or approval to enter Saudi Arabia, so check with your doctor before you travel, particularly for strong painkillers and medicines for anxiety, sleep or ADHD.',
    },

    { type: 'h2', text: 'Toiletries that are safe in ihram' },
    {
      type: 'p',
      text: 'Perfume and scented products are not allowed in ihram, and many everyday toiletries are scented. Look for products labelled "fragrance-free" or "unscented", and buy them before you leave.',
    },
    {
      type: 'checklist',
      id: 'toiletries',
      title: 'Toiletries',
      items: [
        'Unscented soap and shampoo',
        'Unscented deodorant',
        'Unscented wet wipes and tissues',
        'Unscented sunscreen and lip balm',
        'Toothbrush and toothpaste, or a miswak',
        'Nail clipper and small scissors, for after Umrah',
        'A quick-dry towel',
      ],
    },

    { type: 'h2', text: 'Your daily bag for the Haram' },
    {
      type: 'checklist',
      id: 'daily',
      title: 'Daily bag',
      items: [
        'A small cloth bag for your sandals',
        'A refillable water bottle',
        'A power bank (cabin bag only on flights)',
        'Phone with your group leader\'s number saved',
        'A pocket Quran or dua book, or an app',
        'Tissues and unscented hand sanitiser',
        'A small umbrella for shade in summer',
      ],
    },
    {
      type: 'p',
      text: 'Shoes are not worn inside the mosque, and you may leave by a different gate from the one you entered, so carry them with you rather than leaving them at the door. Zamzam water is available free throughout both mosques, so you only need a bottle for the walk.',
    },

    { type: 'h2', text: 'Phone and electronics' },
    {
      type: 'ul',
      items: [
        'A phone and charger, with the **Nusuk app** installed (you need it for permits).',
        'A plug adapter: Saudi sockets are mostly the three-pin UK type (Type G), unlike Indian sockets.',
        'A power bank, carried in your hand luggage. Airlines limit power bank capacity, so check your airline\'s rules.',
        'A local SIM or eSIM bought on arrival, or an international roaming pack arranged before you leave.',
      ],
    },

    { type: 'h2', text: 'What to leave at home' },
    {
      type: 'ul',
      items: [
        '**Too many clothes.** Laundry services are available; a week\'s worth is plenty.',
        '**Perfumed products** you might use by habit while in ihram.',
        '**Expensive jewellery** and large amounts of cash.',
        '**A heavy suitcase.** A medium case with wheels is easier on hotel stairs and crowded pavements.',
        '**Medicines without a prescription**, especially those containing narcotic ingredients.',
      ],
    },

    { type: 'h2', text: 'Packing for the journey home' },
    {
      type: 'p',
      text: 'Leave space and weight for dates, prayer mats and gifts. For **Zamzam water**, Saudi Arabia allows each pilgrim one 5-litre bottle, bought sealed from the official sales points (for example at Madinah airport, where your passport is required). It is carried as a separate item, not inside your suitcase, and never in hand luggage. Airline policies differ: Akasa Air, for example, counts it within your normal checked allowance. Confirm the rule for your flight with your operator before you shop.',
    },
    {
      type: 'callout',
      tone: 'verify',
      items: [
        'Baggage allowances and Zamzam rules: your airline and your ticket.',
        'Health requirements: the Saudi Ministry of Health guidance for the current season.',
        'What your package provides: your operator, in writing.',
      ],
    },
    {
      type: 'cta',
      title: 'Ask what your Meezan package includes',
      text: 'Our team will tell you which bags and items are provided, the baggage allowance for your flight and what to bring from home.',
      link: { label: 'See current packages', to: '/packages' },
    },
  ],
  faqs: [
    {
      q: 'How many sets of ihram should a man take for Umrah?',
      a: 'Two sets is the usual advice, so that one can be washed or replaced if it gets dirty. If you plan more than one Umrah during your stay, two sets are still enough with access to laundry.',
    },
    {
      q: 'Can I wear a belt or money pouch in ihram?',
      a: 'Yes. Most scholars permit a belt or pouch to hold money and documents, and many men use one to secure the lower sheet. It is not considered stitched clothing in the sense that is prohibited.',
    },
    {
      q: 'Can I carry Zamzam water in my hand luggage?',
      a: 'No. Liquids in cabin baggage are restricted. Zamzam is bought in a sealed 5-litre bottle from official outlets and carried as a separate checked item. Each airline sets its own conditions, so check before you fly.',
    },
    {
      q: 'What kind of footwear is best for Umrah?',
      a: 'Comfortable sandals that you have already walked in. Men in ihram should wear footwear that leaves the top of the foot uncovered. Women can wear any comfortable shoes or sandals. Bring a second pair in case one breaks.',
    },
    {
      q: 'Should I buy ihram in India or in Makkah?',
      a: 'Buy it in India. You need to be wearing ihram before the miqat, which for flights from India to Jeddah is crossed in the air before landing. Ask your operator whether ihram is already provided with your package.',
    },
  ],
  sources: [
    { label: 'Health requirements for Umrah pilgrims (1447H / 2026)', publisher: 'Saudi Ministry of Health', url: 'https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf' },
    { label: 'Zamzam water sales at Prince Mohammad bin Abdulaziz Airport, Madinah', publisher: 'TAV Tibah Airports', url: 'https://tibahairports.com/en-EN/airport-services-facilities/page/zamzam-sales-service-en' },
    { label: 'Baggage information, including holy water', publisher: 'Akasa Air', url: 'https://www.akasaair.com/information/baggage' },
    { label: 'Nusuk Umrah: the official platform for Umrah packages and permits', publisher: 'Ministry of Hajj and Umrah', url: 'https://umrah.nusuk.sa/' },
  ],
}

export default article

import type { Faq } from './types'

export const generalFaqs: Faq[] = [
  {
    q: 'Is Meezan Tours a licensed Hajj operator?',
    a: 'Meezan Tours & Travels is registered with the Ministry of Minority Affairs (MOMA) Hajj Cell, Government of India, as a Hajj Group Organiser. Our licence number is MH03572726/Cat-II/9943/2026.',
  },
  {
    q: 'What does a Meezan package include?',
    a: 'Our fully managed packages coordinate flights, visas, accommodation and ground transport, with guided itineraries, local support staff, pre-departure briefings and assistance during the trip. Exact inclusions differ by package, so please check the package details or ask our team.',
  },
  {
    q: 'Can I get a package tailored to my family or group?',
    a: 'Yes. Besides group departures we arrange personalised packages. Tell us your travel dates, group size, budget and preferred hotel category and we will suggest options.',
  },
  {
    q: 'Where can I meet your team?',
    a: 'Our office is at Shop No. 8, 549, Kulsum Complex, Nana Peth, Pune 411002. It is open Monday to Saturday, 10:00 AM to 7:00 PM, and closed on Sundays. You can also call or message us on WhatsApp.',
  },
  {
    q: 'I live outside Pune. Can I travel with Meezan?',
    a: 'Yes. We are based in Pune and welcome pilgrims from across India. Our group journeys are organised from Mumbai airport to Saudi Arabia and back to Mumbai airport. Not every package departs from Pune airport, and home pickup is not included unless a package says so.',
  },
  {
    q: 'Are meals and laundry included?',
    a: 'It depends on the package. Many pilgrims mention the Indian-style food in their feedback, and practical laundry arrangements are offered, but inclusions differ by package. Please ask our team what your chosen package includes.',
  },
]

/** Grouped questions for the /faq page. Answers are deliberately general: package-specific details are confirmed by the team. */
export interface FaqSection {
  id: string
  title: string
  blurb: string
  /** Icon key resolved in the FAQ page. */
  icon: 'hajj' | 'umrah' | 'ziyarat' | 'documents' | 'luggage' | 'zamzam' | 'kit' | 'stay' | 'health' | 'about'
  items: Faq[]
}

export const faqSections: FaqSection[] = [
  {
    id: 'hajj', title: 'Hajj', icon: 'hajj', blurb: 'Group Hajj departures, timing and preparation.',
    items: [
      { q: 'Which Hajj packages does Meezan offer?', a: 'We list a long-duration package and a shorter Aziziya non-shifting package. Details and prices are on our Hajj and Packages pages, and our team can explain the differences so you can choose what suits your family.' },
      { q: 'When should I enquire for Hajj?', a: 'As early as possible. Hajj takes place once a year in the month of Dhul Hijjah, and seats, documentation and hotel allocation are limited. Contact our office to learn the current timeline and requirements.' },
      { q: 'Does Meezan help me prepare for the rites of Hajj?', a: 'Yes. Pilgrims receive a pre-departure briefing, and experienced group guides coordinate the group and assist elderly pilgrims during the journey.' },
      { q: 'Where do Hajj groups depart from?', a: 'Our group journeys are organised from Mumbai airport to Saudi Arabia and back to Mumbai airport. Not every package departs from Pune airport, and home pickup is not included unless a package says so.' },
    ],
  },
  {
    id: 'umrah', title: 'Umrah', icon: 'umrah', blurb: 'Year-round Umrah tours and what to expect.',
    items: [
      { q: 'Can I go for Umrah at any time of the year?', a: 'Umrah tours run through the year. Dates shift with Saudi regulations and the season, so please confirm current departures and availability with our team.' },
      { q: 'What does an Umrah package usually include?', a: 'Our Umrah tours coordinate flights, hotels and transport, with guidance from our team. Exact inclusions differ by package, so check the package details or ask us before you book.' },
      { q: 'Can I extend or customise my Umrah trip?', a: 'Yes. Tell us your dates, group size, budget and preferred hotel category and we will suggest a personalised package.' },
    ],
  },
  {
    id: 'ziyarat', title: 'Ziyarat', icon: 'ziyarat', blurb: 'Guided visits to the historic sites of Makkah and Madinah.',
    items: [
      { q: 'What is ziyarat?', a: 'Ziyarat means visiting the historic and sacred sites around Makkah and Madinah, such as Jabal al-Nur, Masjid Quba and Mount Uhud, usually with a guide who explains their history.' },
      { q: 'Is ziyarat included in my package?', a: 'It depends on the package. Where it is included, transport and a guide are arranged for the group. The sites visited depend on the package, season and local conditions, and your itinerary is confirmed by our team before travel.' },
      { q: 'Can elderly pilgrims join ziyarat?', a: 'Yes. Our guides assist elderly pilgrims, and you can tell us in advance about any mobility needs so we can plan around them.' },
    ],
  },
  {
    id: 'documents', title: 'Documents and visa', icon: 'documents', blurb: 'What to prepare before you travel.',
    items: [
      { q: 'Which documents do I need?', a: 'You will need a valid passport and the documents required for your visa. Requirements are set by the authorities and can change, so our team gives you the current checklist when you register.' },
      { q: 'Does Meezan handle visas?', a: 'Our packages coordinate visa assistance and document guidance, and we brief pilgrims before departure.' },
      { q: 'Can women travel without a mahram?', a: 'Rules for women travelling, including mahram requirements and age conditions, are set by the Saudi and Indian authorities and can change. Please speak to our team for the current position before you book.' },
    ],
  },
  {
    id: 'luggage', title: 'Luggage', icon: 'luggage', blurb: 'Bags, weight limits and packing.',
    items: [
      { q: 'How much luggage can I carry?', a: 'Baggage allowance is set by the airline and your package, so it can differ from one departure to another. Our team shares the exact limits for your flight in the pre-departure briefing.' },
      { q: 'What should I pack?', a: 'Keep to essentials: ihram clothing, comfortable footwear, personal medicines with prescriptions, and your documents. Our briefing includes a packing checklist, and a lighter bag makes the journey easier.' },
      { q: 'Are Meezan luggage tags or bags provided?', a: 'Many Meezan groups travel with Meezan-branded luggage and bags, which makes the group easy to spot at airports. What your package provides is listed in your package details.' },
    ],
  },
  {
    id: 'zamzam', title: 'Zamzam', icon: 'zamzam', blurb: 'Bringing Zamzam water home.',
    items: [
      { q: 'Can I bring Zamzam water back to India?', a: 'Rules on carrying Zamzam depend on the airline and the authorities at both ends, and they can change. Our team explains the current arrangements for your flight before you return.' },
      { q: 'Can I carry Zamzam in my cabin bag?', a: 'Liquids in cabin baggage are restricted on most flights, so Zamzam is normally not carried in hand baggage. Please follow the guidance our team gives for your airline.' },
    ],
  },
  {
    id: 'kit', title: 'Hajj kit', icon: 'kit', blurb: 'What pilgrims receive and how bags are organised.',
    items: [
      { q: 'What is in the Hajj kit?', a: 'Kits are designed to make the journey practical, and contents vary by package. Your package details list what is provided, and our team can confirm it before you book.' },
      { q: 'What types of bags are provided?', a: 'Pilgrims travelling with Meezan commonly receive branded bags for the journey, for example a main travel bag and a smaller hand bag for daily essentials and documents. The exact bags differ by package, so please confirm with our team.' },
      { q: 'Do I need to buy ihram separately?', a: 'This depends on your package. Ask our team whether ihram is provided with your package or whether you should bring your own.' },
    ],
  },
  {
    id: 'stay', title: 'Stay and food', icon: 'stay', blurb: 'Hotels, meals and laundry.',
    items: [
      { q: 'What kind of hotels do you use?', a: 'Makkah and Madinah hotels are matched to the category of package you choose, with the distance from the Haram given in the package details where it is provided.' },
      { q: 'Are meals included?', a: 'It depends on the package. Many pilgrims mention the Indian-style food in their feedback, and buffet-style dining and meal arrangements are confirmed package by package.' },
      { q: 'Is laundry arranged?', a: 'Practical laundry arrangements are offered, but inclusions differ by package. Please ask our team what your chosen package includes.' },
    ],
  },
  {
    id: 'health', title: 'Health and safety', icon: 'health', blurb: 'Travelling comfortably, especially for elders.',
    items: [
      { q: 'What health requirements apply?', a: 'Health and vaccination requirements are set by the authorities and can change. Our team shares the current requirements when you register, and we recommend consulting your doctor before travel.' },
      { q: 'I travel with elderly parents. Will they be looked after?', a: 'Our group guides coordinate the group and assist elderly pilgrims, and our team checks in with every member of the group. Tell us about any needs in advance so we can plan for them.' },
    ],
  },
  {
    id: 'about', title: 'About Meezan', icon: 'about', blurb: 'Licence, office and how to reach us.',
    items: generalFaqs,
  },
]

export const allFaqs: Faq[] = faqSections.flatMap((s) => s.items)

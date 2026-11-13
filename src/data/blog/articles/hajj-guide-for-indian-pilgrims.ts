import type { BlogArticle } from '../types'

const article: BlogArticle = {
  slug: 'hajj-guide-for-indian-pilgrims',
  summary:
    'Indian citizens can perform Hajj only through two routes: the **Haj Committee of India**, which allots its seats by draw, or a private **Hajj Group Organiser (HGO)** registered with the Ministry of Minority Affairs. Under the Haj Policy 2027, 70% of India\'s quota goes to the Haj Committee and 30% to HGOs. India\'s quota for Hajj 2026 was 1,75,025. Hajj 2027 is expected in mid-May, with the Day of Arafah around **15 May 2027**.',
  blocks: [
    {
      type: 'facts',
      title: 'Hajj from India in numbers',
      items: [
        { label: 'India\'s quota, Hajj 2026', value: '1,75,025 pilgrims' },
        { label: 'Split under Haj Policy 2027', value: '70% Haj Committee, 30% HGOs' },
        { label: 'Seats with private HGOs, 2027', value: '52,507' },
        { label: 'Day of Arafah 2027 (expected)', value: 'About 15 May' },
      ],
    },
    {
      type: 'p',
      text: 'Hajj from India is organised within a national quota agreed each year between India and Saudi Arabia. You cannot simply buy a Hajj visa: every Indian pilgrim travels either with the government\'s Haj Committee or with a private operator registered with the Ministry of Minority Affairs. This guide explains both routes, how to check an operator, what you need, and what happens on each day of Hajj.',
    },

    { type: 'h2', text: 'Two routes: Haj Committee or a private HGO' },
    {
      type: 'table',
      caption: 'The two ways to perform Hajj from India',
      head: ['', 'Haj Committee of India', 'Private Hajj Group Organiser'],
      rows: [
        ['Share of the quota (2027)', '70%, about 1,22,518 seats', '30%, about 52,507 seats'],
        ['How you get a seat', 'Online application, then a draw (qurrah)', 'Book directly with a registered HGO, subject to its allotted seats'],
        ['Choice of package', 'Standard arrangements set by the Haj Committee', 'A range of packages: hotel category, duration, location'],
        ['Who organises it', 'Haj Committee of India, under the Ministry of Minority Affairs', 'A private operator registered with the Ministry\'s Haj Division'],
      ],
    },
    {
      type: 'p',
      text: 'For Hajj 2027, Haj Committee applications ran from 22 June to 24 July 2026, and the draw was held on 30 July 2026. Private HGO seats are allotted by the Ministry; for 2027, 939 HGOs were selected and grouped into 26 Combined Hajj Group Organisers (CHGOs), because Saudi Arabia deals only with groups above a minimum size.',
    },
    {
      type: 'p',
      text: 'Private packages differ mainly in **where you stay and for how long**. Some keep you in one place for the whole stay in Makkah, often in Aziziya, close to Mina, which is known as a "non-shifting" package. Others place you in a hotel near Masjid al-Haram and move you closer to Mina around the days of Hajj. Durations range from under three weeks to over a month.',
    },

    { type: 'h2', text: 'How to check that an operator is registered' },
    {
      type: 'p',
      text: 'Only HGOs registered with the Ministry of Minority Affairs may take Indian pilgrims for Hajj. Before you pay anyone, check:',
    },
    {
      type: 'ul',
      items: [
        'The **list of registered HGOs** on the Ministry\'s [HGO portal](https://pto.haj.gov.in/), published for each Hajj year.',
        'The operator\'s **registration number**, which should appear on its website and documents.',
        'The **packages** registered operators have declared, on the Ministry\'s [packages site](https://packages.haj.gov.in/).',
        'An office address you can visit, and written terms before any payment.',
      ],
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'Meezan\'s registration',
      text: 'Meezan Tours & Travels, Pune, is registered with the Ministry of Minority Affairs (Hajj Cell) as a Hajj Group Organiser, licence MH03572726/Cat-II/9943/2026. Our certificate is linked in the footer of every page of this website.',
    },

    { type: 'h2', text: 'Eligibility, documents and health' },
    {
      type: 'p',
      text: 'The Haj Committee\'s guidelines for Hajj 2027 set out the main rules. Private operators follow Saudi requirements and confirm their own conditions, so ask yours.',
    },
    {
      type: 'ul',
      items: [
        '**Passport:** for Hajj 2027 the Haj Committee requires passports valid until at least 31 December 2027.',
        '**Medical fitness:** a Medical Screening and Fitness Certificate from a government doctor. Some serious conditions make a pilgrim ineligible.',
        '**Vaccinations:** Saudi Arabia requires the meningitis ACYW vaccine at least 10 days before arrival. India also makes oral polio vaccine mandatory for Haj Committee pilgrims.',
        '**Age:** the Haj Committee lists children under 15 as ineligible for 2027, subject to Saudi guidelines. There is no upper age limit, but pilgrims aged 65 and over must travel with a companion.',
        '**Women without a mahram:** under the Haj Committee route, women aged 45 and over may travel without a mahram in groups of four or five, where their school of thought permits. Ask your HGO about its policy.',
      ],
    },
    {
      type: 'image',
      image: {
        slug: 'orientation-camp-crowd',
        alt: 'Pilgrims seated in rows watching a presentation at a Meezan orientation camp',
        caption: 'Pilgrims at a Meezan orientation camp before Hajj.',
      },
    },

    { type: 'h2', text: 'The days of Hajj' },
    {
      type: 'p',
      text: 'Most pilgrims arrive in Saudi Arabia days or weeks before Hajj, spend time in Makkah and Madinah, and then perform the rites between the 8th and 13th of Dhul Hijjah.',
    },
    {
      type: 'steps',
      items: [
        { title: '8 Dhul Hijjah: to Mina', text: 'In ihram, pilgrims travel to the tent city of Mina and spend the day and night there in prayer.' },
        { title: '9 Dhul Hijjah: the Day of Arafah', text: 'The standing (wuquf) at Arafat from midday to sunset is the essential rite of Hajj. After sunset, pilgrims move to Muzdalifah and spend the night there, collecting pebbles for the stoning.' },
        { title: '10 Dhul Hijjah: Eid al-Adha', text: 'Stoning of Jamrat al-Aqabah, the sacrifice, shaving or trimming the hair, and Tawaf al-Ifadah with sa\'i in Makkah.' },
        { title: '11 and 12 Dhul Hijjah: Mina', text: 'Pilgrims stay in Mina and stone all three Jamarat each day. Those who stay on also stone on the 13th.' },
        { title: 'Before leaving Makkah', text: 'The farewell tawaf (Tawaf al-Wada) is the last rite before pilgrims leave the city.' },
      ],
    },
    {
      type: 'p',
      text: 'There are three ways of performing Hajj: **Tamattu** (Umrah first, then Hajj, with a sacrifice), **Qiran** (Umrah and Hajj together in one ihram, with a sacrifice) and **Ifrad** (Hajj alone). The Haj Committee advises that pilgrims flying to Jeddah who choose Tamattu or Qiran should wear ihram from their departure airport in India. Our guide to [Hajj and Umrah](/blog/hajj-vs-umrah) explains how the two connect.',
    },
    {
      type: 'image',
      image: {
        slug: 'sunrise-camp-group',
        alt: 'Meezan pilgrims in white and yellow standing together on red carpets at sunrise with mountains behind',
        caption: 'A Meezan Hajj group at sunrise.',
      },
    },

    { type: 'h2', text: 'Permits and the Nusuk card' },
    {
      type: 'p',
      text: 'Saudi Arabia enforces the rule that nobody may perform Hajj without a permit. For Hajj 2026, the penalties announced included fines of up to SAR 20,000 for performing or attempting Hajj without a permit, and up to SAR 100,000 per person for anyone who helps them. Indian pilgrims receive their Hajj visa and permit through the Haj Committee or their HGO; the Saudi **Nusuk Hajj** platform does not take bookings from India directly. Inside Saudi Arabia, every pilgrim must carry the **Nusuk card** issued to them.',
    },

    { type: 'h2', text: 'Preparing for Hajj' },
    {
      type: 'ul',
      items: [
        '**Walk every day** for months before you go. The days of Hajj involve long walks, often in heat.',
        '**Learn the rites** properly. Attend your group\'s orientation sessions; Meezan holds Hajj orientation camps before departure.',
        '**Plan for heat.** Hajj 2027 falls in mid-May, when Makkah is very hot. Carry water, an umbrella and unscented sunscreen.',
        '**Settle your affairs** at home: debts, a will, and arrangements for your family while you are away.',
        'Read our [Umrah packing list](/blog/umrah-packing-list): most of it applies to Hajj too, with extra care for the days in Mina and the night in Muzdalifah.',
      ],
    },
    {
      type: 'callout',
      tone: 'verify',
      text: 'Hajj rules are reviewed every year by both governments. Quotas, age limits, health requirements and dates for Hajj 2027 may change. Check the Haj Committee of India, the Ministry of Minority Affairs and the Saudi Ministry of Health, or ask a registered HGO.',
    },
    {
      type: 'cta',
      title: 'Thinking about Hajj?',
      text: 'Meezan is a registered Hajj Group Organiser in Pune. Speak to our team about seats, packages and the documents you will need.',
      link: { label: 'Hajj with Meezan', to: '/hajj' },
    },
  ],
  faqs: [
    {
      q: 'How can I go for Hajj from India?',
      a: 'Through one of two routes: the Haj Committee of India, which takes online applications and allots seats by draw, or a private Hajj Group Organiser registered with the Ministry of Minority Affairs. Under the Haj Policy 2027, the quota is split 70% and 30% between them.',
    },
    {
      q: 'When is Hajj 2027?',
      a: 'Hajj 2027 is expected between about 14 and 19 May 2027, with the Day of Arafah around 15 May and Eid al-Adha around 16 May. The exact dates depend on the sighting of the moon.',
    },
    {
      q: 'How do I know if a Hajj tour operator is genuine?',
      a: 'Check that it appears on the list of registered Hajj Group Organisers on the Ministry of Minority Affairs HGO portal (pto.haj.gov.in), ask for its registration number, and visit its office before paying.',
    },
    {
      q: 'Can women go for Hajj from India without a mahram?',
      a: 'Under the Haj Committee route, women aged 45 and over may travel without a mahram in groups of four or five, where their school of thought permits. Private operators set their own policies, so ask your HGO.',
    },
    {
      q: 'Is there an age limit for Hajj?',
      a: 'For 2027, the Haj Committee lists children under 15 as ineligible, subject to Saudi guidelines. There is no upper age limit, but pilgrims aged 65 and over must travel with a companion and pass medical screening.',
    },
  ],
  sources: [
    { label: 'Haj Policy 2027', publisher: 'Haj Committee of India', url: 'https://hajcommittee.gov.in/uploads/circulars/178213870899Haj_Policy_2027.pdf' },
    { label: 'Guidelines for Haj 2027', publisher: 'Haj Committee of India', url: 'https://hajcommittee.gov.in/uploads/circulars/178213884104Guidelines_for_Haj_2027.pdf' },
    { label: 'Hajj 2027 announcement and quota', publisher: 'Press Information Bureau, Government of India', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2276793' },
    { label: 'Hajj Group Organiser portal (registered HGOs)', publisher: 'Ministry of Minority Affairs, Haj Division', url: 'https://pto.haj.gov.in/' },
    { label: 'Packages offered by HGOs', publisher: 'Ministry of Minority Affairs, Haj Division', url: 'https://packages.haj.gov.in/' },
    { label: 'The Hajj journey, step by step', publisher: 'Nusuk Hajj', url: 'https://hajj.nusuk.sa/Journey' },
    { label: 'Health requirements for Hajj pilgrims', publisher: 'Saudi Ministry of Health', url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf' },
    { label: 'Nusuk card launched for pilgrims', publisher: 'Ministry of Hajj and Umrah', url: 'https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-Officially-Launches-Nusuk-Card' },
  ],
}

export default article

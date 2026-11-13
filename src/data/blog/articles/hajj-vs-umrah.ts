import type { BlogArticle } from '../types'

const article: BlogArticle = {
  slug: 'hajj-vs-umrah',
  summary:
    '**Hajj** is one of the five pillars of Islam, obligatory once in a lifetime for every adult Muslim who is physically and financially able, and it is performed only on fixed days in the month of Dhul Hijjah. **Umrah** can be performed through most of the year and its rites take a few hours. Both begin in ihram and include tawaf and sa\'i, but Hajj adds the days at Mina, Arafat and Muzdalifah, the stoning of the Jamarat and the sacrifice.',
  blocks: [
    {
      type: 'p',
      text: 'Hajj and Umrah are both pilgrimages to the Kaaba in Makkah, and the Quran mentions them together. A pilgrim performing Umrah will recognise much of Hajj, and many pilgrims from India perform Umrah before Hajj partly to learn the rites. But they are different acts of worship, with different rulings, timing and weight.',
    },
    {
      type: 'arabic',
      arabic: 'وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ',
      transliteration: 'Wa atimmul-hajja wal-\'umrata lillah.',
      translation: 'And complete the Hajj and the Umrah for Allah.',
      cite: 'Quran 2:196',
    },

    { type: 'h2', text: 'Hajj and Umrah side by side' },
    {
      type: 'table',
      caption: 'Hajj vs Umrah at a glance',
      head: ['', 'Hajj', 'Umrah'],
      rows: [
        ['Ruling', 'A pillar of Islam: obligatory once in a lifetime for those able', 'Obligatory once according to some schools, a strongly recommended sunnah according to others'],
        ['When', 'Only on 8 to 13 Dhul Hijjah each year', 'Through most of the year (international visits pause around Hajj)'],
        ['Time for the rites', 'Five to six days', 'A few hours'],
        ['Places', 'Makkah, Mina, Arafat and Muzdalifah', 'Masjid al-Haram in Makkah'],
        ['Core rites', 'Ihram, standing at Arafat, Muzdalifah, stoning the Jamarat, sacrifice (for most pilgrims), halq, Tawaf al-Ifadah, sa\'i, farewell tawaf', 'Ihram, tawaf, sa\'i, halq or taqsir'],
        ['How Indians book', 'Only through the Haj Committee of India or a registered Hajj Group Organiser, within India\'s quota', 'Through a licensed operator or the Nusuk Umrah platform'],
        ['Typical trip from India', 'About two and a half weeks to over a month', 'Usually around two weeks'],
      ],
    },

    { type: 'h2', text: 'Obligation: a pillar of Islam and a recommended visit' },
    {
      type: 'p',
      text: 'Hajj is one of the five pillars of Islam. It is obligatory **once in a lifetime** for every adult Muslim who is physically able and can afford it without hardship to their family. The Quran says:',
    },
    {
      type: 'arabic',
      arabic: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
      translation: 'And pilgrimage to the House is a duty owed to Allah by all people who are able to make the journey.',
      cite: 'Quran 3:97',
    },
    {
      type: 'p',
      text: 'The ruling on Umrah is a well-known difference of opinion. The **Shafi\'i and Hanbali** schools hold that Umrah is also obligatory once in a lifetime for those able; the **Hanafi and Maliki** schools hold that it is a strongly emphasised sunnah. All agree that it is a great act of worship, and many pilgrims perform it more than once.',
    },

    { type: 'h2', text: 'Timing: fixed days or most of the year' },
    {
      type: 'p',
      text: 'Hajj happens once a year, between the 8th and the 13th of **Dhul Hijjah**, the last month of the Islamic calendar. Its central day, the Day of Arafah, falls on the 9th. In 2027, the Day of Arafah is expected around **15 May**, subject to the sighting of the moon.',
    },
    {
      type: 'p',
      text: 'Umrah has no fixed date. In practice, Saudi Arabia pauses Umrah for international visitors in the weeks around Hajj: for the 1448 AH season, the last day to enter on an Umrah visa is 23 March 2027. See our guide to the [best time for Umrah](/blog/best-time-for-umrah).',
    },

    { type: 'h2', text: 'What Hajj and Umrah share' },
    {
      type: 'ul',
      items: [
        '**Ihram:** both begin by entering the sacred state at or before the miqat, with the same clothing and restrictions.',
        '**Tawaf:** seven circuits around the Kaaba.',
        '**Sa\'i:** seven laps between Safa and Marwah.',
        '**Halq or taqsir:** shaving or trimming the hair.',
      ],
    },
    {
      type: 'p',
      text: 'Our [step-by-step guide to performing Umrah](/blog/how-to-perform-umrah) explains each of these in detail. They are performed in the same way within Hajj.',
    },
    {
      type: 'image',
      image: {
        slug: 'tent-group-banner',
        alt: 'Group of Meezan Hajj pilgrims standing around a Hajj 2026 sign inside a white tent with blue bedding',
        caption: 'Meezan Hajj 2026 pilgrims in their tent.',
      },
    },

    { type: 'h2', text: 'What only Hajj includes' },
    {
      type: 'steps',
      items: [
        { title: '8 Dhul Hijjah: Mina', text: 'Pilgrims go to Mina, a valley of tents outside Makkah, and spend the day and night there in prayer.' },
        { title: '9 Dhul Hijjah: Arafat', text: 'The standing at Arafat from midday to sunset, the heart of Hajj. Then the night under the open sky at Muzdalifah.' },
        { title: '10 Dhul Hijjah: Eid al-Adha', text: 'Stoning of Jamrat al-Aqabah, the sacrifice, halq or taqsir, and Tawaf al-Ifadah with sa\'i.' },
        { title: '11 to 13 Dhul Hijjah: Mina', text: 'Stoning the three Jamarat each day, on the 11th and 12th, and on the 13th for those who stay.' },
        { title: 'Before leaving Makkah', text: 'The farewell tawaf (Tawaf al-Wada).' },
      ],
    },
    {
      type: 'p',
      text: 'Our [Hajj guide for pilgrims from India](/blog/hajj-guide-for-indian-pilgrims) covers each day, and how to book.',
    },

    { type: 'h2', text: 'Where they meet: Hajj al-Tamattu' },
    {
      type: 'p',
      text: 'There are three ways to perform Hajj. In **Tamattu**, the pilgrim performs a complete Umrah on arriving in Makkah, leaves ihram, and enters ihram again on 8 Dhul Hijjah for Hajj; a sacrifice is required. In **Qiran**, the pilgrim makes the intention for Umrah and Hajj together and stays in ihram throughout; a sacrifice is also required. In **Ifrad**, the pilgrim performs Hajj alone, and a sacrifice is not compulsory. So for many Hajj pilgrims, Umrah is literally the first part of the journey.',
    },

    { type: 'h2', text: 'Does Umrah replace Hajj?' },
    {
      type: 'p',
      text: 'No. Umrah, however many times it is performed, does not fulfil the obligation of Hajj. The hadith that "Umrah in Ramadan is equal to Hajj" (Sahih al-Bukhari 1782) refers to its reward; scholars agree that it does not lift the duty of Hajj from someone who is able to perform it.',
    },
    {
      type: 'p',
      text: 'If Hajj has become obligatory on you, scholars advise not delaying it without reason. For Indian pilgrims, though, a Hajj seat depends on the national quota, and many perform Umrah first while they wait, which also prepares them for the crowds, the heat and the rites.',
    },
    {
      type: 'cta',
      title: 'Hajj or Umrah: which is right for you this year?',
      text: 'Meezan arranges both. Talk to our team about seats, timing and preparation.',
      link: { label: 'Hajj with Meezan', to: '/hajj' },
    },
  ],
  faqs: [
    {
      q: 'What is the main difference between Hajj and Umrah?',
      a: 'Hajj is a pillar of Islam, obligatory once in a lifetime for those able, and is performed only on 8 to 13 Dhul Hijjah. Umrah can be performed through most of the year and takes a few hours. Hajj also includes the days at Mina, Arafat and Muzdalifah, the stoning of the Jamarat and the sacrifice.',
    },
    {
      q: 'Is Umrah compulsory?',
      a: 'Scholars differ. The Shafi\'i and Hanbali schools consider Umrah obligatory once in a lifetime for those able; the Hanafi and Maliki schools consider it a strongly recommended sunnah.',
    },
    {
      q: 'Can I perform Umrah during Hajj?',
      a: 'Pilgrims performing Hajj al-Tamattu or Qiran combine an Umrah with their Hajj. International visitors cannot travel on an Umrah visa during the Hajj season itself, because Umrah visas are paused around Hajj.',
    },
    {
      q: 'Which should I perform first, Hajj or Umrah?',
      a: 'If Hajj is obligatory on you and you are able to go, scholars advise not to delay it. Many pilgrims from India perform Umrah first while waiting for a Hajj seat, which also helps them learn the rites.',
    },
  ],
  sources: [
    { label: 'Quran 2:196', publisher: 'Quran.com', url: 'https://quran.com/2/196' },
    { label: 'Quran 3:97', publisher: 'Quran.com', url: 'https://quran.com/3/97' },
    { label: 'The Hajj journey, step by step', publisher: 'Nusuk Hajj', url: 'https://hajj.nusuk.sa/Journey' },
    { label: 'Types of Hajj and the rites (Circular 23)', publisher: 'Haj Committee of India', url: 'https://hajcommittee.gov.in/uploads/circulars/173614735531Circular_23.pdf' },
    { label: '"Umrah in Ramadan", Sahih al-Bukhari 1782', publisher: 'Sunnah.com', url: 'https://sunnah.com/bukhari:1782' },
    { label: 'Umrah season 1448 calendar', publisher: 'Arab News Pakistan', url: 'https://www.arabnews.pk/node/2645656' },
  ],
}

export default article

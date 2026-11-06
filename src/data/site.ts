/**
 * Single source of truth for business details.
 * Every value below was taken from the current live website (www.meezantours.com).
 * Items marked CONFIRM must be verified by the owner before launch (see HANDOFF.md).
 */
export const SITE = {
  name: 'Meezan Tours & Travels',
  shortName: 'Meezan',
  url: 'https://www.meezantours.com',
  tagline: 'Hajj & Umrah tour operator in Pune',
  description:
    'Meezan Tours & Travels is a Pune-based Hajj and Umrah tour operator with 18+ years of experience, organising group and personalised pilgrimages for pilgrims across India, with flights, visas, accommodation and guided support.',
  licence: {
    number: 'MH03572726/Cat-II/9943/2026',
    role: 'Hajj Group Organiser',
    authority: 'Ministry of Minority Affairs (MOMA), Hajj Cell, Government of India',
    /** Licence certificate, linked from the original site's header. */
    certificateUrl: 'https://drive.google.com/file/d/1E8dVedJBH7X8jsQSZRBjv95rz955L-qT/view?usp=sharing',
  },
  /** Figures shown on the original site and stated by the owner. CONFIRM before launch. */
  stats: [
    { value: '18+', label: 'Years of experience' },
    { value: '25K+', label: 'Happy pilgrims' },
    { value: '4.9', label: 'Average rating' },
  ],
  phones: [
    { label: 'Primary', display: '+91 92703 30016', tel: '+919270330016' },
    { label: 'Alternate', display: '+91 91755 83737', tel: '+919175583737' },
    { label: 'Alternate', display: '+91 79723 46995', tel: '+917972346995' },
  ],
  /** CONFIRM: assumed to be the primary number. */
  whatsapp: { number: '919270330016', display: '+91 92703 30016' },
  email: 'meezantour@gmail.com',
  address: {
    line1: 'Shop No. 8, 549, Kulsum Complex',
    line2: 'Nana Peth',
    city: 'Pune',
    region: 'Maharashtra',
    postalCode: '411002',
    country: 'IN',
  },
  hours: [
    { days: 'Monday to Saturday', time: '10:00 AM - 7:00 PM', open: '10:00', close: '19:00' },
    { days: 'Sunday', time: 'Closed' },
  ],
  /** Profiles linked from the original site's header and footer. */
  social: [
    { label: 'YouTube', url: 'https://www.youtube.com/@MeezanTours' },
    { label: 'Facebook', url: 'https://www.facebook.com/meezantoursonline' },
    { label: 'Instagram', url: 'https://www.instagram.com/meezantours/' },
    { label: 'Threads', url: 'https://www.threads.com/@meezantours' },
  ] as { label: string; url: string }[],
  mapEmbed:
    'https://www.google.com/maps?q=Meezan+Tours+%26+Travels+Kulsum+Complex+Nana+Peth+Pune+411002&output=embed',
  /** Owner-supplied Google Business Profile link. */
  mapLink: 'https://www.google.com/maps/place/Meezan+Tours+%26+Travels/data=!4m2!3m1!1s0x0:0xc032b957bcb5c22',
  /**
   * Fill rating/reviewCount ONLY from the live Google profile, then they appear next to the reviews link.
   * Left empty on purpose: the current figures could not be read.
   */
  googleReviews: { rating: undefined as number | undefined, reviewCount: undefined as number | undefined },
} as const

export const COPYRIGHT_YEAR: number = __BUILD_YEAR__

export const addressLine = () =>
  `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`

export const whatsappLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`

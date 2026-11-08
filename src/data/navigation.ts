export interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string; description: string }[]
}

export const NAV: NavItem[] = [
  {
    label: 'Pilgrimage',
    to: '/hajj',
    children: [
      { label: 'Hajj', to: '/hajj', description: 'Group Hajj departures from India' },
      { label: 'Umrah', to: '/umrah', description: 'Umrah tours, year-round' },
      { label: 'Ziyarat', to: '/ziyarat', description: 'Guided visits in Makkah & Madinah' },
    ],
  },
  { label: 'Packages', to: '/packages' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_LINKS = {
  explore: [
    { label: 'Home', to: '/' },
    { label: 'About Meezan', to: '/about' },
    { label: 'Packages', to: '/packages' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ],
  pilgrimage: [
    { label: 'Hajj', to: '/hajj' },
    { label: 'Umrah', to: '/umrah' },
    { label: 'Ziyarat', to: '/ziyarat' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
}

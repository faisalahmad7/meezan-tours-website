import type { GalleryImage, GalleryVideo } from './types'

/**
 * Only genuine Meezan photographs taken from the current site are used.
 * Left out on purpose: the Miqat map and a Madinah photo, because both carry a third-party watermark.
 * Captions are kept neutral where the exact place/date could not be verified.
 */
export const galleryImages: GalleryImage[] = [
  { id: 'g1', slug: 'group-jabal', title: 'Group photograph with the Meezan banner', alt: 'Meezan pilgrims in ihram standing behind a Meezan Tours banner in front of a rocky hill', category: 'Groups' },
  { id: 'g2', slug: 'mina-tent', title: 'Hajj 2025, Mina', alt: 'Pilgrims in ihram resting with their bags inside a large white tent in Mina', category: 'Hajj' },
  { id: 'g3', slug: 'airport-family', title: 'Arrival with Meezan luggage', alt: 'Pilgrims and a Meezan team member at the airport with red Meezan Tours luggage', category: 'Journey' },
  { id: 'g4', slug: 'flight-akasa', title: 'Boarding the flight to Umrah', alt: 'Pilgrims in ihram holding red Meezan bags beside an Akasa Air aircraft at night', category: 'Journey' },
  { id: 'g5', slug: 'buffet', title: 'Meezan hotel buffet', alt: 'Freshly prepared rice, vegetable and curry dishes at a hotel buffet', category: 'Stay & Food' },
  { id: 'g6', slug: 'group-plateau', title: 'Pilgrim group photograph', alt: 'Large group of Meezan pilgrims posing together near a rocky mountain', category: 'Groups' },
  { id: 'g7', slug: 'group-plaza', title: 'Group photograph with banner', alt: 'Meezan pilgrims holding the Meezan Tours banner in a paved plaza', category: 'Groups' },
  { id: 'g8', slug: 'group-hilltop', title: 'Group photograph beneath the umbrellas', alt: 'Meezan group standing in front of a hill under large decorative shade umbrellas', category: 'Groups' },
  { id: 'g9', slug: 'group-banner-hill', title: 'Meezan group with banner', alt: 'Pilgrims holding a green Meezan Tours & Travels banner with a mountain behind them', category: 'Groups' },
  { id: 'g10', slug: 'group-mosque', title: 'Group in front of a white mosque', alt: 'Meezan pilgrims holding their banner in front of a white-domed mosque', category: 'Groups' },
  { id: 'g12', slug: 'kaaba-clock', title: 'Kaaba and the clock tower', alt: 'The Kaaba surrounded by pilgrims with the Makkah clock tower behind', category: 'Kaaba' },
  { id: 'g13', slug: 'kaaba-quran', title: 'Kaaba', alt: 'The Kaaba at dusk with a pilgrim holding a Quran and prayer beads', category: 'Kaaba' },
  { id: 'g14', slug: 'haram-group-wide', title: 'Meezan group at Masjid al-Haram', alt: 'Meezan pilgrims in ihram standing together on the white marble plaza of Masjid al-Haram with the Kaaba and minarets behind', category: 'Kaaba' },
  { id: 'g15', slug: 'haram-group-wide-2', title: 'Together in Makkah', alt: 'Group of Meezan Tours pilgrims in ihram on the Masjid al-Haram courtyard with the Kaaba in the background', category: 'Kaaba' },
  { id: 'g16', slug: 'haram-group-portrait', title: 'Standing before the Kaaba', alt: 'Meezan pilgrims in white ihram and abayas posing in front of the Kaaba in Makkah', category: 'Kaaba' },
  { id: 'g17', slug: 'airport-banner-group', title: 'Departure day at the airport', alt: 'Meezan Tours pilgrims in ihram holding the green Meezan Tours & Travels Hajj and Umrah banner at the airport before departure', category: 'Journey' },
  { id: 'g18', slug: 'airport-banner-group-2', title: 'Ready to fly, together', alt: 'Group of Hajj and Umrah pilgrims with the Meezan Tours banner and luggage trolleys inside the airport terminal', category: 'Journey' },
  { id: 'g19', slug: 'ihram-seated-group', title: 'Pilgrims in ihram, side by side', alt: 'Five Meezan pilgrims in white ihram with pilgrim ID cards seated together beside a red and yellow Meezan bag', category: 'Groups' },
  { id: 'g20', slug: 'night-gate-pilgrims', title: 'Moving together at night', alt: 'Pilgrims in ihram and volunteers in high-visibility vests walking toward a lit entrance gate at night', category: 'Journey' },
  { id: 'g21', slug: 'pilgrims-walking', title: 'Pilgrims on the way', alt: 'A large stream of pilgrims in white ihram walking together on a raised walkway with rocky hills behind them', category: 'Journey' },
  { id: 'g22', slug: 'pilgrims-walking-2', title: 'Walking as one group', alt: 'Hajj and Umrah pilgrims in white walking in a crowd under a clear morning sky with mountains in the distance', category: 'Journey' },
  { id: 'g11', slug: 'group-bridge', title: 'Pilgrims gathered on a terrace', alt: 'A line of pilgrims in ihram and modest dress standing along a railed terrace', category: 'Groups' },
]

/** Empty for now: no video files were available in the supplied snapshot. */
export const galleryVideos: GalleryVideo[] = []

export const galleryCategories = ['All', 'Hajj', 'Kaaba', 'Journey', 'Groups', 'Stay & Food'] as const
export const HOME_GALLERY_IDS = ['g14', 'g17', 'g2', 'g16', 'g20', 'g9']

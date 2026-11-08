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
  { id: 'g23', slug: 'buffet-hotel', title: 'Hotel buffet, freshly served', alt: 'Chafing dishes of saffron rice, vegetables and curries laid out at a hotel buffet for Meezan pilgrims', category: 'Stay & Food' },
  { id: 'g24', slug: 'salad-bar', title: 'Fresh salad and fruit', alt: 'Platter of red cabbage, cucumber, carrot and orange slices being served at a Meezan group meal', category: 'Stay & Food' },
  { id: 'g25', slug: 'arafat-banner-wide', title: 'Meezan group at the Mount of Mercy', alt: 'Wide view of a large Meezan Tours group in ihram holding the Meezan banner in front of a rocky hill', category: 'Groups' },
  { id: 'g26', slug: 'hill-group-blue-sky', title: 'Ziyarat with the group', alt: 'Meezan pilgrims holding a green Meezan Tours banner under a bright sky with a rocky hill behind them', category: 'Ziyarat' },
  { id: 'g27', slug: 'group-hill-banner-small', title: 'Husbands and wives, side by side', alt: 'Four pilgrims in white ihram holding a Meezan banner with a rocky hill and umbrellas behind', category: 'Groups' },
  { id: 'g28', slug: 'banner-held-hill', title: 'Holding the Meezan banner', alt: 'Two pilgrims holding a large Meezan Tours & Travels Hajj and Umrah banner on a stone plaza below a hill', category: 'Groups' },
  { id: 'g29', slug: 'banner-mural-group', title: 'Group with the banner before the mural', alt: 'Meezan pilgrims standing with the Meezan banner in front of a large carved stone mural', category: 'Groups' },
  { id: 'g30', slug: 'group-hill-banner-2', title: 'Group on the plaza', alt: 'Meezan group with banner standing on a paved plaza with a rocky hill and mountains in the background', category: 'Groups' },
  { id: 'g31', slug: 'group-building-family', title: 'Families together', alt: 'A group of pilgrims in ihram and abayas standing in a row with a child in front of a stone building', category: 'Groups' },
  { id: 'g32', slug: 'ihram-men-makkah', title: 'Pilgrims in ihram, Makkah', alt: 'Five men in white ihram standing together outside a hotel entrance with the Makkah skyline behind', category: 'Kaaba' },
  { id: 'g33', slug: 'tent-resting-pilgrims', title: 'Resting before the rites', alt: 'Pilgrims in white ihram sitting together on carpets inside a large white tent with a fan and red Meezan bags', category: 'Hajj' },
  { id: 'g34', slug: 'tent-seated-fan', title: 'Inside the pilgrim tent', alt: 'Elderly pilgrims in ihram resting on white sheets inside a ventilated tent with luggage nearby', category: 'Hajj' },
  { id: 'g35', slug: 'tent-group-line', title: 'Group in the tent', alt: 'Meezan pilgrims in ihram standing in a line inside a white tent', category: 'Hajj' },
  { id: 'g36', slug: 'tent-group-banner', title: 'Hajj 2026 group in the tent', alt: 'Group of Meezan Hajj pilgrims standing around a Hajj 2026 sign inside a white tent with blue bedding', category: 'Hajj' },
  { id: 'g37', slug: 'sunrise-camp-group', title: 'Sunrise gathering', alt: 'Meezan pilgrims in white and yellow standing together on red carpets at sunrise with mountains behind', category: 'Hajj' },
  { id: 'g38', slug: 'dua-roadside', title: 'Dua together', alt: 'Pilgrims in ihram raising their hands in dua together beside parked cars', category: 'Journey' },
  { id: 'g39', slug: 'dua-circle', title: 'A moment of dua', alt: 'Pilgrims in white standing close together with hands raised in prayer', category: 'Journey' },
  { id: 'g40', slug: 'orientation-camp-stage', title: 'Hajj orientation camp', alt: 'Speaker on stage under a Meezan Tours & Travels Hajj Orientation Camp banner with an audience in front', category: 'Events' },
  { id: 'g41', slug: 'orientation-camp-crowd', title: 'Orientation camp audience', alt: 'Pilgrims seated in rows watching a presentation at a Meezan orientation camp', category: 'Events' },
  { id: 'g42', slug: 'orientation-camp-hall', title: 'Orientation camp hall', alt: 'Meezan Tours Hajj and Umrah orientation camp stage with the Meezan banner and seated attendees', category: 'Events' },
  { id: 'g43', slug: 'orientation-camp-tables', title: 'Pre-departure briefing', alt: 'Attendees seated at tables during a Meezan pre-departure briefing under a green banner', category: 'Events' },
  { id: 'g44', slug: 'dessert-buffet', title: 'Dessert counter', alt: 'Rows of colourful cakes and desserts on a hotel buffet counter', category: 'Stay & Food' },
  { id: 'g11', slug: 'group-bridge', title: 'Pilgrims gathered on a terrace', alt: 'A line of pilgrims in ihram and modest dress standing along a railed terrace', category: 'Groups' },
]

/** Empty for now: no video files were available in the supplied snapshot. */
export const galleryVideos: GalleryVideo[] = []

export const galleryCategories = ['All', 'Hajj', 'Kaaba', 'Journey', 'Groups', 'Ziyarat', 'Stay & Food', 'Events'] as const
export const HOME_GALLERY_IDS = ['g14', 'g17', 'g23', 'g26', 'g2', 'g16']

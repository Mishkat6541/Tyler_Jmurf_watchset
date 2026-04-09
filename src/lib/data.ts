export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  category: 'kit' | 'assembled'
  description: string
  shortDescription: string
  images: string[]
  specs: { label: string; value: string }[]
  materials: string[]
  tags: string[]
  inStock: boolean
  featured: boolean
  rating: number
  reviewCount: number
  badge?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  initials: string
}

export interface BuilderOption {
  id: string
  label: string
  description: string
  priceAdder: number
  colorHex?: string
  preview?: string
}

export interface BuilderCategory {
  key: string
  label: string
  options: BuilderOption[]
}

export const products: Product[] = [
  // ── ASSEMBLED WATCHES ────────────────────────────────────────────────────
  {
    id: 'founders-1',
    name: 'Founders 1',
    subtitle: 'Blue Dial - Black Leather',
    price: 595,
    category: 'assembled',
    description:
      'The Founders 1 marks the beginning of everything Foundry stands for - a 36mm oyster perpetual-style case, a rich blue sunburst dial, and a crisp black leather strap, all powered by the workhorse NH35 automatic movement. Limited to just 5 pieces, each is individually numbered and delivered with a certificate of authenticity.',
    shortDescription: 'Limited to 5 pieces. The watch that started it all.',
    images: [
      '/images/Picture8.jpg',
    ],
    specs: [
      { label: 'Movement',         value: 'Seiko NH35 Automatic (24 Jewels)' },
      { label: 'Case Diameter',    value: '36 mm' },
      { label: 'Case Style',       value: 'Sloped Oyster Perpetual' },
      { label: 'Case Material',    value: '316L Stainless Steel' },
      { label: 'Dial',             value: 'Blue Sunburst (36 mm)' },
      { label: 'Hands',            value: 'Standard Applied' },
      { label: 'Strap',            value: 'Black Leather (20 mm)' },
      { label: 'Power Reserve',    value: '41 hours' },
      { label: 'Edition',          value: 'Limited - 5 pieces only' },
    ],
    materials: ['316L Stainless Steel', 'Black Calf Leather', 'Sapphire Crystal'],
    tags:       ['limited', 'founders', 'blue', 'leather', 'nh35', '36mm'],
    inStock:    true,
    featured:   true,
    rating:     5.0,
    reviewCount: 3,
    badge: 'Founders Edition',
  },
  {
    id: 'founders-2',
    name: 'Founders 2',
    subtitle: 'White Dial - Brown Leather',
    price: 595,
    category: 'assembled',
    description:
      'The Founders 2 pairs a clean white and silver sunburst dial with a warm brown leather strap in the same sloped 36mm oyster perpetual case as its sibling. Powered by the NH35 automatic, this is a watch of quiet confidence - refined, purposeful, and unapologetically limited to five.',
    shortDescription: 'Limited to 5 pieces. Clean white dial, warm brown leather.',
    images: [
      '/images/Picture7.png',
    ],
    specs: [
      { label: 'Movement',         value: 'Seiko NH35 Automatic (24 Jewels)' },
      { label: 'Case Diameter',    value: '36 mm' },
      { label: 'Case Style',       value: 'Sloped Oyster Perpetual' },
      { label: 'Case Material',    value: '316L Stainless Steel' },
      { label: 'Dial',             value: 'White/Silver Sunburst (36 mm)' },
      { label: 'Hands',            value: 'Standard Applied' },
      { label: 'Strap',            value: 'Brown Leather (20 mm)' },
      { label: 'Power Reserve',    value: '41 hours' },
      { label: 'Edition',          value: 'Limited - 5 pieces only' },
    ],
    materials: ['316L Stainless Steel', 'Brown Calf Leather', 'Sapphire Crystal'],
    tags:       ['limited', 'founders', 'white', 'leather', 'nh35', '36mm'],
    inStock:    true,
    featured:   true,
    rating:     5.0,
    reviewCount: 2,
    badge: 'Founders Edition',
  },
  {
    id: 'skeleton',
    name: 'The Skeleton',
    subtitle: 'NH70 Skeleton - 40mm',
    price: 749,
    category: 'assembled',
    description:
      'The Skeleton strips the dial away entirely, revealing the intricate choreography of the NH70 movement beneath a sapphire crystal. Housed in the Gu Jin Lang case at 40mm, it pairs with your choice of black rubber or steel bracelet - a mechanical statement that wears as well on the wrist as it does under glass.',
    shortDescription: 'Open skeleton dial. The movement is the design.',
    images: [
      '/images/Picture5.jpg',
      '/images/Picture6.jpg',
    ],
    specs: [
      { label: 'Movement',         value: 'Seiko NH70 Skeleton Automatic (24 Jewels)' },
      { label: 'Case Diameter',    value: '40 mm' },
      { label: 'Case Style',       value: 'Gu Jin Lang' },
      { label: 'Case Material',    value: '316L Stainless Steel' },
      { label: 'Dial',             value: 'Open Skeleton (40 mm)' },
      { label: 'Strap Options',    value: 'Black Rubber or Steel Bracelet' },
      { label: 'Power Reserve',    value: '41 hours' },
      { label: 'Water Resistance', value: '100 m (10 ATM)' },
    ],
    materials: ['316L Stainless Steel', 'FKM Rubber / Steel Bracelet', 'Sapphire Crystal'],
    tags:       ['skeleton', 'nh70', '40mm', 'rubber', 'steel', 'open-heart'],
    inStock:    true,
    featured:   true,
    rating:     4.9,
    reviewCount: 18,
    badge: 'New',
  },
  {
    id: 'submariner',
    name: 'The Submariner',
    subtitle: 'NH35 - Military or Steel',
    price: 649,
    category: 'assembled',
    description:
      'Built for depth and presence. The Submariner wears the classic sub case with an off-white or jet black dial and your choice of a military NATO strap or steel bracelet - giving you two very different personalities in one watch. The NH35 movement ticks reliably beneath a solid screw-down caseback.',
    shortDescription: 'Sub case, NH35 movement, two strap options.',
    images: [
      '/images/Picture3.jpg',
      '/images/Picture4.jpg',
    ],
    specs: [
      { label: 'Movement',         value: 'Seiko NH35 Automatic (24 Jewels)' },
      { label: 'Case Style',       value: 'Submariner' },
      { label: 'Case Material',    value: '316L Stainless Steel' },
      { label: 'Dial',             value: 'Off-White or Black' },
      { label: 'Hands',            value: 'Sub Applied' },
      { label: 'Strap Options',    value: 'Military NATO or Steel Bracelet' },
      { label: 'Power Reserve',    value: '41 hours' },
      { label: 'Water Resistance', value: '200 m (20 ATM)' },
    ],
    materials: ['316L Stainless Steel', 'Nylon NATO / Steel Bracelet', 'Sapphire Crystal'],
    tags:       ['submariner', 'diver', 'nh35', 'nato', 'steel', 'sport'],
    inStock:    true,
    featured:   true,
    rating:     4.8,
    reviewCount: 31,
  },
  {
    id: 'datejust',
    name: 'The Datejust',
    subtitle: 'NH35 - Date Complication',
    price: 699,
    category: 'assembled',
    description:
      'Timeless proportions meet everyday functionality. The Datejust brings the iconic date window and clean Datejust dial together with the reliable NH35 movement in a case that dresses up or down without effort. A foundational watch - built for the long haul.',
    shortDescription: 'Classic Datejust proportions with the reliable NH35.',
    images: [
      '/images/Picture8.jpg',
    ],
    specs: [
      { label: 'Movement',         value: 'Seiko NH35 Automatic (24 Jewels)' },
      { label: 'Case Style',       value: 'Datejust' },
      { label: 'Case Material',    value: '316L Stainless Steel' },
      { label: 'Dial',             value: 'Datejust Sunburst' },
      { label: 'Hands',            value: 'NH35 Standard' },
      { label: 'Complications',    value: 'Date at 3 o\'clock' },
      { label: 'Power Reserve',    value: '41 hours' },
      { label: 'Water Resistance', value: '100 m (10 ATM)' },
    ],
    materials: ['316L Stainless Steel', 'Sapphire Crystal'],
    tags:       ['datejust', 'date', 'nh35', 'dress', 'classic'],
    inStock:    true,
    featured:   false,
    rating:     4.7,
    reviewCount: 12,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus W.',
    role: 'Founders 1 owner',
    initials: 'MW',
    quote:
      'Got number 3 of 5 on the Founders 1. The blue dial in person is something else - photos don\'t do it justice. Wearing something this limited feels extraordinary.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Sophia L.',
    role: 'Watch collector',
    initials: 'SL',
    quote:
      'The Skeleton is genuinely impressive. Watching the NH70 through the open dial never gets old. The Gu Jin Lang case wears beautifully on a smaller wrist too.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'James R.',
    role: 'Daily wearer',
    initials: 'JR',
    quote:
      'I rotate between the Submariner on the NATO and the Datejust daily. Both punch well above their price point - the finishing is immaculate and the NH35 is rock solid.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Priya K.',
    role: 'Gifted the Founders 2',
    initials: 'PK',
    quote:
      'Bought the Founders 2 as a birthday gift. The white dial with brown leather is just elegant. The limited nature of it made it feel even more special as a gift.',
    rating: 5,
  },
]

export const builderCategories: BuilderCategory[] = [
  {
    key: 'case',
    label: 'Case',
    options: [
      { id: 'case-steel',    label: 'Brushed Steel',  description: '316L Stainless - Satin finish', priceAdder: 0,   colorHex: '#8C8C8C' },
      { id: 'case-pvd',     label: 'PVD Black',       description: 'DLC-coated steel - Stealth finish', priceAdder: 80,  colorHex: '#1A1A1A' },
      { id: 'case-gold',    label: 'Gold PVD',        description: 'IP Gold over 316L steel', priceAdder: 120, colorHex: '#C9A84C' },
      { id: 'case-rose',    label: 'Rose Gold PVD',   description: 'IP Rose Gold over 316L steel', priceAdder: 120, colorHex: '#B87333' },
      { id: 'case-silver',  label: 'Mirror Polish',   description: 'Full mirror-polished 316L steel', priceAdder: 60,  colorHex: '#D0D0D0' },
    ],
  },
  {
    key: 'dial',
    label: 'Dial',
    options: [
      { id: 'dial-black',    label: 'Midnight Black',  description: 'Sunburst lacquered black', priceAdder: 0,  colorHex: '#0D0D0D' },
      { id: 'dial-white',    label: 'Polar White',     description: 'Cream lacquered white', priceAdder: 0,  colorHex: '#F5F0E8' },
      { id: 'dial-navy',     label: 'Deep Navy',       description: 'Gradient navy sunburst', priceAdder: 20, colorHex: '#1B2A4A' },
      { id: 'dial-racing',   label: 'Racing Green',    description: 'Matte forest green', priceAdder: 20, colorHex: '#2D4A3E' },
      { id: 'dial-skeleton', label: 'Open Skeleton',   description: 'Skeletonised - movement visible', priceAdder: 60, colorHex: 'transparent' },
    ],
  },
  {
    key: 'hands',
    label: 'Hands',
    options: [
      { id: 'hands-baton',     label: 'Baton',       description: 'Slim stick hands - classic', priceAdder: 0  },
      { id: 'hands-dauphine',  label: 'Dauphine',    description: 'Faceted tapered hands - dress', priceAdder: 30 },
      { id: 'hands-cathedral', label: 'Cathedral',   description: 'Ornate cathedral hands', priceAdder: 40 },
      { id: 'hands-sword',     label: 'Sword',       description: 'Bold sword-style - sport', priceAdder: 20 },
      { id: 'hands-mercedes',  label: 'Snowflake',   description: 'Broad arrow snowflake style', priceAdder: 25 },
    ],
  },
  {
    key: 'movement',
    label: 'Movement',
    options: [
      { id: 'mov-miyota',   label: 'Miyota 8215',    description: 'Reliable 21-jewel auto - entry', priceAdder: 0   },
      { id: 'mov-nh35',     label: 'Seiko NH35',     description: 'Workhorse automatic - 24 jewel', priceAdder: 40  },
      { id: 'mov-eta2824',  label: 'ETA 2824-2',     description: 'Swiss precision - 25 jewel', priceAdder: 180 },
      { id: 'mov-seagull',  label: 'Seagull ST25',   description: 'Chinese excellence - skeleton', priceAdder: 100 },
    ],
  },
  {
    key: 'strap',
    label: 'Strap',
    options: [
      { id: 'strap-black-leather',  label: 'Black Leather',    description: 'Italian calf - black stitch', priceAdder: 0,   colorHex: '#1A1A1A' },
      { id: 'strap-tan-leather',    label: 'Tan Leather',      description: 'Shell cordovan tan', priceAdder: 40,  colorHex: '#8B5E3C' },
      { id: 'strap-mesh',           label: 'Mesh Bracelet',    description: 'Milanese mesh - butterfly clasp', priceAdder: 60,  colorHex: '#8C8C8C' },
      { id: 'strap-rubber',         label: 'FKM Rubber',       description: 'Sport FKM rubber - black', priceAdder: 20,  colorHex: '#2A2A2A' },
      { id: 'strap-nato',           label: 'NATO Strap',       description: 'Woven nylon NATO - two-tone', priceAdder: 15,  colorHex: '#3A3A5C' },
    ],
  },
]

export const BASE_BUILDER_PRICE = 349

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
  // ── WATCH KITS ──────────────────────────────────────────────────────────
  {
    id: 'kit-pioneer',
    name: 'The Pioneer Kit',
    subtitle: 'Entry-Level Mechanical',
    price: 349,
    category: 'kit',
    description:
      'Begin your horological journey with The Pioneer Kit — a thoughtfully curated entry-level build experience that requires no prior watchmaking knowledge. Every component has been precision-machined to exacting tolerances and arrives in a handsome presentation box alongside a 48-page illustrated assembly guide.',
    shortDescription: 'Your first step into mechanical watchmaking.',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=85',
      'https://images.unsplash.com/photo-1614865054571-069af9ed7c25?w=900&q=85',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'Miyota 8215 (21 Jewels)' },
      { label: 'Case Diameter',    value: '38 mm' },
      { label: 'Case Thickness',   value: '11.2 mm' },
      { label: 'Case Material',    value: '316L Stainless Steel' },
      { label: 'Crystal',          value: 'Mineral Crystal AR-Coated' },
      { label: 'Water Resistance', value: '50 m (5 ATM)' },
      { label: 'Strap',            value: 'Genuine Calf Leather (20 mm)' },
      { label: 'Power Reserve',    value: '42 hours' },
      { label: 'Build Time',       value: 'Approx. 4–6 hours' },
      { label: 'Skill Level',      value: 'Beginner' },
    ],
    materials: ['316L Stainless Steel', 'Genuine Calf Leather', 'Mineral Crystal'],
    tags:       ['beginner', 'mechanical', 'steel', 'leather'],
    inStock:    true,
    featured:   true,
    rating:     4.8,
    reviewCount: 124,
    badge: 'Best Seller',
  },
  {
    id: 'kit-meridian',
    name: 'The Meridian Kit',
    subtitle: 'Intermediate Mechanical',
    price: 549,
    category: 'kit',
    description:
      'The Meridian Kit bridges craftsmanship and complication. Featuring a skeletonised dial and an open-heart display, this build demands precision but rewards you with a wearable work of mechanical art. Includes a hand-wound movement, case back press, and professional-grade tweezers.',
    shortDescription: 'Open-heart skeleton build for the serious enthusiast.',
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=900&q=85',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'Seagull ST3600 Hand-wind (17 Jewels)' },
      { label: 'Case Diameter',    value: '40 mm' },
      { label: 'Case Thickness',   value: '12.5 mm' },
      { label: 'Case Material',    value: '316L Stainless Steel — PVD Black' },
      { label: 'Crystal',          value: 'Sapphire Crystal — Double AR' },
      { label: 'Water Resistance', value: '30 m (3 ATM)' },
      { label: 'Strap',            value: 'Suede Alligator-Embossed (20 mm)' },
      { label: 'Power Reserve',    value: '38 hours' },
      { label: 'Build Time',       value: 'Approx. 8–12 hours' },
      { label: 'Skill Level',      value: 'Intermediate' },
    ],
    materials: ['PVD Black Steel', 'Suede Leather', 'Sapphire Crystal'],
    tags:       ['intermediate', 'skeleton', 'open-heart', 'sapphire'],
    inStock:    true,
    featured:   true,
    rating:     4.9,
    reviewCount: 87,
    badge: 'New',
  },
  {
    id: 'kit-chronograph',
    name: 'The Chrono Kit',
    subtitle: 'Advanced Chronograph',
    price: 849,
    category: 'kit',
    description:
      'The ultimate builder challenge. The Chrono Kit introduces you to the intricate world of column-wheel chronograph movements. With 286 components, this is a project for dedicated enthusiasts who want to master one of watchmaking\'s most complex complications.',
    shortDescription: 'Master the art of chronograph assembly.',
    images: [
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=900&q=85',
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=85',
      'https://images.unsplash.com/photo-1614865054571-069af9ed7c25?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'ETA 7750 Chronograph (25 Jewels)' },
      { label: 'Case Diameter',    value: '42 mm' },
      { label: 'Case Thickness',   value: '14.8 mm' },
      { label: 'Case Material',    value: '904L Stainless Steel' },
      { label: 'Crystal',          value: 'Sapphire Crystal — Triple AR' },
      { label: 'Water Resistance', value: '100 m (10 ATM)' },
      { label: 'Strap',            value: 'Oyster-Style Bracelet (22 mm)' },
      { label: 'Power Reserve',    value: '44 hours' },
      { label: 'Build Time',       value: 'Approx. 20–30 hours' },
      { label: 'Skill Level',      value: 'Advanced' },
    ],
    materials: ['904L Stainless Steel', 'Sapphire Crystal', 'Steel Bracelet'],
    tags:       ['advanced', 'chronograph', 'steel', 'bracelet', 'sapphire'],
    inStock:    true,
    featured:   false,
    rating:     4.7,
    reviewCount: 42,
  },
  {
    id: 'kit-heritage',
    name: 'The Heritage Kit',
    subtitle: 'Dress Watch — Vintage Style',
    price: 649,
    originalPrice: 749,
    category: 'kit',
    description:
      'Inspired by mid-century Swiss dress watches, The Heritage Kit channels the golden era of horology. Features a clean lacquered dial, dauphine hands, and a slim 9.8 mm case profile. Pairs perfectly with a double-stitched croco-grain strap included in the box.',
    shortDescription: 'A vintage-inspired dress watch build.',
    images: [
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=900&q=85',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=900&q=85',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'ETA 2824-2 Automatic (25 Jewels)' },
      { label: 'Case Diameter',    value: '36 mm' },
      { label: 'Case Thickness',   value: '9.8 mm' },
      { label: 'Case Material',    value: '18k Gold-Plated Stainless Steel' },
      { label: 'Crystal',          value: 'Sapphire Crystal — AR' },
      { label: 'Water Resistance', value: '30 m (3 ATM)' },
      { label: 'Strap',            value: 'Croco-Grain Leather (18 mm)' },
      { label: 'Power Reserve',    value: '42 hours' },
      { label: 'Build Time',       value: 'Approx. 6–9 hours' },
      { label: 'Skill Level',      value: 'Intermediate' },
    ],
    materials: ['Gold-Plated Steel', 'Sapphire Crystal', 'Croco-Grain Leather'],
    tags:       ['vintage', 'dress', 'gold', 'leather', 'slim'],
    inStock:    true,
    featured:   false,
    rating:     4.6,
    reviewCount: 58,
    badge: 'Sale',
  },

  // ── ASSEMBLED WATCHES ────────────────────────────────────────────────────
  {
    id: 'watch-sovereign',
    name: 'The Sovereign',
    subtitle: 'Automatic — Stainless Steel',
    price: 1295,
    category: 'assembled',
    description:
      'The Sovereign is our flagship automatic, assembled by hand in our studio. A clean, assured dial with applied indices and a sapphire display caseback reveal the in-house decorated movement beneath. Delivered on a refined mesh bracelet with a butterfly deployant clasp.',
    shortDescription: 'Our flagship hand-assembled automatic.',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=85',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=85',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'Miyota 9039 Automatic (24 Jewels)' },
      { label: 'Case Diameter',    value: '40 mm' },
      { label: 'Case Material',    value: '316L Stainless Steel — Brushed & Polished' },
      { label: 'Crystal',          value: 'Sapphire — Double AR' },
      { label: 'Caseback',         value: 'Exhibition Sapphire' },
      { label: 'Water Resistance', value: '100 m (10 ATM)' },
      { label: 'Bracelet',         value: 'Milanese Mesh — Butterfly Deployant' },
      { label: 'Power Reserve',    value: '42 hours' },
    ],
    materials: ['316L Stainless Steel', 'Sapphire Crystal', 'Milanese Mesh'],
    tags:       ['automatic', 'steel', 'mesh', 'sapphire', 'flagship'],
    inStock:    true,
    featured:   true,
    rating:     4.9,
    reviewCount: 203,
    badge: 'Flagship',
  },
  {
    id: 'watch-obsidian',
    name: 'The Obsidian',
    subtitle: 'Automatic — PVD Black',
    price: 1495,
    category: 'assembled',
    description:
      'Stealth, precision, presence. The Obsidian features a deep PVD black case, a sunburst black dial with subtle guilloché texture, and luminous hour markers for uncompromising legibility. A study in monochromatic luxury.',
    shortDescription: 'All-black stealth automatic for the bold.',
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=900&q=85',
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=900&q=85',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'NH35A Automatic (24 Jewels)' },
      { label: 'Case Diameter',    value: '41 mm' },
      { label: 'Case Material',    value: '316L Stainless Steel — DLC Black' },
      { label: 'Crystal',          value: 'Sapphire — Anti-Reflective' },
      { label: 'Dial',             value: 'Sunburst Black Guilloché' },
      { label: 'Water Resistance', value: '200 m (20 ATM)' },
      { label: 'Strap',            value: 'Black FKM Rubber (21 mm)' },
      { label: 'Power Reserve',    value: '41 hours' },
    ],
    materials: ['DLC Black Steel', 'Sapphire Crystal', 'FKM Rubber'],
    tags:       ['automatic', 'pvd', 'black', 'rubber', 'sport'],
    inStock:    true,
    featured:   true,
    rating:     4.8,
    reviewCount: 156,
  },
  {
    id: 'watch-ivory',
    name: 'The Ivory Edition',
    subtitle: 'Hand-Wind — Dress',
    price: 1195,
    category: 'assembled',
    description:
      'Understated elegance distilled into 36 mm. The Ivory Edition features a cream lacquered dial, slender rose-gold dauphine hands, and a case finished with alternating satin and mirror surfaces. Perfect for formal occasions and everyday refinement alike.',
    shortDescription: 'A slim dress watch with timeless ivory elegance.',
    images: [
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=900&q=85',
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=85',
      'https://images.unsplash.com/photo-1614865054571-069af9ed7c25?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'Unitas 6497 Hand-Wind (17 Jewels)' },
      { label: 'Case Diameter',    value: '36 mm' },
      { label: 'Case Material',    value: '316L Stainless Steel — Rose Gold PVD' },
      { label: 'Crystal',          value: 'Sapphire — AR Coated' },
      { label: 'Dial',             value: 'Cream Lacquered' },
      { label: 'Water Resistance', value: '30 m (3 ATM)' },
      { label: 'Strap',            value: 'Tan Shell Cordovan Leather (18 mm)' },
      { label: 'Power Reserve',    value: '46 hours' },
    ],
    materials: ['Rose Gold PVD Steel', 'Sapphire Crystal', 'Shell Cordovan Leather'],
    tags:       ['dress', 'handwind', 'rose-gold', 'leather', 'slim'],
    inStock:    true,
    featured:   true,
    rating:     4.7,
    reviewCount: 89,
  },
  {
    id: 'watch-grand-tourer',
    name: 'The Grand Tourer',
    subtitle: 'GMT Automatic',
    price: 1895,
    category: 'assembled',
    description:
      'Built for those who live across time zones. The Grand Tourer combines a 24-hour GMT hand, a bi-directional rotating bezel, and a 300-metre water resistance rating with a refined cushion-case silhouette. Serious horology for the modern traveller.',
    shortDescription: 'A precision GMT for the well-travelled collector.',
    images: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=85',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=900&q=85',
    ],
    specs: [
      { label: 'Movement',         value: 'Miyota 9075 GMT Automatic (24 Jewels)' },
      { label: 'Case Diameter',    value: '42 mm' },
      { label: 'Case Material',    value: '316L Stainless Steel — Full Polished' },
      { label: 'Bezel',            value: 'Bidirectional Ceramic Insert' },
      { label: 'Crystal',          value: 'Sapphire — Triple AR' },
      { label: 'Water Resistance', value: '300 m (30 ATM)' },
      { label: 'Bracelet',         value: 'Oyster-Style 3-Link (22 mm)' },
      { label: 'Power Reserve',    value: '42 hours' },
    ],
    materials: ['316L Polished Steel', 'Ceramic Bezel', 'Sapphire Crystal', 'Steel Bracelet'],
    tags:       ['gmt', 'automatic', 'steel', 'bracelet', 'sport', 'travel'],
    inStock:    false,
    featured:   false,
    rating:     4.9,
    reviewCount: 67,
    badge: 'Sold Out',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus W.',
    role: 'First-time builder',
    initials: 'MW',
    quote:
      'I was nervous about building my first mechanical watch, but the Pioneer Kit guide walked me through every step with such clarity. Wearing something I built myself feels extraordinary.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Sophia L.',
    role: 'Watch collector',
    initials: 'SL',
    quote:
      'The Meridian Kit is a genuine challenge — and the results are stunning. The components feel and behave like parts from watches three times the price. Exceptional quality control.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'James R.',
    role: 'Engineer & hobbyist',
    initials: 'JR',
    quote:
      'I\'ve built watches from three other kit brands. HOROLOGER is in a different league. The tolerances on the case are immaculate and The Sovereign looks like a $5,000 watch on the wrist.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Priya K.',
    role: 'Gifted a kit',
    initials: 'PK',
    quote:
      'Bought the Heritage Kit as a birthday gift for my partner. He spent a whole weekend on it and hasn\'t stopped wearing the result. Best gift I\'ve ever given.',
    rating: 5,
  },
]

export const builderCategories: BuilderCategory[] = [
  {
    key: 'case',
    label: 'Case',
    options: [
      { id: 'case-steel',    label: 'Brushed Steel',  description: '316L Stainless — Satin finish', priceAdder: 0,   colorHex: '#8C8C8C' },
      { id: 'case-pvd',     label: 'PVD Black',       description: 'DLC-coated steel — Stealth finish', priceAdder: 80,  colorHex: '#1A1A1A' },
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
      { id: 'dial-skeleton', label: 'Open Skeleton',   description: 'Skeletonised — movement visible', priceAdder: 60, colorHex: 'transparent' },
    ],
  },
  {
    key: 'hands',
    label: 'Hands',
    options: [
      { id: 'hands-baton',     label: 'Baton',       description: 'Slim stick hands — classic', priceAdder: 0  },
      { id: 'hands-dauphine',  label: 'Dauphine',    description: 'Faceted tapered hands — dress', priceAdder: 30 },
      { id: 'hands-cathedral', label: 'Cathedral',   description: 'Ornate cathedral hands', priceAdder: 40 },
      { id: 'hands-sword',     label: 'Sword',       description: 'Bold sword-style — sport', priceAdder: 20 },
      { id: 'hands-mercedes',  label: 'Snowflake',   description: 'Broad arrow snowflake style', priceAdder: 25 },
    ],
  },
  {
    key: 'movement',
    label: 'Movement',
    options: [
      { id: 'mov-miyota',   label: 'Miyota 8215',    description: 'Reliable 21-jewel auto — entry', priceAdder: 0   },
      { id: 'mov-nh35',     label: 'Seiko NH35',     description: 'Workhorse automatic — 24 jewel', priceAdder: 40  },
      { id: 'mov-eta2824',  label: 'ETA 2824-2',     description: 'Swiss precision — 25 jewel', priceAdder: 180 },
      { id: 'mov-seagull',  label: 'Seagull ST25',   description: 'Chinese excellence — skeleton', priceAdder: 100 },
    ],
  },
  {
    key: 'strap',
    label: 'Strap',
    options: [
      { id: 'strap-black-leather',  label: 'Black Leather',    description: 'Italian calf — black stitch', priceAdder: 0,   colorHex: '#1A1A1A' },
      { id: 'strap-tan-leather',    label: 'Tan Leather',      description: 'Shell cordovan tan', priceAdder: 40,  colorHex: '#8B5E3C' },
      { id: 'strap-mesh',           label: 'Mesh Bracelet',    description: 'Milanese mesh — butterfly clasp', priceAdder: 60,  colorHex: '#8C8C8C' },
      { id: 'strap-rubber',         label: 'FKM Rubber',       description: 'Sport FKM rubber — black', priceAdder: 20,  colorHex: '#2A2A2A' },
      { id: 'strap-nato',           label: 'NATO Strap',       description: 'Woven nylon NATO — two-tone', priceAdder: 15,  colorHex: '#3A3A5C' },
    ],
  },
]

export const BASE_BUILDER_PRICE = 349

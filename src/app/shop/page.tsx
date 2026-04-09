'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'
import { Suspense } from 'react'

const PRICE_RANGES = [
  { label: 'Under $400',        min: 0,    max: 400  },
  { label: '$400 – $700',       min: 400,  max: 700  },
  { label: '$700 – $1,000',     min: 700,  max: 1000 },
  { label: '$1,000 – $1,500',   min: 1000, max: 1500 },
  { label: '$1,500+',           min: 1500, max: Infinity },
]

const MATERIALS = ['316L Stainless Steel', 'Sapphire Crystal', 'Leather', 'Rubber', 'Gold PVD', 'PVD Black']
const SORT_OPTIONS = [
  { label: 'Featured',     value: 'featured'  },
  { label: 'Price: Low',   value: 'price-asc' },
  { label: 'Price: High',  value: 'price-desc'},
  { label: 'Best Rated',   value: 'rating'    },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category')

  const [category,     setCategory]     = useState<'all' | 'assembled'>(initialCategory === 'assembled' ? 'assembled' : 'all')
  const [priceRange,   setPriceRange]   = useState<number | null>(null)
  const [materials,    setMaterials]    = useState<string[]>([])
  const [sort,         setSort]         = useState('featured')
  const [filterOpen,   setFilterOpen]   = useState(false)

  const toggleMaterial = (mat: string) => {
    setMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    )
  }

  const filtered = useMemo(() => {
    let result = [...products]
    if (category !== 'all') result = result.filter(p => p.category === category)
    if (priceRange !== null) {
      const range = PRICE_RANGES[priceRange]
      result = result.filter(p => p.price >= range.min && p.price < range.max)
    }
    if (materials.length > 0) {
      result = result.filter(p =>
        materials.some(m =>
          p.materials.some(pm => pm.toLowerCase().includes(m.toLowerCase()))
        )
      )
    }
    switch (sort) {
      case 'price-asc':  return result.sort((a, b) => a.price - b.price)
      case 'price-desc': return result.sort((a, b) => b.price - a.price)
      case 'rating':     return result.sort((a, b) => b.rating - a.rating)
      default:           return result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }, [category, priceRange, materials, sort])

  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    (priceRange !== null ? 1 : 0) +
    materials.length

  const clearFilters = () => {
    setCategory('all' as const)
    setPriceRange(null)
    setMaterials([])
  }

  return (
    <div className="min-h-screen bg-brand-black pt-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 border-b border-brand-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-3">Collection</p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-ivory">The Shop</h1>
          <p className="font-sans text-brand-muted text-sm mt-3 max-w-md">
            {products.length} timepieces - NH35 and NH70 mechanical watches, hand-assembled.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">
        {/* Controls bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Category tabs */}
          <div className="flex gap-1 border border-brand-border p-1">
            {(['all', 'assembled'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 text-xs font-sans tracking-widest uppercase transition-all duration-300 ${
                  category === cat
                    ? 'bg-brand-gold text-brand-black'
                    : 'text-brand-muted hover:text-brand-ivory'
                }`}
              >
                {cat === 'all' ? 'All' : 'Assembled'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Active filters count */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-sans text-brand-gold hover:text-brand-gold-light transition-colors"
              >
                <X size={12} />
                Clear ({activeFilterCount})
              </button>
            )}

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none bg-brand-charcoal border border-brand-border text-brand-ivory text-xs font-sans pl-4 pr-8 py-2.5 outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setFilterOpen(v => !v)}
              className="flex items-center gap-2 border border-brand-border px-4 py-2.5 text-xs font-sans text-brand-muted hover:text-brand-ivory hover:border-brand-ivory transition-all duration-200 lg:hidden"
            >
              <SlidersHorizontal size={13} />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar - desktop always visible, mobile toggle */}
          <AnimatePresence>
            {(filterOpen || true) && (
              <motion.aside
                initial={false}
                className="w-56 shrink-0 space-y-8 hidden lg:block"
              >
                {/* Price range */}
                <div>
                  <h3 className="font-sans text-xs tracking-widest uppercase text-brand-ivory mb-4">Price Range</h3>
                  <ul className="space-y-2">
                    {PRICE_RANGES.map((range, i) => (
                      <li key={i}>
                        <button
                          onClick={() => setPriceRange(priceRange === i ? null : i)}
                          className={`flex items-center gap-2.5 text-sm font-sans transition-colors duration-200 ${
                            priceRange === i ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-ivory'
                          }`}
                        >
                          <span className={`w-3 h-3 border shrink-0 flex items-center justify-center transition-all ${
                            priceRange === i ? 'border-brand-gold bg-brand-gold' : 'border-brand-border'
                          }`}>
                            {priceRange === i && <span className="w-1.5 h-1.5 bg-brand-black" />}
                          </span>
                          {range.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="font-sans text-xs tracking-widest uppercase text-brand-ivory mb-4">Materials</h3>
                  <ul className="space-y-2">
                    {MATERIALS.map(mat => (
                      <li key={mat}>
                        <button
                          onClick={() => toggleMaterial(mat)}
                          className={`flex items-center gap-2.5 text-sm font-sans transition-colors duration-200 ${
                            materials.includes(mat) ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-ivory'
                          }`}
                        >
                          <span className={`w-3 h-3 border shrink-0 flex items-center justify-center transition-all ${
                            materials.includes(mat) ? 'border-brand-gold bg-brand-gold' : 'border-brand-border'
                          }`}>
                            {materials.includes(mat) && <span className="w-1.5 h-1.5 bg-brand-black" />}
                          </span>
                          {mat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-4"
              >
                <p className="font-serif text-2xl text-brand-ivory">No products found</p>
                <p className="text-sm text-brand-muted">Try adjusting your filters.</p>
                <button onClick={clearFilters} className="btn-outline text-xs mt-2">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <>
                <p className="text-xs text-brand-muted font-sans mb-6">
                  Showing {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-black pt-24 flex items-center justify-center"><p className="text-brand-muted">Loading...</p></div>}>
      <ShopContent />
    </Suspense>
  )
}

'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Star, Shield, Truck, RotateCcw, ChevronRight, ZoomIn } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { products } from '@/lib/data'
import ProductCard from '@/components/ProductCard'

type Params = Promise<{ id: string }>

export default function ProductPage({ params }: { params: Params }) {
  const { id }    = use(params)
  const product   = products.find(p => p.id === id)

  if (!product) notFound()

  const { addItem }            = useCart()
  const [activeImage, setActiveImage]  = useState(0)
  const [activeTab, setActiveTab]      = useState<'description' | 'specs' | 'materials'>('description')
  const [zoomPos, setZoomPos]          = useState({ x: 50, y: 50 })
  const [isZooming, setIsZooming]      = useState(false)
  const [added, setAdded]              = useState(false)

  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3)

  const handleAddToCart = () => {
    addItem({
      id:       product.id,
      name:     product.name,
      subtitle: product.subtitle,
      price:    product.price,
      image:    product.images[0],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  return (
    <div className="min-h-screen bg-brand-black pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6">
        <nav className="flex items-center gap-2 text-xs font-sans text-brand-muted">
          <Link href="/" className="hover:text-brand-ivory transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-brand-ivory transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-brand-ivory transition-colors capitalize">
            {product.category === 'kit' ? 'Watch Kits' : 'Assembled'}
          </Link>
          <ChevronRight size={12} />
          <span className="text-brand-light">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left - Image gallery */}
          <div className="space-y-4">
            {/* Main image with zoom */}
            <div
              className="relative aspect-square bg-brand-charcoal overflow-hidden cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isZooming ? 'scale-150' : 'scale-100'
                }`}
                style={isZooming ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                } : {}}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-brand-black/60 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={12} className="text-brand-gold" />
                <span className="text-[10px] font-sans text-brand-muted tracking-wider">Hover to zoom</span>
              </div>
              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase ${
                  product.badge === 'Sale'     ? 'bg-red-900/80 text-red-200' :
                  product.badge === 'Flagship' ? 'bg-brand-gold text-brand-black' :
                  'bg-brand-surface/90 text-brand-ivory'
                }`}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 aspect-square overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i ? 'border-brand-gold' : 'border-brand-border hover:border-brand-light'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            {/* Category + badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans tracking-widest uppercase text-brand-gold border border-brand-gold/30 px-3 py-1">
                {product.category === 'kit' ? 'Watch Kit' : 'Assembled Watch'}
              </span>
              {!product.inStock && (
                <span className="text-xs font-sans tracking-widest uppercase text-brand-muted border border-brand-border px-3 py-1">
                  Sold Out
                </span>
              )}
            </div>

            {/* Name + subtitle */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-ivory leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-brand-muted text-sm mt-2 tracking-wider uppercase">
                {product.subtitle}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-border'}
                  />
                ))}
              </div>
              <span className="text-sm font-sans text-brand-muted">
                {product.rating} · {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl text-brand-ivory">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-base text-brand-muted line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="gold-divider" />

            {/* Short description */}
            <p className="font-sans text-brand-light text-sm leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Add to cart */}
            <div className="space-y-3">
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileTap={product.inStock ? { scale: 0.98 } : {}}
                className={`w-full flex items-center justify-center gap-3 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                  product.inStock
                    ? added
                      ? 'bg-green-900/50 border border-green-700 text-green-400'
                      : 'btn-gold'
                    : 'bg-brand-charcoal border border-brand-border text-brand-muted cursor-not-allowed'
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      ✓ Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      {product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {product.category === 'kit' && (
                <Link href="/builder" className="btn-outline w-full text-center text-xs">
                  Customise in Builder
                </Link>
              )}
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { icon: Truck,      label: 'Free Shipping', sub: 'On orders $500+' },
                { icon: Shield,     label: '2-Year Warranty', sub: 'Movement guaranteed' },
                { icon: RotateCcw,  label: '30-Day Returns', sub: 'No questions asked' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center p-3 border border-brand-border">
                  <Icon size={16} strokeWidth={1.5} className="text-brand-gold mx-auto mb-2" />
                  <p className="text-[10px] font-sans font-medium text-brand-ivory uppercase tracking-wider">{label}</p>
                  <p className="text-[10px] font-sans text-brand-muted mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description / Specs / Materials */}
        <div className="mt-20 border-t border-brand-border pt-12">
          <div className="flex gap-8 border-b border-brand-border mb-10">
            {(['description', 'specs', 'materials'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs font-sans tracking-widest uppercase transition-all duration-200 relative ${
                  activeTab === tab ? 'text-brand-ivory' : 'text-brand-muted hover:text-brand-light'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-brand-gold"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                <p className="font-sans text-brand-light text-sm leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                <dl className="divide-y divide-brand-border">
                  {product.specs.map(spec => (
                    <div key={spec.label} className="flex py-4 gap-8">
                      <dt className="w-44 shrink-0 text-xs font-sans uppercase tracking-wider text-brand-muted">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-sans text-brand-ivory">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}

            {activeTab === 'materials' && (
              <motion.div
                key="mats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.materials.map(mat => (
                    <div key={mat} className="border border-brand-border p-5">
                      <div className="w-2 h-2 bg-brand-gold mb-3" />
                      <p className="font-sans text-sm text-brand-ivory">{mat}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reviews section */}
        <div className="mt-20 border-t border-brand-border pt-12">
          <h2 className="font-serif text-3xl text-brand-ivory mb-10">
            Reviews <span className="text-brand-muted text-xl font-sans font-light">({product.reviewCount})</span>
          </h2>
          {/* Sample reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              { name: 'Alex M.',    rating: 5, date: 'Jan 2025', body: 'Absolutely flawless kit. Every component fits perfectly and the guide is clear. Took me about 6 hours over a weekend. The end result is stunning.' },
              { name: 'Claire D.', rating: 5, date: 'Dec 2024', body: 'I gifted this to myself as a 40th birthday treat. Building it was meditative and the watch is indistinguishable from a $1,500 boutique piece.' },
              { name: 'Robert T.', rating: 4, date: 'Nov 2024', body: 'Quality is excellent throughout. The movement is smooth and accurate. Docking one star only because the leather strap takes time to break in - but that is to be expected with genuine leather.' },
              { name: 'Sarah K.',  rating: 5, date: 'Oct 2024', body: 'My third Horologer kit. The quality consistency is what keeps me coming back. A flawless experience from unboxing to the first tick.' },
            ].map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-brand-charcoal border border-brand-border p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={11} className={j < rev.rating ? 'text-brand-gold fill-brand-gold' : 'text-brand-border'} />
                    ))}
                  </div>
                  <span className="text-xs text-brand-muted font-sans">{rev.date}</span>
                </div>
                <p className="font-sans text-sm text-brand-light leading-relaxed italic">&ldquo;{rev.body}&rdquo;</p>
                <p className="font-sans text-xs font-medium text-brand-ivory">{rev.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-brand-border pt-12">
            <h2 className="font-serif text-3xl text-brand-ivory mb-10">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

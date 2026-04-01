'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/lib/data'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id:       product.id,
      name:     product.name,
      subtitle: product.subtitle,
      price:    product.price,
      image:    product.images[0],
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-square bg-brand-charcoal overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          {product.badge && (
            <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase ${
              product.badge === 'Sale'       ? 'bg-red-900/80 text-red-200' :
              product.badge === 'Sold Out'   ? 'bg-brand-charcoal/80 text-brand-muted' :
              product.badge === 'Flagship'   ? 'bg-brand-gold text-brand-black' :
              'bg-brand-surface/90 text-brand-ivory'
            }`}>
              {product.badge}
            </div>
          )}

          {/* Category chip */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-brand-black/70 backdrop-blur-sm text-[10px] font-sans tracking-widest uppercase text-brand-gold border border-brand-gold/30">
            {product.category === 'kit' ? 'Watch Kit' : 'Assembled'}
          </div>

          {/* Quick add - slides up on hover */}
          {product.inStock && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute bottom-4 left-4 right-4 btn-gold text-xs py-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={14} />
              Quick Add
            </motion.button>
          )}
        </div>

        {/* Info */}
        <div className="pt-5 pb-2 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg text-brand-ivory leading-tight group-hover:text-brand-gold transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-xs font-sans text-brand-muted mt-0.5 tracking-wider uppercase">
                {product.subtitle}
              </p>
            </div>
            <div className="text-right shrink-0 pt-0.5">
              {product.originalPrice && (
                <p className="text-xs text-brand-muted line-through font-sans">
                  ${product.originalPrice.toLocaleString()}
                </p>
              )}
              <p className={`font-sans font-medium text-base ${product.originalPrice ? 'text-brand-gold' : 'text-brand-ivory'}`}>
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={i < Math.round(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-brand-border'}
                />
              ))}
            </div>
            <span className="text-xs text-brand-muted font-sans">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

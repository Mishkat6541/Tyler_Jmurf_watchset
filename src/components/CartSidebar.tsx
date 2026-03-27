'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-brand-charcoal flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-brand-gold" />
                <span className="font-serif text-lg text-brand-ivory">Your Cart</span>
                {items.length > 0 && (
                  <span className="text-xs text-brand-muted font-sans">
                    ({items.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-brand-muted hover:text-brand-ivory transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 text-center py-20"
                  >
                    <div className="w-16 h-16 border border-brand-border flex items-center justify-center">
                      <ShoppingBag size={24} strokeWidth={1} className="text-brand-muted" />
                    </div>
                    <p className="font-serif text-xl text-brand-ivory">Your cart is empty</p>
                    <p className="text-sm text-brand-muted font-sans">
                      Explore our collection of watch kits and assembled timepieces.
                    </p>
                    <button onClick={closeCart} className="btn-outline mt-2 text-xs">
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                      className="flex gap-4 p-3 border border-brand-border"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 shrink-0 bg-brand-surface overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-sans text-sm font-medium text-brand-ivory truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-brand-muted font-sans mt-0.5">
                              {item.subtitle}
                            </p>
                            {item.isCustomBuild && (
                              <span className="text-[10px] text-brand-gold font-sans tracking-wider uppercase">
                                Custom Build
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-brand-muted hover:text-brand-ivory transition-colors duration-200 ml-2 shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center border border-brand-border">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-ivory transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-sans text-brand-ivory">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-ivory transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="text-sm font-sans font-medium text-brand-ivory">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-brand-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm text-brand-muted uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="font-serif text-xl text-brand-ivory">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-brand-muted font-sans">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link href="/checkout" onClick={closeCart} className="btn-gold w-full text-center block">
                  Proceed to Checkout
                </Link>
                <button onClick={closeCart} className="w-full text-center text-xs text-brand-muted hover:text-brand-ivory transition-colors font-sans tracking-widest uppercase">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

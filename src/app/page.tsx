'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Star, Wrench, Package, Watch } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products, testimonials } from '@/lib/data'

const featuredKits      = products.filter(p => p.category === 'kit'      && p.featured)
const featuredWatches   = products.filter(p => p.category === 'assembled' && p.featured)

// ── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── Components ──────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-3">
      {children}
    </p>
  )
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`font-serif text-4xl md:text-5xl leading-tight ${light ? 'text-brand-black' : 'text-brand-ivory'}`}>
      {children}
    </h2>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y      = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1800&q=90"
          alt="Luxury mechanical watch"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-6"
          >
            Premium Watchmaking Kits &amp; Assembled Timepieces
          </motion.p>

          {/* Headline — word by word */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-5xl md:text-7xl text-brand-ivory leading-[1.08]"
            >
              Craft Your Own
              <span className="block italic text-brand-gold">Timepiece.</span>
            </motion.h1>
          </div>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-sans text-base md:text-lg text-brand-light leading-relaxed max-w-md mb-10"
          >
            Precision-engineered watch kits and hand-assembled mechanical watches for the discerning enthusiast. No experience required — just patience, passion, and purpose.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
            <Link href="/shop?category=kit" className="btn-gold group">
              Shop Watch Kits
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/shop?category=assembled" className="btn-outline">
              Assembled Collection
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex gap-10 mt-14 pt-10 border-t border-brand-border/50"
          >
            {[
              { value: '12,000+', label: 'Watches Built' },
              { value: '98%',     label: 'Satisfaction Rate' },
              { value: '4.9★',    label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-serif text-2xl text-brand-ivory">{stat.value}</p>
                <p className="text-xs font-sans text-brand-muted mt-0.5 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-sans tracking-widest uppercase text-brand-muted">Scroll</span>
        <ChevronDown size={16} className="text-brand-muted animate-scrollBounce" />
      </motion.div>
    </section>
  )
}

// ── Featured Kits ────────────────────────────────────────────────────────────
function FeaturedKits() {
  return (
    <section className="section-padding bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>Build Your Own</SectionLabel>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <SectionHeading>Watch Kits</SectionHeading>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Link
              href="/shop?category=kit"
              className="group inline-flex items-center gap-2 font-sans text-xs text-brand-gold tracking-widest uppercase hover:gap-3 transition-all duration-300"
            >
              View All Kits
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredKits.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      icon: Package,
      title: 'Choose Your Kit',
      body: 'Select from beginner to advanced builds. Every kit arrives in a premium presentation box with all components pre-inspected and sorted for assembly.',
      num: '01',
    },
    {
      icon: Wrench,
      title: 'Assemble with Guidance',
      body: 'Follow our illustrated step-by-step guide or video series. Our support team is available for every question along the way.',
      num: '02',
    },
    {
      icon: Watch,
      title: 'Wear Your Creation',
      body: 'Every watch you build carries your fingerprints. Set the time, wind the crown, and feel the movement you brought to life.',
      num: '03',
    },
  ]

  return (
    <section className="section-padding bg-brand-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>The Process</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <SectionHeading light>The Art of Assembly</SectionHeading>
          </motion.div>
          <motion.p variants={fadeUp} custom={2} className="font-sans text-brand-charcoal/70 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            From box to wrist in three deliberate steps. No shortcuts — just the pleasure of precision.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-brand-ivory-dark">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-brand-ivory p-10 md:p-12 group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 border border-brand-charcoal/20 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                  <step.icon size={20} strokeWidth={1.5} className="text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <span className="font-serif text-5xl text-brand-charcoal/10 leading-none select-none">
                  {step.num}
                </span>
              </div>
              <h3 className="font-serif text-xl text-brand-black mb-3">{step.title}</h3>
              <p className="font-sans text-sm text-brand-charcoal/60 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Featured Watches ─────────────────────────────────────────────────────────
function FeaturedWatches() {
  return (
    <section className="section-padding bg-brand-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>Ready to Wear</SectionLabel>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <SectionHeading>Assembled Timepieces</SectionHeading>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Link
              href="/shop?category=assembled"
              className="group inline-flex items-center gap-2 font-sans text-xs text-brand-gold tracking-widest uppercase hover:gap-3 transition-all duration-300"
            >
              Full Collection
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredWatches.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Craftsmanship Banner ──────────────────────────────────────────────────────
function CraftsmanshipBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  return (
    <section ref={ref} className="relative h-[600px] md:h-[700px] overflow-hidden flex items-center">
      {/* Parallax image */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1614865054571-069af9ed7c25?w=1800&q=85"
          alt="Watch movement craftsmanship"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-black/70" />
      </motion.div>

      {/* Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-lg"
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-4">
            Craftsmanship
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl text-brand-ivory leading-tight mb-6">
            Every Jewel.
            <span className="italic block">Every Pivot.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="font-sans text-brand-light text-sm leading-relaxed mb-8">
            We source movements and components from the same Swiss and Japanese suppliers that supply independent watchmakers worldwide. Every kit component is tested for fit and finish before packing. Because you deserve nothing less.
          </motion.p>
          <motion.div variants={fadeUp} custom={3}>
            <Link href="/about" className="btn-outline text-xs">
              Our Philosophy
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating material callouts */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        {['Sapphire Crystal', '316L Steel', 'Swiss Movement', 'Genuine Leather'].map((m, i) => (
          <motion.div
            key={m}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.4 }}
            className="px-4 py-2 border border-brand-gold/30 bg-brand-black/40 backdrop-blur-sm"
          >
            <span className="text-xs font-sans text-brand-gold tracking-widest uppercase">{m}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="section-padding bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Community</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <SectionHeading>From Our Craftsmen</SectionHeading>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-brand-charcoal border border-brand-border p-8 flex flex-col gap-5 hover:border-brand-gold/40 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-brand-gold fill-brand-gold" />
                ))}
              </div>

              <blockquote className="font-serif text-sm italic text-brand-ivory leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2 border-t border-brand-border">
                <div className="w-9 h-9 bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center shrink-0">
                  <span className="text-xs font-sans font-semibold text-brand-gold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-sans font-medium text-brand-ivory">{t.name}</p>
                  <p className="text-xs font-sans text-brand-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="section-padding bg-brand-charcoal border-t border-brand-border">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-3">
            Stay Close
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl text-brand-ivory mb-4">
            Join the Craftsmen
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="font-sans text-brand-muted text-sm mb-10 leading-relaxed">
            New kits, assembly tips, and horological stories — delivered to your inbox. No noise, only craft.
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <p className="font-serif text-xl text-brand-gold italic">You&apos;re on the list.</p>
              <p className="font-sans text-sm text-brand-muted mt-2">Welcome to the community.</p>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeUp}
              custom={3}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="input-luxury flex-1 border-r-0 sm:border-r-0"
              />
              <button type="submit" className="btn-gold shrink-0 border border-brand-gold">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </motion.form>
          )}

          <motion.p variants={fadeUp} custom={4} className="text-xs text-brand-muted mt-4 font-sans">
            No spam. Unsubscribe at any time. We respect your privacy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedKits />
      <HowItWorks />
      <FeaturedWatches />
      <CraftsmanshipBanner />
      <Testimonials />
      <Newsletter />
    </>
  )
}

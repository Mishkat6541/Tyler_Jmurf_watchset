'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Target, Gem, Wrench, Heart } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const values = [
  {
    icon: Target,
    title: 'Precision First',
    body: 'Every component we source is inspected against tolerances tighter than most watchmakers demand. If it is not perfect, it does not ship.',
  },
  {
    icon: Gem,
    title: 'Premium Materials',
    body: 'From 316L and 904L stainless steels to double-domed sapphire crystals and shell cordovan leather — we refuse to compromise on what you touch.',
  },
  {
    icon: Wrench,
    title: 'Build, Don\'t Just Buy',
    body: 'Wearing a watch you assembled yourself creates a connection that no boutique purchase ever could. We exist to enable that experience.',
  },
  {
    icon: Heart,
    title: 'Community of Craftsmen',
    body: 'Over 12,000 watches have been built by our customers. We learn from every builder, and every build informs the next kit we develop.',
  },
]

const timeline = [
  { year: '2019', title: 'The First Kit', body: 'Founded with a single watch kit, two hundred customers, and the belief that the joy of mechanical watchmaking should be accessible to everyone.' },
  { year: '2020', title: 'Community Grows', body: 'Word spread among enthusiast forums. By end of year, 1,200 watches had been built and our community forum launched.' },
  { year: '2021', title: 'Assembled Collection', body: 'By popular demand, we launched our first range of studio-assembled watches — built to the same standards as our kits, finished by hand.' },
  { year: '2022', title: 'The Builder Tool', body: 'Our online watch configurator launched, letting customers design their own timepiece from case to strap before purchase.' },
  { year: '2023', title: 'International Reach', body: 'Expanded shipping to 48 countries. Builders on six continents now wear watches they built themselves with Horologer components.' },
  { year: '2024', title: 'The Chrono Kit', body: 'Launched our most ambitious kit to date — a full column-wheel chronograph build for the most dedicated enthusiasts.' },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-brand-black">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1800&q=90"
            alt="Watch movement macro"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-black/75" />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-xl"
          >
            <motion.p variants={fadeUp} className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-5">
              Our Story
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-serif text-5xl md:text-6xl text-brand-ivory leading-tight mb-6">
              Time is the Only
              <span className="italic block text-brand-gold"> True Luxury.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="font-sans text-brand-light text-base leading-relaxed">
              We are a team of engineers, watchmakers, and obsessive hobbyists who believe that building something with your hands — something that measures the very passage of life — is one of the finest things a person can do.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-brand-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.p variants={fadeUp} className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-4">
                Our Mission
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl text-brand-ivory leading-tight mb-8">
                Making the Ancient
                <span className="italic"> Craft</span> of Watchmaking Accessible.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="font-sans text-brand-light text-sm leading-relaxed mb-6">
                The Swiss watch industry spent a century making horology feel like an exclusive, untouchable art. We believe the opposite: that the magic of a mechanical watch is best understood when you assemble it yourself. When you feel the mainspring tension, seat the jewels, and hear the movement tick for the first time — that watch becomes something no shop could ever sell you.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="font-sans text-brand-light text-sm leading-relaxed mb-10">
                We are not a traditional watch brand. We are a bridge between the watchmaker&apos;s bench and your wrist — providing the components, guidance, and community to make that journey extraordinary.
              </motion.p>
              <motion.div variants={fadeUp} custom={4}>
                <Link href="/shop?category=kit" className="btn-gold text-xs">
                  Explore Our Kits
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1614865054571-069af9ed7c25?w=900&q=85"
                alt="Watchmaking detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gold accent border */}
              <div className="absolute inset-0 border border-brand-gold/20" />
              {/* Stat overlay */}
              <div className="absolute bottom-8 left-8 bg-brand-black/80 backdrop-blur-sm p-6 border-l-2 border-brand-gold">
                <p className="font-serif text-4xl text-brand-ivory">12,000+</p>
                <p className="font-sans text-xs text-brand-muted mt-1 tracking-wider uppercase">Watches Built</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-brand-black" id="process">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-3">
              What We Stand For
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl text-brand-ivory">
              Our Principles
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="bg-brand-black p-10 md:p-12 group hover:bg-brand-charcoal transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-brand-border group-hover:border-brand-gold flex items-center justify-center mb-6 transition-colors duration-300">
                  <v.icon size={20} strokeWidth={1.5} className="text-brand-muted group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-xl text-brand-ivory mb-3">{v.title}</h3>
                <p className="font-sans text-sm text-brand-muted leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-brand-charcoal">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-3">
              History
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl text-brand-ivory">
              Our Journey
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-brand-border" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="flex gap-10 items-start"
                >
                  {/* Year */}
                  <div className="relative shrink-0 w-[60px] text-right">
                    <span className="font-sans text-xs text-brand-gold font-medium tracking-wider">{item.year}</span>
                    {/* Dot */}
                    <div className="absolute -right-[21px] top-0.5 w-3 h-3 border-2 border-brand-gold bg-brand-charcoal" />
                  </div>
                  {/* Content */}
                  <div className="pb-10 border-b border-brand-border last:border-0 flex-1">
                    <h3 className="font-serif text-lg text-brand-ivory mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-brand-muted leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width image ──────────────────────────────────────────────── */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1800&q=85"
          alt="Watch collection"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-4">
              Start Building
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-4xl md:text-5xl text-brand-ivory mb-8 max-w-xl mx-auto">
              Your Timepiece Awaits.
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
              <Link href="/shop?category=kit" className="btn-gold">
                Shop Kits
                <ArrowRight size={14} />
              </Link>
              <Link href="/builder" className="btn-outline">
                Open Builder
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

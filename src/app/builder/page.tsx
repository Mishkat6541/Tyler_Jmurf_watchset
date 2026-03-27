'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, ChevronRight, Info } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { builderCategories, BASE_BUILDER_PRICE } from '@/lib/data'

// ── Watch SVG Preview ─────────────────────────────────────────────────────────
interface WatchConfig {
  case:     string
  dial:     string
  hands:    string
  movement: string
  strap:    string
}

function getOptionById(key: string, id: string) {
  const cat = builderCategories.find(c => c.key === key)
  return cat?.options.find(o => o.id === id)
}

function WatchPreview({ config }: { config: WatchConfig }) {
  const caseOpt  = getOptionById('case',  config.case)
  const dialOpt  = getOptionById('dial',  config.dial)
  const strapOpt = getOptionById('strap', config.strap)

  const caseColor  = caseOpt?.colorHex  || '#8C8C8C'
  const dialColor  = dialOpt?.colorHex  || '#0D0D0D'
  const strapColor = strapOpt?.colorHex || '#1A1A1A'

  // Hands shape by selection
  const handsConfig = {
    'hands-baton':     { hourW: 4, hourL: 50, minW: 3, minL: 65, tip: 'round' },
    'hands-dauphine':  { hourW: 6, hourL: 52, minW: 4, minL: 67, tip: 'pointed' },
    'hands-cathedral': { hourW: 7, hourL: 50, minW: 5, minL: 65, tip: 'wide' },
    'hands-sword':     { hourW: 5, hourL: 54, minW: 4, minL: 68, tip: 'sword' },
    'hands-mercedes':  { hourW: 8, hourL: 48, minW: 5, minL: 65, tip: 'mercedes' },
  }
  const hConf = handsConfig[config.hands as keyof typeof handsConfig] || handsConfig['hands-baton']

  const isSkeletonDial = config.dial === 'dial-skeleton'
  const isMeshStrap    = config.strap === 'strap-mesh'
  const isNatoStrap    = config.strap === 'strap-nato'

  return (
    <div className="flex flex-col items-center gap-0">
      <svg
        viewBox="0 0 200 320"
        width="220"
        height="352"
        className="drop-shadow-2xl"
      >
        {/* ── Strap top ─────────────────────────────────────── */}
        <rect
          x="82" y="8" width="36" height="65" rx={isNatoStrap ? 3 : 5}
          fill={strapColor}
          stroke={isNatoStrap ? '#6B6BAA' : strapColor}
          strokeWidth={isNatoStrap ? 2 : 0}
        />
        {isMeshStrap && (
          <>
            {[16, 24, 32, 40, 48, 56, 64].map(y => (
              <line key={y} x1="82" y1={y} x2="118" y2={y} stroke="#A0A0A0" strokeWidth="0.5" opacity="0.5" />
            ))}
            {[86, 90, 94, 98, 102, 106, 110, 114].map(x => (
              <line key={x} x1={x} y1="8" x2={x} y2="73" stroke="#A0A0A0" strokeWidth="0.5" opacity="0.5" />
            ))}
          </>
        )}
        {isNatoStrap && (
          <rect x="82" y="8" width="36" height="65" rx="3" fill="none" stroke="#8888CC" strokeWidth="3" strokeDasharray="4 3" />
        )}

        {/* ── Case ──────────────────────────────────────────── */}
        {/* Case shadow */}
        <ellipse cx="100" cy="162" rx="63" ry="63" fill="rgba(0,0,0,0.4)" />
        {/* Case body */}
        <circle cx="100" cy="160" r="62" fill={caseColor} />
        <circle cx="100" cy="160" r="58" fill={caseColor === '#D0D0D0' ? '#B8B8B8' : 'rgba(0,0,0,0.15)'} />
        {/* Bezel */}
        <circle cx="100" cy="160" r="56" fill="none" stroke={caseColor} strokeWidth="2" opacity="0.6" />
        {/* Crystal highlight */}
        <ellipse cx="88" cy="145" rx="18" ry="10" fill="white" opacity="0.06" transform="rotate(-30 88 145)" />

        {/* Crown */}
        <rect x="158" y="153" width="10" height="14" rx="3" fill={caseColor} />

        {/* ── Dial ─────────────────────────────────────────── */}
        <circle cx="100" cy="160" r="50" fill={isSkeletonDial ? 'transparent' : dialColor} />
        {isSkeletonDial && (
          <circle cx="100" cy="160" r="50" fill="none" stroke={caseColor} strokeWidth="1" opacity="0.5" />
        )}

        {/* Dial texture — subtle sunburst lines for light dials */}
        {!isSkeletonDial && dialColor !== '#0D0D0D' && (
          <circle cx="100" cy="160" r="50" fill="url(#sunburst)" opacity="0.12" />
        )}

        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const isMajor = i % 3 === 0
          const r1 = 44, r2 = isMajor ? 36 : 40
          const x1 = 100 + r1 * Math.cos(angle)
          const y1 = 160 + r1 * Math.sin(angle)
          const x2 = 100 + r2 * Math.cos(angle)
          const y2 = 160 + r2 * Math.sin(angle)
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={dialColor === '#F5F0E8' || dialColor === '#FFFFFF' ? '#1A1A1A' : '#E0D5B0'}
              strokeWidth={isMajor ? 2.5 : 1.2}
              strokeLinecap="round"
            />
          )
        })}

        {/* Applied 12 o'clock index */}
        <rect x="97.5" y="113" width="5" height="14" rx="1" fill={dialColor === '#F5F0E8' ? '#1A1A1A' : '#C9A84C'} />

        {/* ── Hands ─────────────────────────────────────────── */}
        {/* Hour hand — pointing to ~10 */}
        <g transform="rotate(-60 100 160)">
          <rect
            x={100 - hConf.hourW / 2}
            y={160 - hConf.hourL}
            width={hConf.hourW}
            height={hConf.hourL}
            rx={hConf.tip === 'round' ? 2 : hConf.tip === 'pointed' ? 0 : 1}
            fill={dialColor === '#F5F0E8' ? '#1A1A1A' : '#F5F0E8'}
          />
        </g>

        {/* Minute hand — pointing to ~2 */}
        <g transform="rotate(60 100 160)">
          <rect
            x={100 - hConf.minW / 2}
            y={160 - hConf.minL}
            width={hConf.minW}
            height={hConf.minL}
            rx={hConf.tip === 'round' ? 1.5 : 0}
            fill={dialColor === '#F5F0E8' ? '#1A1A1A' : '#F5F0E8'}
          />
        </g>

        {/* Second hand */}
        <g transform="rotate(120 100 160)">
          <line x1="100" y1="170" x2="100" y2={160 - 48} stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Center cap */}
        <circle cx="100" cy="160" r="4" fill="#C9A84C" />
        <circle cx="100" cy="160" r="2" fill={dialColor === '#F5F0E8' ? '#1A1A1A' : '#F5F0E8'} />

        {/* ── Strap bottom ──────────────────────────────────── */}
        <rect
          x="82" y="217" width="36" height="65" rx={isNatoStrap ? 3 : 5}
          fill={strapColor}
          stroke={isNatoStrap ? '#6B6BAA' : strapColor}
          strokeWidth={isNatoStrap ? 2 : 0}
        />
        {isMeshStrap && (
          <>
            {[224, 232, 240, 248, 256, 264, 272].map(y => (
              <line key={y} x1="82" y1={y} x2="118" y2={y} stroke="#A0A0A0" strokeWidth="0.5" opacity="0.5" />
            ))}
          </>
        )}

        {/* Buckle */}
        <rect x="90" y="268" width="20" height="8" rx="2" fill={caseColor} opacity="0.7" />

        {/* ── Defs ──────────────────────────────────────────── */}
        <defs>
          <radialGradient id="sunburst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

// ── Builder Page ──────────────────────────────────────────────────────────────
const defaultConfig: WatchConfig = {
  case:     'case-steel',
  dial:     'dial-black',
  hands:    'hands-baton',
  movement: 'mov-miyota',
  strap:    'strap-black-leather',
}

export default function BuilderPage() {
  const { addItem } = useCart()
  const [config, setConfig]         = useState<WatchConfig>(defaultConfig)
  const [activeStep, setActiveStep] = useState(0)
  const [added, setAdded]           = useState(false)

  const totalPrice = builderCategories.reduce((sum, cat) => {
    const selected = cat.options.find(o => o.id === config[cat.key as keyof WatchConfig])
    return sum + (selected?.priceAdder ?? 0)
  }, BASE_BUILDER_PRICE)

  const setOption = useCallback((key: string, id: string) => {
    setConfig(prev => ({ ...prev, [key]: id }))
  }, [])

  const handleAddToCart = () => {
    const caseOpt  = getOptionById('case',  config.case)
    const dialOpt  = getOptionById('dial',  config.dial)
    const strapOpt = getOptionById('strap', config.strap)
    addItem({
      id:             `custom-${Date.now()}`,
      name:           'Custom Builder Watch',
      subtitle:       `${caseOpt?.label} Case · ${dialOpt?.label} Dial · ${strapOpt?.label}`,
      price:          totalPrice,
      image:          'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80',
      isCustomBuild:  true,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const currentCategory = builderCategories[activeStep]

  return (
    <div className="min-h-screen bg-brand-black pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 border-b border-brand-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-sans text-xs tracking-widest3 uppercase text-brand-gold mb-3">Bespoke Timepiece</p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-ivory">Build Your Watch</h1>
          <p className="font-sans text-brand-muted text-sm mt-3 max-w-md">
            Choose each component and see your creation come to life in real time.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

          {/* Left: configurator */}
          <div className="space-y-10">
            {/* Step tabs */}
            <div className="flex gap-0 overflow-x-auto">
              {builderCategories.map((cat, i) => {
                const isComplete = i < activeStep
                const isCurrent  = i === activeStep
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveStep(i)}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-sans tracking-wider uppercase whitespace-nowrap border-b-2 transition-all duration-200 ${
                      isCurrent  ? 'border-brand-gold text-brand-ivory' :
                      isComplete ? 'border-brand-gold/40 text-brand-gold' :
                                   'border-brand-border text-brand-muted hover:text-brand-light'
                    }`}
                  >
                    {isComplete && <Check size={10} className="text-brand-gold" />}
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Options for current step */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl text-brand-ivory">{currentCategory.label}</h2>
                  <p className="text-sm text-brand-muted font-sans mt-1">
                    Select your preferred {currentCategory.label.toLowerCase()} option below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCategory.options.map(opt => {
                    const isSelected = config[currentCategory.key as keyof WatchConfig] === opt.id
                    return (
                      <motion.button
                        key={opt.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setOption(currentCategory.key, opt.id)}
                        className={`relative text-left p-5 border transition-all duration-200 ${
                          isSelected
                            ? 'border-brand-gold bg-brand-gold/10'
                            : 'border-brand-border hover:border-brand-light bg-brand-charcoal'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Color swatch if available */}
                            {opt.colorHex && opt.colorHex !== 'transparent' && (
                              <div
                                className="w-8 h-8 border border-brand-border shrink-0"
                                style={{ backgroundColor: opt.colorHex }}
                              />
                            )}
                            {opt.colorHex === 'transparent' && (
                              <div className="w-8 h-8 border border-brand-border shrink-0 flex items-center justify-center">
                                <div className="w-4 h-4 border border-dashed border-brand-muted" />
                              </div>
                            )}
                            <div>
                              <p className={`font-sans text-sm font-medium ${isSelected ? 'text-brand-gold' : 'text-brand-ivory'}`}>
                                {opt.label}
                              </p>
                              <p className="text-xs font-sans text-brand-muted mt-0.5">{opt.description}</p>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className={`text-sm font-sans ${isSelected ? 'text-brand-gold' : 'text-brand-muted'}`}>
                              {opt.priceAdder === 0 ? 'Included' : `+$${opt.priceAdder}`}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-brand-gold flex items-center justify-center">
                            <Check size={11} className="text-brand-black" />
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-border">
              <button
                onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                disabled={activeStep === 0}
                className="text-xs font-sans tracking-widest uppercase text-brand-muted hover:text-brand-ivory transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              {activeStep < builderCategories.length - 1 ? (
                <button
                  onClick={() => setActiveStep(s => s + 1)}
                  className="btn-gold text-xs py-3 px-6"
                >
                  Next: {builderCategories[activeStep + 1]?.label}
                  <ChevronRight size={13} />
                </button>
              ) : (
                <button onClick={handleAddToCart} className="btn-gold text-xs py-3 px-6">
                  <ShoppingBag size={14} />
                  {added ? '✓ Added!' : 'Add to Cart'}
                </button>
              )}
            </div>
          </div>

          {/* Right: watch preview + summary */}
          <div className="lg:sticky lg:top-28 space-y-8">
            {/* Watch preview */}
            <div className="bg-brand-charcoal border border-brand-border p-8 flex flex-col items-center">
              <p className="font-sans text-xs tracking-widest uppercase text-brand-muted mb-6">Live Preview</p>
              <motion.div
                key={JSON.stringify(config)}
                initial={{ opacity: 0.7, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <WatchPreview config={config} />
              </motion.div>
            </div>

            {/* Configuration summary */}
            <div className="bg-brand-charcoal border border-brand-border p-6 space-y-4">
              <h3 className="font-serif text-lg text-brand-ivory">Your Configuration</h3>
              <div className="gold-divider" />
              <dl className="space-y-3">
                {builderCategories.map(cat => {
                  const selected = cat.options.find(o => o.id === config[cat.key as keyof WatchConfig])
                  return (
                    <div key={cat.key} className="flex justify-between items-start gap-4">
                      <dt className="text-xs font-sans uppercase tracking-wider text-brand-muted">{cat.label}</dt>
                      <dd className="text-xs font-sans text-brand-ivory text-right">
                        {selected?.label}
                        {selected && selected.priceAdder > 0 && (
                          <span className="text-brand-gold ml-1">+${selected.priceAdder}</span>
                        )}
                      </dd>
                    </div>
                  )
                })}
              </dl>
              <div className="gold-divider" />
              <div className="flex justify-between items-center">
                <span className="font-sans text-xs uppercase tracking-widest text-brand-muted">Total</span>
                <span className="font-serif text-2xl text-brand-ivory">${totalPrice.toLocaleString()}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-gold text-xs py-4 mt-2"
              >
                <ShoppingBag size={15} />
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>

              <p className="flex items-start gap-2 text-[11px] font-sans text-brand-muted">
                <Info size={12} className="shrink-0 mt-0.5 text-brand-gold" />
                Custom builds ship within 3–5 business days. All components are verified before dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

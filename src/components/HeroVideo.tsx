'use client'

/**
 * HeroVideo - scroll-scrubbed frame sequence on canvas
 *
 * Instead of a compressed video (which requires slow codec seeks), this
 * component loads all extracted frames as Image objects, then draws the
 * correct one on a <canvas> every animation frame. Canvas drawImage() is
 * near-instantaneous - giving perfectly smooth forward AND backward scrubbing.
 *
 * Setup (one-time):
 *   bash scripts/extract-frames.sh
 *   node scripts/count-frames.mjs
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, type MotionValue } from 'framer-motion'

interface Props {
  scrollYProgress: MotionValue<number>
}

// "Cover" crop - same as CSS object-fit: cover but for canvas drawImage
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (!iw || !ih) return

  const imgRatio = iw / ih
  const canRatio = cw / ch

  let sx: number, sy: number, sw: number, sh: number
  if (imgRatio > canRatio) {
    // image is wider than canvas → crop left/right
    sh = ih
    sw = sh * canRatio
    sx = (iw - sw) / 2
    sy = 0
  } else {
    // image is taller than canvas → crop top/bottom
    sw = iw
    sh = sw / canRatio
    sx = 0
    sy = (ih - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
}

export default function HeroVideo({ scrollYProgress }: Props) {
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const imagesRef       = useRef<HTMLImageElement[]>([])
  const targetFrameRef  = useRef(0)
  const loadedRef       = useRef(0)
  const hasSetReadyRef  = useRef(false)

  const [frameCount,   setFrameCount]   = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [visible,      setVisible]      = useState(false)    // canvas ready to show
  const [noFrames,     setNoFrames]     = useState(false)    // fallback flag

  // ── 1. Fetch manifest ────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/frames/manifest.json')
      .then(r => {
        if (!r.ok) throw new Error('manifest not found')
        return r.json()
      })
      .then((data: { frameCount: number }) => {
        setFrameCount(data.frameCount)
      })
      .catch(() => {
        setNoFrames(true)   // frames not extracted yet → show fallback
      })
  }, [])

  // ── 2. Preload all frames ────────────────────────────────────────────────
  useEffect(() => {
    if (!frameCount) return

    const images = Array.from({ length: frameCount }, (_, i) => {
      const img = new window.Image()
      img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`
      img.onload = () => {
        loadedRef.current++
        setLoadProgress(loadedRef.current / frameCount)
      }
      return img
    })

    imagesRef.current = images

    return () => {
      // Allow GC on unmount
      imagesRef.current = []
    }
  }, [frameCount])

  // ── 3. Subscribe to scroll → update target frame ref ────────────────────
  useEffect(() => {
    if (!frameCount) return

    return scrollYProgress.on('change', progress => {
      const clamped = Math.min(Math.max(progress, 0), 1)
      targetFrameRef.current = Math.round(clamped * (frameCount - 1))
    })
  }, [scrollYProgress, frameCount])

  // ── 4. RAF draw loop ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!frameCount) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // High-quality downscaling
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    let rafId: number
    let lastDrawnFrame = -1

    const resize = () => {
      // Account for device pixel ratio - this is what makes it sharp on
      // retina / high-DPI screens. Without this, canvas pixels are blurry.
      const dpr  = window.devicePixelRatio || 1
      const cssW = window.innerWidth
      const cssH = window.innerHeight

      // Physical pixel dimensions
      canvas.width  = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)

      // CSS dimensions stay at logical pixels
      canvas.style.width  = cssW + 'px'
      canvas.style.height = cssH + 'px'

      // Re-apply after resize (canvas reset clears context state)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      lastDrawnFrame = -1 // force redraw
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      const idx = targetFrameRef.current
      const img = imagesRef.current[idx]

      if (img?.complete && img.naturalWidth > 0 && idx !== lastDrawnFrame) {
        // Draw at physical pixel dimensions (canvas.width/height are already scaled by dpr)
        drawCover(ctx, img, canvas.width, canvas.height)
        lastDrawnFrame = idx

        if (!hasSetReadyRef.current) {
          hasSetReadyRef.current = true
          setVisible(true)
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [frameCount])

  // ── Fallback: frames not extracted yet ───────────────────────────────────
  if (noFrames) {
    return (
      <div className="absolute inset-0 bg-brand-black flex items-center justify-center">
        <div className="text-center space-y-3 p-8 border border-brand-border max-w-sm">
          <p className="font-serif text-xl text-brand-ivory">Frames not extracted</p>
          <p className="font-sans text-xs text-brand-muted leading-relaxed">
            Run the following in your terminal to enable the scroll effect:
          </p>
          <code className="block text-xs text-brand-gold bg-brand-surface p-3 text-left">
            bash scripts/extract-frames.sh
          </code>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Canvas - hidden until first frame is drawn to avoid flash of black */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-700"
        style={{
          background: '#0A0A0A',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Loading overlay - fades out once first frame is painted */}
      <AnimatePresence>
        {!visible && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 z-20 bg-brand-black flex flex-col items-center justify-center gap-6"
          >
            {/* Brand mark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 border border-brand-gold flex items-center justify-center">
                <div className="w-3 h-3 bg-brand-gold rounded-full" />
              </div>
              <span className="font-serif text-xl tracking-[0.15em] text-brand-ivory uppercase">
                Horologer
              </span>
            </motion.div>

            {/* Gold progress bar */}
            <div className="w-48 h-px bg-brand-border relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-brand-gold origin-left"
                animate={{ scaleX: loadProgress }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.15, ease: 'linear' }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[10px] font-sans tracking-widest3 uppercase text-brand-muted"
            >
              {frameCount > 0
                ? `Loading ${Math.round(loadProgress * 100)}%`
                : 'Preparing experience…'}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

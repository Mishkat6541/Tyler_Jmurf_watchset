// count-frames.mjs — Counts extracted frames and writes public/frames/manifest.json
// Run: node scripts/count-frames.mjs
import { readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const framesDir = join(__dirname, '..', 'public', 'frames')

let files
try {
  files = readdirSync(framesDir).filter(f => /^frame_\d{4}\.jpg$/.test(f))
} catch {
  console.error('❌  public/frames/ not found. Run extract-frames.sh first.')
  process.exit(1)
}

const frameCount = files.length

if (frameCount === 0) {
  console.error('❌  No frame_XXXX.jpg files found in public/frames/')
  process.exit(1)
}

const manifest = { frameCount }
writeFileSync(
  join(framesDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
)

console.log(`✅  manifest.json written — ${frameCount} frames`)

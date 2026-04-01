// extract-frames.mjs — No system ffmpeg needed, uses the bundled binary
// Run: node scripts/extract-frames.mjs
import { createRequire } from 'module'
import { mkdirSync, readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const require     = createRequire(import.meta.url)
const ffmpegPath  = require('ffmpeg-static')
const __dirname   = dirname(fileURLToPath(import.meta.url))
const root        = join(__dirname, '..')
const videoPath   = join(root, 'public', 'hero-watch.mp4')
const framesDir   = join(root, 'public', 'frames')

mkdirSync(framesDir, { recursive: true })

console.log('⏳  Extracting frames from hero-watch.mp4 …')
console.log('    This takes ~30–60 seconds depending on video length.\n')

const args = [
  '-i',        videoPath,
  // Force full color range so JPEG output matches original video colours exactly
  '-vf',       'fps=30,scale=iw:ih:flags=lanczos,format=yuvj420p',
  '-q:v',      '1',          // 1 = maximum JPEG quality (scale is 1 best → 31 worst)
  '-f',        'image2',
  join(framesDir, 'frame_%04d.jpg'),
  '-y',
  '-hide_banner',
]

const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] })

// Show progress from stderr
let lastLine = ''
ff.stderr.on('data', chunk => {
  const text = chunk.toString()
  // Pull out the frame= line for progress display
  const match = text.match(/frame=\s*(\d+)/)
  if (match && match[1] !== lastLine) {
    lastLine = match[1]
    process.stdout.write(`\r    Processed frame ${lastLine}   `)
  }
})

ff.on('close', code => {
  process.stdout.write('\n')

  if (code !== 0) {
    console.error(`\n❌  ffmpeg exited with code ${code}`)
    process.exit(1)
  }

  // Count and write manifest
  const frames = readdirSync(framesDir).filter(f => /^frame_\d{4}\.jpg$/.test(f))
  const frameCount = frames.length

  if (frameCount === 0) {
    console.error('❌  No frames were produced. Check that hero-watch.mp4 exists.')
    process.exit(1)
  }

  writeFileSync(
    join(framesDir, 'manifest.json'),
    JSON.stringify({ frameCount }, null, 2)
  )

  console.log(`\n✅  ${frameCount} frames extracted → public/frames/`)
  console.log('✅  manifest.json written')
  console.log('\nRun: npm run dev\n')
})

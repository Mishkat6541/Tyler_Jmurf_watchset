#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# extract-frames.sh — Extract video frames for smooth hero scroll scrubbing
#
# Run from the project root:
#   bash scripts/extract-frames.sh
#
# Requires ffmpeg:
#   sudo apt update && sudo apt install -y ffmpeg    (WSL/Ubuntu)
#   brew install ffmpeg                               (macOS)
# ─────────────────────────────────────────────────────────────────────────────

set -e

VIDEO="./public/hero-watch.mp4"
OUT_DIR="./public/frames"
FPS=24          # frames per second to extract (24 gives silky smooth scrub)
QUALITY=3       # ffmpeg JPEG quality: 1 (best) – 31 (worst). 3 = ~80% quality

# ── Checks ──────────────────────────────────────────────────────────────────
if ! command -v ffmpeg &> /dev/null; then
  echo "❌  ffmpeg not found."
  echo "    Install it: sudo apt update && sudo apt install -y ffmpeg"
  exit 1
fi

if [ ! -f "$VIDEO" ]; then
  echo "❌  Video not found at $VIDEO"
  exit 1
fi

# ── Extract ─────────────────────────────────────────────────────────────────
mkdir -p "$OUT_DIR"

echo "⏳  Extracting frames from $VIDEO at ${FPS}fps …"
echo "    Output → $OUT_DIR/frame_%04d.jpg"
echo ""

ffmpeg -i "$VIDEO" \
  -vf "fps=${FPS},scale=1920:-2:flags=lanczos" \
  -q:v "$QUALITY" \
  -f image2 \
  "${OUT_DIR}/frame_%04d.jpg" \
  -y \
  -hide_banner \
  -loglevel error \
  -stats

FRAME_COUNT=$(ls -1 "$OUT_DIR"/frame_*.jpg 2>/dev/null | wc -l)
echo ""
echo "✅  Extracted $FRAME_COUNT frames → $OUT_DIR/"
echo ""
echo "📝  Generating manifest …"
node scripts/count-frames.mjs
echo "✅  Done. Run: npm run dev"

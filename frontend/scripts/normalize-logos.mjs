/**
 * Client logo normalizer — trims transparent/solid padding, scales to a uniform
 * optical height and emits WebP for `TrustedBy.jsx`.
 *
 * Sources live in `frontend/logos-src/` — outside `public/`, so the originals stay
 * in the repo without shipping to `dist/`. Only the generated
 * `frontend/public/logo/*.webp` files are published and referenced by the LP.
 *
 * Run (sharp is not a project dependency — CI never installs it):
 *   cd frontend && npx --yes -p sharp@0.34 node scripts/normalize-logos.mjs
 */

import { mkdir, readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.resolve(__dirname, '../logos-src')
const OUT_DIR = path.resolve(__dirname, '../public/logo')

/** 2× of the largest display height (48px) so the row stays sharp on retina. */
const OUTPUT_HEIGHT = 96
const TRIM_THRESHOLD = 20
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

/** Sources kept for reference but not part of the confirmed set in `TrustedBy.jsx`. */
const SKIP = new Set(['bagfactory'])

/** Display height per aspect-ratio bucket — wide wordmarks read larger at equal height. */
function displayHeight(ratio) {
  if (ratio >= 3) return 28
  if (ratio >= 1.6) return 36
  return 44
}

let sharp
try {
  ;({ default: sharp } = await import('sharp'))
} catch {
  console.error(
    'sharp is not installed. Run:\n  cd frontend && npx --yes -p sharp@0.34 node scripts/normalize-logos.mjs'
  )
  process.exit(1)
}

const entries = await readdir(SRC_DIR)
const sources = entries
  .filter((f) => SOURCE_EXT.has(path.extname(f).toLowerCase()))
  .filter((f) => !SKIP.has(path.basename(f, path.extname(f))))
  .sort()

if (sources.length === 0) {
  console.error(`No source logos found in ${SRC_DIR}`)
  process.exit(1)
}

await mkdir(OUT_DIR, { recursive: true })

const rows = []

for (const file of sources) {
  const input = path.join(SRC_DIR, file)
  const name = path.basename(file, path.extname(file))
  const output = path.join(OUT_DIR, `${name}.webp`)

  const source = sharp(input)
  const meta = await source.metadata()

  // Trim first so the optical size is driven by the mark, not by the canvas padding.
  const trimmed = await source.trim({ threshold: TRIM_THRESHOLD }).toBuffer({ resolveWithObject: true })
  const { width: tw, height: th } = trimmed.info

  await sharp(trimmed.data)
    .resize({ height: OUTPUT_HEIGHT, fit: 'inside', kernel: 'lanczos3' })
    .webp({ quality: 92, effort: 6 })
    .toFile(output)

  const out = await sharp(output).metadata()
  const bytes = (await stat(output)).size
  const ratio = tw / th
  // Upscaled sources lose detail — surface them so they can be re-sourced as SVG.
  const upscaled = th < OUTPUT_HEIGHT

  rows.push({
    file,
    source: `${meta.width}x${meta.height}`,
    trimmed: `${tw}x${th}`,
    ratio: ratio.toFixed(2),
    output: `${out.width}x${out.height}`,
    kb: (bytes / 1024).toFixed(1),
    display: `h-[${displayHeight(ratio)}px]`,
    warn: upscaled ? `UPSCALED ${(OUTPUT_HEIGHT / th).toFixed(1)}x — re-source as SVG` : '',
  })
}

const kept = new Set(sources.map((f) => `${path.basename(f, path.extname(f))}.webp`))
const published = await readdir(OUT_DIR)
for (const file of published) {
  if (path.extname(file).toLowerCase() !== '.webp') continue
  if (kept.has(file)) continue
  await unlink(path.join(OUT_DIR, file))
  console.log(`removed stale ${file}`)
}

console.table(rows)

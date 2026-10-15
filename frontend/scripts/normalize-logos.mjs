/**
 * Client logo normalizer — trims transparent/solid padding, scales to a uniform
 * optical height and emits WebP for `TrustedBy.jsx`.
 *
 * Sources live in `frontend/logos-src/` — outside `public/`, so the originals stay
 * in the repo without shipping to `dist/`. Published files are
 * `frontend/public/logo/*.webp` plus confirmed `*.svg` copies (Bagfactory).
 *
 * Run (sharp is not a project dependency — CI never installs it):
 *   cd frontend && npx --yes -p sharp@0.34 node scripts/normalize-logos.mjs
 */

import { copyFile, mkdir, readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.resolve(__dirname, '../logos-src')
const OUT_DIR = path.resolve(__dirname, '../public/logo')

/** 2× of the largest display height (48px) so the row stays sharp on retina. */
const OUTPUT_HEIGHT = 96
const TRIM_THRESHOLD = 20
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

/**
 * Full filenames kept in logos-src but not published.
 * `bagfactory.jpg` is the soft raster; `bagfactory.svg` is the mark that ships.
 */
const SKIP = new Set(['bagfactory.jpg'])

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
const publishable = entries.filter((f) => !SKIP.has(f)).sort()
const sources = publishable.filter((f) => SOURCE_EXT.has(path.extname(f).toLowerCase()))
const svgs = publishable.filter((f) => path.extname(f).toLowerCase() === '.svg')

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

const keptWebp = new Set(sources.map((f) => `${path.basename(f, path.extname(f))}.webp`))
const keptSvg = new Set()
for (const file of svgs) {
  const name = path.basename(file)
  await copyFile(path.join(SRC_DIR, file), path.join(OUT_DIR, name))
  keptSvg.add(name)
  const bytes = (await stat(path.join(OUT_DIR, name))).size
  rows.push({
    file,
    source: 'svg',
    trimmed: 'svg',
    ratio: '',
    output: name,
    kb: (bytes / 1024).toFixed(1),
    display: 'svg',
    warn: '',
  })
}

const published = await readdir(OUT_DIR)
for (const file of published) {
  const ext = path.extname(file).toLowerCase()
  if (ext === '.webp' && !keptWebp.has(file)) {
    await unlink(path.join(OUT_DIR, file))
    console.log(`removed stale ${file}`)
  } else if (ext === '.svg' && !keptSvg.has(file)) {
    await unlink(path.join(OUT_DIR, file))
    console.log(`removed stale ${file}`)
  }
}

console.table(rows)

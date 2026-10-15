#!/usr/bin/env node
/**
 * Trusted-by guard: every `LOGOS` entry in `src/components/trustedByLogos.js` must point at
 * a file in `public/logo/` whose real pixel size equals its `w` / `h` (the `<img>`
 * width/height attributes that prevent CLS), and `public/logo/` must not carry files the
 * band does not reference (stale output after `normalize-logos.mjs`).
 *
 * No dependencies: WebP and SVG sizes are read from the file headers.
 * Run: cd frontend && node scripts/check-logo-dims.mjs
 */

import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { LOGOS } from '../src/components/trustedByLogos.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const LOGO_DIR = path.join(ROOT, 'public', 'logo')

function webpSize(buf) {
  if (buf.length < 30 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('not a WebP file')
  }
  const chunk = buf.toString('ascii', 12, 16)
  if (chunk === 'VP8X') {
    return {
      w: 1 + buf.readUIntLE(24, 3),
      h: 1 + buf.readUIntLE(27, 3),
    }
  }
  if (chunk === 'VP8L') {
    const bits = buf.readUInt32LE(21)
    return { w: (bits & 0x3fff) + 1, h: ((bits >>> 14) & 0x3fff) + 1 }
  }
  if (chunk === 'VP8 ') {
    if (buf[23] !== 0x9d || buf[24] !== 0x01 || buf[25] !== 0x2a) throw new Error('bad VP8 start code')
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }
  }
  throw new Error(`unknown WebP chunk ${chunk}`)
}

function svgSize(text) {
  const open = text.match(/<svg\b[^>]*>/i)
  if (!open) throw new Error('no <svg> root')
  const attr = (name) => {
    const m = open[0].match(new RegExp(`\\s${name}="([^"]+)"`, 'i'))
    return m ? m[1].trim() : null
  }
  const num = (v) => (v && /^[\d.]+(px)?$/.test(v) ? Math.round(parseFloat(v)) : null)
  let w = num(attr('width'))
  let h = num(attr('height'))
  if (w == null || h == null) {
    const vb = attr('viewBox')
    if (!vb) throw new Error('no width/height or viewBox')
    const [, , vw, vh] = vb.split(/[\s,]+/).map(Number)
    w ??= Math.round(vw)
    h ??= Math.round(vh)
  }
  return { w, h }
}

async function readSize(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext === '.webp') return webpSize(await readFile(file))
  if (ext === '.svg') return svgSize(await readFile(file, 'utf8'))
  throw new Error(`unsupported extension ${ext}`)
}

const rows = []
let failed = false

for (const logo of LOGOS) {
  const name = path.posix.basename(logo.src)
  const file = path.join(LOGO_DIR, name)
  const row = { logo: logo.alt, file: name, declared: `${logo.w}x${logo.h}`, actual: '', status: 'OK' }
  try {
    const { w, h } = await readSize(file)
    row.actual = `${w}x${h}`
    if (w !== logo.w || h !== logo.h) {
      row.status = 'MISMATCH'
      failed = true
    }
  } catch (err) {
    row.actual = '-'
    row.status = err.code === 'ENOENT' ? 'MISSING' : `ERROR: ${err.message}`
    failed = true
  }
  rows.push(row)
}

const referenced = new Set(LOGOS.map((l) => path.posix.basename(l.src)))
for (const file of (await readdir(LOGO_DIR)).sort()) {
  if (!referenced.has(file)) {
    rows.push({ logo: '-', file, declared: '-', actual: '-', status: 'STALE (not in LOGOS)' })
    failed = true
  }
}

console.table(rows)

if (failed) {
  console.error('::error::Trusted-by logos out of sync — fix LOGOS w/h in src/components/trustedByLogos.js or rerun scripts/normalize-logos.mjs')
  process.exit(1)
}
console.log(`Trusted-by logos OK (${LOGOS.length} assets match LOGOS)`)

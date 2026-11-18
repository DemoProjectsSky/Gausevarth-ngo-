// Creates responsive WebP copies of every JPG/PNG in public/images.
// Run once on your machine:  npm install && npm run images
// Originals are never modified or deleted. Output: name-480.webp, -800.webp, -1280.webp, plus name.webp
import { readdirSync, existsSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const dir = 'public/images'
const widths = [480, 800, 1280]
if (!existsSync(dir)) { console.error('public/images not found'); process.exit(1) }

for (const file of readdirSync(dir)) {
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue
  const base = basename(file, extname(file))
  const input = sharp(join(dir, file))
  const { width = 0 } = await input.metadata()
  for (const w of widths) {
    if (w > width) continue
    await sharp(join(dir, file)).resize({ width: w }).webp({ quality: 78 }).toFile(join(dir, `${base}-${w}.webp`))
  }
  await sharp(join(dir, file)).webp({ quality: 80 }).toFile(join(dir, `${base}.webp`))
  console.log('optimized', file)
}

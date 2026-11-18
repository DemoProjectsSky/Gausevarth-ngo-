// Writes public/sitemap.xml (and adds a Sitemap line to robots.txt) at build time.
// Needs the real domain:  SITE_URL=https://your-domain.org npm run build
import { writeFileSync, readFileSync } from 'node:fs'

const site = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').replace(/\/$/, '')
const paths = ['/', '/about', '/our-work', '/campaigns', '/gallery', '/get-involved', '/contact', '/donate', '/privacy', '/terms']

if (!site) {
  console.warn('[seo] SITE_URL is not set, so sitemap.xml was not generated. Set SITE_URL to your live domain and rebuild.')
  process.exit(0)
}

const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${site}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync('public/sitemap.xml', xml)

const robots = readFileSync('public/robots.txt', 'utf8').replace(/\nSitemap:.*\n?/g, '\n').trimEnd()
writeFileSync('public/robots.txt', `${robots}\n\nSitemap: ${site}/sitemap.xml\n`)
console.log(`[seo] sitemap.xml written for ${site}`)

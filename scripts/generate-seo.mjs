import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const publicDir = path.join(rootDir, 'public')

const isProductionBuild = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
const envFiles = isProductionBuild
  ? ['.env', '.env.local', '.env.production']
  : ['.env', '.env.production', '.env.local']

const readEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {}
  }

  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .reduce((accumulator, line) => {
      const trimmed = line.trim()

      if (!trimmed || trimmed.startsWith('#')) {
        return accumulator
      }

      const separatorIndex = trimmed.indexOf('=')

      if (separatorIndex === -1) {
        return accumulator
      }

      const key = trimmed.slice(0, separatorIndex).trim()
      const value = trimmed.slice(separatorIndex + 1).trim()

      if (key && !(key in accumulator)) {
        accumulator[key] = value
      }

      return accumulator
    }, {})
}

const fileEnv = envFiles.reduce((accumulator, fileName) => {
  const filePath = path.join(rootDir, fileName)
  return { ...accumulator, ...readEnvFile(filePath) }
}, {})

const env = {
  ...fileEnv,
  ...process.env,
}

const siteUrl = (env.VITE_SITE_URL || 'https://your-domain.vercel.app').replace(/\/+$/, '')
const lastModified = new Date().toISOString()

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent)
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent)

console.log(`Generated SEO files for ${siteUrl}`)

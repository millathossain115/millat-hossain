import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const expectedUrl = 'https://millathossain.vercel.app'
const errors = []

const read = (relativePath) => {
  const filePath = path.join(distDir, relativePath)

  if (!fs.existsSync(filePath)) {
    errors.push(`Missing dist/${relativePath}`)
    return ''
  }

  return fs.readFileSync(filePath, 'utf8')
}

const expectIncludes = (content, expected, label) => {
  if (!content.includes(expected)) {
    errors.push(`${label} is missing: ${expected}`)
  }
}

if (!fs.existsSync(distDir)) {
  console.error('SEO check requires a production build. Run npm run build first.')
  process.exit(1)
}

const html = read('index.html')
const robots = read('robots.txt')
const sitemap = read('sitemap.xml')
const assetsDir = path.join(distDir, 'assets')
const builtJavaScript = fs.existsSync(assetsDir)
  ? fs
      .readdirSync(assetsDir)
      .filter((fileName) => fileName.endsWith('.js'))
      .map((fileName) => fs.readFileSync(path.join(assetsDir, fileName), 'utf8'))
  : []
const searchableFiles = [html, robots, sitemap, ...builtJavaScript]

expectIncludes(
  html,
  `rel="canonical" href="${expectedUrl}/"`,
  'Canonical URL',
)
expectIncludes(html, `property="og:url" content="${expectedUrl}/"`, 'Open Graph URL')
expectIncludes(html, '"@type": "ProfilePage"', 'ProfilePage structured data')
expectIncludes(html, '"@type": "Person"', 'Person structured data')
expectIncludes(html, '"email": "millathossain115@gmail.com"', 'Contact identity')
expectIncludes(
  robots,
  `Sitemap: ${expectedUrl}/sitemap.xml`,
  'robots.txt sitemap declaration',
)
expectIncludes(sitemap, `<loc>${expectedUrl}/</loc>`, 'Sitemap canonical URL')

for (const [label, forbidden] of [
  ['dead canonical domain', 'millat-hossain.vercel.app'],
  ['localhost URL', 'localhost'],
  ['placeholder domain', 'example.com'],
  ['placeholder image', 'placehold.co'],
]) {
  if (searchableFiles.some((content) => content.includes(forbidden))) {
    errors.push(`Found ${label}: ${forbidden}`)
  }
}

for (const ignoredSitemapTag of ['<lastmod>', '<priority>', '<changefreq>']) {
  if (sitemap.includes(ignoredSitemapTag)) {
    errors.push(`Sitemap should not contain ${ignoredSitemapTag}`)
  }
}

const jsonLdMatch = html.match(
  /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
)

if (!jsonLdMatch) {
  errors.push('Missing JSON-LD script')
} else {
  try {
    JSON.parse(jsonLdMatch[1])
  } catch (error) {
    errors.push(`Invalid JSON-LD: ${error.message}`)
  }
}

const ogImagePath = path.join(distDir, 'og-image.png')

if (!fs.existsSync(ogImagePath)) {
  errors.push('Missing dist/og-image.png')
} else {
  const image = fs.readFileSync(ogImagePath)
  const width = image.readUInt32BE(16)
  const height = image.readUInt32BE(20)

  if (width !== 1200 || height !== 630) {
    errors.push(`Social image must be 1200x630; received ${width}x${height}`)
  }
}

const profileImagePath = path.join(distDir, 'millat-hossain.webp')

if (!fs.existsSync(profileImagePath) || fs.statSync(profileImagePath).size === 0) {
  errors.push('Missing or empty dist/millat-hossain.webp')
}

if (errors.length > 0) {
  console.error(`SEO validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`SEO validation passed for ${expectedUrl}/`)

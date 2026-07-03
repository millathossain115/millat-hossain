# Portfolio

Vite + React portfolio project, ready to push to GitHub and deploy on Vercel.

## Local setup

1. Install dependencies:
   `npm install`
2. Start development:
   `npm run dev`
3. Build for production:
   `npm run build`
4. Validate production SEO files:
   `npm run check:seo`

## Environment files

- Copy values from `.env.example` into `.env.local` for local development.
- In Vercel, add the same `VITE_*` variables in Project Settings -> Environment Variables.
- Only variables prefixed with `VITE_` are exposed to the client in a Vite app.
- Keep `VITE_SITE_URL`, social image URLs, and public profile URLs aligned with the canonical production domain.
- Add the Google Search Console HTML-tag token to `VITE_GOOGLE_SITE_VERIFICATION` after creating the URL-prefix property.
- `.env.production` can safely store public SEO values like site title, canonical URL, and social profile URLs when they are not secrets.

## GitHub push checklist

1. Make sure `node_modules`, `dist`, `.env.local`, and `.vercel` are not tracked.
2. Commit the project:
   `git add .`
   `git commit -m "Prepare portfolio for GitHub and Vercel"`
3. Push to GitHub:
   `git push origin main`

## Vercel deploy

1. Import the GitHub repository into Vercel.
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add any needed `VITE_*` environment variables before deploying.

## SEO notes

- Canonical production URL: `https://millathossain.vercel.app/`.
- `robots.txt` and `sitemap.xml` are committed as static crawl files and validated after every production build.
- Concept studies intentionally have no fake demo or source links.
- Ranking first on Google cannot be guaranteed by code alone; useful content, genuine links, and consistent public profiles matter too.

## Google Search Console

1. Create a URL-prefix property for `https://millathossain.vercel.app/`.
2. Choose HTML-tag verification and copy only the token into `VITE_GOOGLE_SITE_VERIFICATION` in Vercel.
3. Redeploy, verify ownership, and submit `sitemap.xml`.
4. Inspect the canonical homepage, run the live test, and request indexing.
5. Keep the website, LinkedIn, GitHub, and resume aligned on the Software Engineer title and UIU dates of 2020–2024.

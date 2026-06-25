# Portfolio

Vite + React portfolio project, ready to push to GitHub and deploy on Vercel.

## Local setup

1. Install dependencies:
   `npm install`
2. Start development:
   `npm run dev`
3. Build for production:
   `npm run build`

## Environment files

- Copy values from `.env.example` into `.env.local` for local development.
- In Vercel, add the same `VITE_*` variables in Project Settings -> Environment Variables.
- Only variables prefixed with `VITE_` are exposed to the client in a Vite app.
- Update `VITE_SITE_URL`, `VITE_OG_IMAGE`, `VITE_GITHUB_URL`, and `VITE_LINKEDIN_URL` with your real live URLs before production.
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

- The project generates `robots.txt` and `sitemap.xml` automatically during build using `VITE_SITE_URL`.
- Update portfolio content with your real project links, GitHub, LinkedIn, and production domain for stronger search relevance.
- Ranking first on Google cannot be guaranteed by code alone; strong content, backlinks, and consistent public profiles matter too.

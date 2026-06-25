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

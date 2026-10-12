# realizeos.ai

The marketing site and user guide for [RealizeOS](https://github.com/SufZen/RealizeOS-5): what AI agents connect to — a company's memory, rules and approvals — built by [Realization](https://realization.world).

React 19 · Vite · TypeScript · Tailwind · Radix UI · Framer Motion · i18next (English, Hebrew, Portuguese).

## Run it

```bash
npm ci
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # type-check → client build (docs/) → SSR build (dist-ssr/) → prerender
npm run preview    # serve docs/ on http://localhost:4173
npm run lint
node scripts/check-locale-parity.cjs
```

`npm run build` prerenders every public route (`scripts/prerender.mjs`, using `src/entry-server.tsx`) so each URL ships real HTML with its own title, description, canonical and hreflang. It also writes `docs/sitemap.xml` and `docs/robots.txt`. `docs/` is build output and is not committed.

## Deploy

Every push to `main` deploys to production: `.github/workflows/deploy.yml` builds the site and publishes `docs/` to GitHub Pages (`realizeos.ai`, see `public/CNAME`). Work on a branch, open a pull request, and let the owner merge.

## Edit the content

| What | Where |
| --- | --- |
| Homepage and page copy (all three languages) | `public/locales/{en,he,pt}/translation.json` — keep keys in sync; check with `node scripts/check-locale-parity.cjs` |
| Offer ladder, use cases | `src/data/pricing.ts`, `src/data/usecases.ts` (text lives in the locale files) |
| Guide pages (English) | `src/data/sections/*.ts`, listed in `src/data/guideContent.ts` |
| Page titles, descriptions, sitemap | `src/seo/routes.ts` (and `seo.*` / `workshops.seo` keys in the locale files) |
| Links (audit booking, webinar, GitHub, community) | `src/lib/constants.ts` |
| AI-readable summary | `public/llms.txt` |

Rules for copy: every claim, command and number must be traceable to the RealizeOS repo, the product direction, or the owner. No invented testimonials, user counts or certifications. Say what RealizeOS doesn't do.

## Routes

`/`, `/he`, `/pt` (homepage) · `/workshops` (+ `/he`, `/pt`) · `/guide` and `/guide/:sectionId` · `/wizard` · `/terms`, `/privacy`, `/accessibility`. Hidden for now (files kept): `/webinar/*`. Internal: `/design`.

## Structure

```
src/
  pages/            route components
  components/       sections/ (homepage), guide/, wizard/, shared/, ui/, illustrations/
  data/             structured content (guide sections, pricing, use cases)
  seo/              route table, language helpers, <head> sync
  design-system/    --rz-* tokens
  entry-server.tsx  build-time renderer for prerendering
scripts/            prerender.mjs, check-locale-parity.cjs
public/             static files, locales, llms.txt, 404.html (SPA fallback)
```

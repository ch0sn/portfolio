# Sontek Daniel Cho — Portfolio

Personal portfolio for frontend and software developer roles in the Rhein-Main area. The site is an Angular application: standalone components, lazy-loaded routes, signals for language and theme, and prerendered HTML for the public pages.

German is the default language. English is available from the language switch.

## Stack

- Angular 22 (standalone, zoneless, static prerender)
- TypeScript
- Vitest via `ng test`
- ESLint via `ng lint`
- Node.js `^22.22.3`, `^24.15.0`, or `>=26` (see `.nvmrc`)

## Run

```bash
npm install
npm start
```

Open http://localhost:4200.

## Test and lint

```bash
npm test
npm run lint
```

## Build

```bash
npm run build
```

The static site is written to `dist/portfolio/browser`.

## Deploy

Netlify runs `npm run build` and publishes `dist/portfolio/browser`. `netlify.toml` sets the Node version and rewrites unknown paths to `index.html` so the client router can show the not-found page. Known routes are prerendered.

## Edit content

Facts, projects, education, and links live in one typed file:

`src/app/core/data/portfolio.data.ts`

Navigation labels, page chrome, and meta descriptions live in:

`src/app/core/i18n/translations.ts`

Search the data file for `TODO(owner)` before publishing missing details. The CV download points at `public/cv/sontek-daniel-cho-cv.pdf`, which is a placeholder until that file is replaced.

See `CONTENT_GUIDE.md` for the same map in shorter form.

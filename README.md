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

The static site is written to `dist/portfolio/browser`. The build also copies placeholder files from `content/private/` to `dist/portfolio/browser/privat/content/`, unless `PRIVATE_CONTENT_SOURCE` is `blobs`.

## Deploy

Netlify runs `npm run build` and publishes `dist/portfolio/browser`. `netlify.toml` sets the Node version and rewrites unknown paths to `index.html` so the client router can show the not-found page. Known routes are prerendered.

## Edit content

Facts, projects, education, and links live in one typed file:

`src/app/core/data/portfolio.data.ts`

Navigation labels, page chrome, and meta descriptions live in:

`src/app/core/i18n/translations.ts`

Search the data file for `TODO(owner)` before publishing missing project details.

See `CONTENT_GUIDE.md` for the same map in shorter form.

## Private area

`/privat` is for friends and family. It is not linked from the public navigation. A Netlify Edge Function checks a signed HttpOnly cookie before any page or file under that path is served. The password is not in the repository.

### Set or change the password

In Netlify: Site configuration → Environment variables. Add both of these for the production context (and for local development if you use `netlify dev`):

- `PRIVATE_AREA_PASSWORD` — the password you share personally
- `PRIVATE_AREA_SECRET` — a long random string, for example `openssl rand -base64 32`

The session cookie is signed with an HMAC key derived from both values, so changing either one logs everyone out. Sessions last 30 days. A wrong password waits briefly before the site answers.

Redeploy after changing the variables so the edge function sees them. Do not put the values in git, in Angular code, or in the Netlify UI as a committed file.

### Add an update or a blog post

Placeholder copies live in `content/private/`. See `content/private/README.md` for the file shapes.

- An update is an entry in `feed.json`. Set `image` to a path under `/privat/content/` or to `null`.
- A personal about page is `about.json`.
- A blog post is `posts/<slug>.md` plus a matching entry in `posts/index.json`. Use `:::de` and `:::en` sections.

This GitHub repository is public. Anything committed under `content/private/` can be read on GitHub even though the deployed site asks for a password. Keep real photos and personal writing out of git. When you are ready, upload those files to a Netlify Blobs store named `private-content` (keys match the paths, such as `feed.json` and `posts/beispiel.md`) and set `PRIVATE_CONTENT_SOURCE` to `blobs` for the build and the runtime. The build then leaves the files out of the published folder, and the edge function reads the store instead.

### Test locally

`npm start` does not run the edge function, so it will not ask for the password.

```bash
export PRIVATE_AREA_PASSWORD='choose-a-local-password'
export PRIVATE_AREA_SECRET='choose-a-long-local-secret'
npx netlify dev
```

Open the URL Netlify prints and go to `/privat`. The local site is usually plain HTTP, so the cookie is HttpOnly and SameSite=Lax, and `Secure` is added only on HTTPS.

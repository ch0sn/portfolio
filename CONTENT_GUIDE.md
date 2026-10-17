# Content guide

Two files hold the copy.

| What | File |
| --- | --- |
| Name, bio, study, jobs, skills, projects, links | `src/app/core/data/portfolio.data.ts` |
| Navigation, buttons, headings, meta descriptions | `src/app/core/i18n/translations.ts` |

German strings are the `de` fields. English strings are the `en` fields. Keep both when you edit a sentence.

## Screenshots

Drop an image in `public/projects/` and set the project's `screenshot` field to the public path, for example `/projects/kin-graph.webp`. Until then the card shows a drawn cover.

## Still open

The data file marks these with `TODO(owner)`. None of them should be invented:

- Live-demo URLs and screenshots
- Canonical site URL, once the domain is known

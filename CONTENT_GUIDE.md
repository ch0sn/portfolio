# Content guide

Two files hold the copy.

| What | File |
| --- | --- |
| Name, bio, study, skills, projects, links, CV path | `src/app/core/data/portfolio.data.ts` |
| Navigation, buttons, headings, meta descriptions | `src/app/core/i18n/translations.ts` |

German strings are the `de` fields. English strings are the `en` fields. Keep both when you edit a sentence.

## CV

Replace `public/cv/sontek-daniel-cho-cv.pdf`, then set `cv.isPlaceholder` to `false` in the data file. The public path stays `/cv/sontek-daniel-cho-cv.pdf`.

## Screenshots

Drop an image in `public/projects/` and set the project's `screenshot` field to the public path, for example `/projects/kin-graph.webp`. Until then the card shows a drawn cover.

## Still open

The data file marks these with `TODO(owner)`. None of them should be invented:

- Professional email
- LinkedIn URL
- Real CV PDF
- BMW role, location, and dates
- Graduation date for the Friedberg bachelor's degree
- Live-demo URLs and screenshots
- A public-safe description and role for GTKEO
- Your role on the university team project
- Work arrangement, if you want it on the page
- Canonical site URL, once the domain is known

# Content guide

Two files hold the copy.

| What | File |
| --- | --- |
| Name, bio, study, jobs, skills, projects, links | `src/app/core/data/portfolio.data.ts` |
| Navigation, buttons, headings, meta descriptions | `src/app/core/i18n/translations.ts` |

German strings are the `de` fields. English strings are the `en` fields. Keep both when you edit a sentence.

## Screenshots

Put images in `public/projects/<project-id>/` and list them on the project's `shots` array. The first image is the card cover. Any further images become the gallery on the Projects page. Each shot needs German and English alt text. An empty `shots` array keeps the drawn cover.

App icons are SVG files in `public/assets/logos/`. Set a project's `logo` field to that public path, for example `/assets/logos/kin-graph.svg`. The alt text is built from the project title.

There is no live demo. Leave `liveUrl` as `null` and the card hides that link.

## Still open

The data file marks these with `TODO(owner)`. None of them should be invented:

- Canonical site URL, once the domain is known

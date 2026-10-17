# Private content

These files are placeholder examples. They are not facts about Sontek.

The edge function serves them only after a valid session cookie. On a public GitHub repository the files are still readable in git. Do not commit real photos, names, or stories here.

## Files

- `feed.json` — dated updates. `image` is a path under `/privat/content/` or `null`.
- `about.json` — personal about page, separate from the public About page.
- `posts/index.json` — blog list. `slug` must match `posts/<slug>.md`.
- `posts/<slug>.md` — Markdown with `title_de`, `title_en`, and `date` in the front matter, then `:::de` and `:::en` sections.
- `images/` — optional pictures referenced by the feed.

## Switch to Netlify Blobs

1. Create a store named `private-content`.
2. Upload each file with the same key it has here, for example `feed.json` or `posts/beispiel.md`.
3. Set `PRIVATE_CONTENT_SOURCE` to `blobs` for both the build and the runtime.
4. The build then skips copying this folder into the published site. Remove real files from git after the blobs are in place.

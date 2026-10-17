import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname } from 'node:path';

const source = 'content/private';
const target = 'dist/portfolio/browser/privat/content';

if (process.env.PRIVATE_CONTENT_SOURCE === 'blobs') {
  console.log('PRIVATE_CONTENT_SOURCE=blobs, so private files stay out of the publish directory.');
  process.exit(0);
}

await rm(target, { recursive: true, force: true });
await mkdir(dirname(target), { recursive: true });
await cp(source, target, {
  recursive: true,
  filter: (path) => !path.endsWith('README.md'),
});
console.log(`Copied ${source} to ${target}.`);

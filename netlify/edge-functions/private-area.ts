import { handlePrivateRequest, type PrivateEnv } from '../../src/server/private-auth.ts';

interface BlobStore {
  get(key: string, options: { type: 'arrayBuffer' }): Promise<ArrayBuffer | null>;
}

/**
 * `@netlify/blobs` is provided by the Netlify edge runtime. It is imported only
 * when PRIVATE_CONTENT_SOURCE=blobs, so file-mode deploys do not need the package.
 */
async function readBlob(pathname: string): Promise<Response | null> {
  const blobs = (await import('@netlify/blobs')) as { getStore: (name: string) => BlobStore };
  const store = blobs.getStore('private-content');
  const key = pathname.slice('/privat/content/'.length);
  const body = await store.get(key, { type: 'arrayBuffer' });
  if (!body) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(body, { headers: { 'content-type': contentType(key) } });
}

function contentType(key: string): string {
  if (key.endsWith('.json')) {
    return 'application/json; charset=utf-8';
  }
  if (key.endsWith('.md')) {
    return 'text/markdown; charset=utf-8';
  }
  if (key.endsWith('.svg')) {
    return 'image/svg+xml';
  }
  if (key.endsWith('.webp')) {
    return 'image/webp';
  }
  if (key.endsWith('.png')) {
    return 'image/png';
  }
  if (key.endsWith('.jpg') || key.endsWith('.jpeg')) {
    return 'image/jpeg';
  }
  return 'application/octet-stream';
}

function env(): PrivateEnv {
  const runtime = globalThis as { Netlify?: { env: { get(name: string): string | undefined } } };
  const source = runtime.Netlify?.env.get('PRIVATE_CONTENT_SOURCE');
  return {
    password: runtime.Netlify?.env.get('PRIVATE_AREA_PASSWORD'),
    secret: runtime.Netlify?.env.get('PRIVATE_AREA_SECRET'),
    contentSource: source === 'blobs' ? 'blobs' : 'files',
  };
}

export default async function privateArea(request: Request, context: { next: () => Promise<Response> }): Promise<Response> {
  try {
    const current = env();
    return await handlePrivateRequest(request, {
      env: current,
      next: () => context.next(),
      readContent: current.contentSource === 'blobs' ? readBlob : undefined,
    });
  } catch {
    return new Response('Unavailable', {
      status: 503,
      headers: {
        'x-robots-tag': 'noindex, nofollow',
        'cache-control': 'private, no-store',
        'netlify-cdn-cache-control': 'no-store',
      },
    });
  }
}

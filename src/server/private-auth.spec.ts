import { safeNextPath } from './safe-next';
import {
  FAILURE_DELAY_MS,
  PRIVATE_COOKIE,
  SESSION_SECONDS,
  createSessionToken,
  handlePrivateRequest,
  passwordsMatch,
  sessionCookie,
  verifySessionToken,
  type PrivateHandlerDeps,
} from './private-auth';

const SECRET = 'test-secret';
const PASSWORD = 'test-password';
const NOW_MS = 1_700_000_000_000;
const NOW = Math.floor(NOW_MS / 1000);

describe('private area auth', () => {
  it('compares passwords without accepting a different value', async () => {
    expect(await passwordsMatch(PASSWORD, PASSWORD)).toBe(true);
    expect(await passwordsMatch('nope', PASSWORD)).toBe(false);
    expect(await passwordsMatch(`${PASSWORD} `, PASSWORD)).toBe(false);
    expect(await passwordsMatch('short', 'much-longer-password')).toBe(false);
  });

  it('accepts a signed cookie only until it expires and only for the same secret and password', async () => {
    const token = await createSessionToken(SECRET, PASSWORD, NOW + 10);
    expect(await verifySessionToken(token, SECRET, PASSWORD, NOW)).toBe(true);
    expect(await verifySessionToken(token, SECRET, PASSWORD, NOW + 10)).toBe(false);
    expect(await verifySessionToken(token, 'other-secret', PASSWORD, NOW)).toBe(false);
    expect(await verifySessionToken(token, SECRET, 'other-password', NOW)).toBe(false);
    expect(await verifySessionToken(`${token}x`, SECRET, PASSWORD, NOW)).toBe(false);
    expect(await verifySessionToken('not-a-token', SECRET, PASSWORD, NOW)).toBe(false);
  });

  it('sets an HttpOnly session cookie and adds Secure only on https', () => {
    const https = sessionCookie('abc', true, SESSION_SECONDS);
    expect(https).toContain(`${PRIVATE_COOKIE}=abc`);
    expect(https).toContain('HttpOnly');
    expect(https).toContain('SameSite=Lax');
    expect(https).toContain('Path=/privat');
    expect(https).toContain(`Max-Age=${SESSION_SECONDS}`);
    expect(https).toContain('Secure');
    expect(sessionCookie('abc', false, 0)).not.toContain('Secure');
  });

  it('keeps post-login redirects inside the private area', () => {
    expect(safeNextPath('/privat/blog/beispiel')).toBe('/privat/blog/beispiel');
    expect(safeNextPath('https://evil.test')).toBe('/privat');
    expect(safeNextPath('//evil.test')).toBe('/privat');
    expect(safeNextPath('/privatevil')).toBe('/privat');
    expect(safeNextPath('/privat/../about')).toBe('/privat');
    expect(safeNextPath('/privat/anmelden?next=/')).toBe('/privat');
  });

  it('rejects a wrong password after the slowdown and does not serve content', async () => {
    const delays: number[] = [];
    const next = vi.fn(() => Promise.resolve(new Response('secret')));
    const response = await handlePrivateRequest(loginRequest({ password: 'wrong' }), deps(next, delays));
    expect(response.status).toBe(401);
    expect(delays).toEqual([FAILURE_DELAY_MS]);
    expect(next).not.toHaveBeenCalled();
    expect(response.headers.get('set-cookie')).toBeNull();
    expect(response.headers.get('x-robots-tag')).toBe('noindex, nofollow');
  });

  it('sets the session cookie when the password matches', async () => {
    const next = vi.fn(() => Promise.resolve(new Response('unused')));
    const response = await handlePrivateRequest(loginRequest({ password: PASSWORD }, 'https://example.com'), deps(next));
    expect(response.status).toBe(200);
    const cookie = response.headers.get('set-cookie') ?? '';
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
    expect(cookie).not.toContain(PASSWORD);
    expect(next).not.toHaveBeenCalled();
    const token = cookie.slice(PRIVATE_COOKIE.length + 1, cookie.indexOf(';'));
    expect(await verifySessionToken(token, SECRET, PASSWORD, NOW + 5)).toBe(true);
  });

  it('does not log in when the server password is missing', async () => {
    const next = vi.fn(() => Promise.resolve(new Response('secret')));
    const response = await handlePrivateRequest(
      loginRequest({ password: PASSWORD }),
      deps(next, [], { password: undefined, secret: SECRET, contentSource: 'files' }),
    );
    expect(response.status).toBe(503);
    expect(next).not.toHaveBeenCalled();
  });

  it('redirects anonymous page views and blocks content files', async () => {
    const next = vi.fn(() => Promise.resolve(new Response('secret feed')));
    const page = await handlePrivateRequest(new Request('https://example.com/privat/blog'), deps(next));
    expect(page.status).toBe(302);
    expect(page.headers.get('location')).toBe(
      `/privat/anmelden?next=${encodeURIComponent('/privat/blog')}`,
    );
    expect(next).not.toHaveBeenCalled();

    const content = await handlePrivateRequest(
      new Request('https://example.com/privat/content/feed.json'),
      deps(next),
    );
    expect(content.status).toBe(401);
    expect(await content.text()).not.toContain('secret');
    expect(next).not.toHaveBeenCalled();
  });

  it('serves protected files only with a valid session', async () => {
    const token = await createSessionToken(SECRET, PASSWORD, NOW + SESSION_SECONDS);
    const next = vi.fn(() => Promise.resolve(new Response('feed-body', { status: 200 })));
    const response = await handlePrivateRequest(
      new Request('http://localhost:8888/privat/content/feed.json', {
        headers: { cookie: `${PRIVATE_COOKIE}=${token}` },
      }),
      deps(next),
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('feed-body');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
    expect(response.headers.get('set-cookie') ?? '').not.toContain('Secure');
    expect(next).toHaveBeenCalledOnce();
  });

  it('reads blob content without calling the file host', async () => {
    const token = await createSessionToken(SECRET, PASSWORD, NOW + SESSION_SECONDS);
    const next = vi.fn(() => Promise.resolve(new Response('file-should-not-be-used')));
    const readContent = vi.fn(() => Promise.resolve(new Response('blob-body')));
    const response = await handlePrivateRequest(
      new Request('https://example.com/privat/content/feed.json', {
        headers: { cookie: `${PRIVATE_COOKIE}=${token}` },
      }),
      deps(next, [], { password: PASSWORD, secret: SECRET, contentSource: 'blobs' }, readContent),
    );
    expect(await response.text()).toBe('blob-body');
    expect(readContent).toHaveBeenCalledWith('/privat/content/feed.json');
    expect(next).not.toHaveBeenCalled();
  });

  it('clears the cookie on logout', async () => {
    const response = await handlePrivateRequest(
      new Request('https://example.com/privat/abmelden', { method: 'POST', headers: { origin: 'https://example.com' } }),
      deps(vi.fn(() => Promise.resolve(new Response('no')))),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0');
  });
});

function loginRequest(body: unknown, origin = 'http://127.0.0.1:8888'): Request {
  const url = new URL('/privat/anmelden', origin);
  return new Request(url, {
    method: 'POST',
    headers: { origin: url.origin, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function deps(
  next: PrivateHandlerDeps['next'],
  delays: number[] = [],
  env: PrivateHandlerDeps['env'] = { password: PASSWORD, secret: SECRET, contentSource: 'files' },
  readContent?: PrivateHandlerDeps['readContent'],
): PrivateHandlerDeps {
  return {
    env,
    next,
    readContent,
    now: () => NOW_MS,
    delay: async (ms) => {
      delays.push(ms);
    },
  };
}

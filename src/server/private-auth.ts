import { safeNextPath } from './safe-next';

export const PRIVATE_COOKIE = 'privat_session';
export const SESSION_SECONDS = 60 * 60 * 24 * 30;
export const FAILURE_DELAY_MS = 800;

export interface PrivateEnv {
  readonly password: string | undefined;
  readonly secret: string | undefined;
  readonly contentSource: 'files' | 'blobs';
}

export interface PrivateHandlerDeps {
  readonly env: PrivateEnv;
  readonly next: () => Promise<Response>;
  readonly readContent?: (pathname: string) => Promise<Response | null>;
  readonly now?: () => number;
  readonly failureDelayMs?: number;
  readonly delay?: (ms: number) => Promise<void>;
}

const CONTENT_PREFIX = '/privat/content/';
const LOGIN_PATH = '/privat/anmelden';
const LOGOUT_PATH = '/privat/abmelden';

export async function passwordsMatch(input: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [left, right] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(`privat-area-password\0${input}`)),
    crypto.subtle.digest('SHA-256', encoder.encode(`privat-area-password\0${expected}`)),
  ]);
  const leftBytes = new Uint8Array(left);
  const rightBytes = new Uint8Array(right);
  let diff = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < leftBytes.length; index += 1) {
    diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return diff === 0;
}

export async function createSessionToken(secret: string, password: string, expiresAt: number): Promise<string> {
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ exp: expiresAt })));
  const signature = await crypto.subtle.sign('HMAC', await deriveKey(secret, password), new TextEncoder().encode(payload));
  return `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(
  token: string,
  secret: string,
  password: string,
  now: number,
): Promise<boolean> {
  const separator = token.indexOf('.');
  if (separator <= 0 || separator !== token.lastIndexOf('.')) {
    return false;
  }
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const verified = await crypto.subtle.verify(
    'HMAC',
    await deriveKey(secret, password),
    base64UrlToBytes(signature),
    new TextEncoder().encode(payload),
  );
  if (!verified) {
    return false;
  }
  try {
    const parsed = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as { exp?: unknown };
    return typeof parsed.exp === 'number' && parsed.exp > now;
  } catch {
    return false;
  }
}

export function sessionCookie(token: string, secure: boolean, maxAge: number): string {
  const parts = [
    `${PRIVATE_COOKIE}=${token}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/privat',
    `Max-Age=${maxAge}`,
  ];
  if (secure) {
    parts.push('Secure');
  }
  return parts.join('; ');
}

export async function handlePrivateRequest(request: Request, deps: PrivateHandlerDeps): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path.includes('..') || path.includes('\\')) {
    return json({ error: 'bad-path' }, 400);
  }
  if (request.method === 'POST' && path === LOGIN_PATH) {
    return login(request, deps);
  }
  if (request.method === 'POST' && path === LOGOUT_PATH) {
    return logout(request);
  }
  if (request.method === 'GET' && path === LOGIN_PATH) {
    if (await hasValidSession(request, deps)) {
      return redirect('/privat');
    }
    return withPrivateHeaders(await deps.next());
  }
  if (!(await hasValidSession(request, deps))) {
    if (path.startsWith(CONTENT_PREFIX)) {
      return json({ error: 'auth' }, 401);
    }
    const next = safeNextPath(`${path}${url.search}`);
    return redirect(`/privat/anmelden?next=${encodeURIComponent(next)}`);
  }
  if (path.startsWith(CONTENT_PREFIX) && deps.env.contentSource === 'blobs') {
    const content = (await deps.readContent?.(path)) ?? new Response('Not found', { status: 404 });
    return withPrivateHeaders(content);
  }
  return withPrivateHeaders(await deps.next());
}

async function login(request: Request, deps: PrivateHandlerDeps): Promise<Response> {
  if (!sameOrigin(request)) {
    return json({ error: 'origin' }, 403);
  }
  const password = deps.env.password;
  const secret = deps.env.secret;
  if (!password || !secret) {
    return json({ error: 'unavailable' }, 503);
  }
  const submitted = await readPassword(request);
  if (submitted === null) {
    return json({ error: 'auth' }, 400);
  }
  const matches = submitted.length > 0 && submitted.length <= 256 && (await passwordsMatch(submitted, password));
  if (!matches) {
    await waitForFailure(deps);
    return json({ error: 'auth' }, 401);
  }
  const now = Math.floor((deps.now?.() ?? Date.now()) / 1000);
  const token = await createSessionToken(secret, password, now + SESSION_SECONDS);
  return json({ ok: true }, 200, {
    'set-cookie': sessionCookie(token, isHttps(request), SESSION_SECONDS),
  });
}

function logout(request: Request): Response {
  if (!sameOrigin(request)) {
    return json({ error: 'origin' }, 403);
  }
  return json({ ok: true }, 200, {
    'set-cookie': sessionCookie('', isHttps(request), 0),
  });
}

async function hasValidSession(request: Request, deps: PrivateHandlerDeps): Promise<boolean> {
  const password = deps.env.password;
  const secret = deps.env.secret;
  const token = readCookie(request.headers.get('cookie'), PRIVATE_COOKIE);
  if (!password || !secret || !token) {
    return false;
  }
  const now = Math.floor((deps.now?.() ?? Date.now()) / 1000);
  return verifySessionToken(token, secret, password, now);
}

async function readPassword(request: Request): Promise<string | null> {
  const text = await request.text();
  if (text.length > 1024) {
    return null;
  }
  try {
    const parsed = JSON.parse(text) as { password?: unknown };
    return typeof parsed.password === 'string' ? parsed.password : null;
  } catch {
    return null;
  }
}

function waitForFailure(deps: PrivateHandlerDeps): Promise<void> {
  const delay = deps.delay ?? ((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)));
  return delay(deps.failureDelayMs ?? FAILURE_DELAY_MS);
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) {
    return true;
  }
  return origin === new URL(request.url).origin;
}

function isHttps(request: Request): boolean {
  return new URL(request.url).protocol === 'https:';
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) {
    return null;
  }
  for (const part of header.split(';')) {
    const separator = part.indexOf('=');
    if (separator === -1) {
      continue;
    }
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim();
    }
  }
  return null;
}

async function deriveKey(secret: string, password: string): Promise<CryptoKey> {
  const secretKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const material = await crypto.subtle.sign('HMAC', secretKey, new TextEncoder().encode(password));
  return crypto.subtle.importKey('raw', material, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function base64UrlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const pad = (4 - (value.length % 4)) % 4;
  const binary = atob(value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat(pad));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function json(body: unknown, status: number, extra?: HeadersInit): Response {
  const headers = new Headers(extra);
  headers.set('content-type', 'application/json; charset=utf-8');
  applyPrivateHeaders(headers);
  return new Response(JSON.stringify(body), { status, headers });
}

function redirect(location: string): Response {
  const headers = new Headers({ location });
  applyPrivateHeaders(headers);
  return new Response(null, { status: 302, headers });
}

async function withPrivateHeaders(response: Response): Promise<Response> {
  const headers = new Headers(response.headers);
  applyPrivateHeaders(headers);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function applyPrivateHeaders(headers: Headers): void {
  headers.set('x-robots-tag', 'noindex, nofollow');
  headers.set('cache-control', 'private, no-store');
  headers.set('netlify-cdn-cache-control', 'no-store');
}

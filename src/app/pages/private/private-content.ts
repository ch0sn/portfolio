import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface PrivateText {
  readonly de: string;
  readonly en: string;
}

export interface PrivateUpdate {
  readonly id: string;
  readonly date: string;
  readonly title: PrivateText;
  readonly body: PrivateText;
  readonly image: string | null;
}

export interface PrivateFeed {
  readonly updates: readonly PrivateUpdate[];
}

export interface PrivateAbout {
  readonly paragraphs: readonly PrivateText[];
}

export interface PrivatePostSummary {
  readonly slug: string;
  readonly date: string;
  readonly title: PrivateText;
  readonly summary: PrivateText;
}

export interface PrivateBlogIndex {
  readonly posts: readonly PrivatePostSummary[];
}

export class PrivateUnauthorized extends Error {
  constructor() {
    super('unauthorized');
    this.name = 'PrivateUnauthorized';
  }
}

@Injectable({ providedIn: 'root' })
export class PrivateContent {
  feed(): Promise<PrivateFeed> {
    return readJson<PrivateFeed>('/privat/content/feed.json');
  }

  about(): Promise<PrivateAbout> {
    return readJson<PrivateAbout>('/privat/content/about.json');
  }

  posts(): Promise<PrivateBlogIndex> {
    return readJson<PrivateBlogIndex>('/privat/content/posts/index.json');
  }

  post(slug: string): Promise<string> {
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return Promise.reject(new Error('bad slug'));
    }
    return readText(`/privat/content/posts/${slug}.md`);
  }
}

export async function loadOrRedirect<T>(router: Router, next: string, load: () => Promise<T>): Promise<T | null> {
  try {
    return await load();
  } catch (error) {
    if (error instanceof PrivateUnauthorized) {
      await router.navigate(['/privat/anmelden'], { queryParams: { next } });
      return null;
    }
    throw error;
  }
}

export function privateImage(src: string | null): string | null {
  if (!src || !src.startsWith('/privat/content/') || src.includes('..')) {
    return null;
  }
  return src;
}

async function readJson<T>(url: string): Promise<T> {
  return JSON.parse(await readText(url)) as T;
}

async function readText(url: string): Promise<string> {
  const response = await fetch(url, { credentials: 'same-origin', headers: { accept: 'application/json, text/plain' } });
  if (response.status === 401) {
    throw new PrivateUnauthorized();
  }
  if (!response.ok) {
    throw new Error(`private content ${response.status}`);
  }
  return response.text();
}

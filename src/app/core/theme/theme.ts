import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ColorScheme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio.theme';

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly platformId = inject(PLATFORM_ID);
  readonly scheme = signal<ColorScheme>('light');

  toggle(): void {
    this.apply(this.current() === 'dark' ? 'light' : 'dark');
  }

  restore(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      this.apply(stored);
      return;
    }
    const attribute = document.documentElement.dataset['theme'];
    if (attribute === 'light' || attribute === 'dark') {
      this.scheme.set(attribute);
      return;
    }
    this.apply(this.preferred());
  }

  private apply(scheme: ColorScheme): void {
    this.scheme.set(scheme);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.documentElement.dataset['theme'] = scheme;
    localStorage.setItem(STORAGE_KEY, scheme);
    const themeColor = scheme === 'dark' ? '#12110f' : '#efeae2';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }

  private current(): ColorScheme {
    if (isPlatformBrowser(this.platformId)) {
      const attribute = document.documentElement.dataset['theme'];
      if (attribute === 'light' || attribute === 'dark') {
        return attribute;
      }
    }
    return this.scheme();
  }

  private preferred(): ColorScheme {
    if (!isPlatformBrowser(this.platformId) || typeof window.matchMedia !== 'function') {
      return 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

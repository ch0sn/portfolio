import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { LocalizedText, Locale, localize } from './localize';
import { translations } from './translations';

const STORAGE_KEY = 'portfolio.lang';

@Injectable({ providedIn: 'root' })
export class Language {
  private readonly platformId = inject(PLATFORM_ID);
  readonly locale = signal<Locale>('de');
  readonly messages = computed(() => translations[this.locale()]);

  use(locale: Locale): void {
    this.apply(locale);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, locale);
    }
  }

  restore(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'de' || stored === 'en') {
      this.apply(stored);
    }
  }

  text(value: LocalizedText): string {
    return localize(value, this.locale());
  }

  private apply(locale: Locale): void {
    this.locale.set(locale);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = locale;
    }
  }
}

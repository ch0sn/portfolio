import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Language } from '../i18n/language';
import { Locale } from '../i18n/localize';

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly language = inject(Language);

  apply(pageTitle: string, description: string): void {
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ property: 'og:locale', content: this.ogLocale(this.language.locale()) });
  }

  private ogLocale(locale: Locale): string {
    switch (locale) {
      case 'de':
        return 'de_DE';
      case 'en':
        return 'en_US';
      default: {
        const unknown: never = locale;
        return unknown;
      }
    }
  }
}

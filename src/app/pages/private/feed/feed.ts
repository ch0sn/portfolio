import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../../../core/i18n/language';
import { Seo } from '../../../core/seo/seo';
import { PrivateUpdate, PrivateContent, loadOrRedirect, privateImage } from '../private-content';

@Component({
  selector: 'app-private-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed.html',
  host: { class: 'page' },
})
export class PrivateFeed {
  private readonly content = inject(PrivateContent);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly updates = signal<readonly PrivateUpdate[] | null>(null);
  protected readonly failed = signal(false);

  constructor() {
    effect(() => {
      const page = this.messages().private;
      this.seo.apply(page.feedTitle, page.feedIntro, 'noindex, nofollow');
    });
    void this.load();
  }

  protected textDate(value: string): string {
    return new Intl.DateTimeFormat(this.language.locale() === 'de' ? 'de-DE' : 'en-GB', {
      dateStyle: 'long',
    }).format(new Date(`${value}T12:00:00`));
  }

  protected image(src: string | null): string | null {
    return privateImage(src);
  }

  private async load(): Promise<void> {
    try {
      const feed = await loadOrRedirect(this.router, '/privat', () => this.content.feed());
      if (feed) {
        this.updates.set(feed.updates);
      }
    } catch {
      this.failed.set(true);
    }
  }
}

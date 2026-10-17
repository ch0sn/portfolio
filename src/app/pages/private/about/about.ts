import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../../../core/i18n/language';
import { Seo } from '../../../core/seo/seo';
import { PrivateText, PrivateContent, loadOrRedirect } from '../private-content';

@Component({
  selector: 'app-private-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  host: { class: 'page page-narrow' },
})
export class PrivateAbout {
  private readonly content = inject(PrivateContent);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly paragraphs = signal<readonly PrivateText[] | null>(null);
  protected readonly failed = signal(false);

  constructor() {
    effect(() => {
      const page = this.messages().private;
      this.seo.apply(page.aboutTitle, page.aboutIntro, 'noindex, nofollow');
    });
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      const about = await loadOrRedirect(this.router, '/privat/ueber-mich', () => this.content.about());
      if (about) {
        this.paragraphs.set(about.paragraphs);
      }
    } catch {
      this.failed.set(true);
    }
  }
}

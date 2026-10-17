import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Language } from '../../../core/i18n/language';
import { Seo } from '../../../core/seo/seo';
import { PrivateContent, PrivatePostSummary, loadOrRedirect } from '../private-content';

@Component({
  selector: 'app-private-blog-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './blog-list.html',
  host: { class: 'page page-narrow' },
})
export class PrivateBlogList {
  private readonly content = inject(PrivateContent);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly posts = signal<readonly PrivatePostSummary[] | null>(null);
  protected readonly failed = signal(false);

  constructor() {
    effect(() => {
      const page = this.messages().private;
      this.seo.apply(page.blogTitle, page.blogIntro, 'noindex, nofollow');
    });
    void this.load();
  }

  protected textDate(value: string): string {
    return new Intl.DateTimeFormat(this.language.locale() === 'de' ? 'de-DE' : 'en-GB', {
      dateStyle: 'long',
    }).format(new Date(`${value}T12:00:00`));
  }

  private async load(): Promise<void> {
    try {
      const index = await loadOrRedirect(this.router, '/privat/blog', () => this.content.posts());
      if (index) {
        this.posts.set(index.posts);
      }
    } catch {
      this.failed.set(true);
    }
  }
}

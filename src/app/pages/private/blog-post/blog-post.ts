import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Language } from '../../../core/i18n/language';
import { Seo } from '../../../core/seo/seo';
import { readFrontMatter, renderPrivateMarkdown } from '../../../../server/private-markdown';
import { PrivateContent, loadOrRedirect } from '../private-content';

@Component({
  selector: 'app-private-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './blog-post.html',
  host: { class: 'page page-narrow' },
})
export class PrivateBlogPost {
  private readonly content = inject(PrivateContent);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  private readonly params = toSignal(this.route.paramMap);
  private readonly source = signal<string | null>(null);
  protected readonly failed = signal(false);
  protected readonly meta = computed(() => {
    const source = this.source();
    return source ? readFrontMatter(source) : null;
  });
  protected readonly html = computed(() => {
    const source = this.source();
    return source ? renderPrivateMarkdown(source, this.language.locale()) : '';
  });

  constructor() {
    effect(() => {
      const page = this.messages().private;
      const meta = this.meta();
      const title = this.language.locale() === 'de' ? meta?.titleDe : meta?.titleEn;
      this.seo.apply(title || page.blogTitle, page.blogIntro, 'noindex, nofollow');
    });
    effect(() => {
      const slug = this.params()?.get('slug');
      if (slug) {
        void this.load(slug);
      }
    });
  }

  protected textDate(value: string): string {
    return new Intl.DateTimeFormat(this.language.locale() === 'de' ? 'de-DE' : 'en-GB', {
      dateStyle: 'long',
    }).format(new Date(`${value}T12:00:00`));
  }

  private async load(slug: string): Promise<void> {
    this.failed.set(false);
    try {
      const source = await loadOrRedirect(this.router, `/privat/blog/${slug}`, () => this.content.post(slug));
      if (source) {
        this.source.set(source);
      }
    } catch {
      this.failed.set(true);
    }
  }
}

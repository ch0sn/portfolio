import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Language } from '../../core/i18n/language';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  host: { class: 'page page-narrow' },
})
export class NotFound {
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;

  constructor() {
    effect(() => {
      const page = this.messages().notFound;
      this.seo.apply(page.metaTitle, page.metaDescription);
    });
  }
}

import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { portfolio } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  host: { class: 'page page-narrow' },
})
export class About {
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly profile = portfolio.profile;

  constructor() {
    effect(() => {
      const page = this.messages().about;
      this.seo.apply(page.metaTitle, page.metaDescription);
    });
  }
}

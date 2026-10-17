import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { portfolio } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  host: { class: 'page page-narrow' },
})
export class Contact {
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly profile = portfolio.profile;

  constructor() {
    effect(() => {
      const page = this.messages().contact;
      this.seo.apply(page.metaTitle, page.metaDescription);
    });
  }
}

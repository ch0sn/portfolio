import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolio } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly profile = portfolio.profile;
  protected readonly year = new Date().getFullYear();
}

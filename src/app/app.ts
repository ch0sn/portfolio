import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from './core/i18n/language';
import { Theme } from './core/theme/theme';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './app.html',
  host: { class: 'app-shell' },
})
export class App {
  private readonly language = inject(Language);
  private readonly theme = inject(Theme);
  protected readonly messages = this.language.messages;

  constructor() {
    afterNextRender(() => {
      this.language.restore();
      this.theme.restore();
    });
  }
}

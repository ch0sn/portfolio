import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { portfolio } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';
import { Locale } from '../../core/i18n/localize';
import { ColorScheme, Theme } from '../../core/theme/theme';

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly language = inject(Language);
  protected readonly theme = inject(Theme);
  protected readonly messages = this.language.messages;
  protected readonly profile = portfolio.profile;
  protected readonly menuOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.closeMenu());
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected choose(locale: Locale): void {
    this.language.use(locale);
  }

  protected themeLabel(): string {
    const scheme = this.theme.scheme();
    const nav = this.messages().nav;
    switch (scheme) {
      case 'dark':
        return nav.themeToLight;
      case 'light':
        return nav.themeToDark;
      default: {
        const unknown: never = scheme;
        return unknown;
      }
    }
  }

  protected pressed(scheme: ColorScheme): boolean {
    return this.theme.scheme() === scheme;
  }
}

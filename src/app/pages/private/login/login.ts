import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from '../../../core/i18n/language';
import { Seo } from '../../../core/seo/seo';
import { safeNextPath } from '../../../../server/safe-next';

type LoginError = 'wrong' | 'unavailable';

@Component({
  selector: 'app-private-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  host: { class: 'page page-narrow' },
})
export class PrivateLogin {
  private readonly seo = inject(Seo);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly password = signal('');
  protected readonly pending = signal(false);
  protected readonly error = signal<LoginError | null>(null);

  constructor() {
    effect(() => {
      const page = this.messages().private;
      this.seo.apply(page.loginTitle, page.loginIntro, 'noindex, nofollow');
    });
  }

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    this.error.set(null);
    this.pending.set(true);
    try {
      const response = await fetch('/privat/anmelden', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ password: this.password() }),
      });
      if (response.ok) {
        await this.router.navigateByUrl(safeNextPath(this.route.snapshot.queryParamMap.get('next')));
        return;
      }
      this.error.set(response.status === 503 ? 'unavailable' : 'wrong');
    } catch {
      this.error.set('unavailable');
    } finally {
      this.pending.set(false);
    }
  }
}

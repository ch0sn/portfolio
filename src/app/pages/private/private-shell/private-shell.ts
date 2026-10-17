import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Language } from '../../../core/i18n/language';

@Component({
  selector: 'app-private-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './private-shell.html',
})
export class PrivateShell {
  private readonly router = inject(Router);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly pending = signal(false);

  protected async logout(): Promise<void> {
    this.pending.set(true);
    try {
      await fetch('/privat/abmelden', { method: 'POST', credentials: 'same-origin' });
    } finally {
      this.pending.set(false);
      await this.router.navigateByUrl('/privat/anmelden');
    }
  }
}

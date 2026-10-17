import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Project, ProjectId, ProjectShot } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';

type HeadingLevel = 'h2' | 'h3';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.html',
})
export class ProjectCard {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  readonly project = input.required<Project>();
  readonly level = input<HeadingLevel>('h2');
  /** Projects page shows the extra shots and a lightbox. Home keeps the cover only. */
  readonly gallery = input(false);

  protected readonly lightboxIndex = signal<number | null>(null);
  private returnFocus: HTMLElement | null = null;
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private readonly dialog = viewChild<ElementRef<HTMLElement>>('dialog');

  protected readonly coverShot = computed(() => this.project().shots[0] ?? null);
  protected readonly extraShots = computed(() => this.project().shots.slice(1));
  protected readonly activeShot = computed(() => {
    const index = this.lightboxIndex();
    if (index === null) {
      return null;
    }
    return this.project().shots[index] ?? null;
  });

  constructor() {
    effect((onCleanup) => {
      const open = this.lightboxIndex() !== null;
      if (!isPlatformBrowser(this.platformId) || !open) {
        return;
      }
      document.body.classList.add('lightbox-open');
      onCleanup(() => document.body.classList.remove('lightbox-open'));
    });

    effect(() => {
      const open = this.lightboxIndex() !== null;
      const button = this.closeButton();
      if (!open || !button) {
        return;
      }
      button.nativeElement.focus();
    });
  }

  protected isSubheading(): boolean {
    const level = this.level();
    switch (level) {
      case 'h2':
        return false;
      case 'h3':
        return true;
      default: {
        const unknown: never = level;
        return unknown;
      }
    }
  }

  protected cover(id: ProjectId): ProjectId {
    switch (id) {
      case 'kin-graph':
      case 'kostenplan':
      case 'realqa':
        return id;
      default: {
        const unknown: never = id;
        return unknown;
      }
    }
  }

  protected shotLabel(shot: ProjectShot): string {
    return `${this.messages().projects.enlargeShot}. ${this.language.text(shot.alt)}`;
  }

  protected shotPosition(): string {
    const index = this.lightboxIndex();
    if (index === null) {
      return '';
    }
    return this.messages()
      .projects.shotPosition.replaceAll('{current}', String(index + 1))
      .replaceAll('{total}', String(this.project().shots.length));
  }

  protected open(index: number, event: Event): void {
    this.returnFocus = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    this.lightboxIndex.set(index);
  }

  protected close(): void {
    this.lightboxIndex.set(null);
    const target = this.returnFocus;
    this.returnFocus = null;
    target?.focus();
  }

  protected step(delta: number): void {
    const current = this.lightboxIndex();
    const total = this.project().shots.length;
    if (current === null || total === 0) {
      return;
    }
    this.lightboxIndex.set((current + delta + total) % total);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (this.lightboxIndex() === null) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.step(1);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.step(-1);
      return;
    }
    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const root = this.dialog()?.nativeElement;
    if (!root) {
      return;
    }
    const items = [...root.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')].filter(
      (item) => !item.hasAttribute('disabled'),
    );
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) {
      return;
    }
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }
    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { portfolio } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';
import { Seo } from '../../core/seo/seo';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCard],
  templateUrl: './projects.html',
  host: { class: 'page' },
})
export class Projects {
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly projects = portfolio.projects;

  constructor() {
    effect(() => {
      const page = this.messages().projects;
      this.seo.apply(page.metaTitle, page.metaDescription);
    });
  }
}

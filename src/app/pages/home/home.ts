import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolio } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';
import { Seo } from '../../core/seo/seo';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ProjectCard],
  templateUrl: './home.html',
  host: { class: 'page' },
})
export class Home {
  private readonly seo = inject(Seo);
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  protected readonly profile = portfolio.profile;
  protected readonly featured = portfolio.projects.filter((project) => project.featured);

  constructor() {
    effect(() => {
      const home = this.messages().home;
      this.seo.apply(home.metaTitle, home.metaDescription);
    });
  }
}

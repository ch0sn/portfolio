import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Project, ProjectId } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';

type HeadingLevel = 'h2' | 'h3';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.html',
})
export class ProjectCard {
  protected readonly language = inject(Language);
  protected readonly messages = this.language.messages;
  readonly project = input.required<Project>();
  readonly level = input<HeadingLevel>('h2');

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
      case 'gtkeo':
      case 'uni-web':
        return id;
      default: {
        const unknown: never = id;
        return unknown;
      }
    }
  }

  protected shotAlt(): string {
    return this.messages().projects.shotAlt.replaceAll('{title}', this.project().title);
  }
}

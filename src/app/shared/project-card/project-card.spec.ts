import { TestBed } from '@angular/core/testing';
import { portfolio } from '../../core/data/portfolio.data';
import { Language } from '../../core/i18n/language';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  const kinGraph = portfolio.projects[0];
  const kostenplan = portfolio.projects[1];

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
    }).compileComponents();
  });

  it('opens the screenshot gallery and hides a missing live demo', async () => {
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', kinGraph);
    fixture.componentRef.setInput('gallery', true);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).not.toContain('Live-Demo');
    expect(element.querySelector('.shot-open img')?.getAttribute('src')).toBe(kinGraph.shots[0]?.src);
    expect(element.querySelector('.project-logo')?.getAttribute('alt')).toBe('kin-graph App-Icon');
    const language = TestBed.inject(Language);
    language.use('en');
    fixture.detectChanges();
    expect(element.querySelector('.project-logo')?.getAttribute('alt')).toBe('kin-graph app icon');
    language.use('de');
    fixture.detectChanges();
    const thumbs = element.querySelectorAll('.shot-gallery button');
    expect(thumbs).toHaveLength(3);

    (thumbs[0] as HTMLButtonElement).click();
    await fixture.whenStable();
    const dialog = element.querySelector('[role="dialog"]');
    expect(dialog?.textContent).toContain('Zeitstrahl');
    expect(dialog?.textContent).toContain('Beispieldaten');

    const next = dialog?.querySelectorAll('.lightbox-nav button')[1] as HTMLButtonElement;
    next.click();
    await fixture.whenStable();
    expect(element.querySelector('[role="dialog"]')?.textContent).toContain('Formular');

    (element.querySelector('.lightbox-close') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(element.querySelector('[role="dialog"]')).toBeNull();
  });

  it('keeps the drawn cover when a project has no screenshots', async () => {
    const fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', { ...kostenplan, shots: [] });
    fixture.componentRef.setInput('gallery', true);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.poster')).toBeTruthy();
    expect(element.querySelector('.shot-gallery')).toBeNull();
    expect(element.querySelector('.project-links a[href^="http"]')?.getAttribute('href')).toBe(
      'https://github.com/ch0sn/budget-app',
    );
  });
});

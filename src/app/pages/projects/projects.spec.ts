import { TestBed } from '@angular/core/testing';
import { Projects } from './projects';

describe('Projects', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();
  });

  it('renders a card for each known project', async () => {
    const fixture = TestBed.createComponent(Projects);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll('article');
    expect(cards).toHaveLength(3);
    const kinGraph = element.querySelector('a[href="https://github.com/ch0sn/kin-graph"]');
    expect(kinGraph).toBeTruthy();
    expect(element.textContent).toContain('Privates Repository');
    expect(element.textContent).toContain('Eigenes Projekt, alleine konzipiert und entwickelt');
    expect(element.textContent).toContain('realQ&A');
    expect(element.textContent).toContain('React Native');
    expect(element.textContent).not.toContain('GTKEO');
    expect(element.textContent).not.toContain('Live-Demo');
    const logos = [...element.querySelectorAll('.project-logo')].map((img) => img.getAttribute('alt'));
    expect(logos).toEqual(['kin-graph App-Icon', 'Kostenplan App-Icon', 'realQ&A App-Icon']);
    const cover = element.querySelector('.shot-open');
    expect(cover?.getAttribute('aria-label')).toContain('vier Generationen');
    expect(element.querySelectorAll('.shot-gallery button')).toHaveLength(9);
    expect(element.querySelectorAll('.poster')).toHaveLength(0);
    expect(element.textContent).toContain('Mobile-App in Entwicklung');
    expect(element.textContent).toContain('Flutter');
    const labels = [...element.querySelectorAll('.shot-open, .shot-gallery button')].map((button) =>
      button.getAttribute('aria-label'),
    );
    expect(labels.some((label) => label?.includes('Solo, Friends und Couple'))).toBe(true);
    expect(labels.some((label) => label?.includes('Seitenmenü'))).toBe(true);
    expect(labels.join(' ')).not.toContain('GTKEO');
    expect(element.textContent).not.toContain('Web-Technologien');
  });
});

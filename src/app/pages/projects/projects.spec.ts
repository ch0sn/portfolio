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
    expect(element.textContent).toContain('Flutter');
    expect(element.textContent).not.toContain('Web-Technologien');
  });
});

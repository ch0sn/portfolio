import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Language } from '../../core/i18n/language';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('shows the recruiter hero and switches language', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Sontek Daniel Cho');
    expect(element.textContent).toContain('Frontend-Entwickler');
    expect(element.textContent).toContain('Angular & TypeScript');
    expect(element.textContent).toContain('kin-graph');

    TestBed.inject(Language).use('en');
    fixture.detectChanges();
    expect(element.textContent).toContain('Frontend Developer');
    expect(element.textContent).toContain('View projects');
  });
});

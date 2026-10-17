import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.lang = 'de';
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('renders the shell and the German home page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.querySelector('main')?.id).toBe('content');
    expect(compiled.querySelector('footer')).toBeTruthy();
    expect(compiled.textContent).toContain('Sontek Daniel Cho');
    expect(compiled.textContent).toContain('Frontend-Entwickler');
    expect(compiled.innerHTML).not.toContain('/privat');
  });
});

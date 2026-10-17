import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PrivateLogin } from './login';

describe('PrivateLogin', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [PrivateLogin],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('asks for a password and does not link into the public site navigation', async () => {
    const fixture = TestBed.createComponent(PrivateLogin);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('input[type="password"]')).toBeTruthy();
    expect(element.textContent).toContain('Privater Bereich');
    expect(element.innerHTML).not.toContain('href="/projects"');
    expect(element.querySelector('meta')).toBeNull();
  });
});

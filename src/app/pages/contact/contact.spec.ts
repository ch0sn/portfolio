import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();
  });

  it('links GitHub and the CV placeholder', async () => {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const github = element.querySelector('a[href="https://github.com/ch0sn"]');
    const cv = element.querySelector('a[href="/cv/sontek-daniel-cho-cv.pdf"]');
    expect(github).toBeTruthy();
    expect(cv).toBeTruthy();
    expect(element.textContent).toContain('public/cv/sontek-daniel-cho-cv.pdf');
  });
});
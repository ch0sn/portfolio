import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();
  });

  it('links email, LinkedIn, and GitHub', async () => {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('a[href="mailto:sontekdaniel@hotmail.com"]')).toBeTruthy();
    expect(
      element.querySelector('a[href="https://www.linkedin.com/in/sontek-daniel-cho-548243149"]'),
    ).toBeTruthy();
    expect(element.querySelector('a[href="https://github.com/ch0sn"]')).toBeTruthy();
    expect(element.querySelector('a[download]')).toBeNull();
    expect(element.textContent).not.toContain('Lebenslauf');
  });
});

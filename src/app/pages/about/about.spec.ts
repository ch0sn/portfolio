import { TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();
  });

  it('shows education, BMW, and the core skills', async () => {
    const fixture = TestBed.createComponent(About);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Wirtschaftsinformatik');
    expect(text).toContain('Universität Mannheim');
    expect(text).toContain('BMW');
    expect(text).toContain('Angular');
    expect(text).toContain('REST-APIs');
  });
});

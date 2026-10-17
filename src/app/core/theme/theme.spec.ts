import { TestBed } from '@angular/core/testing';
import { Theme } from './theme';

describe('Theme', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
    TestBed.configureTestingModule({});
  });

  it('toggles between light and dark', () => {
    const theme = TestBed.inject(Theme);
    theme.toggle();
    expect(theme.scheme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('portfolio.theme')).toBe('dark');

    theme.toggle();
    expect(theme.scheme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});

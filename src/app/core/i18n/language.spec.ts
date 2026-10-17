import { TestBed } from '@angular/core/testing';
import { Language } from './language';

describe('Language', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'de';
    TestBed.configureTestingModule({});
  });

  it('defaults to German', () => {
    const language = TestBed.inject(Language);
    expect(language.locale()).toBe('de');
    expect(language.messages().nav.home).toBe('Start');
  });

  it('switches to English and remembers the choice', () => {
    const language = TestBed.inject(Language);
    language.use('en');
    expect(language.locale()).toBe('en');
    expect(language.messages().home.role).toBe('Frontend Developer');
    expect(localStorage.getItem('portfolio.lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('restores a stored locale and ignores unknown values', () => {
    localStorage.setItem('portfolio.lang', 'fr');
    const language = TestBed.inject(Language);
    language.restore();
    expect(language.locale()).toBe('de');

    localStorage.setItem('portfolio.lang', 'en');
    language.restore();
    expect(language.locale()).toBe('en');
    expect(language.text({ de: 'Projekte', en: 'Projects' })).toBe('Projects');
  });
});

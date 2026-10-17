import { routes } from './app.routes';

describe('routes', () => {
  it('lazy-loads every page and keeps the site public', () => {
    const paths = routes.map((route) => route.path);
    expect(paths).toEqual(['', 'projects', 'about', 'contact', '**']);
    for (const route of routes) {
      expect(route.loadComponent).toEqual(expect.any(Function));
    }
    expect(paths).not.toContain('employer');
    expect(paths).not.toContain('personal');
  });
});

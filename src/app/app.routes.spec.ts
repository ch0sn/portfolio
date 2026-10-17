import { routes } from './app.routes';

describe('routes', () => {
  it('lazy-loads every page and keeps private routes out of the old public areas', () => {
    const paths = routes.map((route) => route.path);
    expect(paths).toEqual(['', 'projects', 'about', 'contact', 'privat/anmelden', 'privat', '**']);
    for (const route of routes) {
      expect(route.loadComponent).toEqual(expect.any(Function));
    }
    const privat = routes.find((route) => route.path === 'privat');
    expect(privat?.children?.map((route) => route.path)).toEqual(['', 'ueber-mich', 'blog', 'blog/:slug']);
    expect(paths).not.toContain('employer');
    expect(paths).not.toContain('personal');
  });
});

import { portfolio } from './portfolio.data';

describe('portfolio data', () => {
  it('keeps the known profile facts', () => {
    expect(portfolio.profile.name).toBe('Sontek Daniel Cho');
    expect(portfolio.profile.github).toBe('https://github.com/ch0sn');
    expect(portfolio.profile.cv.href).toBe('/cv/sontek-daniel-cho-cv.pdf');
    expect(portfolio.profile.experience.map((job) => job.organization)).toContain('BMW');
    const skillItems = portfolio.profile.skills.flatMap((group) => group.items);
    expect(skillItems).toEqual(expect.arrayContaining(['Angular', 'TypeScript', 'PostgreSQL', 'Docker', 'Java']));
  });

  it('lists the four known projects without invented links', () => {
    expect(portfolio.projects.map((project) => project.id)).toEqual([
      'kin-graph',
      'kostenplan',
      'gtkeo',
      'uni-web',
    ]);
    const byId = new Map(portfolio.projects.map((project) => [project.id, project]));
    expect(byId.get('kin-graph')?.githubUrl).toBe('https://github.com/ch0sn/kin-graph');
    expect(byId.get('kostenplan')?.githubUrl).toBe('https://github.com/ch0sn/budget-app');
    expect(byId.get('kostenplan')?.technologies).toContain('Flutter');
    expect(byId.get('gtkeo')?.githubUrl).toBeNull();
    expect(byId.get('uni-web')?.githubUrl).toBe('https://github.com/ch0sn/Web-App-Uni-Projekt_08');
    expect(portfolio.profile.email === null || portfolio.profile.email.includes('@')).toBe(true);
  });
});

import { portfolio } from './portfolio.data';

describe('portfolio data', () => {
  const serialized = JSON.stringify(portfolio);

  it('keeps the verified profile facts', () => {
    expect(portfolio.profile.name).toBe('Sontek Daniel Cho');
    expect(portfolio.profile.email).toBe('sontekdaniel@hotmail.com');
    expect(portfolio.profile.linkedin).toBe(
      'https://www.linkedin.com/in/sontek-daniel-cho-548243149',
    );
    expect(portfolio.profile.github).toBe('https://github.com/ch0sn');
    expect(portfolio.profile.location.de).toBe('Mainz-Kastel');
    expect(portfolio.profile.experience.map((job) => job.organization)).toEqual([
      'BMW Group',
      'Nintendo Europe',
    ]);
    const skillItems = portfolio.profile.skills.flatMap((group) => group.items);
    expect(skillItems).toEqual(
      expect.arrayContaining(['Angular', 'TypeScript', 'PostgreSQL', 'Docker', 'Java', 'Figma']),
    );
    expect(serialized).not.toContain('Spring Boot');
    expect(serialized).not.toContain('Java EE');
  });

  it('lists the four known projects without invented links', () => {
    expect(portfolio.projects.map((project) => project.id)).toEqual([
      'kin-graph',
      'kostenplan',
      'gtkeo',
    ]);
    const byId = new Map(portfolio.projects.map((project) => [project.id, project]));
    expect(byId.get('kin-graph')?.githubUrl).toBe('https://github.com/ch0sn/kin-graph');
    expect(byId.get('kostenplan')?.githubUrl).toBe('https://github.com/ch0sn/budget-app');
    expect(byId.get('gtkeo')?.githubUrl).toBeNull();
    expect(byId.get('gtkeo')?.role?.de).toBe('Eigenes Projekt, alleine konzipiert und entwickelt');
    expect(byId.get('gtkeo')?.role?.en).toBe('Solo project, designed and built on my own');
    expect(byId.get('gtkeo')?.summary.de).toContain('Get To Know Each Other');
    expect(portfolio.projects.every((project) => project.liveUrl === null)).toBe(true);
    expect(portfolio.projects.every((project) => project.screenshot === null)).toBe(true);
  });
});

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

  it('lists the known projects without invented links', () => {
    expect(portfolio.projects.map((project) => project.id)).toEqual([
      'kin-graph',
      'kostenplan',
      'realqa',
    ]);
    const byId = new Map(portfolio.projects.map((project) => [project.id, project]));
    expect(byId.get('kin-graph')?.githubUrl).toBe('https://github.com/ch0sn/kin-graph');
    expect(byId.get('kin-graph')?.logo).toBe('/assets/logos/kin-graph.svg');
    expect(byId.get('kostenplan')?.logo).toBe('/assets/logos/kostenplan.svg');
    expect(byId.get('realqa')?.logo).toBe('/assets/logos/realqa.svg');
    expect(byId.get('kostenplan')?.githubUrl).toBe('https://github.com/ch0sn/budget-app');
    const realQa = byId.get('realqa');
    expect(realQa?.title).toBe('realQ&A');
    expect(realQa?.githubUrl).toBeNull();
    expect(realQa?.role?.de).toBe('Eigenes Projekt, alleine konzipiert und entwickelt');
    expect(realQa?.role?.en).toBe('Solo project, designed and built on my own');
    expect(realQa?.technologies).toEqual(['TypeScript', 'React Native', 'Expo', 'iOS']);
    expect(realQa?.summary.de).toContain('Tiefenstufen');
    expect(realQa?.summary.en).toContain('depth levels');
    expect(portfolio.projects.every((project) => project.liveUrl === null)).toBe(true);
    const kinGraph = byId.get('kin-graph');
    expect(kinGraph?.shots.map((shot) => shot.src)).toEqual([
      '/projects/kin-graph/kin-graph-1.webp',
      '/projects/kin-graph/kin-graph-2.webp',
      '/projects/kin-graph/kin-graph-3.webp',
      '/projects/kin-graph/kin-graph-4.webp',
    ]);
    expect(kinGraph?.shots.every((shot) => shot.alt.de.includes('Beispieldaten'))).toBe(true);
    expect(kinGraph?.shots.every((shot) => shot.alt.en.includes('sample data'))).toBe(true);
    const kostenplan = byId.get('kostenplan');
    expect(kostenplan?.technologies).toEqual(['Flutter', 'Web']);
    expect(kostenplan?.status?.de).toBe('Mobile-App in Entwicklung');
    expect(kostenplan?.status?.en).toBe('Mobile app in development');
    expect(kostenplan?.summary.en).toContain('web version');
    expect(kostenplan?.shots.map((shot) => shot.src)).toEqual([
      '/projects/kostenplan/kostenplan-4.webp',
      '/projects/kostenplan/kostenplan-web-2.webp',
      '/projects/kostenplan/kostenplan-web-3.webp',
      '/projects/kostenplan/kostenplan-web-4.webp',
    ]);
    expect(kostenplan?.shots.every((shot) => shot.width === 1440 && shot.height === 900)).toBe(true);
    expect(kostenplan?.shots.every((shot) => shot.alt.de.includes('Desktop'))).toBe(true);
    expect(kostenplan?.shots.every((shot) => shot.alt.en.includes('sample data'))).toBe(true);
    expect(realQa?.shots.map((shot) => shot.src)).toEqual([
      '/projects/realqa/realqa-1.webp',
      '/projects/realqa/realqa-2.webp',
      '/projects/realqa/realqa-3.webp',
      '/projects/realqa/realqa-4.webp',
    ]);
    expect(realQa?.shots.every((shot) => shot.alt.de.includes('Beispieldaten'))).toBe(true);
    expect(realQa?.shots.every((shot) => shot.alt.en.includes('sample data'))).toBe(true);
    expect(serialized).not.toContain('GTKEO');
    expect(serialized).not.toContain('gtkeo');
  });
});

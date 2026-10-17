import { readFrontMatter, renderPrivateMarkdown } from './private-markdown';

const SOURCE = `---
title_de: Beispielbeitrag
title_en: Example post
date: 2026-03-01
---
:::de
Dies ist ein **Beispiel**.

- Erster Punkt
- Zweiter Punkt

<script>alert(1)</script>
:::en
This is an *example*.

[Sicher](https://example.com) und [Unsicher](javascript:alert(1))
`;

describe('private markdown', () => {
  it('reads the title fields', () => {
    expect(readFrontMatter(SOURCE)).toEqual({
      titleDe: 'Beispielbeitrag',
      titleEn: 'Example post',
      date: '2026-03-01',
    });
  });

  it('renders only the requested language and escapes raw html', () => {
    const german = renderPrivateMarkdown(SOURCE, 'de');
    expect(german).toContain('<strong>Beispiel</strong>');
    expect(german).toContain('<li>Erster Punkt</li>');
    expect(german).toContain('&lt;script&gt;');
    expect(german).not.toContain('<script>');
    expect(german).not.toContain('example');

    const english = renderPrivateMarkdown(SOURCE, 'en');
    expect(english).toContain('<em>example</em>');
    expect(english).toContain('<a href="https://example.com">Sicher</a>');
    expect(english).not.toContain('javascript:');
    expect(english).toContain('Unsicher');
  });
});

export interface PrivatePostMeta {
  readonly titleDe: string;
  readonly titleEn: string;
  readonly date: string;
}

export function readFrontMatter(source: string): PrivatePostMeta {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  const fields = new Map<string, string>();
  if (match?.[1]) {
    for (const line of match[1].split('\n')) {
      const index = line.indexOf(':');
      if (index === -1) {
        continue;
      }
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      if (key) {
        fields.set(key, value);
      }
    }
  }
  return {
    titleDe: fields.get('title_de') ?? '',
    titleEn: fields.get('title_en') ?? '',
    date: fields.get('date') ?? '',
  };
}

export function renderPrivateMarkdown(source: string, locale: 'de' | 'en'): string {
  const body = localeSection(source, locale);
  return renderBlocks(body);
}

function localeSection(source: string, locale: 'de' | 'en'): string {
  const withoutFrontMatter = source.replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, '');
  const marker = `:::${locale}`;
  const start = withoutFrontMatter.indexOf(marker);
  if (start === -1) {
    return '';
  }
  const rest = withoutFrontMatter.slice(start + marker.length).replace(/^\r?\n/, '');
  const end = rest.search(/\n:::(?:de|en)\b/);
  return (end === -1 ? rest : rest.slice(0, end)).trim();
}

function renderBlocks(source: string): string {
  const lines = source.split('\n');
  const html: string[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index] ?? '';
    if (line.trim() === '') {
      index += 1;
      continue;
    }
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && (lines[index] ?? '').startsWith('- ')) {
        items.push(`<li>${inline((lines[index] ?? '').slice(2).trim())}</li>`);
        index += 1;
      }
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading?.[1] && heading[2]) {
      const level = heading[1].length + 1;
      html.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
      index += 1;
      continue;
    }
    const paragraph: string[] = [];
    while (index < lines.length) {
      const current = lines[index] ?? '';
      if (current.trim() === '' || current.startsWith('- ') || /^(#{1,3})\s+/.test(current)) {
        break;
      }
      paragraph.push(current.trim());
      index += 1;
    }
    html.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }
  return html.join('');
}

function inline(value: string): string {
  const escaped = value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
  return escaped
    .replaceAll(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label: string, href: string) => {
      if (!safeHref(href)) {
        return label;
      }
      return `<a href="${href}">${label}</a>`;
    })
    .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replaceAll(/\*([^*]+)\*/g, '<em>$1</em>');
}

function safeHref(href: string): boolean {
  return href.startsWith('/privat/') || href.startsWith('https://');
}

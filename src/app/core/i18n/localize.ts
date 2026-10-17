export type Locale = 'de' | 'en';

export interface LocalizedText {
  readonly de: string;
  readonly en: string;
}

export function localize(value: LocalizedText, locale: Locale): string {
  switch (locale) {
    case 'de':
      return value.de;
    case 'en':
      return value.en;
    default: {
      const unknown: never = locale;
      return unknown;
    }
  }
}

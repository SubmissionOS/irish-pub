import de from '../content/de.json';
import en from '../content/en.json';

export type Lang = 'de' | 'en';
export type Dict = typeof de;
export const langs: Lang[] = ['de', 'en'];

export const pageKeys = [
  'start', 'live-sport', 'live-musik', 'pub-quiz', 'getraenke', 'speisen',
  'ueber-uns', 'auszeichnungen-presse', 'galerie', 'kontakt-anfahrt', 'impressum', 'datenschutz',
] as const;
export type PageKey = (typeof pageKeys)[number];

export const mainNav: PageKey[] = pageKeys.filter((k) => k !== 'impressum' && k !== 'datenschutz');
export const legalNav: PageKey[] = ['impressum', 'datenschutz'];

const dicts = { de, en: en as Dict };
export const t = (lang: Lang): Dict => dicts[lang];

export function href(lang: Lang, key: PageKey): string {
  const prefix = lang === 'en' ? '/en' : '';
  return key === 'start' ? `${prefix}/` : `${prefix}/${key}/`;
}

export function pathParam(lang: Lang, key: PageKey): string | undefined {
  const parts = [lang === 'en' ? 'en' : '', key === 'start' ? '' : key].filter(Boolean);
  return parts.length ? parts.join('/') : undefined;
}

export const fmtTime = (min: number) => {
  const m = min % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

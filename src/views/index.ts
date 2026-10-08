// Zuordnung Seitenschlüssel -> View-Komponente. Eigenes Modul, damit getStaticPaths es sauber importieren kann.
import type { PageKey } from '../lib/i18n';
import Start from './Start.astro';

export const views: Partial<Record<PageKey, any>> = {
  start: Start,
};

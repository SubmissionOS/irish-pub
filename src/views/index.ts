// Zuordnung Seitenschlüssel -> View-Komponente. Eigenes Modul, damit getStaticPaths es sauber importieren kann.
import type { PageKey } from '../lib/i18n';
import Start from './Start.astro';
import Sport from './Sport.astro';
import Musik from './Musik.astro';
import Quiz from './Quiz.astro';
import Getraenke from './Getraenke.astro';
import Speisen from './Speisen.astro';
import UeberUns from './UeberUns.astro';
import Presse from './Presse.astro';
import Galerie from './Galerie.astro';
import Kontakt from './Kontakt.astro';
import Impressum from './Impressum.astro';
import Datenschutz from './Datenschutz.astro';

export const views: Record<PageKey, any> = {
  start: Start,
  'live-sport': Sport,
  'live-musik': Musik,
  'pub-quiz': Quiz,
  getraenke: Getraenke,
  speisen: Speisen,
  'ueber-uns': UeberUns,
  'auszeichnungen-presse': Presse,
  galerie: Galerie,
  'kontakt-anfahrt': Kontakt,
  impressum: Impressum,
  datenschutz: Datenschutz,
};

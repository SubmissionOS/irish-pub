import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.irishpub-fleetenkieker.de',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-GB' } },
    }),
  ],
});

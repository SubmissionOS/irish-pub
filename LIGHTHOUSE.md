# Lighthouse

Gemessen am 8. Oktober 2026 lokal mit `astro preview` und Lighthouse (Chromium headless). Skript: `node scripts/lighthouse.mjs <label>` (braucht `CHROME_PATH` und einen laufenden Preview-Server auf :4321). Die JSON-Rohdaten liegen in `lh/` und werden nicht committet.

Werte: Performance / Barrierefreiheit / Best Practices / SEO

| Seite | Mobil vorher | Mobil nachher | Desktop vorher | Desktop nachher |
|---|---|---|---|---|
| Start | 97 / 100 / 100 / 66 | 99 / 100 / 100 / 69 | 100 / 100 / 100 / 66 | 100 / 100 / 100 / 69 |
| Getränke | 97 / 100 / 100 / 69 | 99 / 100 / 100 / 69 | 99 / 100 / 100 / 69 | 100 / 100 / 100 / 69 |
| Galerie | 79 / 100 / 100 / 69 | 98 / 100 / 100 / 69 | 92 / 100 / 100 / 69 | 100 / 100 / 100 / 69 |
| Kontakt | 97 / 100 / 100 / 66 | 100 / 100 / 100 / 66 | 100 / 100 / 100 / 66 | 100 / 100 / 100 / 66 |

## SEO mit und ohne Entwurfs-Flag

Solange `draft: true` in `src/content/site.json` steht, trägt jede Seite `noindex, nofollow`. Lighthouse wertet das als „blocked from indexing“, deshalb liegt SEO bei 66 bis 69. Gegenprobe mit `PUBLIC_DRAFT=false npx astro build`: **SEO 100 auf allen vier Seiten, mobil und Desktop.** Im Repo bleibt das Flag auf noindex.

## Was die Werte verbessert hat

- Fotos lokal in `src/assets/pub` statt Hotlinks, ausgeliefert als AVIF/WebP mit srcset und nie breiter als die Quelle. Das erste Galeriebild lädt sofort mit `fetchpriority="high"` (vorher lazy, daher Galerie mobil 79).
- Presse-Vorschaubilder entfernt.
- Drei Schriftdateien (nur Latin), zwei davon vorgeladen, Fallback-Metriken gegen Layoutsprünge.
- SVG-Rauschfilter durch zwei kleine statische PNGs ersetzt, mobil ganz ohne Rauschen und mit leichteren Schatten.
- `build.inlineStylesheets: 'auto'`.
- Marke in der Leiste ohne abweichendes `aria-label` (Audit label-content-name-mismatch).

## Kontraste (WCAG)

| Paar | Verhältnis |
|---|---|
| Messing #c8a05a auf Mahagoni #2a1611 | 7,1 : 1 |
| Messing hell #dcbc7d auf Mahagoni | 9,4 : 1 |
| Kreide #e9e4d8 auf Schiefer #17211f | 13,0 : 1 |
| Fleetgrau #8da39b auf Schiefer | 6,2 : 1 |
| Fleetgrau auf Mahagoni | 6,4 : 1 |
| Mahagoni auf Messing (Buttons) | 7,1 : 1 |
| Kreide auf Flaschengrün #1f4a3a | 7,9 : 1 |

## Hosting-Header

Die Hosting-Plattform ist nicht erkennbar. Deshalb gibt es keine `_headers`, `vercel.json` oder `netlify.toml`.

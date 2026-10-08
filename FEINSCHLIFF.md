# Feinschliff

Ausgangsstand: Tag `vor-feinschliff`. Alles zurück: `git reset --hard vor-feinschliff`.

| Teil | Inhalt | Commit | Zurücknehmen |
|---|---|---|---|
| 1 Bilder | Große cache_-Dateien statt thumb_, echte Pixelmaße, nie breiter als die Quelle, Fallback als Holzfläche ohne Text | `bd04c9f` | `git revert bd04c9f` |
| 2 Schrift | Big Shoulders Display für Überschriften, Uncial Antiqua als Akzent, Bevan entfernt (`src/styles/schrift.css`) | `9600f00` | `git revert 9600f00` |
| 3 Akzente | Irische Zweitwörter in der Kurstafel, Sláinte in der Fußzeile, Flaschengrün, zwei Ogham-Trenner (`src/styles/akzente-irisch.css`, `src/components/Ogham.astro`) | `c45bd17` | `git revert c45bd17` |
| 4 Luxe | Mehr Weißraum, mattes Messing, Navigation in Versalien, Karten mit Punktlinie, Bildrahmen mit Passepartout (`src/styles/feinschliff.css`) | `090c0ed` | `git revert 090c0ed` |
| 5 Inhalte | Alle Platzhalter ersetzt, Vorschläge in `src/content/vorschlag.json`, `INHALTE-ZU-PRUEFEN.md`, postbuild-Prüfung | `1025431` | `git revert 1025431` |

Schneller ohne Git: Den Import der jeweiligen CSS-Datei in `src/layouts/Layout.astro` (Block FEINSCHLIFF-START/ENDE) entfernen, dann fällt der Teil optisch weg.

## Modernisierung

Ausgangsstand: Tag `vor-modernisierung`. Alles zurück: `git reset --hard vor-modernisierung`. Styles im Layout-Block MODERN-START/ENDE (`src/styles/modern.css`), Schrift in `src/styles/schrift.css` (Block „MODERN-START: Teil 4“).

| Teil | Inhalt | Commit | Zurücknehmen |
|---|---|---|---|
| Modern-1 Handy | Aktionsleiste unten, Vollbild-Menü, 16-px-Minimum, 48-px-Tap-Ziele, gemeinsame Öffnungslogik `src/lib/pubstate.ts` | `abf9287` | `git revert abf9287` |
| Modern-2 Desktop | Kopfbänder mit Fakten, klebende Seitenspalte, Verweise, Reservierungsband, Kennzahlen, Bilderwand, Wochenleiste, Zapfhähne, Presse ohne Bilder | `8b06668` | `git revert 8b06668` |
| Modern-3 Retro | View-Transition 150 ms, Messing-Haarlinien, Tabellenziffern, Fokus und Hover | `2dfff8a` | `git revert 2dfff8a` |
| Modern-4 Schrift | IM Fell English SC, Source Serif 4, Uncial Antiqua, nur Latin, Preload, Fallback-Metriken | `2315eb5` | `git revert 2315eb5` |
| Modern-5 Lighthouse | Lokale Fotos als AVIF/WebP, keine Hotlinks, statische Texturen, Galerie volle Breite, LIGHTHOUSE.md | `18d6faf` | `git revert 18d6faf` |

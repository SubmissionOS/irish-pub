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

// Bricht ab, wenn in dist/ sichtbarer Text noch [Platzhalter] enthält. Läuft als postbuild.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(dist);

const hits = [];
for (const f of files) {
  const text = readFileSync(f, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ');
  for (const m of text.matchAll(/\[[^\]]{2,}\]/g)) hits.push(`${f.slice(dist.length)}: ${m[0]}`);
}
if (hits.length) {
  console.error(`Platzhalter gefunden (${hits.length}):\n` + hits.join('\n'));
  process.exit(1);
}
console.log(`Keine Platzhalter in ${files.length} HTML-Dateien.`);

// Vergleicht de.json und en.json: gleiche Schlüssel, gleiche Array-Längen, gleiche Zahl an [Platzhaltern].
import { readFileSync } from 'node:fs';

const load = (f) => JSON.parse(readFileSync(new URL(`../src/content/${f}`, import.meta.url), 'utf8'));
const de = load('de.json');
const en = load('en.json');
const errors = [];
const count = (s) => (s.match(/\[[^\]]+\]/g) || []).length;

function walk(a, b, path) {
  const ta = Array.isArray(a) ? 'array' : typeof a;
  const tb = Array.isArray(b) ? 'array' : typeof b;
  if (ta !== tb) return errors.push(`${path}: Typ ${ta} vs ${tb}`);
  if (ta === 'array') {
    if (a.length !== b.length) errors.push(`${path}: Länge ${a.length} vs ${b.length}`);
    a.forEach((v, i) => i < b.length && walk(v, b[i], `${path}[${i}]`));
  } else if (ta === 'object' && a) {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(k in a)) errors.push(`${path}.${k}: fehlt in DE`);
      else if (!(k in b)) errors.push(`${path}.${k}: fehlt in EN`);
      else walk(a[k], b[k], `${path}.${k}`);
    }
  } else if (ta === 'string' && count(a) !== count(b)) {
    errors.push(`${path}: Platzhalter ${count(a)} vs ${count(b)}`);
  }
}
walk(de, en, '$');

// vorschlag.json: jedes Sprachpaar braucht DE und EN
const vorschlag = load('vorschlag.json');
(function pairs(o, path) {
  if (Array.isArray(o)) return o.forEach((v, i) => pairs(v, `${path}[${i}]`));
  if (o && typeof o === 'object') {
    if ('de' in o || 'en' in o) {
      if (!o.de || !o.en) errors.push(`vorschlag${path}: DE oder EN fehlt`);
      return;
    }
    for (const k of Object.keys(o)) pairs(o[k], `${path}.${k}`);
  }
})(vorschlag, '');
if (errors.length) {
  console.error('Paritätsfehler DE/EN:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('Parität DE/EN ok.');

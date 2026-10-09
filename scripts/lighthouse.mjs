// Lighthouse für Start, Getränke, Galerie, Kontakt (mobil und Desktop). Aufruf: node scripts/lighthouse.mjs <label>
// Erwartet einen laufenden Preview-Server (Port per LH_PORT, Standard 4321; Seiten per LH_PAGES) und CHROME_PATH (z. B. Playwright-Chromium).
import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';

const label = process.argv[2] ?? 'lauf';
const pages = (process.env.LH_PAGES ?? ',getraenke/,galerie/,kontakt-anfahrt/').split(',');
const port = process.env.LH_PORT ?? '4321';
const cats = ['performance', 'accessibility', 'best-practices', 'seo'];
mkdirSync('lh', { recursive: true });
const rows = [];
for (const form of ['mobil', 'desktop']) {
  for (const p of pages) {
    const out = `lh/${label}-${form}-${p.replace(/\//g, '') || 'start'}.json`;
    const args = ['lighthouse', `http://localhost:${port}/${p}`, '--output=json', `--output-path=${out}`, '--quiet',
      '--chrome-flags=--headless=new --no-sandbox', '--only-categories=' + cats.join(',')];
    args.push(form === 'mobil' ? '--form-factor=mobile' : '--preset=desktop');
    try { execFileSync('npx', args, { stdio: 'ignore', shell: true }); } catch {}
    if (!existsSync(out)) { rows.push(`${form} /${p}: Fehler`); continue; }
    const r = JSON.parse(readFileSync(out, 'utf8'));
    const s = cats.map((c) => Math.round((r.categories[c]?.score ?? 0) * 100));
    const bad = Object.values(r.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable')
      .sort((a, b) => a.score - b.score).slice(0, 4).map((a) => a.id).join(', ');
    rows.push(`| ${form} | /${p} | ${s.join(' | ')} | ${bad} |`);
  }
}
console.log('| Gerät | Seite | Perf | A11y | BP | SEO | schwächste Audits |\n|---|---|---|---|---|---|---|\n' + rows.join('\n'));

// Erzeugt die statischen Hintergrund-Texturen (einmalig, Ergebnis liegt in public/tex/).
// Ersetzt die SVG-feTurbulence-Filter, die der Browser bei jedem Rendern neu rechnen müsste.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public/tex', { recursive: true });
const grain = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .5 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
const wood = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="96"><filter id="w"><feTurbulence type="fractalNoise" baseFrequency=".004 .09" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .45 0"/></filter><rect width="100%" height="100%" filter="url(#w)"/></svg>`;
await sharp(Buffer.from(grain)).png({ compressionLevel: 9, palette: true, colours: 16 }).toFile('public/tex/grain.png');
await sharp(Buffer.from(wood)).png({ compressionLevel: 9, palette: true, colours: 16 }).toFile('public/tex/wood.png');
console.log('Texturen erzeugt.');

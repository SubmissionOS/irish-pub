// Zugriff auf die lokalen Pub-Fotos unter src/assets/pub.
import type { ImageMetadata } from 'astro';
const all = import.meta.glob<{ default: ImageMetadata }>('../assets/pub/*.{jpg,jpeg,png}', { eager: true });
export function photo(file: string): ImageMetadata {
  const id = file.replace(/^(cache|thumb)_/, '').toLowerCase();
  const src = all[`../assets/pub/${id}`]?.default;
  if (!src) throw new Error(`Foto fehlt: ${id}`);
  return src;
}

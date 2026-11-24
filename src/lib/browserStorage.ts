/** Preserve browser data created before the brand rename on the same origin. */
export function readBrandStorage(key: string): string | null {
  const current = localStorage.getItem(key);
  if (current !== null) return current;
  const legacy = key.replace(/^abraxdice:/, 'rollform:');
  const saved = localStorage.getItem(legacy);
  if (saved !== null) {
    localStorage.setItem(key, saved);
    localStorage.removeItem(legacy);
  }
  return saved;
}
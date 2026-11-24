import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('cookie notice is mounted globally and links to the existing policy', () => {
  assert.match(readFileSync('src/components/SiteShell.tsx', 'utf8'), /<CookieBanner\s*\/>/);
  const banner = readFileSync('src/components/CookieBanner.tsx', 'utf8');
  assert.match(banner, /href="\/cookies"/);
  assert.match(banner, /type="button"/);
});

test('cookie notice remembers acknowledgment and handles unavailable storage', () => {
  const banner = readFileSync('src/components/CookieBanner.tsx', 'utf8');
  assert.match(banner, /readBrandStorage\(NOTICE_KEY\)/);
  assert.match(banner, /localStorage\.setItem\(NOTICE_KEY, '1'\)/);
  assert.match(banner, /catch/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
const read = path => readFileSync(path, 'utf8');

test('one route for each screen, no separate dark pages', () => {
  for (const path of ['page.tsx', 'catalog/page.tsx', 'configure/page.tsx', 'cart/page.tsx', 'contacts/page.tsx', 'production/page.tsx', 'product/page.tsx']) {
    assert.ok(existsSync('src/app/' + path), path);
    assert.ok(!existsSync('src/app/dark/' + path), 'no dark ' + path);
  }
});
test('dark is default, light is persisted on the same routes and dice colors stay unchanged', () => {
  const shell = read('src/components/SiteShell.tsx');
  const layout = read('src/app/layout.tsx');
  const css = read('src/styles/tokens.css');
  const pages = read('src/styles/pages.css');
  assert.match(layout, /data-theme="dark"/);
  assert.match(layout, /localStorage\.getItem\('abraxdice:theme'\)/);
  assert.match(shell, /className="theme-toggle"/);
  assert.match(shell, /localStorage\.setItem\('abraxdice:theme',/);
  assert.match(css, /:root\s*\{[^}]*color-scheme:\s*dark;/);
  assert.match(css, /:root\[data-theme="light"\]\s*\{\s*color-scheme:\s*light;/);
  assert.match(pages, /\.site\s*\{[^}]*background:\s*var\(--color-background\)/);
  assert.doesNotMatch(read('src/styles/sections.css'), /filter:\s*invert\(1\)/);
  assert.doesNotMatch(read('src/styles/components.css'), /\.button-secondary:hover\s*\{[^}]*var\(--color-preview\)/);
});


test('monochrome configurator assets and control borders follow the theme', () => {
  const tokens = read('src/styles/tokens.css');
  const styles = read('src/styles/components.css');
  const pages = read('src/styles/pages.css');
  assert.match(tokens, /--color-control-border:\s*color-mix\(in srgb,\s*var\(--color-text\)\s*50%,\s*var\(--color-background\)\)/);
  assert.match(styles, /:root:not\(\[data-theme="light"\]\)\s+:is\(\.shape-thumbnail,\s*\.numeral-sample,\s*\.configure-buy-thumbnail\)\s*\{\s*filter:\s*brightness\(0\)\s+invert\(1\)/);
  assert.match(styles, /:is\(\.shape-thumbnail,\s*\.numeral-sample,\s*\.configure-buy-thumbnail\)\s*\{\s*filter:\s*brightness\(0\)/);
  for (const selector of ['.shape-options button', '.font-picker button', '.swatch', '.contact-form :is(input, textarea)']) {
    const rule = pages.slice(pages.indexOf(selector + ' {')).split('}')[0];
    assert.match(rule, /border:\s*1px solid var\(--color-control-border\)/, selector);
  }
  assert.match(styles, /\.button\s*\{[^}]*border:\s*1px solid var\(--color-control-border\)/);
  assert.match(styles, /\.quantity button\s*\{[^}]*border:\s*1px solid var\(--color-control-border\)/);
});

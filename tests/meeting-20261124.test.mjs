import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read = p => readFileSync(p,'utf8');
test('hero offers manual previous and next slides without autoplay',()=>{
 const s=read('src/components/Storefront.tsx');
 assert.match(s,/aria-label="Варианты кубиков"/);
 assert.match(s,/aria-label="Предыдущий кубик"/);
 assert.match(s,/aria-label="Следующий кубик"/);
 assert.match(s,/aria-live="polite"/);
});
test('cart checkout requires explicit separate consent',()=>{
 const s=read('src/components/CartView.tsx');
 assert.match(s,/type="checkbox"/);
 assert.match(s,/useState\(false\)/);
 assert.match(s,/disabled=\{!consent\}/);
 assert.match(s,/href="\/consent"/);
 assert.ok(existsSync('src/app/consent/page.tsx'));
});
test('cookie policy and mascot are available locally',()=>{
 assert.ok(existsSync('src/app/cookies/page.tsx'));
 assert.match(read('src/components/SiteShell.tsx'),/href="\/cookies"/);
 assert.ok(existsSync('public/brand/abraxdice-mascot.svg'));
 assert.match(read('src/components/Storefront.tsx'),/abraxdice-mascot\.svg/);
});

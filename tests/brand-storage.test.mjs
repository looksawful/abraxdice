import test from 'node:test';
import assert from 'node:assert/strict';
import { readBrandStorage } from '../src/lib/browserStorage.ts';

test('legacy data migrates once without overriding the current value', () => {
  const data = new Map([['rollform:demo-cart:v3', 'old'], ['rollform:theme', 'light'], ['abraxdice:theme', 'dark']]);
  globalThis.localStorage = {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key),
  };
  assert.equal(readBrandStorage('abraxdice:demo-cart:v3'), 'old');
  assert.equal(data.get('abraxdice:demo-cart:v3'), 'old');
  assert.equal(data.has('rollform:demo-cart:v3'), false);
  assert.equal(readBrandStorage('abraxdice:theme'), 'dark');
  assert.equal(readBrandStorage('abraxdice:missing'), null);
});

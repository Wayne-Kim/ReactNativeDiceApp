const {test} = require('node:test');
const assert = require('node:assert/strict');
const merge = require('deepmerge');

for (const key of ['__proto__', 'constructor', 'prototype']) {
  for (const side of ['target', 'source']) {
    test(`reject ${key} in ${side} without altering the result prototype`, () => {
      const input = JSON.parse(`{"${key}":{"polluted":true},"safe":1}`);
      const result = side === 'target' ? merge(input, {}) : merge(Object.create(null), input);
      assert.equal(Object.getPrototypeOf(result), Object.prototype);
      assert.equal(Object.hasOwn(result, key), false);
      assert.equal(result.polluted, undefined);
      assert.equal(result.safe, 1);
      assert.equal({}.polluted, undefined);
    });
  }
}

test('nested malicious inputs and arrays cannot poison cloned values', () => {
  const input = JSON.parse('{"nested":{"__proto__":{"polluted":true}},"items":[{"__proto__":{"polluted":true}}]}');
  const result = merge({}, input);
  for (const value of [result.nested, result.items[0]]) {
    assert.equal(Object.getPrototypeOf(value), Object.prototype);
    assert.equal(value.polluted, undefined);
  }
});

test('configuration merge preserves nested objects, arrays, symbols and dates', () => {
  const symbol = Symbol('option');
  const date = new Date(0);
  const first = {nested: {one: 1}, list: [1], date, [symbol]: 'kept'};
  const second = {nested: {two: 2}, list: [2]};
  const result = merge(first, second);
  assert.deepEqual(result.nested, {one: 1, two: 2});
  assert.deepEqual(result.list, [1, 2]);
  assert.equal(result[symbol], 'kept');
  assert.equal(result.date, date);
  assert.deepEqual(first.nested, {one: 1});
  assert.deepEqual(merge.all([{a: 1}, {b: 2}]), {a: 1, b: 2});
});

test('custom array and field merging remain supported', () => {
  assert.deepEqual(merge({a: [1]}, {a: [2]}, {arrayMerge: (_, source) => source}), {a: [2]});
  assert.deepEqual(merge({a: {x: 1}}, {a: {y: 2}}, {customMerge: key => key === 'a' ? () => ({custom: true}) : undefined}), {a: {custom: true}});
});

const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const sizeOf = require('image-size');
const ip = require('ip');
const fixture = 'ios/reactnativedice/Images.xcassets/AppIcon.appiconset/AppIcon-29@2x.png';

test('image adapter preserves Metro buffer and legacy path APIs', async () => {
  assert.equal(sizeOf(fs.readFileSync(fixture)).width, 58);
  assert.equal(sizeOf(fixture).height, 58);
  await new Promise((resolve, reject) => sizeOf(fixture, (error, result) => {
    if (error) return reject(error);
    try { assert.equal(result.width, 58); resolve(); } catch (e) { reject(e); }
  }));
});

test('malformed ICNS cannot loop indefinitely', {timeout: 1000}, () => {
  const malformed = Buffer.from('69636e73000000106963303700000000', 'hex');
  assert.throws(() => sizeOf(malformed));
});

test('maintained IP implementation rejects loopback encodings', () => {
  for (const address of ['127.0.0.1', '0x7f.1', '127.1', '::1']) {
    assert.equal(ip.isPublic(address), false, address);
  }
  assert.equal(typeof ip.address(), 'string');
});

test('Sharp retains the bootsplash resize and PNG pipeline', async () => {
  const buffer = await require('sharp')(fixture).resize(29, 29).png().toBuffer();
  assert.equal(sizeOf(buffer).width, 29);
});

'use strict';

// Metro 0.73 expects image-size's legacy callable API. Keep that interface
// while delegating all image parsing to the maintained, patched parser.
const fs = require('node:fs');
const {imageSize} = require('image-size-modern');

module.exports = function sizeOf(input, callback) {
  if (typeof callback === 'function') {
    const finish = (error, bytes) => {
      if (error) return callback(error);
      let result;
      try {
        result = imageSize(bytes);
      } catch (parseError) {
        return callback(parseError);
      }
      callback(null, result);
    };
    if (typeof input === 'string') return fs.readFile(input, finish);
    return process.nextTick(finish, null, input);
  }
  return imageSize(typeof input === 'string' ? fs.readFileSync(input) : input);
};

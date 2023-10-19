/**
* DevExtreme (cjs/__internal/core/license/byte_utils.js)
* Version: 23.2.0
* Build date: Wed Oct 18 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToBytes = base64ToBytes;
exports.bytesToHex = bytesToHex;
exports.bytesToWords = bytesToWords;
exports.concatBytes = concatBytes;
exports.hexToBytes = hexToBytes;
exports.leftRotate = leftRotate;
exports.stringToBytes = stringToBytes;
exports.wordsToBytes = wordsToBytes;
exports.wordsToHex = wordsToHex;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable no-bitwise */
function base64ToBytes(base64) {
  return new Uint8Array(atob(base64).split('').map(function (s) {
    return s.charCodeAt(0);
  }));
}
function hexToBytes(string) {
  var _a, _b;
  return new Uint8Array((_b = (_a = string.match(/.{1,2}/g)) === null || _a === void 0 ? void 0 : _a.map(function (byte) {
    return parseInt(byte, 16);
  })) !== null && _b !== void 0 ? _b : []);
}
function stringToBytes(string) {
  var bytes = new Uint8Array(string.length);
  for (var k = 0; k < string.length; k += 1) {
    bytes[k] = string.charCodeAt(k) & 0xFF;
  }
  return bytes;
}
function wordsToBytes(words) {
  var bytes = new Uint8Array(words.length * 4);
  for (var k = 0; k < bytes.length; k += 1) {
    bytes[k] = words[k >> 2] >>> 8 * (3 - k % 4);
  }
  return bytes;
}
function bytesToWords(bytes) {
  var words = new Uint32Array((bytes.length - 1 >> 2) + 1);
  for (var k = 0; k < bytes.length; k += 1) {
    words[k >> 2] |= bytes[k] << 8 * (3 - k % 4);
  }
  return words;
}
function wordsToHex(words) {
  return _toConsumableArray(words).map(function (w) {
    return w.toString(16).padStart(8, '0');
  }).join('');
}
function bytesToHex(bytes) {
  return _toConsumableArray(bytes).map(function (b) {
    return b.toString(16).padStart(2, '0');
  }).join('');
}
function leftRotate(x, n) {
  return (x << n | x >>> 32 - n) >>> 0;
}
function concatBytes(a, b) {
  var result = new Uint8Array(a.length + b.length);
  result.set(a, 0);
  result.set(b, a.length);
  return result;
}

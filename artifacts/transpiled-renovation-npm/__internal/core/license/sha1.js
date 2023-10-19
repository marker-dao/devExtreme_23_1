"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preprocess = preprocess;
exports.sha1 = sha1;
var _byte_utils = require("./byte_utils");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* eslint-disable no-bitwise */
function preprocess(text) {
  var bytes = new Uint8Array(text.length + 1);
  bytes.set((0, _byte_utils.stringToBytes)(text));
  bytes[bytes.length - 1] = 0x80;
  var words = (0, _byte_utils.bytesToWords)(new Uint8Array(bytes));
  var result = new Uint32Array(Math.ceil((words.length + 2) / 16) * 16);
  result.set(words, 0);
  result[result.length - 1] = (bytes.length - 1) * 8;
  return result;
}
function sha1(text) {
  var message = preprocess(text);
  var h = new Uint32Array([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
  for (var i = 0; i < message.length; i += 16) {
    var w = new Uint32Array(80);
    for (var j = 0; j < 16; j += 1) {
      w[j] = message[i + j];
    }
    for (var _j = 16; _j < 80; _j += 1) {
      var n = w[_j - 3] ^ w[_j - 8] ^ w[_j - 14] ^ w[_j - 16];
      w[_j] = n << 1 | n >>> 31;
    }
    var a = h[0];
    var b = h[1];
    var c = h[2];
    var d = h[3];
    var e = h[4];
    for (var _j2 = 0; _j2 < 80; _j2 += 1) {
      var _ref = _j2 < 20 ? [b & c | ~b & d, 0x5A827999] // eslint-disable-line no-nested-ternary, max-len
        : _j2 < 40 ? [b ^ c ^ d, 0x6ED9EBA1] // eslint-disable-line no-nested-ternary, max-len
        : _j2 < 60 ? [b & c | b & d | c & d, 0x8F1BBCDC] // eslint-disable-line no-nested-ternary, max-len
        : [b ^ c ^ d, 0xCA62C1D6],
        _ref2 = _slicedToArray(_ref, 2),
        f = _ref2[0],
        k = _ref2[1];
      var temp = (0, _byte_utils.leftRotate)(a, 5) + f + e + k + w[_j2];
      e = d;
      d = c;
      c = (0, _byte_utils.leftRotate)(b, 30);
      b = a;
      a = temp;
    }
    h[0] += a;
    h[1] += b;
    h[2] += c;
    h[3] += d;
    h[4] += e;
  }
  return (0, _byte_utils.wordsToBytes)(h);
}
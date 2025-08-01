/**
* DevExtreme (esm/__internal/core/license/sha1.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-bitwise */
import { bytesToWords, leftRotate, stringToBytes, wordsToBytes } from './byte_utils';
export function preprocess(text) {
  const bytes = new Uint8Array(text.length + 1);
  bytes.set(stringToBytes(text));
  bytes[bytes.length - 1] = 0x80;
  const words = bytesToWords(new Uint8Array(bytes));
  const result = new Uint32Array(Math.ceil((words.length + 2) / 16) * 16);
  result.set(words, 0);
  result[result.length - 1] = (bytes.length - 1) * 8;
  return result;
}
export function sha1(text) {
  const message = preprocess(text);
  const h = new Uint32Array([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
  for (let i = 0; i < message.length; i += 16) {
    const w = new Uint32Array(80);
    for (let j = 0; j < 16; j += 1) {
      w[j] = message[i + j];
    }
    for (let j = 16; j < 80; j += 1) {
      const n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
      w[j] = n << 1 | n >>> 31;
    }
    let a = h[0];
    let b = h[1];
    let c = h[2];
    let d = h[3];
    let e = h[4];
    for (let j = 0; j < 80; j += 1) {
      const [f, k] = j < 20 ? [b & c | ~b & d, 0x5A827999] // eslint-disable-line no-nested-ternary,@stylistic/max-len
      : j < 40 ? [b ^ c ^ d, 0x6ED9EBA1] // eslint-disable-line no-nested-ternary, @stylistic/max-len
      : j < 60 ? [b & c | b & d | c & d, 0x8F1BBCDC] // eslint-disable-line @stylistic/max-len
      : [b ^ c ^ d, 0xCA62C1D6];
      const temp = leftRotate(a, 5) + f + e + k + w[j];
      e = d;
      d = c;
      c = leftRotate(b, 30);
      b = a;
      a = temp;
    }
    h[0] += a;
    h[1] += b;
    h[2] += c;
    h[3] += d;
    h[4] += e;
  }
  return wordsToBytes(h);
}

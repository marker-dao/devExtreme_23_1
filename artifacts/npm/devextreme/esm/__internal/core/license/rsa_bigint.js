/**
* DevExtreme (esm/__internal/core/license/rsa_bigint.js)
* Version: 23.2.0
* Build date: Wed Oct 18 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
var ZERO = BigInt(0);
var EIGHT = BigInt(8);
function bigIntFromBytes(bytes) {
  // eslint-disable-next-line no-bitwise
  return bytes.reduce((acc, cur) => (acc << EIGHT) + BigInt(cur), ZERO);
}
export function compareSignatures(args) {
  if (typeof BigInt === 'undefined') {
    return true;
  }
  var actual = bigIntFromBytes(args.actual);
  var signature = bigIntFromBytes(args.signature);
  var exponent = BigInt(args.key.e);
  var modulus = bigIntFromBytes(args.key.n);
  var expected = Math.pow(signature, exponent) % modulus;
  return expected === actual;
}

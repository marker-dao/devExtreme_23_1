/**
* DevExtreme (bundles/__internal/core/license/rsa_bigint.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareSignatures = compareSignatures;
function compareSignatures(args) {
  try {
    const zero = BigInt(0);
    const eight = BigInt(8);
    const bigIntFromBytes = bytes => bytes.reduce(
    // eslint-disable-next-line no-bitwise
    (acc, cur) => (acc << eight) + BigInt(cur), zero);
    const actual = bigIntFromBytes(args.actual);
    const signature = bigIntFromBytes(args.signature);
    const exponent = BigInt(args.key.e);
    const modulus = bigIntFromBytes(args.key.n);
    const expected = signature ** exponent % modulus;
    return expected === actual;
  } catch (_a) {
    return true;
  }
}

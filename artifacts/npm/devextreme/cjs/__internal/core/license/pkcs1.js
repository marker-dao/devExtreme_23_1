/**
* DevExtreme (cjs/__internal/core/license/pkcs1.js)
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
exports.pad = pad;
var _byte_utils = require("./byte_utils");
var _key = require("./key");
// see https://datatracker.ietf.org/doc/html/rfc8017#page-47
var ASN1_SHA1 = '3021300906052b0e03021a05000414';
// PKCS #1 v1.5
// 0x00 0x01 P 0x00 A H
// P - padding string (0xff...0xff)
// A - ASN.1 encoding of the hash algorithm used
// H - hash value
function pad(hash) {
  var dataLength = (_key.PUBLIC_KEY.n.length * 8 + 6) / 8;
  var data = (0, _byte_utils.concatBytes)((0, _byte_utils.hexToBytes)(ASN1_SHA1), hash);
  if (data.length + 10 > dataLength) {
    throw Error('Key is too short for SHA1 signing algorithm');
  }
  var padding = new Uint8Array(dataLength - data.length);
  padding.fill(0xff, 0, padding.length - 1);
  padding[0] = 0;
  padding[1] = 1;
  padding[padding.length - 1] = 0;
  return (0, _byte_utils.concatBytes)(padding, data);
}

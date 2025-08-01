/**
* DevExtreme (cjs/viz/vector_map.utils/node-stream.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

/* eslint-disable no-unused-vars, no-var, one-var, import/no-commonjs*/
function wrapBuffer(buffer) {
  return buffer;
}
function ui8(stream, position) {
  return stream[position];
}
function ui16LE(stream, position) {
  return stream.readUInt16LE(position);
}
function ui32LE(stream, position) {
  return stream.readUInt32LE(position);
}
function ui32BE(stream, position) {
  return stream.readUInt32BE(position);
}
function f64LE(stream, position) {
  return stream.readDoubleLE(position);
}
var fs = require('fs');
function sendRequest(path, callback) {
  fs.readFile(path, callback);
}

/**
* DevExtreme (cjs/__internal/viz/funnel/tiling.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAlgorithm = addAlgorithm;
exports.getAlgorithm = getAlgorithm;
var _utils = require("../core/utils");
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const algorithms = {};
let defaultAlgorithm;
function getAlgorithm(name) {
  return algorithms[(0, _utils.normalizeEnum)(name)] || defaultAlgorithm;
}
function addAlgorithm(name, callback, setDefault) {
  algorithms[name] = callback;
  if (setDefault) {
    defaultAlgorithm = algorithms[name];
  }
}

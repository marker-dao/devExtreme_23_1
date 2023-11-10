/**
* DevExtreme (cjs/viz/funnel/tiling.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.addAlgorithm = addAlgorithm;
exports.getAlgorithm = getAlgorithm;
var _utils = require("../core/utils");
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPattern = exports.registerGradient = exports.default = void 0;
var _utils = require("../viz/core/utils");
const graphicObjects = {};
const registerPattern = options => {
  const id = (0, _utils.getNextDefsSvgId)();
  graphicObjects[id] = Object.assign({
    type: 'pattern'
  }, options);
  return id;
};
exports.registerPattern = registerPattern;
const registerGradient = (type, options) => {
  const id = (0, _utils.getNextDefsSvgId)();
  graphicObjects[id] = Object.assign({
    type
  }, options);
  return id;
};
exports.registerGradient = registerGradient;
const getGraphicObjects = () => graphicObjects;
var _default = exports.default = {
  getGraphicObjects
};
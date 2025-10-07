/**
* DevExtreme (cjs/__internal/ui/overlay/z_index.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.isLastZIndexInStack = exports.create = exports.clearStack = exports.base = void 0;
var _common = require("../../../core/utils/common");
let baseZIndex = 1500;
let zIndexStack = [];
const base = zIndex => {
  baseZIndex = (0, _common.ensureDefined)(zIndex, baseZIndex);
  return baseZIndex;
};
exports.base = base;
const create = function () {
  let baseIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseZIndex;
  const {
    length
  } = zIndexStack;
  const index = (length ? zIndexStack[length - 1] : baseIndex) + 1;
  zIndexStack.push(index);
  return index;
};
exports.create = create;
const remove = zIndex => {
  const position = zIndexStack.indexOf(zIndex);
  if (position >= 0) {
    zIndexStack.splice(position, 1);
  }
};
exports.remove = remove;
const isLastZIndexInStack = zIndex => {
  if (zIndexStack.length) {
    return zIndexStack[zIndexStack.length - 1] === zIndex;
  }
  return false;
};
exports.isLastZIndexInStack = isLastZIndexInStack;
const clearStack = () => {
  zIndexStack = [];
};
exports.clearStack = clearStack;

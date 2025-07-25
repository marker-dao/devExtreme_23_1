/**
* DevExtreme (esm/__internal/ui/overlay/m_z_index.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ensureDefined } from '../../../core/utils/common';
let baseZIndex = 1500;
let zIndexStack = [];
export const base = ZIndex => {
  baseZIndex = ensureDefined(ZIndex, baseZIndex);
  return baseZIndex;
};
export const create = function () {
  let baseIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseZIndex;
  const {
    length
  } = zIndexStack;
  const index = (length ? zIndexStack[length - 1] : baseIndex) + 1;
  zIndexStack.push(index);
  return index;
};
export const remove = zIndex => {
  const position = zIndexStack.indexOf(zIndex);
  if (position >= 0) {
    zIndexStack.splice(position, 1);
  }
};
export const isLastZIndexInStack = zIndex => zIndexStack.length && zIndexStack[zIndexStack.length - 1] === zIndex;
export const clearStack = () => {
  zIndexStack = [];
};

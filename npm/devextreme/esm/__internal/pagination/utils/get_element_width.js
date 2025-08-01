/**
* DevExtreme (esm/__internal/pagination/utils/get_element_width.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import getElementComputedStyle from '../../core/r1/utils/get_computed_style';
import { toNumber } from '../../core/r1/utils/type_conversion';
export function getElementStyle(name, element) {
  const computedStyle = getElementComputedStyle(element) ?? {};
  return toNumber(computedStyle[name]);
}
export function getElementContentWidth(element) {
  const padding = getElementStyle('paddingLeft', element) + getElementStyle('paddingRight', element);
  const width = getElementStyle('width', element);
  return width - padding;
}
export function getElementWidth(element) {
  const margin = getElementStyle('marginLeft', element) + getElementStyle('marginRight', element);
  const width = getElementStyle('width', element);
  return margin + width;
}
export function getElementMinWidth(element) {
  return getElementStyle('minWidth', element);
}

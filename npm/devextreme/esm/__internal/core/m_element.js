/**
* DevExtreme (esm/__internal/core/m_element.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function getPublicElementNonJquery(element) {
  if (element && element.get) {
    return element.get(0);
  }
  return element;
}
let strategy = getPublicElementNonJquery;
export function getPublicElement(element) {
  return strategy(element);
}
export function setPublicElementWrapper(newStrategy) {
  strategy = newStrategy;
}

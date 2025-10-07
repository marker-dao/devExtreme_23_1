/**
* DevExtreme (esm/__internal/viz/funnel/tiling.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { normalizeEnum as _normalizeEnum } from '../core/utils';
const algorithms = {};
let defaultAlgorithm;
export function getAlgorithm(name) {
  return algorithms[_normalizeEnum(name)] || defaultAlgorithm;
}
export function addAlgorithm(name, callback, setDefault) {
  algorithms[name] = callback;
  if (setDefault) {
    defaultAlgorithm = algorithms[name];
  }
}

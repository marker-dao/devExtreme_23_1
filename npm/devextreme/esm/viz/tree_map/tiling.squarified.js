/**
* DevExtreme (esm/viz/tree_map/tiling.squarified.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const _max = Math.max;
import _squarify from './tiling.squarified.base';
import { addAlgorithm } from './tiling';
function accumulate(total, current) {
  return _max(total, current);
}
function squarified(data) {
  return _squarify(data, accumulate, false);
}
addAlgorithm('squarified', squarified);
export default squarified;

/**
* DevExtreme (esm/__internal/viz/tree_map/tiling.strip.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addAlgorithm } from '../../viz/tree_map/tiling';
import _squarify from '../../viz/tree_map/tiling.squarified.base';
function accumulate(total, current, count) {
  return ((count - 1) * total + current) / count;
}
function strip(data) {
  return _squarify(data, accumulate, true);
}
addAlgorithm('strip', strip);
export default strip;

/**
* DevExtreme (esm/__internal/viz/tree_map/tiling.squarified.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addAlgorithm } from '../../viz/tree_map/tiling';
import _squarify from '../../viz/tree_map/tiling.squarified.base';
const _max = Math.max;
function accumulate(total, current) {
  return _max(total, current);
}
function squarified(data) {
  return _squarify(data, accumulate, false);
}
addAlgorithm('squarified', squarified);
export default squarified;

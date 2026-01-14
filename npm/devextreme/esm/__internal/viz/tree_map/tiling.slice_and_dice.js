/**
* DevExtreme (esm/__internal/viz/tree_map/tiling.slice_and_dice.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
import { addAlgorithm, buildSidesData, calculateRectangles } from '../../viz/tree_map/tiling';
function sliceAndDice(data) {
  const items = data.items;
  const sidesData = buildSidesData(data.rect, data.directions, data.isRotated ? 1 : 0);
  calculateRectangles(items, 0, data.rect, sidesData, {
    sum: data.sum,
    count: items.length,
    side: sidesData.variedSide
  });
}
addAlgorithm('sliceanddice', sliceAndDice);
export default sliceAndDice;

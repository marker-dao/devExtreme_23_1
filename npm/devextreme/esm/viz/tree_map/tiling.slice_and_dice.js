/**
* DevExtreme (esm/viz/tree_map/tiling.slice_and_dice.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { buildSidesData, calculateRectangles, addAlgorithm } from './tiling';
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

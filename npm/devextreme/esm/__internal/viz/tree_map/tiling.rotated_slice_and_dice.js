/**
* DevExtreme (esm/__internal/viz/tree_map/tiling.rotated_slice_and_dice.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addAlgorithm, getAlgorithm } from '../../viz/tree_map/tiling';
const sliceAndDiceAlgorithm = getAlgorithm('sliceanddice');
function rotatedSliceAndDice(data) {
  data.isRotated = !data.isRotated;
  return sliceAndDiceAlgorithm.call(this, data);
}
addAlgorithm('rotatedsliceanddice', rotatedSliceAndDice);

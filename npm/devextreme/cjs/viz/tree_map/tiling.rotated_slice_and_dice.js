/**
* DevExtreme (cjs/viz/tree_map/tiling.rotated_slice_and_dice.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _tiling = require("./tiling");
const sliceAndDiceAlgorithm = (0, _tiling.getAlgorithm)('sliceanddice');
function rotatedSliceAndDice(data) {
  data.isRotated = !data.isRotated;
  return sliceAndDiceAlgorithm.call(this, data);
}
(0, _tiling.addAlgorithm)('rotatedsliceanddice', rotatedSliceAndDice);

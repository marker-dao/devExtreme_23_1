/**
* DevExtreme (cjs/viz/tree_map/tiling.rotated_slice_and_dice.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
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
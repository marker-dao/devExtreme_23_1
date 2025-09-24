"use strict";

var _tiling = require("../../viz/tree_map/tiling");
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const sliceAndDiceAlgorithm = (0, _tiling.getAlgorithm)('sliceanddice');
function rotatedSliceAndDice(data) {
  data.isRotated = !data.isRotated;
  return sliceAndDiceAlgorithm.call(this, data);
}
(0, _tiling.addAlgorithm)('rotatedsliceanddice', rotatedSliceAndDice);
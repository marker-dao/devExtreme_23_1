/**
* DevExtreme (cjs/__internal/viz/tree_map/tiling.slice_and_dice.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tiling = require("../../viz/tree_map/tiling");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */

function sliceAndDice(data) {
  const items = data.items;
  const sidesData = (0, _tiling.buildSidesData)(data.rect, data.directions, data.isRotated ? 1 : 0);
  (0, _tiling.calculateRectangles)(items, 0, data.rect, sidesData, {
    sum: data.sum,
    count: items.length,
    side: sidesData.variedSide
  });
}
(0, _tiling.addAlgorithm)('sliceanddice', sliceAndDice);
var _default = exports.default = sliceAndDice;

/**
* DevExtreme (cjs/__internal/viz/axes/axes_utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureLabels = exports.calculateCanvasMargins = void 0;
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const _max = Math.max;
const calculateCanvasMargins = function (bBoxes, canvas) {
  const cLeft = canvas.left;
  const cTop = canvas.top;
  const cRight = canvas.width - canvas.right;
  const cBottom = canvas.height - canvas.bottom;
  return bBoxes.reduce((margins, bBox) => {
    if (!bBox || bBox.isEmpty) {
      return margins;
    }
    return {
      left: _max(margins.left, cLeft - bBox.x),
      top: _max(margins.top, cTop - bBox.y),
      right: _max(margins.right, bBox.x + bBox.width - cRight),
      bottom: _max(margins.bottom, bBox.y + bBox.height - cBottom)
    };
  }, {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
};
exports.calculateCanvasMargins = calculateCanvasMargins;
const measureLabels = function (items) {
  items.forEach(item => {
    const label = item.getContentContainer();
    item.labelBBox = label ? label.getBBox() : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  });
};
exports.measureLabels = measureLabels;

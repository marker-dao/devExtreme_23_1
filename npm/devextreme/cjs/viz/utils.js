/**
* DevExtreme (cjs/viz/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.prepareSegmentRectPoints = exports.floorCanvasDimensions = exports.areCanvasesDifferent = void 0;
Object.defineProperty(exports, "refreshPaths", {
  enumerable: true,
  get: function () {
    return _renderer.refreshPaths;
  }
});
var _renderer = require("./core/renderers/renderer");
var _iterator = require("../core/utils/iterator");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  floor
} = Math;
let prepareSegmentRectPoints = function (left, top, width, height, borderOptions) {
  const maxSW = ~~((width < height ? width : height) / 2);
  const sw = borderOptions.width || 0;
  const newSW = sw < maxSW ? sw : maxSW;
  left = left + newSW / 2;
  top = top + newSW / 2;
  width = width - newSW;
  height = height - newSW;
  const right = left + width;
  const bottom = top + height;
  let points = [];
  let segments = [];
  let segmentSequence;
  let visiblyOpt = 0;
  let prevSegmentVisibility = 0;
  const allSegment = {
    top: [[left, top], [right, top]],
    right: [[right, top], [right, bottom]],
    bottom: [[right, bottom], [left, bottom]],
    left: [[left, bottom], [left, top]]
  };
  (0, _iterator.each)(allSegment, function (seg) {
    const visibility = !!borderOptions[seg];
    visiblyOpt = visiblyOpt * 2 + ~~visibility;
  });
  switch (visiblyOpt) {
    case 13:
    case 9:
      segmentSequence = ['left', 'top', 'right', 'bottom'];
      break;
    case 11:
      segmentSequence = ['bottom', 'left', 'top', 'right'];
      break;
    default:
      segmentSequence = ['top', 'right', 'bottom', 'left'];
  }
  (0, _iterator.each)(segmentSequence, function (_, seg) {
    const segmentVisibility = !!borderOptions[seg];
    if (!prevSegmentVisibility && segments.length) {
      points.push(segments);
      segments = [];
    }
    if (segmentVisibility) {
      (0, _iterator.each)(allSegment[seg].slice(prevSegmentVisibility), function (_, segment) {
        segments = segments.concat(segment);
      });
    }
    prevSegmentVisibility = ~~segmentVisibility;
  });
  segments.length && points.push(segments);
  points.length === 1 && (points = points[0]);
  return {
    points: points,
    pathType: visiblyOpt === 15 ? 'area' : 'line'
  };
};
exports.prepareSegmentRectPoints = prepareSegmentRectPoints;
const areCanvasesDifferent = function (canvas1, canvas2) {
  const sizeChangingThreshold = 1;
  const sizeLessThreshold = ['width', 'height'].every(key => Math.abs(canvas1[key] - canvas2[key]) < sizeChangingThreshold);
  const canvasCoordsIsEqual = ['left', 'right', 'top', 'bottom'].every(key => canvas1[key] === canvas2[key]);
  return !(sizeLessThreshold && canvasCoordsIsEqual);
};
exports.areCanvasesDifferent = areCanvasesDifferent;
const floorCanvasDimensions = function (canvas) {
  return _extends({}, canvas, {
    height: floor(canvas.height),
    width: floor(canvas.width)
  });
};
exports.floorCanvasDimensions = floorCanvasDimensions;

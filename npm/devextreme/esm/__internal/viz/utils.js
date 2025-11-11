/**
* DevExtreme (esm/__internal/viz/utils.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable import/no-import-module-exports */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { each as _each } from '../../core/utils/iterator';
import { refreshPaths } from '../viz/core/renderers/renderer';
const {
  floor
} = Math;
export let prepareSegmentRectPoints = function (left, top, width, height, borderOptions) {
  const maxSW = ~~((width < height ? width : height) / 2);
  const sw = borderOptions.width || 0;
  const newSW = sw < maxSW ? sw : maxSW;
  left += newSW / 2;
  top += newSW / 2;
  width -= newSW;
  height -= newSW;
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
  _each(allSegment, seg => {
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
  _each(segmentSequence, (_, seg) => {
    const segmentVisibility = !!borderOptions[seg];
    if (!prevSegmentVisibility && segments.length) {
      // @ts-expect-error
      points.push(segments);
      segments = [];
    }
    if (segmentVisibility) {
      _each(allSegment[seg].slice(prevSegmentVisibility), (_, segment) => {
        segments = segments.concat(segment);
      });
    }
    prevSegmentVisibility = ~~segmentVisibility;
  });
  // @ts-expect-error
  segments.length && points.push(segments);
  points.length === 1 && (points = points[0]);
  return {
    points,
    pathType: visiblyOpt === 15 ? 'area' : 'line'
  };
};
const areCanvasesDifferent = function (canvas1, canvas2) {
  const sizeChangingThreshold = 1;
  const sizeLessThreshold = ['width', 'height'].every(key => Math.abs(canvas1[key] - canvas2[key]) < sizeChangingThreshold);
  const canvasCoordsIsEqual = ['left', 'right', 'top', 'bottom'].every(key => canvas1[key] === canvas2[key]);
  return !(sizeLessThreshold && canvasCoordsIsEqual);
};
const floorCanvasDimensions = function (canvas) {
  return _extends({}, canvas, {
    height: floor(canvas.height),
    width: floor(canvas.width)
  });
};
export { areCanvasesDifferent, floorCanvasDimensions, refreshPaths };

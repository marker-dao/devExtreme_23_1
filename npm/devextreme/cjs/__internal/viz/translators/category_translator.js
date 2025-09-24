/**
* DevExtreme (cjs/__internal/viz/translators/category_translator.js)
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
exports.default = void 0;
var _math = require("../../../core/utils/math");
var _type = require("../../../core/utils/type");
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const {
  round
} = Math;
function getValue(value) {
  return value;
}
const MIN_VALID_SCALE_OFFSET = 0.05;
var _default = exports.default = {
  translate(category, directionOffset) {
    const that = this;
    const canvasOptions = that._canvasOptions;
    const categoryIndex = that._categoriesToPoints[category === null || category === void 0 ? void 0 : category.valueOf()];
    const specialValue = that.translateSpecialCase(category);
    const startPointIndex = canvasOptions.startPointIndex || 0;
    const stickInterval = that._options.stick ? 0 : 0.5;
    if ((0, _type.isDefined)(specialValue)) {
      return round(specialValue);
    }
    // Q522516
    if (!categoryIndex && categoryIndex !== 0) {
      return null;
    }
    directionOffset = directionOffset || 0;
    const stickDelta = categoryIndex + stickInterval - startPointIndex + directionOffset * 0.5;
    return round(that._calculateProjection(canvasOptions.interval * stickDelta));
  },
  getInterval() {
    return this._canvasOptions.interval;
  },
  getEventScale(zoomEvent) {
    const scale = zoomEvent.deltaScale || 1;
    return 1 - (1 - scale) / (0.75 + this.visibleCategories.length / this._categories.length);
  },
  zoom(translate, scale) {
    const that = this;
    const scaleOffset = Math.abs(Math.abs(scale) - 1);
    const isZoomIn = scale > 1;
    if (scale !== 1 && scaleOffset < MIN_VALID_SCALE_OFFSET) {
      scale = this.getMinScale(isZoomIn);
    }
    const categories = that._categories;
    const canvasOptions = that._canvasOptions;
    const {
      stick
    } = that._options;
    const {
      invert
    } = canvasOptions;
    const interval = canvasOptions.interval * scale;
    const translateCategories = translate / interval;
    const visibleCount = (that.visibleCategories || []).length;
    let startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + translateCategories + 0.5);
    const categoriesLength = parseInt((0, _math.adjust)(canvasOptions.canvasLength / interval) + (stick ? 1 : 0)) || 1;
    let endCategoryIndex;
    if (invert) {
      // @ts-expect-error
      startCategoryIndex = parseInt((canvasOptions.startPointIndex || 0) + visibleCount - translateCategories + 0.5) - categoriesLength;
    }
    if (startCategoryIndex < 0) {
      startCategoryIndex = 0;
    }
    endCategoryIndex = startCategoryIndex + categoriesLength;
    if (endCategoryIndex > categories.length) {
      endCategoryIndex = categories.length;
      startCategoryIndex = endCategoryIndex - categoriesLength;
      if (startCategoryIndex < 0) {
        startCategoryIndex = 0;
      }
    }
    // @ts-expect-error
    const newVisibleCategories = categories.slice(parseInt(startCategoryIndex), parseInt(endCategoryIndex));
    const newInterval = that._getDiscreteInterval(newVisibleCategories.length, canvasOptions);
    scale = newInterval / canvasOptions.interval;
    translate = that.translate(!invert ? newVisibleCategories[0] : newVisibleCategories[newVisibleCategories.length - 1]) * scale - (canvasOptions.startPoint + (stick ? 0 : newInterval / 2));
    return {
      min: newVisibleCategories[0],
      max: newVisibleCategories[newVisibleCategories.length - 1],
      translate,
      scale
    };
  },
  getMinScale(zoom) {
    const that = this;
    const canvasOptions = that._canvasOptions;
    let categoriesLength = (that.visibleCategories || that._categories).length;
    // @ts-expect-error
    categoriesLength += (parseInt(categoriesLength * 0.1) || 1) * (zoom ? -2 : 2);
    return canvasOptions.canvasLength / (Math.max(categoriesLength, 1) * canvasOptions.interval);
  },
  getScale(min, max) {
    const that = this;
    const canvasOptions = that._canvasOptions;
    const visibleArea = that.getCanvasVisibleArea();
    const stickOffset = !that._options.stick && 1;
    let minPoint = (0, _type.isDefined)(min) ? that.translate(min, -stickOffset) : null;
    let maxPoint = (0, _type.isDefined)(max) ? that.translate(max, +stickOffset) : null;
    if (minPoint === null) {
      minPoint = canvasOptions.invert ? visibleArea.max : visibleArea.min;
    }
    if (maxPoint === null) {
      maxPoint = canvasOptions.invert ? visibleArea.min : visibleArea.max;
    }
    return that.canvasLength / Math.abs(maxPoint - minPoint);
  },
  // dxRangeSelector
  isValid(value) {
    return (0, _type.isDefined)(value) ? this._categoriesToPoints[value.valueOf()] >= 0 : false;
  },
  getCorrectValue: getValue,
  to(value, direction) {
    const canvasOptions = this._canvasOptions;
    const categoryIndex = this._categoriesToPoints[value === null || value === void 0 ? void 0 : value.valueOf()];
    const startPointIndex = canvasOptions.startPointIndex || 0;
    const stickDelta = categoryIndex + (this._options.stick ? 0 : 0.5) - startPointIndex + (this._businessRange.invert ? -1 : +1) * direction * 0.5;
    return round(this._calculateProjection(canvasOptions.interval * stickDelta));
  },
  from(position) {
    let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const canvasOptions = this._canvasOptions;
    const {
      startPoint
    } = canvasOptions;
    const categories = this.visibleCategories || this._categories;
    const categoriesLength = categories.length;
    const stickInterval = this._options.stick ? 0.5 : 0;
    // It is strange - while "businessRange.invert" check is required in "to" here it is not.
    // Check that translator.from(translator.to(x, -1), -1) equals x.
    // And check that translator.untranslate(translator.translate(x, -1), -1) does not equal x - is it really supposed to be so?
    let result = round((position - startPoint) / canvasOptions.interval + stickInterval - 0.5 - /* (businessRange.invert ? -1 : +1) * */direction * 0.5);
    if (result >= categoriesLength) {
      result = categoriesLength - 1;
    }
    if (result < 0) {
      result = 0;
    }
    if (canvasOptions.invert) {
      result = categoriesLength - result - 1;
    }
    return categories[result];
  },
  _add() {
    return NaN;
  },
  toValue: getValue,
  isValueProlonged: true,
  getRangeByMinZoomValue(minZoom, visualRange) {
    const categories = this._categories;
    const minVisibleIndex = categories.indexOf(visualRange.minVisible);
    const maxVisibleIndex = categories.indexOf(visualRange.maxVisible);
    const startIndex = minVisibleIndex + minZoom - 1;
    const endIndex = maxVisibleIndex - minZoom + 1;
    if (categories[startIndex]) {
      return [visualRange.minVisible, categories[startIndex]];
    }
    return [categories[endIndex], visualRange.maxVisible];
  }
};

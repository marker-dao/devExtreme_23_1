/**
* DevExtreme (cjs/viz/axes/constant_line.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = createConstantLine;
var _type = require("../../core/utils/type");
function createConstantLine(axis, options) {
  const labelOptions = options.label || {};
  const labelPosition = labelOptions.position || 'inside';
  let parsedValue;
  let valueIsParsed = false;
  let lastStoredCoordinates;
  axis._checkAlignmentConstantLineLabels(labelOptions);
  let storedCoord;
  return {
    options,
    labelOptions,
    labelPosition,
    label: null,
    line: null,
    getParsedValue() {
      if (!valueIsParsed) {
        parsedValue = axis.validateUnit(options.value, 'E2105', 'constantLine');
        valueIsParsed = true;
        return parsedValue;
      }
      return parsedValue;
    },
    draw() {
      if (!(0, _type.isDefined)(options.value) || axis._translator.getBusinessRange().isEmpty()) {
        return this;
      }
      const canvas = axis._getCanvasStartEnd();
      const parsedValue = this.getParsedValue();
      this.coord = axis._getConstantLinePos(parsedValue, canvas.start, canvas.end);
      const rootGroup = options.displayBehindSeries ? axis._axisConstantLineGroups.under : axis._axisConstantLineGroups.above;
      let group = rootGroup[labelPosition];
      if (!group) {
        const side = axis._isHorizontal ? labelOptions.verticalAlignment : labelOptions.horizontalAlignment;
        group = rootGroup[side];
      }
      if (!(0, _type.isDefined)(this.coord)) {
        return this;
      }
      const path = axis._createConstantLine(this.coord, {
        stroke: options.color,
        'stroke-width': options.width,
        dashStyle: options.dashStyle
      });
      this.line = path.append(rootGroup.inside);
      this.label = labelOptions.visible ? axis._drawConstantLineLabels(parsedValue, labelOptions, this.coord, group) : null;
      this.updatePosition();
      return this;
    },
    getContentContainer() {
      return this.label;
    },
    removeLabel() {
      this.label && this.label.remove();
    },
    updatePosition(animate) {
      const canvas = axis._getCanvasStartEnd();
      const coord = axis._getConstantLinePos(this.getParsedValue(), canvas.start, canvas.end);
      if (!(0, _type.isDefined)(coord)) {
        return;
      }
      this.coord = coord;
      if (animate && storedCoord) {
        this.label && this.label.attr(axis._getConstantLineLabelsCoords(storedCoord, this.labelOptions));
        this.line && this.line.attr(axis._getConstantLineGraphicAttributes(storedCoord));
        this.label && this.label.animate(axis._getConstantLineLabelsCoords(this.coord, this.labelOptions));
        this.line && this.line.animate(axis._getConstantLineGraphicAttributes(this.coord));
      } else {
        this.label && this.label.attr(axis._getConstantLineLabelsCoords(this.coord, this.labelOptions));
        this.line && this.line.attr(axis._getConstantLineGraphicAttributes(this.coord));
        axis._rotateConstantLine(this.line, this.coord);
      }
    },
    saveCoords() {
      lastStoredCoordinates = storedCoord;
      storedCoord = this.coord;
    },
    resetCoordinates() {
      storedCoord = lastStoredCoordinates;
    }
  };
}
module.exports = exports.default;
module.exports.default = exports.default;

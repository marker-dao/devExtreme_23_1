/**
* DevExtreme (esm/viz/axes/strip.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
import { patchFontOptions } from '../core/utils';
import { extend } from '../../core/utils/extend';
export default function createStrip(axis, options) {
  let storedCoord;
  let lastStoredCoordinates;
  const labelOptions = options.label || {};
  return {
    options,
    label: null,
    rect: null,
    _getCoord() {
      const canvas = axis._getCanvasStartEnd();
      const range = axis._translator.getBusinessRange();
      return axis._getStripPos(options.startValue, options.endValue, canvas.start, canvas.end, range);
    },
    _drawLabel(coords) {
      return axis._renderer.text(labelOptions.text, coords.x, coords.y).css(patchFontOptions(extend({}, axis.getOptions().label.font, labelOptions.font))).attr({
        align: 'center',
        'class': labelOptions.cssClass
      }).append(axis._axisStripLabelGroup);
    },
    draw() {
      if (axis._translator.getBusinessRange().isEmpty()) {
        return;
      }
      if ((isDefined(options.startValue) || isDefined(options.endValue)) && isDefined(options.color)) {
        const stripPos = this._getCoord();
        this.labelCoords = labelOptions.text ? axis._getStripLabelCoords(stripPos.from, stripPos.to, labelOptions) : null;
        if (stripPos.outOfCanvas || !isDefined(stripPos.to) || !isDefined(stripPos.from)) {
          return;
        }
        this.rect = axis._createStrip(axis._getStripGraphicAttributes(stripPos.from, stripPos.to)).attr({
          fill: options.color
        }).append(axis._axisStripGroup);
        this.label = labelOptions.text ? this._drawLabel(this.labelCoords) : null;
      }
    },
    getContentContainer() {
      return this.label;
    },
    removeLabel() {},
    updatePosition(animate) {
      const stripPos = this._getCoord();
      if (animate && storedCoord) {
        this.label && this.label.attr(axis._getStripLabelCoords(storedCoord.from, storedCoord.to, options.label));
        this.rect && this.rect.attr(axis._getStripGraphicAttributes(storedCoord.from, storedCoord.to));
        this.label && this.label.animate(axis._getStripLabelCoords(stripPos.from, stripPos.to, options.label));
        this.rect && this.rect.animate(axis._getStripGraphicAttributes(stripPos.from, stripPos.to));
      } else {
        this.label && this.label.attr(axis._getStripLabelCoords(stripPos.from, stripPos.to, options.label));
        this.rect && this.rect.attr(axis._getStripGraphicAttributes(stripPos.from, stripPos.to));
      }
    },
    saveCoords() {
      lastStoredCoordinates = storedCoord;
      storedCoord = this._getCoord();
    },
    resetCoordinates() {
      storedCoord = lastStoredCoordinates;
    }
  };
}

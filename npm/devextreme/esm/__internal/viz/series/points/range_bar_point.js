/**
* DevExtreme (esm/__internal/viz/series/points/range_bar_point.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { noop } from '../../../../core/utils/common';
import { extend } from '../../../../core/utils/extend';
import barPoint from '../../../viz/series/points/bar_point';
import rangeSymbolPointMethods from '../../../viz/series/points/range_symbol_point';
const _extend = extend;
export default _extend({}, barPoint, {
  deleteLabel: rangeSymbolPointMethods.deleteLabel,
  _getFormatObject: rangeSymbolPointMethods._getFormatObject,
  clearVisibility() {
    const graphic = this.graphic;
    if (graphic && graphic.attr('visibility')) {
      graphic.attr({
        visibility: null
      });
    }
  },
  setInvisibility() {
    const graphic = this.graphic;
    if (graphic && graphic.attr('visibility') !== 'hidden') {
      graphic.attr({
        visibility: 'hidden'
      });
    }
    this._topLabel.draw(false);
    this._bottomLabel.draw(false);
  },
  getTooltipParams(location) {
    const that = this;
    const edgeLocation = location === 'edge';
    let x;
    let y;
    if (that._options.rotated) {
      x = edgeLocation ? that.x + that.width : that.x + that.width / 2;
      y = that.y + that.height / 2;
    } else {
      x = that.x + that.width / 2;
      y = edgeLocation ? that.y : that.y + that.height / 2;
    }
    return {
      x,
      y,
      offset: 0
    };
  },
  _translate() {
    const that = this;
    const barMethods = barPoint;
    barMethods._translate.call(that);
    if (that._options.rotated) {
      that.width = that.width || 1;
    } else {
      that.height = that.height || 1;
    }
  },
  hasCoords: rangeSymbolPointMethods.hasCoords,
  _updateData: rangeSymbolPointMethods._updateData,
  _getLabelPosition: rangeSymbolPointMethods._getLabelPosition,
  _getLabelMinFormatObject: rangeSymbolPointMethods._getLabelMinFormatObject,
  _updateLabelData: rangeSymbolPointMethods._updateLabelData,
  _updateLabelOptions: rangeSymbolPointMethods._updateLabelOptions,
  getCrosshairData: rangeSymbolPointMethods.getCrosshairData,
  _createLabel: rangeSymbolPointMethods._createLabel,
  _checkOverlay: rangeSymbolPointMethods._checkOverlay,
  _checkLabelsOverlay: rangeSymbolPointMethods._checkLabelsOverlay,
  _getOverlayCorrections: rangeSymbolPointMethods._getOverlayCorrections,
  _drawLabel: rangeSymbolPointMethods._drawLabel,
  _getLabelCoords: rangeSymbolPointMethods._getLabelCoords,
  getLabel: rangeSymbolPointMethods.getLabel,
  getLabels: rangeSymbolPointMethods.getLabels,
  getBoundingRect: noop,
  getMinValue: rangeSymbolPointMethods.getMinValue,
  getMaxValue: rangeSymbolPointMethods.getMaxValue
});

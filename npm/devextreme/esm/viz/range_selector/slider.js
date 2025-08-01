/**
* DevExtreme (esm/viz/range_selector/slider.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { utils, formatValue, isFirefoxOnAndroid } from './common';
const animationSettings = utils.animationSettings;
import SliderMarker from './slider_marker';
import supportUtils from '../../__internal/core/utils/m_support';
const SPLITTER_WIDTH = 8;
const TOUCH_SPLITTER_WIDTH = 20;
function getSliderTrackerWidth(sliderHandleWidth) {
  return supportUtils.touchEvents || supportUtils.pointerEvents ? TOUCH_SPLITTER_WIDTH : SPLITTER_WIDTH < sliderHandleWidth ? sliderHandleWidth : SPLITTER_WIDTH;
}
function Slider(params, index) {
  const that = this;
  that._translator = params.translator;
  that._sliderGroup = params.renderer.g().attr({
    'class': 'slider'
  }).append(params.root);
  that._line = params.renderer.path(null, 'line').append(that._sliderGroup);
  that._marker = new SliderMarker(params.renderer, that._sliderGroup, index === 1);
  that._tracker = params.renderer.rect().attr({
    'class': 'slider-tracker',
    fill: '#000000',
    opacity: 0.0001
  }).css({
    cursor: 'w-resize'
  }).append(params.trackersGroup);
}
Slider.prototype = {
  constructor: Slider,
  cancelAnimation: function () {
    this._sliderGroup.stopAnimation();
    this._tracker.stopAnimation();
  },
  applyPosition: function (isAnimated) {
    const that = this;
    const slider = that._sliderGroup;
    const tracker = that._tracker;
    const sliderAttrs = {
      translateX: that._position
    };
    let trackerAttrs = {
      translateX: that._position
    };
    if (isFirefoxOnAndroid()) {
      trackerAttrs = {
        x: that._position - tracker._originalWidth / 2
      };
    }
    that._marker.setPosition(that._position);
    if (isAnimated) {
      slider.animate(sliderAttrs, animationSettings);
      tracker.animate(trackerAttrs, animationSettings);
    } else {
      slider.attr(sliderAttrs);
      tracker.attr(trackerAttrs);
    }
  },
  _setValid: function (isValid) {
    this._marker.setValid(isValid);
    this._line.attr({
      stroke: this._colors[Number(isValid)]
    });
  },
  _setText: function (text) {
    this._marker.setText(text);
  },
  update: function (verticalRange, sliderHandleOptions, sliderMarkerOptions) {
    const that = this;
    that._formatOptions = {
      format: sliderMarkerOptions.format,
      customizeText: sliderMarkerOptions.customizeText
    };
    that._marker.applyOptions(sliderMarkerOptions, that._translator.getScreenRange());
    that._colors = [sliderMarkerOptions.invalidRangeColor, sliderHandleOptions.color];
    that._sliderGroup.attr({
      translateY: verticalRange[0]
    });
    that._line.attr({
      'stroke-width': sliderHandleOptions.width,
      stroke: sliderHandleOptions.color,
      'stroke-opacity': sliderHandleOptions.opacity,
      sharp: 'h',
      points: [0, 0, 0, verticalRange[1] - verticalRange[0]]
    });
    const trackerWidth = getSliderTrackerWidth(sliderHandleOptions.width);
    const trackerAttrs = {
      x: -trackerWidth / 2,
      width: trackerWidth,
      height: verticalRange[1] - verticalRange[0],
      y: isFirefoxOnAndroid() ? verticalRange[0] : 0,
      translateY: isFirefoxOnAndroid() ? undefined : verticalRange[0]
    };
    that._tracker.attr(trackerAttrs);
  },
  toForeground: function () {
    this._sliderGroup.toForeground();
  },
  getSliderTracker: function () {
    return this._tracker;
  },
  getPosition: function () {
    return this._position;
  },
  setDisplayValue: function (value) {
    this._value = value;
    this._setText(formatValue(value, this._formatOptions));
  },
  setOverlapped: function (isOverlapped) {
    this._marker.setOverlapped(isOverlapped);
  },
  getValue: function () {
    return this._value;
  },
  on: function (event, handler) {
    this._tracker.on(event, handler);
    this._marker.getTracker().on(event, handler);
  },
  getCloudBorder: function () {
    return this._marker.getBorderPosition();
  },
  dispose: function () {
    this._marker.dispose();
  }
};
export default Slider;

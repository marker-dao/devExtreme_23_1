/**
* DevExtreme (cjs/__internal/ui/slider/m_slider_tooltip_position_controller.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderTooltipPositionController = void 0;
var _position = _interopRequireDefault(require("../../../common/core/animation/position"));
var _translator = require("../../../common/core/animation/translator");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _m_popover_position_controller = require("../../ui/popover/m_popover_position_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SLIDER_TOOLTIP_POSITION_ALIASES = {
  top: {
    my: 'bottom center',
    at: 'top center',
    collision: 'fit none'
  },
  bottom: {
    my: 'top center',
    at: 'bottom center',
    collision: 'fit none'
  }
};
const SLIDER_TOOLTIP_DEFAULT_BOUNDARY_OFFSET = {
  h: 2,
  v: 1
};
const SLIDER_CLASS = 'dx-slider';
class SliderTooltipPositionController extends _m_popover_position_controller.PopoverPositionController {
  _normalizePosition(positionProp) {
    const $sliderHandle = this._props.target;
    const sliderClass = `.${SLIDER_CLASS}`;
    const $slider = $sliderHandle === null || $sliderHandle === void 0 ? void 0 : $sliderHandle.closest(sliderClass);
    const defaultPositionConfig = {
      of: $sliderHandle,
      boundaryOffset: SLIDER_TOOLTIP_DEFAULT_BOUNDARY_OFFSET,
      boundary: $slider === null || $slider === void 0 ? void 0 : $slider.get(0)
    };
    const resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  }
  _renderContentInitialPosition() {
    super._renderContentInitialPosition();
    this._fitIntoSlider();
  }
  _fitIntoSlider() {
    const {
      collisionSide,
      oversize
    } = _position.default.calculate(this._$content, this._position).h;
    const {
      left
    } = this._visualPosition;
    const isLeftSide = collisionSide === 'left';
    const offset = (isLeftSide ? 1 : -1) * oversize;
    (0, _translator.move)(this._$content, {
      left: left + offset
    });
    this._updateVisualPositionValue();
  }
  _positionToObject(positionProp) {
    if ((0, _type.isString)(positionProp)) {
      return (0, _extend.extend)({}, SLIDER_TOOLTIP_POSITION_ALIASES[positionProp]);
    }
    return positionProp;
  }
}
exports.SliderTooltipPositionController = SliderTooltipPositionController;

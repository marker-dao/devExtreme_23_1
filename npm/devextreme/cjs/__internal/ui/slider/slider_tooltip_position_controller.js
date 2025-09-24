/**
* DevExtreme (cjs/__internal/ui/slider/slider_tooltip_position_controller.js)
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
exports.SliderTooltipPositionController = void 0;
var _position = _interopRequireDefault(require("../../../common/core/animation/position"));
var _translator = require("../../../common/core/animation/translator");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _popover_position_controller = require("../../ui/popover/popover_position_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SLIDER_CLASS = 'dx-slider';
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
const DEFAULT_BOUNDARY_OFFSET = {
  h: 2,
  v: 1
};
class SliderTooltipPositionController extends _popover_position_controller.PopoverPositionController {
  _normalizePosition(position) {
    var _$sliderHandle$closes;
    const {
      target
    } = this._properties;
    const $sliderHandle = target ? (0, _renderer.default)(target) : null;
    const sliderElement = $sliderHandle === null || $sliderHandle === void 0 || (_$sliderHandle$closes = $sliderHandle.closest(`.${SLIDER_CLASS}`)) === null || _$sliderHandle$closes === void 0 ? void 0 : _$sliderHandle$closes.get(0);
    const defaultPositionConfig = {
      of: $sliderHandle,
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET,
      boundary: sliderElement
    };
    const positionObject = (0, _type.isDefined)(position) ? this._positionToObject(position) : {};
    const resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, positionObject);
    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  }
  _renderContentInitialPosition() {
    super._renderContentInitialPosition();
    this._fitIntoSlider();
  }
  _fitIntoSlider() {
    var _this$_visualPosition;
    const calculatedPosition = _position.default.calculate(this._$content, this._position);
    const {
      collisionSide,
      oversize
    } = calculatedPosition.h;
    const left = ((_this$_visualPosition = this._visualPosition) === null || _this$_visualPosition === void 0 ? void 0 : _this$_visualPosition.left) ?? 0;
    const isLeftSide = collisionSide === 'left';
    const offset = (isLeftSide ? 1 : -1) * oversize;
    (0, _translator.move)(this._$content, {
      left: left + offset
    });
    this._updateVisualPositionValue();
  }
  _positionToObject(position) {
    if ((0, _popover_position_controller.isCommonPosition)(position)) {
      const configuration = _extends({}, SLIDER_TOOLTIP_POSITION_ALIASES[position]);
      return configuration;
    }
    return position;
  }
}
exports.SliderTooltipPositionController = SliderTooltipPositionController;

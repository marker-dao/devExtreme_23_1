/**
* DevExtreme (cjs/__internal/ui/popover/popover_position_controller.js)
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
exports.isCommonPosition = exports.PopoverPositionController = exports.POPOVER_POSITION_ALIASES = void 0;
var _position = _interopRequireDefault(require("../../../common/core/animation/position"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _overlay_position_controller = require("../../ui/overlay/overlay_position_controller");
var _utils = require("../../ui/resizable/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WEIGHT_OF_SIDES = {
  left: -1,
  top: -1,
  center: 0,
  right: 1,
  bottom: 1
};
// NOTE: public API
const POPOVER_POSITION_ALIASES = exports.POPOVER_POSITION_ALIASES = {
  top: {
    my: 'bottom center',
    at: 'top center',
    collision: 'fit flip'
  },
  bottom: {
    my: 'top center',
    at: 'bottom center',
    collision: 'fit flip'
  },
  right: {
    my: 'left center',
    at: 'right center',
    collision: 'flip fit'
  },
  left: {
    my: 'right center',
    at: 'left center',
    collision: 'flip fit'
  }
};
const POPOVER_DEFAULT_BOUNDARY_OFFSET = {
  h: 10,
  v: 10
};
const isCommonPosition = position => (0, _type.isString)(position);
exports.isCommonPosition = isCommonPosition;
class PopoverPositionController extends _overlay_position_controller.OverlayPositionController {
  constructor(params) {
    super(params);
    const superProperties = this._properties;
    const {
      properties,
      elements
    } = params;
    const {
      shading,
      target
    } = properties;
    const {
      $arrow
    } = elements;
    this._properties = _extends({}, superProperties, {
      shading,
      target
    });
    this._$arrow = $arrow;
    this._positionSide = undefined;
    this.updatePosition(this._properties.position);
  }
  positionWrapper() {
    if (this._properties.shading) {
      var _this$_$wrapper;
      (_this$_$wrapper = this._$wrapper) === null || _this$_$wrapper === void 0 || _this$_$wrapper.css({
        top: 0,
        left: 0
      });
    }
  }
  updateTarget(target) {
    this._properties.target = target;
    this.updatePosition(this._properties.position);
  }
  _renderBoundaryOffset() {}
  _getContainerPosition() {
    var _this$_position;
    const offset = (0, _common.pairToObject)(((_this$_position = this._position) === null || _this$_position === void 0 ? void 0 : _this$_position.offset) ?? '');
    let {
      h: hOffset,
      v: vOffset
    } = offset;
    const isVerticalSide = this._isVerticalSide();
    const isHorizontalSide = this._isHorizontalSide();
    if (isVerticalSide || isHorizontalSide) {
      const isPopoverInside = this._isPopoverInside();
      const weightOfSide = this._positionSide ? WEIGHT_OF_SIDES[this._positionSide] : WEIGHT_OF_SIDES.center;
      const sign = (isPopoverInside ? -1 : 1) * weightOfSide;
      const arrowSize = isVerticalSide ? (0, _size.getHeight)(this._$arrow) : (0, _size.getWidth)(this._$arrow);
      const arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
      const arrowOffset = sign * (arrowSize - arrowSizeCorrection);
      if (isVerticalSide) {
        vOffset += arrowOffset;
      } else {
        hOffset += arrowOffset;
      }
    }
    const position = _extends({}, this._position, {
      offset: `${hOffset} ${vOffset}`
    });
    return position;
  }
  _getContentBorderWidth(side) {
    var _this$_$content;
    const borderWidth = side ? ((_this$_$content = this._$content) === null || _this$_$content === void 0 ? void 0 : _this$_$content.css(_utils.borderWidthStyles[side])) ?? '' : '';
    return parseInt(borderWidth, 10) || 0;
  }
  _isPopoverInside() {
    var _this$_position2, _this$_position3;
    const my = _position.default.setup.normalizeAlign((_this$_position2 = this._position) === null || _this$_position2 === void 0 ? void 0 : _this$_position2.my);
    const at = _position.default.setup.normalizeAlign((_this$_position3 = this._position) === null || _this$_position3 === void 0 ? void 0 : _this$_position3.at);
    return my.h === at.h && my.v === at.v;
  }
  _isVerticalSide() {
    let side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'top' || side === 'bottom';
  }
  _isHorizontalSide() {
    let side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'left' || side === 'right';
  }
  _getDisplaySide(position) {
    const my = _position.default.setup.normalizeAlign(position.my);
    const at = _position.default.setup.normalizeAlign(position.at);
    const weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
    const horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
    const verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
    return horizontalWeight > verticalWeight ? at.h : at.v;
  }
  _normalizePosition(position) {
    const defaultPositionConfig = {
      of: this._properties.target,
      boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
    };
    const positionObject = (0, _type.isDefined)(position) ? this._positionToObject(position) : {};
    const resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, positionObject);
    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  }
  _positionToObject(position) {
    if (isCommonPosition(position)) {
      const configuration = _extends({}, POPOVER_POSITION_ALIASES[position]);
      return configuration;
    }
    return position;
  }
}
exports.PopoverPositionController = PopoverPositionController;

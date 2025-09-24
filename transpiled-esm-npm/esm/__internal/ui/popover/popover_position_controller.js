import _extends from "@babel/runtime/helpers/esm/extends";
import positionUtils from '../../../common/core/animation/position';
import { pairToObject } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { getHeight, getWidth } from '../../../core/utils/size';
import { isDefined, isString } from '../../../core/utils/type';
import { OverlayPositionController } from '../../ui/overlay/overlay_position_controller';
import { borderWidthStyles } from '../../ui/resizable/utils';
const WEIGHT_OF_SIDES = {
  left: -1,
  top: -1,
  center: 0,
  right: 1,
  bottom: 1
};
// NOTE: public API
export const POPOVER_POSITION_ALIASES = {
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
export const isCommonPosition = position => isString(position);
export class PopoverPositionController extends OverlayPositionController {
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
    const offset = pairToObject(((_this$_position = this._position) === null || _this$_position === void 0 ? void 0 : _this$_position.offset) ?? '');
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
      const arrowSize = isVerticalSide ? getHeight(this._$arrow) : getWidth(this._$arrow);
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
    const borderWidth = side ? ((_this$_$content = this._$content) === null || _this$_$content === void 0 ? void 0 : _this$_$content.css(borderWidthStyles[side])) ?? '' : '';
    return parseInt(borderWidth, 10) || 0;
  }
  _isPopoverInside() {
    var _this$_position2, _this$_position3;
    const my = positionUtils.setup.normalizeAlign((_this$_position2 = this._position) === null || _this$_position2 === void 0 ? void 0 : _this$_position2.my);
    const at = positionUtils.setup.normalizeAlign((_this$_position3 = this._position) === null || _this$_position3 === void 0 ? void 0 : _this$_position3.at);
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
    const my = positionUtils.setup.normalizeAlign(position.my);
    const at = positionUtils.setup.normalizeAlign(position.at);
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
    const positionObject = isDefined(position) ? this._positionToObject(position) : {};
    const resultPosition = extend(true, {}, defaultPositionConfig, positionObject);
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
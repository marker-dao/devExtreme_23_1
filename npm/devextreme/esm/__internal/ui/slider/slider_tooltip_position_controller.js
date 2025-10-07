/**
* DevExtreme (esm/__internal/ui/slider/slider_tooltip_position_controller.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import positionUtils from '../../../common/core/animation/position';
import { move } from '../../../common/core/animation/translator';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { isDefined } from '../../../core/utils/type';
import { isCommonPosition, PopoverPositionController } from '../../ui/popover/popover_position_controller';
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
export class SliderTooltipPositionController extends PopoverPositionController {
  _normalizePosition(position) {
    var _$sliderHandle$closes;
    const {
      target
    } = this._properties;
    const $sliderHandle = target ? $(target) : null;
    const sliderElement = $sliderHandle === null || $sliderHandle === void 0 || (_$sliderHandle$closes = $sliderHandle.closest(`.${SLIDER_CLASS}`)) === null || _$sliderHandle$closes === void 0 ? void 0 : _$sliderHandle$closes.get(0);
    const defaultPositionConfig = {
      of: $sliderHandle,
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET,
      boundary: sliderElement
    };
    const positionObject = isDefined(position) ? this._positionToObject(position) : {};
    const resultPosition = extend(true, {}, defaultPositionConfig, positionObject);
    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  }
  _renderContentInitialPosition() {
    super._renderContentInitialPosition();
    this._fitIntoSlider();
  }
  _fitIntoSlider() {
    var _this$_visualPosition;
    const calculatedPosition = positionUtils.calculate(this._$content, this._position);
    const {
      collisionSide,
      oversize
    } = calculatedPosition.h;
    const left = ((_this$_visualPosition = this._visualPosition) === null || _this$_visualPosition === void 0 ? void 0 : _this$_visualPosition.left) ?? 0;
    const isLeftSide = collisionSide === 'left';
    const offset = (isLeftSide ? 1 : -1) * oversize;
    move(this._$content, {
      left: left + offset
    });
    this._updateVisualPositionValue();
  }
  _positionToObject(position) {
    if (isCommonPosition(position)) {
      const configuration = _extends({}, SLIDER_TOOLTIP_POSITION_ALIASES[position]);
      return configuration;
    }
    return position;
  }
}

/**
* DevExtreme (cjs/__internal/ui/drawer/drawer.rendering.strategy.shrink.js)
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
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _inflector = require("../../../core/utils/inflector");
var _drawer = require("../../ui/drawer/drawer.animation");
var _drawerRendering = _interopRequireDefault(require("../../ui/drawer/drawer.rendering.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShrinkStrategy extends _drawerRendering.default {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isDrawerOpened,
      revealMode,
      animationDuration
    } = drawer.option();
    const direction = drawer.calcTargetPosition();
    const $panel = (0, _renderer.default)(drawer.content());
    const panelSize = this._getPanelSize(isDrawerOpened);
    const panelOffset = this._getPanelOffset(isDrawerOpened);
    if (changePositionUsingFxAnimation) {
      if (revealMode === 'slide') {
        _drawer.animation.margin({
          complete: () => {
            whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: animationDuration,
          direction,
          margin: panelOffset
        });
      } else if (revealMode === 'expand') {
        _drawer.animation.size({
          complete: () => {
            whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: animationDuration,
          direction,
          size: panelSize
        });
      }
    } else if (revealMode === 'slide') {
      $panel.css(`margin${(0, _inflector.camelize)(direction, true)}`, panelOffset);
    } else if (revealMode === 'expand') {
      // @ts-expect-error ts-error
      $panel.css(drawer.isHorizontalDirection() ? 'width' : 'height', panelSize);
    }
  }
  isViewContentFirst(position, isRtl) {
    return (isRtl ? position === 'left' : position === 'right') || position === 'bottom';
  }
}
var _default = exports.default = ShrinkStrategy;

/**
* DevExtreme (cjs/__internal/ui/drawer/drawer.rendering.strategy.push.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translator = require("../../../common/core/animation/translator");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _drawer = require("../../ui/drawer/drawer.animation");
var _drawerRendering = _interopRequireDefault(require("../../ui/drawer/drawer.rendering.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PushStrategy extends _drawerRendering.default {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isDrawerOpened,
      animationDuration
    } = drawer.option();
    const openedPanelSize = this._getPanelSize(true);
    // @ts-expect-error ts-error
    const contentPosition = this._getPanelSize(isDrawerOpened) * drawer._getPositionCorrection();
    // @ts-expect-error ts-error
    (0, _renderer.default)(drawer.content()).css(drawer.isHorizontalDirection() ? 'width' : 'height', openedPanelSize);
    if (drawer.getMinSize()) {
      let paddingCssPropertyName = 'padding';
      switch (drawer.calcTargetPosition()) {
        case 'left':
          paddingCssPropertyName += 'Right';
          break;
        case 'right':
          paddingCssPropertyName += 'Left';
          break;
        case 'top':
          paddingCssPropertyName += 'Bottom';
          break;
        case 'bottom':
          paddingCssPropertyName += 'Top';
          break;
        default:
          break;
      }
      // @ts-expect-error ts-error
      (0, _renderer.default)(drawer.viewContent()).css(paddingCssPropertyName, drawer.getMinSize());
    } else {
      // TODO: ???
    }
    if (changePositionUsingFxAnimation) {
      _drawer.animation.moveTo({
        $element: (0, _renderer.default)(drawer.viewContent()),
        position: contentPosition,
        direction: drawer.calcTargetPosition(),
        duration: animationDuration,
        complete: () => {
          whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
        }
      });
    } else if (drawer.isHorizontalDirection()) {
      (0, _translator.move)((0, _renderer.default)(drawer.viewContent()), {
        left: contentPosition
      });
    } else {
      (0, _translator.move)((0, _renderer.default)(drawer.viewContent()), {
        top: contentPosition
      });
    }
  }
  onPanelContentRendered() {
    (0, _renderer.default)(this.getDrawerInstance().viewContent()).addClass('dx-theme-background-color');
  }
}
var _default = exports.default = PushStrategy;

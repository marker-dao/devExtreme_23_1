/**
* DevExtreme (cjs/__internal/ui/drawer/m_drawer.rendering.strategy.push.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
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
var _m_drawer = require("./m_drawer.animation");
var _m_drawerRendering = _interopRequireDefault(require("./m_drawer.rendering.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PushStrategy extends _m_drawerRendering.default {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const openedPanelSize = this._getPanelSize(true);
    // @ts-expect-error
    const contentPosition = this._getPanelSize(drawer.option('opened')) * drawer._getPositionCorrection();
    // @ts-expect-error
    (0, _renderer.default)(drawer.content()).css(drawer.isHorizontalDirection() ? 'width' : 'height', openedPanelSize);
    // @ts-expect-error
    if (drawer.getMinSize()) {
      let paddingCssPropertyName = 'padding';
      // @ts-expect-error
      // eslint-disable-next-line default-case
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
      }
      // @ts-expect-error
      (0, _renderer.default)(drawer.viewContent()).css(paddingCssPropertyName, drawer.getMinSize());
    } else {
      // TODO: ???
    }
    if (changePositionUsingFxAnimation) {
      _m_drawer.animation.moveTo({
        // @ts-expect-error
        $element: (0, _renderer.default)(drawer.viewContent()),
        position: contentPosition,
        // @ts-expect-error
        direction: drawer.calcTargetPosition(),
        duration: drawer.option('animationDuration'),
        complete: () => {
          whenAnimationCompleted.resolve();
        }
      });
      // @ts-expect-error
    } else if (drawer.isHorizontalDirection()) {
      // @ts-expect-error
      (0, _translator.move)((0, _renderer.default)(drawer.viewContent()), {
        left: contentPosition
      });
    } else {
      // @ts-expect-error
      (0, _translator.move)((0, _renderer.default)(drawer.viewContent()), {
        top: contentPosition
      });
    }
  }
  onPanelContentRendered() {
    // @ts-expect-error
    (0, _renderer.default)(this.getDrawerInstance().viewContent()).addClass('dx-theme-background-color');
  }
}
var _default = exports.default = PushStrategy;

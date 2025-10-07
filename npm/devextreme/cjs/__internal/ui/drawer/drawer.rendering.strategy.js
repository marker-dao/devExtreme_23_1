/**
* DevExtreme (cjs/__internal/ui/drawer/drawer.rendering.strategy.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
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
var _deferred = require("../../../core/utils/deferred");
var _size = require("../../../core/utils/size");
var _drawer = require("../../ui/drawer/drawer.animation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DrawerStrategy {
  constructor(drawer) {
    this._drawer = drawer;
  }
  getDrawerInstance() {
    return this._drawer;
  }
  renderPanelContent(whenPanelContentRendered) {
    const drawer = this.getDrawerInstance();
    const template = drawer._getTemplate(drawer.option('template'));
    if (template) {
      template.render({
        container: drawer.content(),
        onRendered: () => {
          whenPanelContentRendered === null || whenPanelContentRendered === void 0 || whenPanelContentRendered.resolve();
        }
      });
    }
  }
  renderPosition(changePositionUsingFxAnimation, animationDuration) {
    const whenPositionAnimationCompleted = (0, _deferred.Deferred)();
    const whenShaderAnimationCompleted = (0, _deferred.Deferred)();
    const drawer = this.getDrawerInstance();
    if (changePositionUsingFxAnimation) {
      _deferred.when.apply(_renderer.default, [whenPositionAnimationCompleted, whenShaderAnimationCompleted]).done(() => {
        drawer._animationCompleteHandler();
      });
    }
    this._internalRenderPosition(changePositionUsingFxAnimation, whenPositionAnimationCompleted);
    if (!changePositionUsingFxAnimation) {
      drawer.resizeViewContent();
    }
    this.renderShaderVisibility(changePositionUsingFxAnimation, animationDuration, whenShaderAnimationCompleted);
  }
  _getPanelOffset(isDrawerOpened) {
    const drawer = this.getDrawerInstance();
    const size = drawer.isHorizontalDirection() ? drawer.getRealPanelWidth() : drawer.getRealPanelHeight();
    const panelSize = this._getPanelSize(isDrawerOpened) ?? 0;
    return panelSize - size;
  }
  _getPanelSize(isDrawerOpened) {
    return isDrawerOpened ? this.getDrawerInstance().getMaxSize() : this.getDrawerInstance().getMinSize();
  }
  renderShaderVisibility(changePositionUsingFxAnimation, duration, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isShaderVisible
    } = drawer.option();
    const fadeConfig = isShaderVisible ? {
      from: 0,
      to: 1
    } : {
      from: 1,
      to: 0
    };
    if (changePositionUsingFxAnimation) {
      _drawer.animation.fade((0, _renderer.default)(drawer._$shader), fadeConfig, duration, () => {
        this._drawer._toggleShaderVisibility(isShaderVisible);
        whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
      });
    } else {
      drawer._toggleShaderVisibility(isShaderVisible);
      drawer._$shader.css('opacity', fadeConfig.to);
    }
  }
  getPanelContent() {
    return (0, _renderer.default)(this.getDrawerInstance().content());
  }
  setPanelSize(calcFromRealPanelSize) {
    this.refreshPanelElementSize(calcFromRealPanelSize);
  }
  refreshPanelElementSize(calcFromRealPanelSize) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isDrawerOpened
    } = drawer.option();
    const panelSize = this._getPanelSize(isDrawerOpened);
    if (drawer.isHorizontalDirection()) {
      (0, _size.setWidth)((0, _renderer.default)(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelWidth() : panelSize);
    } else {
      (0, _size.setHeight)((0, _renderer.default)(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelHeight() : panelSize);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isViewContentFirst(position, isRtl) {
    return false;
  }
  onPanelContentRendered() {}
  _internalRenderPosition(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePositionUsingFxAnimation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  whenPositionAnimationCompleted) {}
}
var _default = exports.default = DrawerStrategy;

/**
* DevExtreme (esm/__internal/ui/drawer/drawer.rendering.strategy.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { Deferred, when } from '../../../core/utils/deferred';
import { setHeight, setWidth } from '../../../core/utils/size';
import { animation } from '../../ui/drawer/drawer.animation';
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
    const whenPositionAnimationCompleted = Deferred();
    const whenShaderAnimationCompleted = Deferred();
    const drawer = this.getDrawerInstance();
    if (changePositionUsingFxAnimation) {
      when.apply($, [whenPositionAnimationCompleted, whenShaderAnimationCompleted]).done(() => {
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
      animation.fade($(drawer._$shader), fadeConfig, duration, () => {
        this._drawer._toggleShaderVisibility(isShaderVisible);
        whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
      });
    } else {
      drawer._toggleShaderVisibility(isShaderVisible);
      drawer._$shader.css('opacity', fadeConfig.to);
    }
  }
  getPanelContent() {
    return $(this.getDrawerInstance().content());
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
      setWidth($(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelWidth() : panelSize);
    } else {
      setHeight($(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelHeight() : panelSize);
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
export default DrawerStrategy;

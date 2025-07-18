/**
* DevExtreme (esm/__internal/ui/drawer/drawer.rendering.strategy.push.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { move } from '../../../common/core/animation/translator';
import $ from '../../../core/renderer';
import { animation } from './drawer.animation';
import DrawerStrategy from './drawer.rendering.strategy';
class PushStrategy extends DrawerStrategy {
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
    $(drawer.content()).css(drawer.isHorizontalDirection() ? 'width' : 'height', openedPanelSize);
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
      $(drawer.viewContent()).css(paddingCssPropertyName, drawer.getMinSize());
    } else {
      // TODO: ???
    }
    if (changePositionUsingFxAnimation) {
      animation.moveTo({
        $element: $(drawer.viewContent()),
        position: contentPosition,
        direction: drawer.calcTargetPosition(),
        duration: animationDuration,
        complete: () => {
          whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
        }
      });
    } else if (drawer.isHorizontalDirection()) {
      move($(drawer.viewContent()), {
        left: contentPosition
      });
    } else {
      move($(drawer.viewContent()), {
        top: contentPosition
      });
    }
  }
  onPanelContentRendered() {
    $(this.getDrawerInstance().viewContent()).addClass('dx-theme-background-color');
  }
}
export default PushStrategy;

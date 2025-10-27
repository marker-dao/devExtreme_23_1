/**
* DevExtreme (esm/__internal/ui/drawer/drawer.rendering.strategy.shrink.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { camelize } from '../../../core/utils/inflector';
import { animation } from '../../ui/drawer/drawer.animation';
import DrawerStrategy from '../../ui/drawer/drawer.rendering.strategy';
class ShrinkStrategy extends DrawerStrategy {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const {
      opened: isDrawerOpened,
      revealMode,
      animationDuration
    } = drawer.option();
    const direction = drawer.calcTargetPosition();
    const $panel = $(drawer.content());
    const panelSize = this._getPanelSize(isDrawerOpened);
    const panelOffset = this._getPanelOffset(isDrawerOpened);
    if (changePositionUsingFxAnimation) {
      if (revealMode === 'slide') {
        animation.margin({
          complete: () => {
            whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: animationDuration,
          direction,
          margin: panelOffset
        });
      } else if (revealMode === 'expand') {
        animation.size({
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
      $panel.css(`margin${camelize(direction, true)}`, panelOffset);
    } else if (revealMode === 'expand') {
      // @ts-expect-error ts-error
      $panel.css(drawer.isHorizontalDirection() ? 'width' : 'height', panelSize);
    }
  }
  isViewContentFirst(position, isRtl) {
    return (isRtl ? position === 'left' : position === 'right') || position === 'bottom';
  }
}
export default ShrinkStrategy;

/**
* DevExtreme (esm/__internal/ui/drawer/drawer.rendering.strategy.overlap.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { move } from '../../../common/core/animation/translator';
import $ from '../../../core/renderer';
import { ensureDefined } from '../../../core/utils/common';
import { camelize } from '../../../core/utils/inflector';
import { getWidth } from '../../../core/utils/size';
import { animation } from '../../ui/drawer/drawer.animation';
import DrawerStrategy from '../../ui/drawer/drawer.rendering.strategy';
import Overlay from '../../ui/overlay/overlay';
class OverlapStrategy extends DrawerStrategy {
  renderPanelContent(whenPanelContentRendered) {
    delete this._initialPosition;
    const drawer = this.getDrawerInstance();
    const {
      opened,
      minSize,
      template: contentTemplate,
      templatesRenderAsynchronously
    } = drawer.option();
    drawer._overlay = drawer._createComponent($(drawer.content()), Overlay, {
      shading: false,
      container: drawer.content(),
      // @ts-expect-error ts-error
      visualContainer: drawer.getOverlayTarget(),
      position: this._getOverlayPosition(),
      width: opened ? 'auto' : minSize ?? 0,
      height: '100%',
      templatesRenderAsynchronously,
      animation: {
        show: {
          duration: 0
        }
      },
      // eslint-disable-next-line func-names
      onPositioned: function (e) {
        this._fixOverlayPosition(e.component.$content());
      }.bind(this),
      contentTemplate,
      onContentReady: args => {
        whenPanelContentRendered === null || whenPanelContentRendered === void 0 || whenPanelContentRendered.resolve();
        this._processOverlayZIndex(args.component.content());
      },
      visible: true,
      propagateOutsideClick: true
    });
  }
  _fixOverlayPosition($overlayContent) {
    // NOTE: overlay should be positioned in extended wrapper
    const position = ensureDefined(this._initialPosition, {
      left: 0,
      top: 0
    });
    move($overlayContent, position);
    if (this.getDrawerInstance().calcTargetPosition() === 'right') {
      $overlayContent.css('left', 'auto');
    }
    if (this.getDrawerInstance().calcTargetPosition() === 'bottom') {
      $overlayContent.css('top', 'auto');
      $overlayContent.css('bottom', '0px');
    }
  }
  _getOverlayPosition() {
    const drawer = this.getDrawerInstance();
    const panelPosition = drawer.calcTargetPosition();
    let result = {};
    switch (panelPosition) {
      case 'left':
        {
          result = {
            // @ts-expect-error ts-error
            my: 'top left',
            // @ts-expect-error ts-error
            at: 'top left'
          };
          break;
        }
      case 'right':
        {
          result = {
            // @ts-expect-error ts-error
            my: drawer.option('rtlEnabled') ? 'top left' : 'top right',
            // @ts-expect-error ts-error
            at: 'top right'
          };
          break;
        }
      case 'top':
      case 'bottom':
        {
          result = {
            my: panelPosition,
            at: panelPosition
          };
          break;
        }
      default:
        break;
    }
    result.of = drawer.getOverlayTarget().get(0);
    return result;
  }
  refreshPanelElementSize(calcFromRealPanelSize) {
    const drawer = this.getDrawerInstance();
    const overlay = drawer.getOverlay();
    const {
      opened: isDrawerOpened
    } = drawer.option();
    if (!overlay) {
      return;
    }
    if (drawer.isHorizontalDirection()) {
      overlay.option('height', '100%');
      overlay.option('width', calcFromRealPanelSize ? drawer.getRealPanelWidth() : this._getPanelSize(isDrawerOpened));
    } else {
      overlay.option('width', getWidth(drawer.getOverlayTarget()));
      overlay.option('height', calcFromRealPanelSize ? drawer.getRealPanelHeight() : this._getPanelSize(isDrawerOpened));
    }
  }
  onPanelContentRendered() {
    this._updateViewContentStyles();
  }
  _updateViewContentStyles() {
    const drawer = this.getDrawerInstance();
    const {
      minSize
    } = drawer.option();
    // @ts-expect-error ts-error
    $(drawer.viewContent()).css(`padding${camelize(drawer.calcTargetPosition(), true)}`, minSize);
    $(drawer.viewContent()).css('transform', 'inherit');
  }
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const $panel = $(drawer.content());
    const {
      opened: isDrawerOpened,
      revealMode,
      animationDuration
    } = drawer.option();
    // @ts-expect-error ts-error
    const $panelOverlayContent = drawer.getOverlay().$content();
    const targetPanelPosition = drawer.calcTargetPosition();
    const panelSize = this._getPanelSize(isDrawerOpened) ?? 0;
    const panelOffset = this._getPanelOffset(isDrawerOpened) * drawer._getPositionCorrection();
    const marginTop = drawer.getRealPanelHeight() - panelSize;
    this._updateViewContentStyles();
    if (changePositionUsingFxAnimation) {
      if (revealMode === 'slide') {
        this._initialPosition = drawer.isHorizontalDirection() ? {
          left: panelOffset
        } : {
          top: panelOffset
        };
        animation.moveTo({
          complete: () => {
            whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
          },
          duration: animationDuration,
          direction: targetPanelPosition,
          $element: $panel,
          position: panelOffset
        });
      } else if (revealMode === 'expand') {
        this._initialPosition = drawer.isHorizontalDirection() ? {
          left: 0
        } : {
          top: 0
        };
        move($panelOverlayContent, this._initialPosition);
        animation.size({
          complete: () => {
            whenAnimationCompleted === null || whenAnimationCompleted === void 0 || whenAnimationCompleted.resolve();
          },
          duration: animationDuration,
          direction: targetPanelPosition,
          $element: $panelOverlayContent,
          size: panelSize,
          marginTop
        });
      }
    } else if (revealMode === 'slide') {
      this._initialPosition = drawer.isHorizontalDirection() ? {
        left: panelOffset
      } : {
        top: panelOffset
      };
      move($panel, this._initialPosition);
    } else if (revealMode === 'expand') {
      this._initialPosition = drawer.isHorizontalDirection() ? {
        left: 0
      } : {
        top: 0
      };
      move($panelOverlayContent, this._initialPosition);
      if (drawer.isHorizontalDirection()) {
        $($panelOverlayContent).css('width', panelSize);
      } else {
        $($panelOverlayContent).css('height', panelSize);
        if (targetPanelPosition === 'bottom') {
          $($panelOverlayContent).css('marginTop', marginTop);
        }
      }
    }
  }
  getPanelContent() {
    // @ts-expect-error ts-error
    return $(this.getDrawerInstance().getOverlay().content());
  }
  _processOverlayZIndex(element) {
    // @ts-expect-error ts-error
    const styles = $(element).get(0).style;
    const zIndex = styles.zIndex || 1;
    this.getDrawerInstance().setZIndex(zIndex);
  }
  isViewContentFirst(position) {
    return position === 'right' || position === 'bottom';
  }
}
export default OverlapStrategy;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translator = require("../../../common/core/animation/translator");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _inflector = require("../../../core/utils/inflector");
var _size = require("../../../core/utils/size");
var _overlay = _interopRequireDefault(require("../../ui/overlay/overlay"));
var _drawer = require("./drawer.animation");
var _drawerRendering = _interopRequireDefault(require("./drawer.rendering.strategy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class OverlapStrategy extends _drawerRendering.default {
  renderPanelContent(whenPanelContentRendered) {
    delete this._initialPosition;
    const drawer = this.getDrawerInstance();
    const {
      opened,
      minSize,
      template: contentTemplate,
      templatesRenderAsynchronously
    } = drawer.option();
    drawer._overlay = drawer._createComponent((0, _renderer.default)(drawer.content()), _overlay.default, {
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
    const position = (0, _common.ensureDefined)(this._initialPosition, {
      left: 0,
      top: 0
    });
    (0, _translator.move)($overlayContent, position);
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
      overlay.option('width', (0, _size.getWidth)(drawer.getOverlayTarget()));
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
    (0, _renderer.default)(drawer.viewContent()).css(`padding${(0, _inflector.camelize)(drawer.calcTargetPosition(), true)}`, minSize);
    (0, _renderer.default)(drawer.viewContent()).css('transform', 'inherit');
  }
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const $panel = (0, _renderer.default)(drawer.content());
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
        _drawer.animation.moveTo({
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
        (0, _translator.move)($panelOverlayContent, this._initialPosition);
        _drawer.animation.size({
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
      (0, _translator.move)($panel, this._initialPosition);
    } else if (revealMode === 'expand') {
      this._initialPosition = drawer.isHorizontalDirection() ? {
        left: 0
      } : {
        top: 0
      };
      (0, _translator.move)($panelOverlayContent, this._initialPosition);
      if (drawer.isHorizontalDirection()) {
        (0, _renderer.default)($panelOverlayContent).css('width', panelSize);
      } else {
        (0, _renderer.default)($panelOverlayContent).css('height', panelSize);
        if (targetPanelPosition === 'bottom') {
          (0, _renderer.default)($panelOverlayContent).css('marginTop', marginTop);
        }
      }
    }
  }
  getPanelContent() {
    // @ts-expect-error ts-error
    return (0, _renderer.default)(this.getDrawerInstance().getOverlay().content());
  }
  _processOverlayZIndex(element) {
    // @ts-expect-error ts-error
    const styles = (0, _renderer.default)(element).get(0).style;
    const zIndex = styles.zIndex || 1;
    this.getDrawerInstance().setZIndex(zIndex);
  }
  isViewContentFirst(position) {
    return position === 'right' || position === 'bottom';
  }
}
var _default = exports.default = OverlapStrategy;
/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.floating_panel.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { getHeight, getOuterHeight, getOuterWidth, getWidth } from '../../../core/utils/size';
import { hasWindow } from '../../../core/utils/window';
import DiagramPanel from '../../ui/diagram/ui.diagram.panel';
import Popup from '../../ui/popup/m_popup';
const DIAGRAM_MOBILE_POPUP_CLASS = 'dx-diagram-mobile-popup';
class DiagramFloatingPanel extends DiagramPanel {
  _init() {
    super._init();
    this._createOnVisibilityChangingAction();
    this._createOnVisibilityChangedAction();
  }
  isVisible() {
    // @ts-expect-error ts-error
    const {
      isVisible
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isVisible;
  }
  isMobileView() {
    // @ts-expect-error ts-error
    const {
      isMobileView
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isMobileView;
  }
  _initMarkup() {
    super._initMarkup();
    const $parent = this.$element();
    const $popupElement = $('<div>').addClass(this._getPopupClass())
    // @ts-expect-error ts-error
    .addClass(this.isMobileView() && DIAGRAM_MOBILE_POPUP_CLASS).appendTo($parent);
    this._popup = this._createComponent($popupElement, Popup, this._getPopupOptions());
    this._updatePopupVisible();
  }
  show() {
    this.option('isVisible', true);
  }
  hide() {
    this.option('isVisible', false);
  }
  toggle() {
    this.option('isVisible', !this.isVisible());
  }
  repaint() {
    var _this$_popup;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.repaint();
  }
  _getPopupContent() {
    var _this$_popup2;
    return (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 ? void 0 : _this$_popup2.content();
  }
  _getPopupTitle() {
    const $content = $(this._getPopupContent());
    return $content.parent().find('.dx-popup-title');
  }
  _getPointerUpElements() {
    return [this._getPopupContent(), this._getPopupTitle()];
  }
  _getVerticalPaddingsAndBorders() {
    const $content = $(this._getPopupContent());
    return getOuterHeight($content) - getHeight($content);
  }
  _getHorizontalPaddingsAndBorders() {
    const $content = $(this._getPopupContent());
    return getOuterWidth($content) - getWidth($content);
  }
  _getPopupClass() {
    return '';
  }
  _getPopupWidth() {
    const {
      width
    } = this.option();
    return width ?? 'auto';
  }
  _getPopupMaxWidth() {
    const {
      maxWidth
    } = this.option();
    // @ts-expect-error ts-error
    return maxWidth;
  }
  _getPopupMinWidth() {
    const {
      minWidth
    } = this.option();
    // @ts-expect-error ts-error
    return minWidth;
  }
  _getPopupHeight() {
    const {
      height
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return height || 'auto';
  }
  _getPopupMaxHeight() {
    const {
      maxHeight
    } = this.option();
    // @ts-expect-error ts-error
    return maxHeight;
  }
  _getPopupMinHeight() {
    const {
      minHeight
    } = this.option();
    // @ts-expect-error ts-error
    return minHeight;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPopupPosition() {
    return {};
  }
  _getPopupContainer() {
    const {
      container
    } = this.option();
    return container;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPopupSlideAnimationObject(properties) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend({
      type: 'slide',
      start: () => {
        $('body').css('overflow', 'hidden');
      },
      complete: () => {
        $('body').css('overflow', '');
      }
    }, properties);
  }
  _getPopupAnimation() {
    return {
      hide: {
        type: 'fadeOut'
      },
      show: {
        type: 'fadeIn'
      }
    };
  }
  _getPopupOptions() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    let wrapperClass = this._getPopupClass();
    if (this.isMobileView()) {
      wrapperClass += ` ${DIAGRAM_MOBILE_POPUP_CLASS}`;
    }
    return {
      // @ts-expect-error ts-error
      animation: hasWindow() ? this._getPopupAnimation() : null,
      shading: false,
      showTitle: false,
      focusStateEnabled: false,
      // @ts-expect-error ts-error
      container: this._getPopupContainer(),
      width: this._getPopupWidth(),
      height: this._getPopupHeight(),
      maxWidth: this._getPopupMaxWidth(),
      maxHeight: this._getPopupMaxHeight(),
      minWidth: this._getPopupMinWidth(),
      minHeight: this._getPopupMinHeight(),
      position: this._getPopupPosition(),
      showCloseButton: true,
      wrapperAttr: {
        class: wrapperClass
      },
      onContentReady() {
        var _that$_popup;
        that._renderPopupContent((_that$_popup = that._popup) === null || _that$_popup === void 0 ? void 0 : _that$_popup.content());
      },
      onShowing: () => {
        this._onVisibilityChangingAction({
          visible: true,
          component: this
        });
      },
      onShown: () => {
        this.option('isVisible', true);
        this._onVisibilityChangedAction({
          visible: true,
          component: this
        });
      },
      onHiding: () => {
        this._onVisibilityChangingAction({
          visible: false,
          component: this
        });
      },
      onHidden: () => {
        this.option('isVisible', false);
        this._onVisibilityChangedAction({
          visible: false,
          component: this
        });
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderPopupContent($parent) {}
  _updatePopupVisible() {
    var _this$_popup3;
    (_this$_popup3 = this._popup) === null || _this$_popup3 === void 0 || _this$_popup3.option('visible', this.isVisible());
  }
  _createOnVisibilityChangingAction() {
    this._onVisibilityChangingAction = this._createActionByOption(
    // @ts-expect-error ts-error
    'onVisibilityChanging');
  }
  _createOnVisibilityChangedAction() {
    this._onVisibilityChangedAction = this._createActionByOption(
    // @ts-expect-error ts-error
    'onVisibilityChanged');
  }
  _optionChanged(args) {
    var _this$_popup4, _this$_popup5, _this$_popup6, _this$_popup7, _this$_popup8, _this$_popup9, _this$_popup10;
    switch (args.name) {
      case 'onVisibilityChanging':
        this._createOnVisibilityChangingAction();
        break;
      case 'onVisibilityChanged':
        this._createOnVisibilityChangedAction();
        break;
      case 'container':
        (_this$_popup4 = this._popup) === null || _this$_popup4 === void 0 || _this$_popup4.option('container', this._getPopupContainer());
        break;
      case 'width':
        (_this$_popup5 = this._popup) === null || _this$_popup5 === void 0 || _this$_popup5.option('width', this._getPopupWidth());
        break;
      case 'height':
        (_this$_popup6 = this._popup) === null || _this$_popup6 === void 0 || _this$_popup6.option('height', this._getPopupHeight());
        break;
      case 'maxWidth':
        (_this$_popup7 = this._popup) === null || _this$_popup7 === void 0 || _this$_popup7.option('maxWidth', this._getPopupMaxWidth());
        break;
      case 'maxHeight':
        (_this$_popup8 = this._popup) === null || _this$_popup8 === void 0 || _this$_popup8.option('maxHeight', this._getPopupMaxHeight());
        break;
      case 'minWidth':
        (_this$_popup9 = this._popup) === null || _this$_popup9 === void 0 || _this$_popup9.option('minWidth', this._getPopupMinWidth());
        break;
      case 'minHeight':
        (_this$_popup10 = this._popup) === null || _this$_popup10 === void 0 || _this$_popup10.option('minHeight', this._getPopupMinHeight());
        break;
      case 'isMobileView':
        this._invalidate();
        break;
      case 'isVisible':
        this._updatePopupVisible();
        break;
      default:
        super._optionChanged(args);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(super._getDefaultOptions(), {
      isVisible: true,
      isMobileView: false,
      offsetX: 0,
      offsetY: 0
    });
  }
}
export default DiagramFloatingPanel;

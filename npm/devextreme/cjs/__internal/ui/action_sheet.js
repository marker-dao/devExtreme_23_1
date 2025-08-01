/**
* DevExtreme (cjs/__internal/ui/action_sheet.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _button = _interopRequireDefault(require("../../ui/button"));
var _collection_widget = _interopRequireDefault(require("../ui/collection/collection_widget.edit"));
var _m_popover = _interopRequireDefault(require("../ui/popover/m_popover"));
var _m_popup = _interopRequireDefault(require("../ui/popup/m_popup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// STYLE actionSheet
const window = (0, _window.getWindow)();
const ACTION_SHEET_CLASS = 'dx-actionsheet';
const ACTION_SHEET_CONTAINER_CLASS = 'dx-actionsheet-container';
const ACTION_SHEET_POPUP_WRAPPER_CLASS = 'dx-actionsheet-popup-wrapper';
const ACTION_SHEET_POPOVER_WRAPPER_CLASS = 'dx-actionsheet-popover-wrapper';
const ACTION_SHEET_CANCEL_BUTTON_CLASS = 'dx-actionsheet-cancel';
const ACTION_SHEET_ITEM_CLASS = 'dx-actionsheet-item';
const ACTION_SHEET_ITEM_DATA_KEY = 'dxActionSheetItemData';
const ACTION_SHEET_WITHOUT_TITLE_CLASS = 'dx-actionsheet-without-title';
const ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE = 'outlined';
class ActionSheet extends _collection_widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      usePopover: false,
      // @ts-expect-error ts-error
      target: null,
      title: '',
      showTitle: true,
      showCancelButton: true,
      cancelText: _message.default.format('Cancel'),
      // @ts-expect-error ts-error
      onCancelClick: null,
      visible: false,
      noDataText: '',
      focusStateEnabled: false,
      selectByClick: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: 'ios',
        tablet: true
      },
      options: {
        usePopover: true
      }
    }]);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(($container, data) => {
        // @ts-expect-error ts-error
        const button = new _button.default((0, _renderer.default)('<div>'), (0, _extend.extend)({
          onClick: data === null || data === void 0 ? void 0 : data.click,
          stylingMode: (data === null || data === void 0 ? void 0 : data.stylingMode) || ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE
        }, data));
        $container.append(button.$element());
      }, ['disabled', 'icon', 'text', 'type', 'onClick', 'click', 'stylingMode'], this.option('integrationOptions.watchMethod'))
    });
  }
  _itemContainer() {
    return this._$itemContainer;
  }
  _itemClass() {
    return ACTION_SHEET_ITEM_CLASS;
  }
  _itemDataKey() {
    return ACTION_SHEET_ITEM_DATA_KEY;
  }
  _toggleVisibility() {}
  _renderDimensions() {}
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(ACTION_SHEET_CLASS);
    this._createItemContainer();
  }
  _render() {
    this._renderPopup();
  }
  _createItemContainer() {
    this._$itemContainer = (0, _renderer.default)('<div>').addClass(ACTION_SHEET_CONTAINER_CLASS);
    this._renderDisabled();
  }
  _renderDisabled() {
    const {
      disabled
    } = this.option();
    this._$itemContainer.toggleClass('dx-state-disabled', disabled);
  }
  _renderPopup() {
    this._$popup = (0, _renderer.default)('<div>').appendTo(this.$element());
    if (this._isPopoverMode()) {
      this._createPopover();
    } else {
      this._createPopup();
    }
    this._renderPopupTitle();
    this._mapPopupOption('visible');
  }
  _mapPopupOption(optionName) {
    var _this$_popup;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.option(optionName, this.option(optionName));
  }
  _isPopoverMode() {
    const {
      usePopover,
      target
    } = this.option();
    return !!(usePopover && target);
  }
  _renderPopupTitle() {
    var _this$_popup2;
    this._mapPopupOption('showTitle');
    (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 || _this$_popup2.$wrapper().toggleClass(ACTION_SHEET_WITHOUT_TITLE_CLASS, !this.option('showTitle'));
  }
  _clean() {
    if (this._$popup) {
      this._$popup.remove();
    }
    super._clean();
  }
  _overlayConfig() {
    const {
      title
    } = this.option();
    return {
      onInitialized: args => {
        // @ts-expect-error ts-error
        this._popup = args.component;
      },
      disabled: false,
      showTitle: true,
      title,
      deferRendering: true,
      onContentReady: this._popupContentReadyAction.bind(this),
      onHidden: () => {
        this.hide();
      }
    };
  }
  _createPopover() {
    this._createComponent(this._$popup, _m_popover.default, (0, _extend.extend)(this._overlayConfig(), {
      width: this.option('width') || 200,
      height: this.option('height') || 'auto',
      target: this.option('target')
    }));
    this._popup.$overlayContent().attr('role', 'dialog');
    this._popup.$wrapper().addClass(ACTION_SHEET_POPOVER_WRAPPER_CLASS);
  }
  _createPopup() {
    this._createComponent(this._$popup, _m_popup.default, (0, _extend.extend)(this._overlayConfig(), {
      dragEnabled: false,
      width: this.option('width') || '100%',
      height: this.option('height') || 'auto',
      showCloseButton: false,
      position: {
        my: 'bottom',
        at: 'bottom',
        of: window
      },
      animation: {
        show: {
          type: 'slide',
          duration: 400,
          from: {
            position: {
              my: 'top',
              at: 'bottom',
              of: window
            }
          },
          to: {
            position: {
              my: 'bottom',
              at: 'bottom',
              of: window
            }
          }
        },
        hide: {
          type: 'slide',
          duration: 400,
          from: {
            position: {
              my: 'bottom',
              at: 'bottom',
              of: window
            }
          },
          to: {
            position: {
              my: 'top',
              at: 'bottom',
              of: window
            }
          }
        }
      }
    }));
    this._popup.$wrapper().addClass(ACTION_SHEET_POPUP_WRAPPER_CLASS);
  }
  _popupContentReadyAction() {
    this._popup.$content().append(this._$itemContainer);
    this._attachClickEvent();
    this._attachHoldEvent();
    this._prepareContent();
    this._renderContent();
    this._renderCancelButton();
  }
  _renderCancelButton() {
    if (this._isPopoverMode()) {
      return;
    }
    if (this._$cancelButton) {
      this._$cancelButton.remove();
    }
    const {
      showCancelButton,
      cancelText
    } = this.option();
    if (showCancelButton) {
      var _this$_popup3;
      const cancelClickAction = this._createActionByOption('onCancelClick') || _common.noop;
      this._$cancelButton = (0, _renderer.default)('<div>').addClass(ACTION_SHEET_CANCEL_BUTTON_CLASS).appendTo((_this$_popup3 = this._popup) === null || _this$_popup3 === void 0 ? void 0 : _this$_popup3.$content());
      this._createComponent(this._$cancelButton, _button.default, {
        disabled: false,
        stylingMode: ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE,
        text: cancelText,
        onClick: e => {
          const hidingArgs = {
            event: e,
            cancel: false
          };
          cancelClickAction(hidingArgs);
          if (!hidingArgs.cancel) {
            this.hide();
          }
        },
        integrationOptions: {}
      });
    }
  }
  _attachItemClickEvent() {}
  _itemClickHandler(e) {
    super._itemClickHandler(e);
    if (!(0, _renderer.default)(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
      this.hide();
    }
  }
  _itemHoldHandler(e) {
    super._itemHoldHandler(e);
    if (!(0, _renderer.default)(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
      this.hide();
    }
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'width':
      case 'height':
      case 'visible':
      case 'title':
        this._mapPopupOption(name);
        break;
      case 'disabled':
        this._renderDisabled();
        break;
      case 'showTitle':
        this._renderPopupTitle();
        break;
      case 'showCancelButton':
      case 'onCancelClick':
      case 'cancelText':
        this._renderCancelButton();
        break;
      case 'target':
      case 'usePopover':
      case 'items':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  toggle(showing) {
    const d = (0, _deferred.Deferred)();
    // @ts-expect-error ts-error
    this._popup.toggle(showing).done(() => {
      this.option('visible', showing);
      // @ts-expect-error ts-error
      d.resolveWith(this);
    });
    return d.promise();
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
}
(0, _component_registrator.default)('dxActionSheet', ActionSheet);
var _default = exports.default = ActionSheet;

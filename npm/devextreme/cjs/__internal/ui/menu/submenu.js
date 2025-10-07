/**
* DevExtreme (cjs/__internal/ui/menu/submenu.js)
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
require("../../../ui/context_menu");
var _position = _interopRequireDefault(require("../../../common/core/animation/position"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _context_menu2 = _interopRequireDefault(require("../../ui/context_menu/context_menu"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS = 'dx-context-menu-content-delimiter';
const DX_SUBMENU_CLASS = 'dx-submenu';
class Submenu extends _context_menu2.default {
  _getMaxUsableSpace(offsetTop, windowHeight, anchorHeight) {
    return Math.max(offsetTop, windowHeight - offsetTop - anchorHeight);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      orientation: 'horizontal',
      // @ts-expect-error ts-error
      tabIndex: null,
      onHoverStart: _common.noop
    });
  }
  _initDataAdapter() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _dataAdapter
    } = this.option();
    this._dataAdapter = _dataAdapter;
    if (!this._dataAdapter) {
      super._initDataAdapter();
    }
  }
  _renderContentImpl() {
    this._renderContextMenuOverlay();
    super._renderContentImpl();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _parentKey
    } = this.option();
    const node = this._dataAdapter.getNodeByKey(_parentKey);
    if (node) {
      this._renderItems(this._getChildNodes(node));
    }
    this._renderDelimiter();
  }
  _renderDelimiter() {
    this.$contentDelimiter = (0, _renderer.default)('<div>').appendTo(this._itemContainer()).addClass(DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS);
  }
  _getOverlayOptions() {
    return (0, _extend.extend)(true, super._getOverlayOptions(), {
      onPositioned: this._overlayPositionedActionHandler.bind(this),
      position: {
        precise: true
      }
    });
  }
  _overlayPositionedActionHandler(arg) {
    this._showDelimiter(arg);
  }
  _hoverEndHandler(e) {
    super._hoverEndHandler(e);
    // @ts-expect-error ts-error
    this._toggleFocusClass(false, e.currentTarget);
  }
  _isMenuHorizontal() {
    const {
      orientation
    } = this.option();
    return orientation === 'horizontal';
  }
  _hoverStartHandler(e) {
    const {
      onHoverStart
    } = this.option();
    onHoverStart === null || onHoverStart === void 0 || onHoverStart(e);
    super._hoverStartHandler(e);
  }
  _drawSubmenu($rootItem) {
    var _this$_actions$onShow, _this$_actions, _this$_actions$onShow2, _this$_actions2;
    (_this$_actions$onShow = (_this$_actions = this._actions).onShowing) === null || _this$_actions$onShow === void 0 || _this$_actions$onShow.call(_this$_actions, {
      // @ts-expect-error ts-error
      rootItem: (0, _element.getPublicElement)($rootItem),
      submenu: this
    });
    super._drawSubmenu($rootItem);
    (_this$_actions$onShow2 = (_this$_actions2 = this._actions).onShown) === null || _this$_actions$onShow2 === void 0 || _this$_actions$onShow2.call(_this$_actions2, {
      // @ts-expect-error ts-error
      rootItem: (0, _element.getPublicElement)($rootItem),
      submenu: this
    });
  }
  _hideSubmenu($rootItem) {
    var _this$_actions$onHidi, _this$_actions3, _this$_actions$onHidd, _this$_actions4;
    (_this$_actions$onHidi = (_this$_actions3 = this._actions).onHiding) === null || _this$_actions$onHidi === void 0 || _this$_actions$onHidi.call(_this$_actions3, {
      cancel: true,
      // @ts-expect-error ts-error
      rootItem: (0, _element.getPublicElement)($rootItem),
      submenu: this
    });
    super._hideSubmenu($rootItem);
    (_this$_actions$onHidd = (_this$_actions4 = this._actions).onHidden) === null || _this$_actions$onHidd === void 0 || _this$_actions$onHidd.call(_this$_actions4, {
      // @ts-expect-error ts-error
      rootItem: (0, _element.getPublicElement)($rootItem),
      submenu: this
    });
  }
  _getDelimiterWidth($rootItem, $submenu) {
    if (this._isMenuHorizontal()) {
      const rootWidth = (0, _size.getWidth)($rootItem);
      const submenuWidth = (0, _size.getWidth)($submenu);
      return rootWidth < submenuWidth ? rootWidth : submenuWidth;
    }
    return 3;
  }
  _getDelimiterHeight($rootItem, $submenu) {
    if (this._isMenuHorizontal()) {
      return 3;
    }
    const rootHeight = (0, _size.getHeight)($rootItem);
    const submenuHeight = (0, _size.getHeight)($submenu);
    return rootHeight < submenuHeight ? rootHeight : submenuHeight;
  }
  // TODO: try to simplify it
  _showDelimiter(arg) {
    if (!this.$contentDelimiter) {
      return;
    }
    const {
      position: positionOption
    } = this.option();
    const $submenu = this._itemContainer().children(`.${DX_SUBMENU_CLASS}`).eq(0);
    const $rootItem = (0, _renderer.default)(positionOption === null || positionOption === void 0 ? void 0 : positionOption.of).find('.dx-context-menu-container-border');
    const position = {
      // @ts-expect-error ts-error
      of: $submenu,
      precise: true
    };
    const containerOffset = arg.position;
    const vLocation = containerOffset.v.location;
    const hLocation = containerOffset.h.location;
    const rootOffset = $rootItem.offset();
    const offsetLeft = Math.round((rootOffset === null || rootOffset === void 0 ? void 0 : rootOffset.left) ?? 0);
    const offsetTop = Math.round((rootOffset === null || rootOffset === void 0 ? void 0 : rootOffset.top) ?? 0);
    this.$contentDelimiter.css('display', 'block');
    (0, _size.setWidth)(this.$contentDelimiter, this._getDelimiterWidth($rootItem, $submenu));
    (0, _size.setHeight)(this.$contentDelimiter, this._getDelimiterHeight($rootItem, $submenu));
    if (this._isMenuHorizontal()) {
      if (vLocation > offsetTop) {
        if (Math.round(hLocation) === offsetLeft) {
          position.offset = '0 -2.5';
          position.at = 'left top';
          position.my = 'left top';
        } else {
          position.offset = '0 -2.5';
          position.at = 'right top';
          position.my = 'right top';
        }
      } else {
        (0, _size.setHeight)(this.$contentDelimiter, 5);
        if (Math.round(hLocation) === offsetLeft) {
          position.offset = '0 5';
          position.at = 'left bottom';
          position.my = 'left bottom';
        } else {
          position.offset = '0 5';
          position.at = 'right bottom';
          position.my = 'right bottom';
        }
      }
    } else if (hLocation > offsetLeft) {
      if (Math.round(vLocation) === offsetTop) {
        position.offset = '-2.5 0';
        position.at = 'left top';
        position.my = 'left top';
      } else {
        position.offset = '-2.5 0';
        position.at = 'left bottom';
        position.my = 'left bottom';
      }
    } else if (Math.round(vLocation) === offsetTop) {
      position.offset = '2.5 0';
      position.at = 'right top';
      position.my = 'right top';
    } else {
      position.offset = '2.5 0';
      position.at = 'right bottom';
      position.my = 'right bottom';
    }
    _position.default.setup(this.$contentDelimiter, position);
  }
  _getContextMenuPosition() {
    const {
      position
    } = this.option();
    return position;
  }
  isOverlayVisible() {
    var _this$_overlay;
    const {
      visible
    } = ((_this$_overlay = this._overlay) === null || _this$_overlay === void 0 ? void 0 : _this$_overlay.option()) ?? {};
    return visible;
  }
  getOverlayContent() {
    var _this$_overlay2;
    return (_this$_overlay2 = this._overlay) === null || _this$_overlay2 === void 0 ? void 0 : _this$_overlay2.$content();
  }
}
var _default = exports.default = Submenu;

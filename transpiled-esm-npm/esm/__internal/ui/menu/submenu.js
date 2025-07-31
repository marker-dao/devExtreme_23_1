import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/context_menu';
import animationPosition from '../../../common/core/animation/position';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { getHeight, getWidth, setHeight, setWidth } from '../../../core/utils/size';
import ContextMenu from '../../ui/context_menu/context_menu';
const DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS = 'dx-context-menu-content-delimiter';
const DX_SUBMENU_CLASS = 'dx-submenu';
class Submenu extends ContextMenu {
  _getMaxUsableSpace(offsetTop, windowHeight, anchorHeight) {
    return Math.max(offsetTop, windowHeight - offsetTop - anchorHeight);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      orientation: 'horizontal',
      // @ts-expect-error ts-error
      tabIndex: null,
      onHoverStart: noop
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
    this.$contentDelimiter = $('<div>').appendTo(this._itemContainer()).addClass(DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS);
  }
  _getOverlayOptions() {
    return extend(true, super._getOverlayOptions(), {
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
    // @ts-expect-error ts-error
    this._toggleFocusClass(true, e.currentTarget);
  }
  _drawSubmenu($rootItem) {
    var _this$_actions$onShow, _this$_actions, _this$_actions$onShow2, _this$_actions2;
    (_this$_actions$onShow = (_this$_actions = this._actions).onShowing) === null || _this$_actions$onShow === void 0 || _this$_actions$onShow.call(_this$_actions, {
      // @ts-expect-error ts-error
      rootItem: getPublicElement($rootItem),
      submenu: this
    });
    super._drawSubmenu($rootItem);
    (_this$_actions$onShow2 = (_this$_actions2 = this._actions).onShown) === null || _this$_actions$onShow2 === void 0 || _this$_actions$onShow2.call(_this$_actions2, {
      // @ts-expect-error ts-error
      rootItem: getPublicElement($rootItem),
      submenu: this
    });
  }
  _hideSubmenu($rootItem) {
    var _this$_actions$onHidi, _this$_actions3, _this$_actions$onHidd, _this$_actions4;
    (_this$_actions$onHidi = (_this$_actions3 = this._actions).onHiding) === null || _this$_actions$onHidi === void 0 || _this$_actions$onHidi.call(_this$_actions3, {
      cancel: true,
      // @ts-expect-error ts-error
      rootItem: getPublicElement($rootItem),
      submenu: this
    });
    super._hideSubmenu($rootItem);
    (_this$_actions$onHidd = (_this$_actions4 = this._actions).onHidden) === null || _this$_actions$onHidd === void 0 || _this$_actions$onHidd.call(_this$_actions4, {
      // @ts-expect-error ts-error
      rootItem: getPublicElement($rootItem),
      submenu: this
    });
  }
  _getDelimiterWidth($rootItem, $submenu) {
    if (this._isMenuHorizontal()) {
      const rootWidth = getWidth($rootItem);
      const submenuWidth = getWidth($submenu);
      return rootWidth < submenuWidth ? rootWidth : submenuWidth;
    }
    return 3;
  }
  _getDelimiterHeight($rootItem, $submenu) {
    if (this._isMenuHorizontal()) {
      return 3;
    }
    const rootHeight = getHeight($rootItem);
    const submenuHeight = getHeight($submenu);
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
    // @ts-expect-error ts-error
    const $rootItem = $(positionOption === null || positionOption === void 0 ? void 0 : positionOption.of).find('.dx-context-menu-container-border');
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
    setWidth(this.$contentDelimiter, this._getDelimiterWidth($rootItem, $submenu));
    setHeight(this.$contentDelimiter, this._getDelimiterHeight($rootItem, $submenu));
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
        setHeight(this.$contentDelimiter, 5);
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
    animationPosition.setup(this.$contentDelimiter, position);
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
export default Submenu;
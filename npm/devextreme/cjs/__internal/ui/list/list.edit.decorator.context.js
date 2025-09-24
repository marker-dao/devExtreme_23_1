/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.context.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _list = require("../../ui/list/list.base");
var _listEdit = _interopRequireDefault(require("../../ui/list/list.edit.decorator"));
var _listEdit2 = require("../../ui/list/list.edit.decorator_registry");
var _overlay = _interopRequireDefault(require("../../ui/overlay/overlay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CONTEXTMENU_CLASS = 'dx-list-context-menu';
const CONTEXTMENU_MENUCONTENT_CLASS = 'dx-list-context-menucontent';
class EditDecoratorContext extends _listEdit.default {
  _init() {
    const $menu = (0, _renderer.default)('<div>').addClass(CONTEXTMENU_CLASS);
    this._list.$element().append($menu);
    this._menu = this._renderOverlay($menu);
  }
  _renderOverlay($element) {
    return this._list._createComponent($element, _overlay.default, {
      shading: false,
      deferRendering: true,
      hideOnParentScroll: true,
      hideOnOutsideClick: e => !(0, _renderer.default)(e.target).closest(`.${CONTEXTMENU_CLASS}`).length,
      animation: {
        show: {
          type: 'slide',
          duration: 300,
          from: {
            // @ts-expect-error ts-error
            height: 0,
            opacity: 1
          },
          to: {
            // @ts-expect-error ts-error
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            height: () => (0, _size.getOuterHeight)(this._$menuList),
            opacity: 1
          }
        },
        hide: {
          type: 'slide',
          duration: 0,
          from: {
            opacity: 1
          },
          to: {
            opacity: 0
          }
        }
      },
      _ignoreFunctionValueDeprecation: true,
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      height: () => this._$menuList ? (0, _size.getOuterHeight)(this._$menuList) : 0,
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      width: () => (0, _size.getOuterWidth)(this._list.$element()),
      onContentReady: e => {
        this._renderMenuContent(e);
      }
    });
  }
  _renderMenuContent(e) {
    const $overlayContent = (0, _renderer.default)(e.component.content());
    const {
      menuItems = [],
      allowItemDeleting
    } = this._list.option();
    const items = menuItems.slice();
    if (allowItemDeleting) {
      items.push({
        text: _message.default.format('dxListEditDecorator-delete'),
        action: this._deleteItem.bind(this)
      });
    }
    this._$menuList = (0, _renderer.default)('<div>');
    this._list._createComponent(this._$menuList, _list.ListBase, {
      items,
      onItemClick: event => {
        this._menuItemClickHandler(event);
      },
      height: 'auto',
      integrationOptions: {}
    });
    $overlayContent.addClass(CONTEXTMENU_MENUCONTENT_CLASS);
    $overlayContent.append(this._$menuList);
  }
  _menuItemClickHandler(e) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._menu.hide();
    this._list._itemEventHandlerByHandler((0, _renderer.default)(this._$itemWithMenu), e.itemData.action, {}, {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _deleteItem() {
    if (!this._$itemWithMenu) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._list.deleteItem(this._$itemWithMenu.get(0));
  }
  handleContextMenu($itemElement) {
    this._$itemWithMenu = $itemElement;
    this._menu.option({
      position: {
        my: 'top',
        at: 'bottom',
        of: $itemElement,
        collision: 'flip'
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._menu.show();
    return true;
  }
  dispose() {
    if (this._menu) {
      this._menu.$element().remove();
    }
    super.dispose();
  }
}
(0, _listEdit2.register)('menu', 'context', EditDecoratorContext);

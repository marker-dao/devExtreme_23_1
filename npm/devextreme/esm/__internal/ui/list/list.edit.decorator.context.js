/**
* DevExtreme (esm/__internal/ui/list/list.edit.decorator.context.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { getOuterHeight, getOuterWidth } from '../../../core/utils/size';
import { ListBase } from '../../ui/list/list.base';
import EditDecorator from '../../ui/list/list.edit.decorator';
import { register as registerDecorator } from '../../ui/list/list.edit.decorator_registry';
import Overlay from '../../ui/overlay/overlay';
const CONTEXTMENU_CLASS = 'dx-list-context-menu';
const CONTEXTMENU_MENUCONTENT_CLASS = 'dx-list-context-menucontent';
class EditDecoratorContext extends EditDecorator {
  _init() {
    const $menu = $('<div>').addClass(CONTEXTMENU_CLASS);
    this._list.$element().append($menu);
    this._menu = this._renderOverlay($menu);
  }
  _renderOverlay($element) {
    return this._list._createComponent($element, Overlay, {
      shading: false,
      deferRendering: true,
      hideOnParentScroll: true,
      hideOnOutsideClick: e => !$(e.target).closest(`.${CONTEXTMENU_CLASS}`).length,
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
            height: () => getOuterHeight(this._$menuList),
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
      height: () => this._$menuList ? getOuterHeight(this._$menuList) : 0,
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      width: () => getOuterWidth(this._list.$element()),
      onContentReady: e => {
        this._renderMenuContent(e);
      }
    });
  }
  _renderMenuContent(e) {
    const $overlayContent = $(e.component.content());
    const {
      menuItems = [],
      allowItemDeleting
    } = this._list.option();
    const items = menuItems.slice();
    if (allowItemDeleting) {
      items.push({
        text: messageLocalization.format('dxListEditDecorator-delete'),
        action: this._deleteItem.bind(this)
      });
    }
    this._$menuList = $('<div>');
    this._list._createComponent(this._$menuList, ListBase, {
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
    this._list._itemEventHandlerByHandler($(this._$itemWithMenu), e.itemData.action, {}, {
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
registerDecorator('menu', 'context', EditDecoratorContext);

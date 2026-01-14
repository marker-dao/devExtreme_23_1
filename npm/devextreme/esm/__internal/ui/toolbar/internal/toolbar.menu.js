/**
* DevExtreme (esm/__internal/ui/toolbar/internal/toolbar.menu.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../../core/devices';
import $ from '../../../../core/renderer';
import { ChildDefaultTemplate } from '../../../../core/templates/child_default_template';
import { getOuterHeight } from '../../../../core/utils/size';
import { getWindow } from '../../../../core/utils/window';
import { current, isFluent, isMaterialBased } from '../../../../ui/themes';
import Widget from '../../../core/widget/widget';
import Button from '../../../ui/button/wrapper';
import Popup from '../../../ui/popup/m_popup';
import ToolbarMenuList, { TOOLBAR_MENU_ACTION_CLASS } from '../../../ui/toolbar/internal/toolbar.menu.list';
import { toggleItemFocusableElementTabIndex } from '../../../ui/toolbar/toolbar.utils';
const DROP_DOWN_MENU_CLASS = 'dx-dropdownmenu';
const DROP_DOWN_MENU_POPUP_CLASS = 'dx-dropdownmenu-popup';
const DROP_DOWN_MENU_POPUP_WRAPPER_CLASS = 'dx-dropdownmenu-popup-wrapper';
const DROP_DOWN_MENU_LIST_CLASS = 'dx-dropdownmenu-list';
const DROP_DOWN_MENU_BUTTON_CLASS = 'dx-dropdownmenu-button';
const POPUP_BOUNDARY_VERTICAL_OFFSET = 10;
const POPUP_VERTICAL_OFFSET = 3;
export default class DropDownMenu extends Widget {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _supportedKeys() {
    var _this$_list;
    let extension = {};
    const {
      opened
    } = this.option();
    if (!opened || !((_this$_list = this._list) !== null && _this$_list !== void 0 && _this$_list.option('focusedElement'))) {
      extension = this._button._supportedKeys();
    }
    return Object.assign({}, super._supportedKeys(), extension, {
      tab() {
        var _this$_popup;
        (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.hide();
      }
    });
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      items: [],
      dataSource: null,
      itemTemplate: 'item',
      activeStateEnabled: true,
      hoverStateEnabled: true,
      opened: false,
      closeOnClick: true,
      useInkRipple: false,
      container: undefined,
      animation: {
        show: {
          type: 'fade',
          from: 0,
          to: 1
        },
        hide: {
          type: 'fade',
          to: 0
        }
      }
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return isMaterialBased(current());
      },
      options: {
        useInkRipple: true,
        animation: {
          show: {
            type: 'pop',
            duration: 200,
            from: {
              scale: 0
            },
            to: {
              scale: 1
            }
          },
          hide: {
            type: 'pop',
            duration: 200,
            from: {
              scale: 1
            },
            to: {
              scale: 0
            }
          }
        }
      }
    }]);
  }
  _init() {
    super._init();
    this.$element().addClass(DROP_DOWN_MENU_CLASS);
    this._initItemClickAction();
    this._initButtonClickAction();
  }
  _initItemClickAction() {
    this._itemClickAction = this._createActionByOption('onItemClick', {});
  }
  _initButtonClickAction() {
    this._buttonClickAction = this._createActionByOption('onButtonClick', {});
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new ChildDefaultTemplate('content')
    });
    super._initTemplates();
  }
  _initMarkup() {
    this._renderButton();
    super._initMarkup();
  }
  _render() {
    super._render();
    const {
      opened
    } = this.option();
    this.setAria({
      haspopup: true,
      expanded: opened
    });
  }
  _renderContentImpl() {
    const {
      opened
    } = this.option();
    if (opened) {
      this._renderPopup();
    }
  }
  _clean() {
    var _this$_list2, _this$_popup2;
    this._cleanFocusState();
    (_this$_list2 = this._list) === null || _this$_list2 === void 0 || _this$_list2.$element().remove();
    (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 || _this$_popup2.$element().remove();
    delete this._list;
    delete this._popup;
  }
  _renderButton() {
    const $button = this.$element().addClass(DROP_DOWN_MENU_BUTTON_CLASS);
    const {
      useInkRipple
    } = this.option();
    this._button = this._createComponent($button, Button, {
      icon: 'overflow',
      template: 'content',
      stylingMode: isFluent(current()) ? 'text' : 'contained',
      // @ts-expect-error
      useInkRipple,
      hoverStateEnabled: false,
      focusStateEnabled: false,
      onClick: e => {
        var _this$_buttonClickAct;
        this.option('opened', !this.option('opened'));
        (_this$_buttonClickAct = this._buttonClickAction) === null || _this$_buttonClickAct === void 0 || _this$_buttonClickAct.call(this, e);
      }
    });
  }
  _toggleActiveState($element, value) {
    this._button._toggleActiveState($element[0], value);
  }
  _toggleMenuVisibility(opened) {
    var _this$_popup3, _this$_popup4;
    const state = opened ?? !((_this$_popup3 = this._popup) !== null && _this$_popup3 !== void 0 && _this$_popup3.option('visible'));
    if (opened) {
      this._renderPopup();
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_popup4 = this._popup) === null || _this$_popup4 === void 0 || _this$_popup4.toggle(state);
    this.setAria('expanded', state);
  }
  _renderPopup() {
    if (this._$popup) {
      return;
    }
    this._$popup = $('<div>').appendTo(this.$element());
    const {
      rtlEnabled,
      container,
      animation
    } = this.option();
    this._popup = this._createComponent(this._$popup, Popup, {
      onInitialized(e) {
        const {
          component
        } = e;
        // @ts-expect-error
        component.$wrapper().addClass(DROP_DOWN_MENU_POPUP_WRAPPER_CLASS).addClass(DROP_DOWN_MENU_POPUP_CLASS);
      },
      deferRendering: false,
      preventScrollEvents: false,
      _ignorePreventScrollEventsDeprecation: true,
      contentTemplate: contentElement => this._renderList(contentElement),
      _ignoreFunctionValueDeprecation: true,
      // @ts-expect-error
      maxHeight: () => this._getMaxHeight(),
      position: {
        // @ts-expect-error
        my: `top ${rtlEnabled ? 'left' : 'right'}`,
        // @ts-expect-error
        at: `bottom ${rtlEnabled ? 'left' : 'right'}`,
        collision: 'fit flip',
        // @ts-expect-error
        offset: {
          v: POPUP_VERTICAL_OFFSET
        },
        // @ts-expect-error
        of: this.$element()
      },
      animation,
      onOptionChanged: _ref => {
        let {
          name,
          value
        } = _ref;
        if (name === 'visible') {
          this.option('opened', value);
        }
      },
      container,
      autoResizeEnabled: false,
      height: 'auto',
      width: 'auto',
      hideOnOutsideClick: e => this._closeOutsideDropDownHandler(e),
      hideOnParentScroll: true,
      shading: false,
      dragEnabled: false,
      showTitle: false,
      fullScreen: false,
      ignoreChildEvents: false,
      _fixWrapperPosition: true
    });
    this._popup.registerKeyHandler('space', e => {
      this._popupKeyHandler(e);
    });
    this._popup.registerKeyHandler('enter', e => {
      this._popupKeyHandler(e);
    });
    this._popup.registerKeyHandler('escape', e => {
      var _this$_popup5;
      if ((_this$_popup5 = this._popup) !== null && _this$_popup5 !== void 0 && _this$_popup5.$overlayContent().is($(e.target))) {
        this.option('opened', false);
      }
    });
  }
  _getMaxHeight() {
    var _$element$offset;
    const $element = this.$element();
    const offsetTop = ((_$element$offset = $element.offset()) === null || _$element$offset === void 0 ? void 0 : _$element$offset.top) ?? 0;
    const windowHeight = getOuterHeight(getWindow());
    const maxHeight = Math.max(offsetTop, windowHeight - offsetTop - getOuterHeight($element));
    return Math.min(windowHeight, maxHeight - POPUP_VERTICAL_OFFSET - POPUP_BOUNDARY_VERTICAL_OFFSET);
  }
  _closeOutsideDropDownHandler(e) {
    const isOutsideClick = !$(e.target).closest(this.$element()).length;
    return isOutsideClick;
  }
  _renderList(contentElement) {
    const $content = $(contentElement);
    $content.addClass(DROP_DOWN_MENU_LIST_CLASS);
    const {
      itemTemplate,
      onItemRendered
    } = this.option();
    this._list = this._createComponent($content, ToolbarMenuList, {
      dataSource: this._getListDataSource(),
      pageLoadMode: 'scrollBottom',
      indicateLoading: false,
      noDataText: '',
      itemTemplate,
      onItemClick: e => {
        this._itemClickHandler(e);
      },
      tabIndex: -1,
      focusStateEnabled: false,
      activeStateEnabled: true,
      onItemRendered,
      _itemAttributes: {
        role: 'menuitem'
      }
    });
  }
  _popupKeyHandler(e) {
    if ($(e.target).closest(`.${TOOLBAR_MENU_ACTION_CLASS}`).length) {
      this._closePopup();
    }
  }
  _closePopup() {
    const {
      closeOnClick
    } = this.option();
    if (closeOnClick) {
      this.option('opened', false);
    }
  }
  _itemClickHandler(e) {
    var _this$_itemClickActio;
    this._closePopup();
    (_this$_itemClickActio = this._itemClickAction) === null || _this$_itemClickActio === void 0 || _this$_itemClickActio.call(this, e);
  }
  _itemOptionChanged(item, property, value) {
    var _this$_list3;
    (_this$_list3 = this._list) === null || _this$_list3 === void 0 || _this$_list3._itemOptionChanged(item, property, value);
    toggleItemFocusableElementTabIndex(this._list, item);
  }
  _getListDataSource() {
    const {
      dataSource,
      items = []
    } = this.option();
    return dataSource ?? items;
  }
  _setListDataSource() {
    var _this$_list4;
    (_this$_list4 = this._list) === null || _this$_list4 === void 0 || _this$_list4.option('dataSource', this._getListDataSource());
    delete this._deferRendering;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getKeyboardListeners() {
    return super._getKeyboardListeners().concat([this._list]);
  }
  _toggleVisibility(visible) {
    var _this$_button;
    super._toggleVisibility(visible);
    (_this$_button = this._button) === null || _this$_button === void 0 || _this$_button.option('visible', visible);
  }
  _optionChanged(args) {
    var _this$_list5, _this$_list6, _this$_list7, _this$_popup6;
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'items':
      case 'dataSource':
        if (!this.option('opened')) {
          this._deferRendering = true;
        } else {
          this._setListDataSource();
        }
        break;
      case 'itemTemplate':
        (_this$_list5 = this._list) === null || _this$_list5 === void 0 || _this$_list5.option(name, this._getTemplate(value));
        break;
      case 'onItemClick':
        this._initItemClickAction();
        break;
      case 'onButtonClick':
        this._initButtonClickAction();
        break;
      case 'useInkRipple':
        this._invalidate();
        break;
      case 'focusStateEnabled':
        (_this$_list6 = this._list) === null || _this$_list6 === void 0 || _this$_list6.option(name, value);
        super._optionChanged(args);
        break;
      case 'onItemRendered':
        (_this$_list7 = this._list) === null || _this$_list7 === void 0 || _this$_list7.option(name, value);
        break;
      case 'opened':
        if (this._deferRendering) {
          this._setListDataSource();
        }
        this._toggleMenuVisibility(value);
        this._updateFocusableItemsTabIndex();
        break;
      case 'closeOnClick':
        break;
      case 'container':
        (_this$_popup6 = this._popup) === null || _this$_popup6 === void 0 || _this$_popup6.option(name, value);
        break;
      case 'disabled':
        if (this._list) {
          this._updateFocusableItemsTabIndex();
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
  _updateFocusableItemsTabIndex() {
    const {
      items = []
    } = this.option();
    items.forEach(item => toggleItemFocusableElementTabIndex(this._list, item));
  }
}

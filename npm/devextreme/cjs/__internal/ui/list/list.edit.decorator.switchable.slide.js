/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.switchable.slide.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _animation = require("../../../common/core/animation");
var _translator = require("../../../common/core/animation/translator");
var _click = require("../../../common/core/events/click");
var _emitter = require("../../../common/core/events/core/emitter.feedback");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _utils = require("../../../common/core/events/utils");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _size = require("../../../core/utils/size");
var _themes = require("../../../ui/themes");
var _action_sheet = _interopRequireDefault(require("../../ui/action_sheet"));
var _listEditDecorator = _interopRequireDefault(require("../../ui/list/list.edit.decorator.switchable"));
var _listEdit = require("../../ui/list/list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LIST_EDIT_DECORATOR = 'dxListEditDecorator';
const CLICK_EVENT_NAME = (0, _utils.addNamespace)(_click.name, LIST_EDIT_DECORATOR);
const ACTIVE_EVENT_NAME = (0, _utils.addNamespace)(_emitter.active, LIST_EDIT_DECORATOR);
const SLIDE_MENU_CLASS = 'dx-list-slide-menu';
const SLIDE_MENU_WRAPPER_CLASS = 'dx-list-slide-menu-wrapper';
const SLIDE_MENU_CONTENT_CLASS = 'dx-list-slide-menu-content';
const SLIDE_MENU_BUTTONS_CONTAINER_CLASS = 'dx-list-slide-menu-buttons-container';
const SLIDE_MENU_BUTTONS_CLASS = 'dx-list-slide-menu-buttons';
const SLIDE_MENU_BUTTON_CLASS = 'dx-list-slide-menu-button';
const SLIDE_MENU_BUTTON_MENU_CLASS = 'dx-list-slide-menu-button-menu';
const SLIDE_MENU_BUTTON_DELETE_CLASS = 'dx-list-slide-menu-button-delete';
const SLIDE_MENU_ANIMATION_DURATION = 400;
const SLIDE_MENU_ANIMATION_EASING = 'cubic-bezier(0.075, 0.82, 0.165, 1)';
class SwitchableEditDecoratorSlide extends _listEditDecorator.default {
  _shouldHandleSwipe() {
    return true;
  }
  _init() {
    super._init();
    this._$buttonsContainer = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTONS_CONTAINER_CLASS);
    _events_engine.default.on(this._$buttonsContainer, ACTIVE_EVENT_NAME, _common.noop);
    this._$buttons = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTONS_CLASS).appendTo(this._$buttonsContainer);
    this._renderMenu();
    this._renderDeleteButton();
  }
  _renderMenu() {
    const {
      menuItems = []
    } = this._list.option();
    if (!menuItems.length) {
      return;
    }
    if (menuItems.length === 1) {
      const menuItem = menuItems[0];
      this._renderMenuButton(menuItem.text ?? '', e => {
        e.stopPropagation();
        this._fireAction(menuItem);
      });
    } else {
      const $menu = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_CLASS);
      this._menu = this._list._createComponent($menu, _action_sheet.default, {
        showTitle: false,
        items: menuItems,
        onItemClick: args => {
          this._fireAction(args.itemData);
        },
        // @ts-expect-error ts-error
        integrationOptions: {}
      });
      $menu.appendTo(this._list.$element());
      const $menuButton = this._renderMenuButton(_message.default.format('dxListEditDecorator-more'), e => {
        e.stopPropagation();
        this._menu.show();
      });
      this._menu.option('target', $menuButton);
    }
  }
  _renderMenuButton(text, action) {
    const $menuButton = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_MENU_CLASS).text(text);
    this._$buttons.append($menuButton);
    _events_engine.default.on($menuButton, CLICK_EVENT_NAME, action);
    return $menuButton;
  }
  _renderDeleteButton() {
    const {
      allowItemDeleting
    } = this._list.option();
    if (!allowItemDeleting) {
      return;
    }
    const $deleteButton = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_DELETE_CLASS).text((0, _themes.isMaterialBased)((0, _themes.current)()) ? '' : _message.default.format('dxListEditDecorator-delete'));
    _events_engine.default.on($deleteButton, CLICK_EVENT_NAME, e => {
      e.stopPropagation();
      this._deleteItem();
    });
    this._$buttons.append($deleteButton);
  }
  _fireAction(menuItem) {
    this._list._itemEventHandlerByHandler((0, _renderer.default)(this._cachedNode), menuItem.action, {}, {
      excludeValidators: ['disabled', 'readOnly']
    });
    this._cancelDeleteReadyItem();
  }
  modifyElement(config) {
    super.modifyElement(config);
    const {
      $itemElement
    } = config;
    $itemElement.addClass(SLIDE_MENU_WRAPPER_CLASS);
    const $slideMenuContent = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_CONTENT_CLASS);
    $itemElement.wrapInner($slideMenuContent);
  }
  _getDeleteButtonContainer() {
    return this._$buttonsContainer;
  }
  handleClick($itemElement, e) {
    if ((0, _renderer.default)(e.target).closest(`.${SLIDE_MENU_CONTENT_CLASS}`).length) {
      return super.handleClick($itemElement, e);
    }
    return false;
  }
  _swipeStartHandler($itemElement) {
    this._enablePositioning($itemElement);
    this._cacheItemData($itemElement);
    this._setPositions(this._getPositions(0));
  }
  _swipeUpdateHandler($itemElement, e) {
    const rtl = this._isRtlEnabled();
    const signCorrection = rtl ? -1 : 1;
    const isItemReadyToDelete = this._isReadyToDelete($itemElement);
    const moveJustStarted = this._getCurrentPositions().content === this._getStartPositions().content;
    if (moveJustStarted && !isItemReadyToDelete && e.offset * signCorrection > 0) {
      e.cancel = true;
      return;
    }
    const offset = this._cachedItemWidth * e.offset;
    const startOffset = isItemReadyToDelete ? -this._cachedButtonWidth * signCorrection : 0;
    const correctedOffset = (offset + startOffset) * signCorrection;
    const percent = correctedOffset < 0 ? Math.abs((offset + startOffset) / this._cachedButtonWidth) : 0;
    this._setPositions(this._getPositions(percent));
  }
  _getStartPositions() {
    const rtl = this._isRtlEnabled();
    const signCorrection = rtl ? -1 : 1;
    return {
      content: 0,
      buttonsContainer: rtl ? -this._cachedButtonWidth : this._cachedItemWidth,
      buttons: -this._cachedButtonWidth * signCorrection
    };
  }
  _getPositions(percent) {
    const rtl = this._isRtlEnabled();
    const signCorrection = rtl ? -1 : 1;
    const startPositions = this._getStartPositions();
    return {
      content: startPositions.content - percent * this._cachedButtonWidth * signCorrection,
      buttonsContainer: startPositions.buttonsContainer - Math.min(percent, 1) * this._cachedButtonWidth * signCorrection,
      buttons: startPositions.buttons + Math.min(percent, 1) * this._cachedButtonWidth * signCorrection
    };
  }
  _getCurrentPositions() {
    return {
      content: (0, _translator.locate)(this._$cachedContent).left,
      buttonsContainer: (0, _translator.locate)(this._$buttonsContainer).left,
      buttons: (0, _translator.locate)(this._$buttons).left
    };
  }
  _setPositions(positions) {
    (0, _translator.move)(this._$cachedContent, {
      left: positions.content
    });
    (0, _translator.move)(this._$buttonsContainer, {
      left: positions.buttonsContainer
    });
    (0, _translator.move)(this._$buttons, {
      left: positions.buttons
    });
  }
  _cacheItemData($itemElement) {
    var _this$_$cachedContent;
    if ($itemElement[0] === this._cachedNode) {
      return;
    }
    this._$cachedContent = $itemElement.find(`.${SLIDE_MENU_CONTENT_CLASS}`);
    this._cachedItemWidth = (0, _size.getOuterWidth)($itemElement);
    this._cachedButtonWidth = this._cachedButtonWidth || (0, _size.getOuterWidth)(this._$buttons);
    (0, _size.setWidth)(this._$buttonsContainer, this._cachedButtonWidth);
    if ((_this$_$cachedContent = this._$cachedContent) !== null && _this$_$cachedContent !== void 0 && _this$_$cachedContent.length) {
      this._cachedNode = $itemElement.get(0);
    }
  }
  _minButtonContainerLeftOffset() {
    return this._cachedItemWidth - this._cachedButtonWidth;
  }
  _swipeEndHandler($itemElement, args) {
    this._cacheItemData($itemElement);
    const signCorrection = this._isRtlEnabled() ? 1 : -1;
    const offset = this._cachedItemWidth * args.offset;
    const endedAtReadyToDelete = !this._isReadyToDelete($itemElement) && offset * signCorrection > this._cachedButtonWidth * 0.2;
    const readyToDelete = args.targetOffset === signCorrection && endedAtReadyToDelete;
    this._toggleDeleteReady($itemElement, readyToDelete);
  }
  _enablePositioning($itemElement) {
    if (this._$cachedContent) {
      _animation.fx.stop(this._$cachedContent.get(0), true);
    }
    super._enablePositioning($itemElement);
    this._$buttonsContainer.appendTo($itemElement);
  }
  _disablePositioning($itemElement) {
    super._disablePositioning($itemElement);
    this._$buttonsContainer.detach();
  }
  _animatePrepareDeleteReady() {
    return this._animateToPositions(this._getPositions(1));
  }
  _animateForgetDeleteReady($itemElement) {
    this._cacheItemData($itemElement);
    return this._animateToPositions(this._getPositions(0));
  }
  _animateToPositions(positions) {
    const currentPosition = this._getCurrentPositions();
    const durationTimePart = Math.min(Math.abs(currentPosition.content - positions.content) / this._cachedButtonWidth, 1);
    return _animation.fx.animate((0, _renderer.default)(this._$cachedContent).get(0), {
      // @ts-expect-error ts-error
      from: currentPosition,
      // @ts-expect-error ts-error
      to: positions,
      easing: SLIDE_MENU_ANIMATION_EASING,
      duration: SLIDE_MENU_ANIMATION_DURATION * durationTimePart,
      strategy: 'frame',
      draw: drawPositions => {
        this._setPositions(drawPositions);
      }
    });
  }
  dispose() {
    if (this._menu) {
      this._menu.$element().remove();
    }
    if (this._$buttonsContainer) {
      this._$buttonsContainer.remove();
    }
    super.dispose();
  }
}
(0, _listEdit.register)('menu', 'slide', SwitchableEditDecoratorSlide);

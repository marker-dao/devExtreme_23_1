/**
* DevExtreme (esm/__internal/ui/list/m_list.edit.decorator.switchable.slide.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { fx } from '../../../common/core/animation';
import { locate, move } from '../../../common/core/animation/translator';
import { name as clickEventName } from '../../../common/core/events/click';
import { active } from '../../../common/core/events/core/emitter.feedback';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../common/core/events/utils';
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { getOuterWidth, setWidth } from '../../../core/utils/size';
import { isMaterialBased } from '../../../ui/themes';
import ActionSheet from '../../ui/action_sheet';
import SwitchableEditDecorator from './m_list.edit.decorator.switchable';
import { register as registerDecorator } from './m_list.edit.decorator_registry';
const LIST_EDIT_DECORATOR = 'dxListEditDecorator';
const CLICK_EVENT_NAME = addNamespace(clickEventName, LIST_EDIT_DECORATOR);
const ACTIVE_EVENT_NAME = addNamespace(active, LIST_EDIT_DECORATOR);
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
class SwitchableEditDecoratorSlide extends SwitchableEditDecorator {
  // eslint-disable-next-line class-methods-use-this
  _shouldHandleSwipe() {
    return true;
  }
  _init() {
    // @ts-expect-error ts-error
    super._init.apply(this, arguments);
    this._$buttonsContainer = $('<div>').addClass(SLIDE_MENU_BUTTONS_CONTAINER_CLASS);
    eventsEngine.on(this._$buttonsContainer, ACTIVE_EVENT_NAME, noop);
    this._$buttons = $('<div>').addClass(SLIDE_MENU_BUTTONS_CLASS).appendTo(this._$buttonsContainer);
    this._renderMenu();
    this._renderDeleteButton();
  }
  _renderMenu() {
    const {
      menuItems
    } = this._list.option();
    if (!menuItems.length) {
      return;
    }
    if (menuItems.length === 1) {
      const menuItem = menuItems[0];
      this._renderMenuButton(menuItem.text, e => {
        e.stopPropagation();
        this._fireAction(menuItem);
      });
    } else {
      const $menu = $('<div>').addClass(SLIDE_MENU_CLASS);
      this._menu = this._list._createComponent($menu, ActionSheet, {
        showTitle: false,
        items: menuItems,
        onItemClick: function (args) {
          this._fireAction(args.itemData);
        }.bind(this),
        integrationOptions: {}
      });
      $menu.appendTo(this._list.$element());
      const $menuButton = this._renderMenuButton(messageLocalization.format('dxListEditDecorator-more'), e => {
        e.stopPropagation();
        this._menu.show();
      });
      this._menu.option('target', $menuButton);
    }
  }
  _renderMenuButton(text, action) {
    const $menuButton = $('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_MENU_CLASS).text(text);
    this._$buttons.append($menuButton);
    eventsEngine.on($menuButton, CLICK_EVENT_NAME, action);
    return $menuButton;
  }
  _renderDeleteButton() {
    const {
      allowItemDeleting
    } = this._list.option();
    if (!allowItemDeleting) {
      return;
    }
    const $deleteButton = $('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_DELETE_CLASS)
    // @ts-expect-error ts-error
    .text(isMaterialBased() ? '' : messageLocalization.format('dxListEditDecorator-delete'));
    eventsEngine.on($deleteButton, CLICK_EVENT_NAME, e => {
      e.stopPropagation();
      this._deleteItem();
    });
    this._$buttons.append($deleteButton);
  }
  _fireAction(menuItem) {
    this._list._itemEventHandlerByHandler($(this._cachedNode), menuItem.action, {}, {
      excludeValidators: ['disabled', 'readOnly']
    });
    this._cancelDeleteReadyItem();
  }
  modifyElement(config) {
    // @ts-expect-error ts-error
    super.modifyElement.apply(this, arguments);
    const {
      $itemElement
    } = config;
    $itemElement.addClass(SLIDE_MENU_WRAPPER_CLASS);
    const $slideMenuContent = $('<div>').addClass(SLIDE_MENU_CONTENT_CLASS);
    $itemElement.wrapInner($slideMenuContent);
  }
  _getDeleteButtonContainer() {
    return this._$buttonsContainer;
  }
  handleClick(_, e) {
    if ($(e.target).closest(`.${SLIDE_MENU_CONTENT_CLASS}`).length) {
      // @ts-expect-error ts-error
      return super.handleClick.apply(this, arguments);
    }
    return false;
  }
  _swipeStartHandler($itemElement) {
    this._enablePositioning($itemElement);
    this._cacheItemData($itemElement);
    this._setPositions(this._getPositions(0));
  }
  _swipeUpdateHandler($itemElement, args) {
    const rtl = this._isRtlEnabled();
    const signCorrection = rtl ? -1 : 1;
    const isItemReadyToDelete = this._isReadyToDelete($itemElement);
    const moveJustStarted = this._getCurrentPositions().content === this._getStartPositions().content;
    if (moveJustStarted && !isItemReadyToDelete && args.offset * signCorrection > 0) {
      args.cancel = true;
      return;
    }
    const offset = this._cachedItemWidth * args.offset;
    const startOffset = isItemReadyToDelete ? -this._cachedButtonWidth * signCorrection : 0;
    const correctedOffset = (offset + startOffset) * signCorrection;
    const percent = correctedOffset < 0 ? Math.abs((offset + startOffset) / this._cachedButtonWidth) : 0;
    this._setPositions(this._getPositions(percent));
    return true;
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
      content: locate(this._$cachedContent).left,
      buttonsContainer: locate(this._$buttonsContainer).left,
      buttons: locate(this._$buttons).left
    };
  }
  _setPositions(positions) {
    move(this._$cachedContent, {
      left: positions.content
    });
    move(this._$buttonsContainer, {
      left: positions.buttonsContainer
    });
    move(this._$buttons, {
      left: positions.buttons
    });
  }
  _cacheItemData($itemElement) {
    var _this$_$cachedContent;
    if ($itemElement[0] === this._cachedNode) {
      return;
    }
    this._$cachedContent = $itemElement.find(`.${SLIDE_MENU_CONTENT_CLASS}`);
    this._cachedItemWidth = getOuterWidth($itemElement);
    this._cachedButtonWidth = this._cachedButtonWidth || getOuterWidth(this._$buttons);
    setWidth(this._$buttonsContainer, this._cachedButtonWidth);
    if ((_this$_$cachedContent = this._$cachedContent) !== null && _this$_$cachedContent !== void 0 && _this$_$cachedContent.length) {
      // eslint-disable-next-line prefer-destructuring
      this._cachedNode = $itemElement[0];
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
    return true;
  }
  _enablePositioning($itemElement) {
    // @ts-expect-error ts-error
    fx.stop(this._$cachedContent, true);
    // @ts-expect-error ts-error
    super._enablePositioning.apply(this, arguments);
    this._$buttonsContainer.appendTo($itemElement);
  }
  _disablePositioning() {
    // @ts-expect-error ts-error
    super._disablePositioning.apply(this, arguments);
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
    const that = this;
    const currentPosition = this._getCurrentPositions();
    const durationTimePart = Math.min(Math.abs(currentPosition.content - positions.content) / this._cachedButtonWidth, 1);
    // @ts-expect-error ts-error
    return fx.animate(this._$cachedContent, {
      from: currentPosition,
      to: positions,
      easing: SLIDE_MENU_ANIMATION_EASING,
      duration: SLIDE_MENU_ANIMATION_DURATION * durationTimePart,
      strategy: 'frame',
      draw(positions) {
        that._setPositions(positions);
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
    // @ts-expect-error ts-error
    super.dispose.apply(this, arguments);
  }
}
registerDecorator('menu', 'slide', SwitchableEditDecoratorSlide);

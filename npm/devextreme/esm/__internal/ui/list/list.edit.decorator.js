/**
* DevExtreme (esm/__internal/ui/list/list.edit.decorator.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../../common/core/events/core/events_engine';
import { end as swipeEventEnd, start as swipeEventStart, swipe as swipeEventSwipe } from '../../../common/core/events/swipe';
import { addNamespace } from '../../../common/core/events/utils';
import $ from '../../../core/renderer';
import { getWidth } from '../../../core/utils/size';
const LIST_EDIT_DECORATOR = 'dxListEditDecorator';
const SWIPE_START_EVENT_NAME = addNamespace(swipeEventStart, LIST_EDIT_DECORATOR);
const SWIPE_UPDATE_EVENT_NAME = addNamespace(swipeEventSwipe, LIST_EDIT_DECORATOR);
const SWIPE_END_EVENT_NAME = addNamespace(swipeEventEnd, LIST_EDIT_DECORATOR);
class EditDecorator {
  constructor(list) {
    this._itemWidthCache = 0;
    this._list = list;
    this._init();
  }
  _shouldHandleSwipe() {
    return false;
  }
  _init() {}
  _attachSwipeEvent(config) {
    const swipeConfig = {
      itemSizeFunc: () => {
        if (this._clearSwipeCache) {
          this._itemWidthCache = getWidth(this._list.$element());
          this._clearSwipeCache = false;
        }
        return this._itemWidthCache;
      }
    };
    eventsEngine.on(config.$itemElement, SWIPE_START_EVENT_NAME, swipeConfig, e => {
      this._itemSwipeStartHandler(e);
    });
    eventsEngine.on(config.$itemElement, SWIPE_UPDATE_EVENT_NAME, e => {
      this._itemSwipeUpdateHandler(e);
    });
    eventsEngine.on(config.$itemElement, SWIPE_END_EVENT_NAME, e => {
      this._itemSwipeEndHandler(e);
    });
  }
  _itemSwipeStartHandler(e) {
    const $itemElement = $(e.currentTarget);
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      e.cancel = true;
      return;
    }
    clearTimeout(this._list._inkRippleTimer);
    this._swipeStartHandler($itemElement);
  }
  _itemSwipeUpdateHandler(e) {
    const target = e.currentTarget;
    if (target instanceof Element) {
      const $itemElement = $(target);
      this._swipeUpdateHandler($itemElement, e);
    }
  }
  _itemSwipeEndHandler(e) {
    const target = e.currentTarget;
    if (target instanceof Element) {
      const $itemElement = $(target);
      this._swipeEndHandler($itemElement, e);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeBag(config) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterBag(config) {}
  _commonOptions() {
    const {
      activeStateEnabled,
      hoverStateEnabled,
      focusStateEnabled
    } = this._list.option();
    return {
      activeStateEnabled,
      hoverStateEnabled,
      focusStateEnabled
    };
  }
  modifyElement(config) {
    if (this._shouldHandleSwipe()) {
      this._attachSwipeEvent(config);
      this._clearSwipeCache = true;
    }
  }
  afterRender() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick($itemElement, e) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEnterPressing(e) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleContextMenu($itemElement) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _swipeStartHandler($element) {}
  _swipeUpdateHandler(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $element,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _swipeEndHandler($element, event) {}
  visibilityChange() {}
  getExcludedSelectors() {}
  dispose() {}
}
export default EditDecorator;

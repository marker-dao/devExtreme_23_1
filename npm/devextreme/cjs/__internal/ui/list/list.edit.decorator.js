/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _swipe = require("../../../common/core/events/swipe");
var _utils = require("../../../common/core/events/utils");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LIST_EDIT_DECORATOR = 'dxListEditDecorator';
const SWIPE_START_EVENT_NAME = (0, _utils.addNamespace)(_swipe.start, LIST_EDIT_DECORATOR);
const SWIPE_UPDATE_EVENT_NAME = (0, _utils.addNamespace)(_swipe.swipe, LIST_EDIT_DECORATOR);
const SWIPE_END_EVENT_NAME = (0, _utils.addNamespace)(_swipe.end, LIST_EDIT_DECORATOR);
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
          this._itemWidthCache = (0, _size.getWidth)(this._list.$element());
          this._clearSwipeCache = false;
        }
        return this._itemWidthCache;
      }
    };
    _events_engine.default.on(config.$itemElement, SWIPE_START_EVENT_NAME, swipeConfig, e => {
      this._itemSwipeStartHandler(e);
    });
    _events_engine.default.on(config.$itemElement, SWIPE_UPDATE_EVENT_NAME, e => {
      this._itemSwipeUpdateHandler(e);
    });
    _events_engine.default.on(config.$itemElement, SWIPE_END_EVENT_NAME, e => {
      this._itemSwipeEndHandler(e);
    });
  }
  _itemSwipeStartHandler(e) {
    const $itemElement = (0, _renderer.default)(e.currentTarget);
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
      const $itemElement = (0, _renderer.default)(target);
      this._swipeUpdateHandler($itemElement, e);
    }
  }
  _itemSwipeEndHandler(e) {
    const target = e.currentTarget;
    if (target instanceof Element) {
      const $itemElement = (0, _renderer.default)(target);
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
var _default = exports.default = EditDecorator;

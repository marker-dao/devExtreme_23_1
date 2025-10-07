/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.switchable.js)
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
var _emitter = require("../../../common/core/events/core/emitter.feedback");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _utils = require("../../../common/core/events/utils");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _size = require("../../../core/utils/size");
var _listEdit = _interopRequireDefault(require("../../ui/list/list.edit.decorator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LIST_EDIT_DECORATOR = 'dxListEditDecorator';
const POINTER_DOWN_EVENT_NAME = (0, _utils.addNamespace)(_pointer.default.down, LIST_EDIT_DECORATOR);
const ACTIVE_EVENT_NAME = (0, _utils.addNamespace)(_emitter.active, LIST_EDIT_DECORATOR);
const LIST_ITEM_CONTENT_CLASS = 'dx-list-item-content';
const SWITCHABLE_DELETE_READY_CLASS = 'dx-list-switchable-delete-ready';
const SWITCHABLE_MENU_SHIELD_POSITIONING_CLASS = 'dx-list-switchable-menu-shield-positioning';
const SWITCHABLE_DELETE_TOP_SHIELD_CLASS = 'dx-list-switchable-delete-top-shield';
const SWITCHABLE_DELETE_BOTTOM_SHIELD_CLASS = 'dx-list-switchable-delete-bottom-shield';
const SWITCHABLE_MENU_ITEM_SHIELD_POSITIONING_CLASS = 'dx-list-switchable-menu-item-shield-positioning';
const SWITCHABLE_DELETE_ITEM_CONTENT_SHIELD_CLASS = 'dx-list-switchable-delete-item-content-shield';
const SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS = 'dx-list-switchable-delete-button-container';
class SwitchableEditDecorator extends _listEdit.default {
  _init() {
    this._$topShield = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_TOP_SHIELD_CLASS);
    this._$bottomShield = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BOTTOM_SHIELD_CLASS);
    this._$itemContentShield = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_ITEM_CONTENT_SHIELD_CLASS);
    _events_engine.default.on(this._$topShield, POINTER_DOWN_EVENT_NAME, () => {
      this._cancelDeleteReadyItem();
    });
    _events_engine.default.on(this._$bottomShield, POINTER_DOWN_EVENT_NAME, () => {
      this._cancelDeleteReadyItem();
    });
    this._list.$element().append(this._$topShield.toggle(false)).append(this._$bottomShield.toggle(false));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick(_$itemElement, _e) {
    return this._cancelDeleteReadyItem();
  }
  _cancelDeleteReadyItem() {
    if (!this._$readyToDeleteItem) {
      return false;
    }
    this._cancelDelete(this._$readyToDeleteItem);
    return true;
  }
  _cancelDelete($itemElement) {
    this._toggleDeleteReady($itemElement, false);
  }
  _toggleDeleteReady($itemElement, readyToDelete) {
    const isReadyToDelete = readyToDelete ?? !this._isReadyToDelete($itemElement);
    this._toggleShields($itemElement, isReadyToDelete);
    this._toggleScrolling(isReadyToDelete);
    this._cacheReadyToDeleteItem($itemElement, isReadyToDelete);
    this._animateToggleDelete($itemElement, isReadyToDelete);
  }
  _isReadyToDelete($itemElement) {
    return $itemElement.hasClass(SWITCHABLE_DELETE_READY_CLASS);
  }
  _toggleShields($itemElement, enabled) {
    this._list.$element().toggleClass(SWITCHABLE_MENU_SHIELD_POSITIONING_CLASS, enabled);
    this._$topShield.toggle(enabled);
    this._$bottomShield.toggle(enabled);
    if (enabled) {
      this._updateShieldsHeight($itemElement);
    }
    this._toggleContentShield($itemElement, enabled);
  }
  _updateShieldsHeight($itemElement) {
    var _$list$offset, _$itemElement$offset;
    const $list = this._list.$element();
    const listTopOffset = ((_$list$offset = $list.offset()) === null || _$list$offset === void 0 ? void 0 : _$list$offset.top) ?? 0;
    const listHeight = (0, _size.getOuterHeight)($list);
    const itemTopOffset = ((_$itemElement$offset = $itemElement.offset()) === null || _$itemElement$offset === void 0 ? void 0 : _$itemElement$offset.top) ?? 0;
    const itemHeight = (0, _size.getOuterHeight)($itemElement);
    const dirtyTopShieldHeight = itemTopOffset - listTopOffset;
    const dirtyBottomShieldHeight = listHeight - itemHeight - dirtyTopShieldHeight;
    (0, _size.setHeight)(this._$topShield, Math.max(dirtyTopShieldHeight, 0));
    (0, _size.setHeight)(this._$bottomShield, Math.max(dirtyBottomShieldHeight, 0));
  }
  _toggleContentShield($itemElement, enabled) {
    if (enabled) {
      $itemElement.find(`.${LIST_ITEM_CONTENT_CLASS}`).first().append(this._$itemContentShield);
    } else {
      this._$itemContentShield.detach();
    }
  }
  _toggleScrolling(readyToDelete) {
    const scrollView = this._list._scrollView;
    if (readyToDelete) {
      scrollView.on('start', this._cancelScrolling);
    } else {
      scrollView.off('start', this._cancelScrolling);
    }
  }
  _cancelScrolling(args) {
    if (args.event) {
      args.event.cancel = true;
    }
  }
  _cacheReadyToDeleteItem($itemElement, cache) {
    if (cache) {
      this._$readyToDeleteItem = $itemElement;
    } else {
      delete this._$readyToDeleteItem;
    }
  }
  _animateToggleDelete($itemElement, readyToDelete) {
    if (readyToDelete) {
      this._enablePositioning($itemElement);
      this._prepareDeleteReady($itemElement);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._animatePrepareDeleteReady($itemElement);
      _events_engine.default.off($itemElement, _pointer.default.up);
    } else {
      this._forgetDeleteReady($itemElement);
      this._animateForgetDeleteReady($itemElement)
      // @ts-expect-error ts-error
      .done(this._disablePositioning.bind(this, $itemElement));
    }
  }
  _enablePositioning($itemElement) {
    $itemElement.addClass(SWITCHABLE_MENU_ITEM_SHIELD_POSITIONING_CLASS);
    _events_engine.default.on($itemElement, ACTIVE_EVENT_NAME, _common.noop);
    _events_engine.default.one($itemElement, _pointer.default.up, this._disablePositioning.bind(this, $itemElement));
  }
  _disablePositioning($itemElement) {
    $itemElement.removeClass(SWITCHABLE_MENU_ITEM_SHIELD_POSITIONING_CLASS);
    _events_engine.default.off($itemElement, ACTIVE_EVENT_NAME);
  }
  _prepareDeleteReady($itemElement) {
    $itemElement.addClass(SWITCHABLE_DELETE_READY_CLASS);
  }
  _forgetDeleteReady($itemElement) {
    $itemElement.removeClass(SWITCHABLE_DELETE_READY_CLASS);
  }
  _getDeleteButtonContainer($itemElement) {
    const $element = $itemElement || this._$readyToDeleteItem;
    return $element.children(`.${SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS}`);
  }
  _deleteItem($itemElement) {
    const $element = $itemElement ?? this._$readyToDeleteItem;
    if (!$element) {
      return;
    }
    this._getDeleteButtonContainer($element).detach();
    if ($element.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    this._list.deleteItem($element.get(0))
    // @ts-expect-error ts-error
    .always(this._cancelDelete.bind(this, $element));
  }
  _isRtlEnabled() {
    const {
      rtlEnabled = false
    } = this._list.option();
    return rtlEnabled;
  }
  dispose() {
    if (this._$topShield) {
      this._$topShield.remove();
    }
    if (this._$bottomShield) {
      this._$bottomShield.remove();
    }
    super.dispose();
  }
}
var _default = exports.default = SwitchableEditDecorator;

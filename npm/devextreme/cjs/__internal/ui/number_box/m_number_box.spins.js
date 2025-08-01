/**
* DevExtreme (cjs/__internal/ui/number_box/m_number_box.spins.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
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
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _m_button = _interopRequireDefault(require("../../ui/text_box/texteditor_button_collection/m_button"));
var _m_number_box = _interopRequireDefault(require("./m_number_box.spin"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SPIN_CLASS = 'dx-numberbox-spin';
const SPIN_CONTAINER_CLASS = 'dx-numberbox-spin-container';
const SPIN_TOUCH_FRIENDLY_CLASS = 'dx-numberbox-spin-touch-friendly';
class SpinButtons extends _m_button.default {
  _attachEvents(instance, $spinContainer) {
    const {
      editor
    } = this;
    // @ts-expect-error
    const eventName = (0, _index.addNamespace)(_pointer.default.down, editor.NAME);
    const $spinContainerChildren = $spinContainer.children();
    const pointerDownAction = editor._createAction(
    // @ts-expect-error
    e => editor._spinButtonsPointerDownHandler(e));
    _events_engine.default.off($spinContainer, eventName);
    _events_engine.default.on($spinContainer, eventName, e => pointerDownAction({
      event: e
    }));
    _m_number_box.default.getInstance($spinContainerChildren.eq(0)).option('onChange',
    // @ts-expect-error
    e => editor._spinUpChangeHandler(e));
    _m_number_box.default.getInstance($spinContainerChildren.eq(1)).option('onChange',
    // @ts-expect-error
    e => editor._spinDownChangeHandler(e));
  }
  _create() {
    const {
      editor
    } = this;
    const $spinContainer = (0, _renderer.default)('<div>').addClass(SPIN_CONTAINER_CLASS);
    const $spinUp = (0, _renderer.default)('<div>').appendTo($spinContainer);
    const $spinDown = (0, _renderer.default)('<div>').appendTo($spinContainer);
    const options = this._getOptions();
    this._addToContainer($spinContainer);
    editor._createComponent($spinUp, _m_number_box.default, (0, _extend.extend)({
      direction: 'up'
    }, options));
    editor._createComponent($spinDown, _m_number_box.default, (0, _extend.extend)({
      direction: 'down'
    }, options));
    this._legacyRender(editor.$element(), this._isTouchFriendly(), options.visible);
    return {
      instance: $spinContainer,
      $element: $spinContainer
    };
  }
  _getOptions() {
    const {
      editor
    } = this;
    const visible = this._isVisible();
    const disabled = editor.option('disabled');
    return {
      visible,
      disabled
    };
  }
  // @ts-expect-error
  _isVisible() {
    const {
      editor
    } = this;
    return super._isVisible() && editor.option('showSpinButtons');
  }
  _isTouchFriendly() {
    const {
      editor
    } = this;
    return editor.option('showSpinButtons') && editor.option('useLargeSpinButtons');
  }
  // TODO: get rid of it
  _legacyRender($editor, isTouchFriendly, isVisible) {
    $editor.toggleClass(SPIN_TOUCH_FRIENDLY_CLASS, isTouchFriendly);
    $editor.toggleClass(SPIN_CLASS, isVisible);
  }
  // @ts-expect-error
  update() {
    const shouldUpdate = super.update();
    if (shouldUpdate) {
      const {
        editor,
        instance
      } = this;
      const $editor = editor.$element();
      const isVisible = this._isVisible();
      const isTouchFriendly = this._isTouchFriendly();
      // @ts-expect-error
      const $spinButtons = instance.children();
      const spinUp = _m_number_box.default.getInstance($spinButtons.eq(0));
      const spinDown = _m_number_box.default.getInstance($spinButtons.eq(1));
      const options = this._getOptions();
      spinUp.option(options);
      spinDown.option(options);
      this._legacyRender($editor, isTouchFriendly, isVisible);
    }
  }
}
exports.default = SpinButtons;

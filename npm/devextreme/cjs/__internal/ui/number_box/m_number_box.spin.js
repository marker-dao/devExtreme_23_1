/**
* DevExtreme (cjs/__internal/ui/number_box/m_number_box.spin.js)
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
var _emitter = require("../../../common/core/events/core/emitter.feedback");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _hold = _interopRequireDefault(require("../../../common/core/events/hold"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SPIN_CLASS = 'dx-numberbox-spin';
const SPIN_BUTTON_CLASS = 'dx-numberbox-spin-button';
const SPIN_HOLD_DELAY = 100;
const NUMBER_BOX = 'dxNumberBox';
const POINTERUP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, NUMBER_BOX);
const POINTERCANCEL_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.cancel, NUMBER_BOX);
class SpinButton extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      direction: 'up',
      // @ts-expect-error ts-error
      onChange: null,
      activeStateEnabled: true,
      hoverStateEnabled: true
    });
  }
  _initMarkup() {
    super._initMarkup();
    const {
      direction: spinDirection
    } = this.option();
    const direction = `${SPIN_CLASS}-${spinDirection}`;
    this.$element().addClass(SPIN_BUTTON_CLASS).addClass(direction);
    this._spinIcon = (0, _renderer.default)('<div>').addClass(`${direction}-icon`).appendTo(this.$element());
  }
  _render() {
    super._render();
    // @ts-expect-error ts-error
    const eventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
    const $element = this.$element();
    _events_engine.default.off($element, eventName);
    _events_engine.default.on($element, eventName, this._spinDownHandler.bind(this));
    this._spinChangeHandler = this._createActionByOption('onChange');
  }
  _spinDownHandler(e) {
    e.preventDefault();
    this._clearTimer();
    _events_engine.default.on(this.$element(), _hold.default.name, () => {
      this._feedBackDeferred = (0, _deferred.Deferred)();
      (0, _emitter.lock)(this._feedBackDeferred);
      this._spinChangeHandler({
        event: e
      });
      this._holdTimer = setInterval(this._spinChangeHandler, SPIN_HOLD_DELAY, {
        event: e
      });
    });
    const document = _dom_adapter.default.getDocument();
    _events_engine.default.on(document, POINTERUP_EVENT_NAME, this._clearTimer.bind(this));
    _events_engine.default.on(document, POINTERCANCEL_EVENT_NAME, this._clearTimer.bind(this));
    this._spinChangeHandler({
      event: e
    });
  }
  _dispose() {
    this._clearTimer();
    super._dispose();
  }
  _clearTimer() {
    _events_engine.default.off(this.$element(), _hold.default.name);
    const document = _dom_adapter.default.getDocument();
    _events_engine.default.off(document, POINTERUP_EVENT_NAME);
    _events_engine.default.off(document, POINTERCANCEL_EVENT_NAME);
    if (this._feedBackDeferred) {
      this._feedBackDeferred.resolve();
    }
    if (this._holdTimer) {
      clearInterval(this._holdTimer);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onChange':
      case 'direction':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = SpinButton;

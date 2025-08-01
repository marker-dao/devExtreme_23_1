/**
* DevExtreme (cjs/__internal/events/gesture/m_swipeable.js)
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
var _swipe = require("../../../common/core/events/swipe");
var _index = require("../../../common/core/events/utils/index");
var _iterator = require("../../../core/utils/iterator");
var _public_component = require("../../../core/utils/public_component");
var _dom_component = _interopRequireDefault(require("../../core/widget/dom_component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DX_SWIPEABLE = 'dxSwipeable';
const SWIPEABLE_CLASS = 'dx-swipeable';
const ACTION_TO_EVENT_MAP = {
  onStart: _swipe.start,
  onUpdated: _swipe.swipe,
  onEnd: _swipe.end,
  onCancel: 'dxswipecancel'
};
const IMMEDIATE_TIMEOUT = 180;
class Swipeable extends _dom_component.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      elastic: true,
      immediate: false,
      immediateTimeout: IMMEDIATE_TIMEOUT,
      direction: 'horizontal',
      itemSizeFunc: null,
      onStart: null,
      onUpdated: null,
      onEnd: null,
      onCancel: null
    });
  }
  _render() {
    super._render();
    this.$element().addClass(SWIPEABLE_CLASS);
    this._attachEventHandlers();
  }
  _attachEventHandlers() {
    this._detachEventHandlers();
    if (this.option('disabled')) {
      return;
    }
    const {
      NAME
    } = this;
    this._createEventData();
    (0, _iterator.each)(ACTION_TO_EVENT_MAP, (actionName, eventName) => {
      // @ts-expect-error ts-error
      const action = this._createActionByOption(actionName, {
        context: this
      });
      // @ts-expect-error ts-error
      eventName = (0, _index.addNamespace)(eventName, NAME);
      _events_engine.default.on(this.$element(), eventName, this._eventData, e => action({
        event: e
      }));
    });
  }
  _createEventData() {
    this._eventData = {
      elastic: this.option('elastic'),
      itemSizeFunc: this.option('itemSizeFunc'),
      direction: this.option('direction'),
      immediate: this.option('immediate'),
      immediateTimeout: this.option('immediateTimeout')
    };
  }
  _detachEventHandlers() {
    _events_engine.default.off(this.$element(), `.${DX_SWIPEABLE}`);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'disabled':
      case 'onStart':
      case 'onUpdated':
      case 'onEnd':
      case 'onCancel':
      case 'elastic':
      case 'immediate':
      case 'itemSizeFunc':
      case 'direction':
        this._detachEventHandlers();
        this._attachEventHandlers();
        break;
      case 'rtlEnabled':
        break;
      default:
        super._optionChanged(args);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
}
(0, _public_component.name)(Swipeable, DX_SWIPEABLE);
var _default = exports.default = Swipeable;

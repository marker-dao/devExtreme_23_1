/**
* DevExtreme (cjs/__internal/viz/gauges/tracker.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _wheel = require("../../../common/core/events/core/wheel");
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _class = _interopRequireDefault(require("../../../core/class"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _ready_callbacks = _interopRequireDefault(require("../../../core/utils/ready_callbacks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-implied-eval */

const EVENT_NS = 'gauge-tooltip';
const TOOLTIP_HIDE_DELAY = 100;
const ready = _ready_callbacks.default.add;
const Tracker = _class.default.inherit({
  ctor(parameters) {
    const that = this;
    that._element = parameters.renderer.g().attr({
      class: 'dxg-tracker',
      stroke: 'none',
      'stroke-width': 0,
      fill: '#000000',
      opacity: 0.0001
    }).linkOn(parameters.container, {
      name: 'tracker',
      after: 'peripheral'
    });
    that._showTooltipCallback = function () {
      const target = that._tooltipEvent.target;
      const data_target = target['gauge-data-target'];
      const data_info = target['gauge-data-info'];
      that._targetEvent = null; //  Internal state must be reset strictly BEFORE callback is invoked
      if (that._tooltipTarget !== target) {
        const callback = result => {
          result && (that._tooltipTarget = target);
        };
        callback(that._callbacks['tooltip-show'](data_target, data_info, callback));
      }
    };
    that._hideTooltipCallback = function () {
      that._hideTooltipTimeout = null;
      that._targetEvent = null;
      if (that._tooltipTarget) {
        that._callbacks['tooltip-hide']();
        that._tooltipTarget = null;
      }
    };
    that._dispose = function () {
      clearTimeout(that._hideTooltipTimeout);
      that._showTooltipCallback = that._hideTooltipCallback = that._dispose = null;
    };
  },
  dispose() {
    const that = this;
    that._dispose();
    that.deactivate();
    that._element.off(`.${EVENT_NS}`);
    that._element.linkOff();
    that._element = that._context = that._callbacks = null;
    return that;
  },
  activate() {
    this._element.linkAppend();
    return this;
  },
  deactivate() {
    this._element.linkRemove().clear();
    return this;
  },
  attach(element, target, info) {
    element.data({
      'gauge-data-target': target,
      'gauge-data-info': info
    }).append(this._element);
    return this;
  },
  detach(element) {
    element.remove();
    return this;
  },
  setTooltipState(state) {
    const that = this;
    that._element.off(`.${EVENT_NS}`);
    if (state) {
      const data = {
        tracker: that
      };
      that._element.on((0, _index.addNamespace)([_pointer.default.move], EVENT_NS), data, handleTooltipMouseOver).on((0, _index.addNamespace)([_pointer.default.out], EVENT_NS), data, handleTooltipMouseOut).on((0, _index.addNamespace)([_pointer.default.down], EVENT_NS), data, handleTooltipTouchStart).on((0, _index.addNamespace)([_pointer.default.up], EVENT_NS), data, handleTooltipTouchEnd).on((0, _index.addNamespace)([_wheel.name], EVENT_NS), data, handleTooltipMouseWheel);
    }
    return that;
  },
  setCallbacks(callbacks) {
    this._callbacks = callbacks;
    return this;
  },
  _showTooltip(event) {
    const that = this;
    clearTimeout(that._hideTooltipTimeout);
    that._hideTooltipTimeout = null;
    if (that._tooltipTarget === event.target) {
      return;
    }
    that._tooltipEvent = event;
    that._showTooltipCallback();
  },
  _hideTooltip(delay) {
    const that = this;
    clearTimeout(that._hideTooltipTimeout);
    if (delay) {
      that._hideTooltipTimeout = setTimeout(that._hideTooltipCallback, delay);
    } else {
      that._hideTooltipCallback();
    }
  }
});
let active_touch_tooltip_tracker = null;
function handleTooltipMouseOver(event) {
  const tracker = event.data.tracker;
  tracker._x = event.pageX;
  tracker._y = event.pageY;
  tracker._showTooltip(event);
}
function handleTooltipMouseOut(event) {
  event.data.tracker._hideTooltip(TOOLTIP_HIDE_DELAY);
}
function handleTooltipMouseWheel(event) {
  event.data.tracker._hideTooltip();
}
function handleTooltipTouchStart(event) {
  const tracker = active_touch_tooltip_tracker = event.data.tracker;
  tracker._touch = true;
  handleTooltipMouseOver(event);
}
function handleTooltipTouchEnd() {
  // @ts-expect-error
  active_touch_tooltip_tracker._touch = false;
}
function handleDocumentTooltipTouchStart(event) {
  const tracker = active_touch_tooltip_tracker;
  // @ts-expect-error
  if (tracker && !tracker._touch) {
    // @ts-expect-error
    tracker._hideTooltip(TOOLTIP_HIDE_DELAY);
    active_touch_tooltip_tracker = null;
  }
}
ready(() => {
  // @ts-expect-error
  _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), (0, _index.addNamespace)([_pointer.default.down], EVENT_NS), handleDocumentTooltipTouchStart);
});
var _default = exports.default = Tracker;

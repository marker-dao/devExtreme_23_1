/**
* DevExtreme (cjs/__internal/events/m_swipe.js)
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
exports.swipe = exports.start = exports.end = void 0;
var _emitter_registrator = _interopRequireDefault(require("../../common/core/events/core/emitter_registrator"));
var _emitter = _interopRequireDefault(require("../../common/core/events/gesture/emitter.gesture"));
var _index = require("../../common/core/events/utils/index");
var _size = require("../../core/utils/size");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SWIPE_START_EVENT = exports.start = 'dxswipestart';
const SWIPE_EVENT = exports.swipe = 'dxswipe';
const SWIPE_END_EVENT = exports.end = 'dxswipeend';
const HorizontalStrategy = {
  defaultItemSizeFunc() {
    return (0, _size.getWidth)(this.getElement());
  },
  getBounds() {
    return [this._maxLeftOffset, this._maxRightOffset];
  },
  calcOffsetRatio(e) {
    const endEventData = (0, _index.eventData)(e);
    return (endEventData.x - (this._savedEventData && this._savedEventData.x || 0)) / this._itemSizeFunc().call(this, e);
  },
  isFastSwipe(e) {
    const endEventData = (0, _index.eventData)(e);
    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.x - this._tickData.x) >= endEventData.time - this._tickData.time;
  }
};
const VerticalStrategy = {
  defaultItemSizeFunc() {
    return (0, _size.getHeight)(this.getElement());
  },
  getBounds() {
    return [this._maxTopOffset, this._maxBottomOffset];
  },
  calcOffsetRatio(e) {
    const endEventData = (0, _index.eventData)(e);
    return (endEventData.y - (this._savedEventData && this._savedEventData.y || 0)) / this._itemSizeFunc().call(this, e);
  },
  isFastSwipe(e) {
    const endEventData = (0, _index.eventData)(e);
    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.y - this._tickData.y) >= endEventData.time - this._tickData.time;
  }
};
const STRATEGIES = {
  horizontal: HorizontalStrategy,
  vertical: VerticalStrategy
};
const SwipeEmitter = _emitter.default.inherit({
  TICK_INTERVAL: 300,
  FAST_SWIPE_SPEED_LIMIT: 10,
  ctor(element) {
    this.callBase(element);
    this.direction = 'horizontal';
    this.elastic = true;
  },
  _getStrategy() {
    return STRATEGIES[this.direction];
  },
  _defaultItemSizeFunc() {
    return this._getStrategy().defaultItemSizeFunc.call(this);
  },
  _itemSizeFunc() {
    return this.itemSizeFunc || this._defaultItemSizeFunc;
  },
  _init(e) {
    this._tickData = (0, _index.eventData)(e);
  },
  _start(e) {
    this._savedEventData = (0, _index.eventData)(e);
    e = this._fireEvent(SWIPE_START_EVENT, e);
    if (!e.cancel) {
      this._maxLeftOffset = e.maxLeftOffset;
      this._maxRightOffset = e.maxRightOffset;
      this._maxTopOffset = e.maxTopOffset;
      this._maxBottomOffset = e.maxBottomOffset;
    }
  },
  _move(e) {
    const strategy = this._getStrategy();
    const moveEventData = (0, _index.eventData)(e);
    let offset = strategy.calcOffsetRatio.call(this, e);
    offset = this._fitOffset(offset, this.elastic);
    if (moveEventData.time - this._tickData.time > this.TICK_INTERVAL) {
      this._tickData = moveEventData;
    }
    this._fireEvent(SWIPE_EVENT, e, {
      offset
    });
    if (e.cancelable !== false) {
      e.preventDefault();
    }
  },
  _end(e) {
    const strategy = this._getStrategy();
    const offsetRatio = strategy.calcOffsetRatio.call(this, e);
    const isFast = strategy.isFastSwipe.call(this, e);
    let startOffset = offsetRatio;
    let targetOffset = this._calcTargetOffset(offsetRatio, isFast);
    startOffset = this._fitOffset(startOffset, this.elastic);
    targetOffset = this._fitOffset(targetOffset, false);
    this._fireEvent(SWIPE_END_EVENT, e, {
      offset: startOffset,
      targetOffset
    });
  },
  _fitOffset(offset, elastic) {
    const strategy = this._getStrategy();
    const bounds = strategy.getBounds.call(this);
    if (offset < -bounds[0]) {
      return elastic ? (-2 * bounds[0] + offset) / 3 : -bounds[0];
    }
    if (offset > bounds[1]) {
      return elastic ? (2 * bounds[1] + offset) / 3 : bounds[1];
    }
    return offset;
  },
  _calcTargetOffset(offsetRatio, isFast) {
    let result;
    if (isFast) {
      result = Math.ceil(Math.abs(offsetRatio));
      if (offsetRatio < 0) {
        result = -result;
      }
    } else {
      result = Math.round(offsetRatio);
    }
    return result;
  }
});
(0, _emitter_registrator.default)({
  emitter: SwipeEmitter,
  events: [SWIPE_START_EVENT, SWIPE_EVENT, SWIPE_END_EVENT]
});

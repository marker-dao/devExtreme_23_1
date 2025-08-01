/**
* DevExtreme (cjs/__internal/events/m_transform.js)
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
exports.exportNames = void 0;
var _emitter = _interopRequireDefault(require("../../common/core/events/core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("../../common/core/events/core/emitter_registrator"));
var _index = require("../../common/core/events/utils/index");
var iteratorUtils = _interopRequireWildcard(require("../../core/utils/iterator"));
var _math = require("../../core/utils/math");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DX_PREFIX = 'dx';
const TRANSFORM = 'transform';
const TRANSLATE = 'translate';
const PINCH = 'pinch';
const ROTATE = 'rotate';
const START_POSTFIX = 'start';
const UPDATE_POSTFIX = '';
const END_POSTFIX = 'end';
const eventAliases = [];
const addAlias = function (eventName, eventArgs) {
  eventAliases.push({
    name: eventName,
    args: eventArgs
  });
};
addAlias(TRANSFORM, {
  scale: true,
  deltaScale: true,
  rotation: true,
  deltaRotation: true,
  translation: true,
  deltaTranslation: true
});
addAlias(TRANSLATE, {
  translation: true,
  deltaTranslation: true
});
addAlias(PINCH, {
  scale: true,
  deltaScale: true
});
addAlias(ROTATE, {
  rotation: true,
  deltaRotation: true
});
const getVector = function (first, second) {
  return {
    x: second.pageX - first.pageX,
    y: -second.pageY + first.pageY,
    centerX: (second.pageX + first.pageX) * 0.5,
    centerY: (second.pageY + first.pageY) * 0.5
  };
};
const getEventVector = function (e) {
  const {
    pointers
  } = e;
  return getVector(pointers[0], pointers[1]);
};
const getDistance = function (vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};
const getScale = function (firstVector, secondVector) {
  return getDistance(firstVector) / getDistance(secondVector);
};
const getRotation = function (firstVector, secondVector) {
  const scalarProduct = firstVector.x * secondVector.x + firstVector.y * secondVector.y;
  const distanceProduct = getDistance(firstVector) * getDistance(secondVector);
  if (distanceProduct === 0) {
    return 0;
  }
  const sign = (0, _math.sign)(firstVector.x * secondVector.y - secondVector.x * firstVector.y);
  const angle = Math.acos((0, _math.fitIntoRange)(scalarProduct / distanceProduct, -1, 1));
  return sign * angle;
};
const getTranslation = function (firstVector, secondVector) {
  return {
    x: firstVector.centerX - secondVector.centerX,
    y: firstVector.centerY - secondVector.centerY
  };
};
const TransformEmitter = _emitter.default.inherit({
  validatePointers(e) {
    return (0, _index.hasTouches)(e) > 1;
  },
  start(e) {
    this._accept(e);
    const startVector = getEventVector(e);
    this._startVector = startVector;
    this._prevVector = startVector;
    this._fireEventAliases(START_POSTFIX, e);
  },
  move(e) {
    const currentVector = getEventVector(e);
    const eventArgs = this._getEventArgs(currentVector);
    this._fireEventAliases(UPDATE_POSTFIX, e, eventArgs);
    this._prevVector = currentVector;
  },
  end(e) {
    const eventArgs = this._getEventArgs(this._prevVector);
    this._fireEventAliases(END_POSTFIX, e, eventArgs);
  },
  _getEventArgs(vector) {
    return {
      scale: getScale(vector, this._startVector),
      deltaScale: getScale(vector, this._prevVector),
      rotation: getRotation(vector, this._startVector),
      deltaRotation: getRotation(vector, this._prevVector),
      translation: getTranslation(vector, this._startVector),
      deltaTranslation: getTranslation(vector, this._prevVector)
    };
  },
  _fireEventAliases(eventPostfix, originalEvent, eventArgs) {
    eventArgs = eventArgs || {};
    iteratorUtils.each(eventAliases, (_, eventAlias) => {
      const args = {};
      iteratorUtils.each(eventAlias.args, name => {
        if (name in eventArgs) {
          args[name] = eventArgs[name];
        }
      });
      this._fireEvent(DX_PREFIX + eventAlias.name + eventPostfix, originalEvent, args);
    });
  }
});
const eventNames = eventAliases.reduce((result, eventAlias) => {
  [START_POSTFIX, UPDATE_POSTFIX, END_POSTFIX].forEach(eventPostfix => {
    result.push(DX_PREFIX + eventAlias.name + eventPostfix);
  });
  return result;
}, []);
(0, _emitter_registrator.default)({
  emitter: TransformEmitter,
  events: eventNames
});
const exportNames = exports.exportNames = {};
iteratorUtils.each(eventNames, (_, eventName) => {
  exportNames[eventName.substring(DX_PREFIX.length)] = eventName;
});

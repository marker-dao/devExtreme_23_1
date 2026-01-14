"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trigger = exports.one = exports.on = exports.off = exports.Event = void 0;
var _m_events_engine = _interopRequireDefault(require("./m_events_engine"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable prefer-destructuring */

const on = exports.on = _m_events_engine.default.on;
const one = exports.one = _m_events_engine.default.one;
const off = exports.off = _m_events_engine.default.off;
const trigger = exports.trigger = _m_events_engine.default.trigger;
const Event = exports.Event = _m_events_engine.default.Event;
/**
* DevExtreme (cjs/__internal/events/utils/m_event_nodes_disposing.js)
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
exports.unsubscribeNodesDisposing = exports.subscribeNodesDisposing = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _remove = require("../../../common/core/events/remove");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(node => !!node);
}
const subscribeNodesDisposing = (event, callback) => {
  _events_engine.default.one(nodesByEvent(event), _remove.removeEvent, callback);
};
exports.subscribeNodesDisposing = subscribeNodesDisposing;
const unsubscribeNodesDisposing = (event, callback) => {
  _events_engine.default.off(nodesByEvent(event), _remove.removeEvent, callback);
};
exports.unsubscribeNodesDisposing = unsubscribeNodesDisposing;

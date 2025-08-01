/**
* DevExtreme (cjs/__internal/events/core/m_event_registrator.js)
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
var _event_registrator_callbacks = _interopRequireDefault(require("../../../common/core/events/core/event_registrator_callbacks"));
var _iterator = require("../../../core/utils/iterator");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const registerEvent = function (name, eventObject) {
  const strategy = {};
  if ('noBubble' in eventObject) {
    strategy.noBubble = eventObject.noBubble;
  }
  if ('bindType' in eventObject) {
    strategy.bindType = eventObject.bindType;
  }
  if ('delegateType' in eventObject) {
    strategy.delegateType = eventObject.delegateType;
  }
  (0, _iterator.each)(['setup', 'teardown', 'add', 'remove', 'trigger', 'handle', '_default', 'dispose'], (_, methodName) => {
    if (!eventObject[methodName]) {
      return;
    }
    strategy[methodName] = function () {
      const args = [].slice.call(arguments);
      args.unshift(this);
      return eventObject[methodName].apply(eventObject, args);
    };
  });
  _event_registrator_callbacks.default.fire(name, strategy);
};
registerEvent.callbacks = _event_registrator_callbacks.default;
var _default = exports.default = registerEvent;

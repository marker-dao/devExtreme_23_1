/**
* DevExtreme (cjs/__internal/events/m_remove.js)
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
exports.removeEvent = void 0;
var _event_registrator = _interopRequireDefault(require("../../common/core/events/core/event_registrator"));
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _element_data = require("../../core/element_data");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const removeEvent = exports.removeEvent = 'dxremove';
const eventPropName = 'dxRemoveEvent';
(0, _element_data.beforeCleanData)(elements => {
  elements = [].slice.call(elements);
  for (let i = 0; i < elements.length; i++) {
    const $element = (0, _renderer.default)(elements[i]);
    // @ts-expect-error
    if ($element.prop(eventPropName)) {
      $element[0][eventPropName] = null;
      // @ts-expect-error
      _events_engine.default.triggerHandler($element, removeEvent);
    }
  }
});
(0, _event_registrator.default)(removeEvent, {
  noBubble: true,
  setup(element) {
    (0, _renderer.default)(element).prop(eventPropName, true);
  }
});

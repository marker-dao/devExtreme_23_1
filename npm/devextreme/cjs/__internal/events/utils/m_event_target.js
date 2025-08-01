/**
* DevExtreme (cjs/__internal/events/utils/m_event_target.js)
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
exports.getEventTarget = void 0;
const getEventTarget = event => {
  var _originalEvent$target, _originalEvent$compos;
  const {
    originalEvent
  } = event;
  if (!originalEvent) {
    return event.target;
  }
  const isShadowDOMUsed = Boolean((_originalEvent$target = originalEvent.target) === null || _originalEvent$target === void 0 ? void 0 : _originalEvent$target.shadowRoot);
  if (!isShadowDOMUsed) {
    return originalEvent.target;
  }
  const path = originalEvent.path ?? ((_originalEvent$compos = originalEvent.composedPath) === null || _originalEvent$compos === void 0 ? void 0 : _originalEvent$compos.call(originalEvent));
  const target = (path === null || path === void 0 ? void 0 : path[0]) ?? event.target;
  return target;
};
exports.getEventTarget = getEventTarget;

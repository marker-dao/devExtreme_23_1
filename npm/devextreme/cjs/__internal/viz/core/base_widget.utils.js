/**
* DevExtreme (cjs/__internal/viz/core/base_widget.utils.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEventTrigger = createEventTrigger;
exports.createIncidentOccurred = void 0;
exports.createResizeHandler = createResizeHandler;
var _resize_observer = _interopRequireDefault(require("../../../core/resize_observer"));
var _iterator = require("../../../core/utils/iterator");
var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));
var _string = require("../../../core/utils/string");
var _version = require("../../../core/version");
var _errors_warnings = _interopRequireDefault(require("../../../viz/core/errors_warnings"));
var _utils = require("../../viz/core/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/no-import-module-exports */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const {
  ERROR_MESSAGES
} = _errors_warnings.default;
function createEventTrigger(eventsMap, callbackGetter) {
  let triggers = {};
  (0, _iterator.each)(eventsMap, (name, info) => {
    if (info.name) {
      createEvent(name);
    }
  });
  let changes;
  triggerEvent.change = function (name) {
    const eventInfo = eventsMap[name];
    if (eventInfo) {
      (changes = changes || {})[name] = eventInfo;
    }
    return !!eventInfo;
  };
  triggerEvent.applyChanges = function () {
    if (changes) {
      (0, _iterator.each)(changes, (name, eventInfo) => {
        createEvent(eventInfo.newName || name);
      });
      changes = null;
    }
  };
  triggerEvent.dispose = function () {
    // @ts-expect-error
    eventsMap = callbackGetter = triggers = null;
  };
  return triggerEvent;
  function createEvent(name) {
    const eventInfo = eventsMap[name];
    triggers[eventInfo.name] = callbackGetter(name, eventInfo.actionSettings);
  }
  function triggerEvent(name, arg, complete) {
    triggers[name](arg);
    complete === null || complete === void 0 || complete();
  }
}
let createIncidentOccurred = function (widgetName, eventTrigger) {
  return function incidentOccurred(id, args) {
    eventTrigger('incidentOccurred', {
      target: {
        id,
        type: id[0] === 'E' ? 'error' : 'warning',
        args,
        // @ts-expect-error
        text: _string.format.apply(null, [ERROR_MESSAGES[id]].concat(args || [])),
        widget: widgetName,
        version: _version.version
      }
    });
  };
};
exports.createIncidentOccurred = createIncidentOccurred;
function getResizeManager(resizeCallback) {
  return (observe, unsubscribe) => {
    const {
      handler,
      dispose
    } = createDeferredHandler(resizeCallback, unsubscribe);
    observe(handler);
    return dispose;
  };
}
function createDeferredHandler(callback, unsubscribe) {
  let timeout;
  const handler = function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 100);
  };
  return {
    handler,
    dispose() {
      clearTimeout(timeout);
      unsubscribe(handler);
    }
  };
}
function createResizeHandler(contentElement, redrawOnResize, resize) {
  let disposeHandler;
  const resizeManager = getResizeManager(resize);
  if ((0, _utils.normalizeEnum)(redrawOnResize) === 'windowonly') {
    disposeHandler = resizeManager(handler => _resize_callbacks.default.add(handler), handler => _resize_callbacks.default.remove(handler));
  } else if (redrawOnResize === true) {
    disposeHandler = resizeManager(handler => _resize_observer.default.observe(contentElement, handler), () => _resize_observer.default.unobserve(contentElement));
  }
  return disposeHandler;
}

/**
* DevExtreme (cjs/__internal/scheduler/a11y_status/a11y_status_render.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createA11yStatusContainer = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CLASSES = {
  container: 'dx-scheduler-a11y-status-container'
};
const createA11yStatusContainer = function () {
  let statusText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _renderer.default)('<div>').text(statusText).addClass(CLASSES.container).attr('role', 'status');
};
exports.createA11yStatusContainer = createA11yStatusContainer;

/**
* DevExtreme (cjs/__internal/scheduler/m_loading.js)
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
exports.hide = hide;
exports.show = show;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _view_port = require("../../core/utils/view_port");
var _load_panel = _interopRequireDefault(require("../../ui/load_panel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let loading = null;
const createLoadPanel = function (options) {
  return new _load_panel.default((0, _renderer.default)('<div>').appendTo(options && options.container || (0, _view_port.value)()), options);
};
const removeLoadPanel = function () {
  if (!loading) {
    return;
  }
  loading.$element().remove();
  loading = null;
};
function show(options) {
  removeLoadPanel();
  loading = createLoadPanel(options);
  return loading.show();
}
function hide() {
  // hot fix for case without viewport
  if (!loading) {
    // @ts-expect-error
    return new _deferred.Deferred().resolve();
  }
  return loading.hide().done(removeLoadPanel).promise();
}

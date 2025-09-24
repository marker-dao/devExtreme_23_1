/**
* DevExtreme (cjs/__internal/grids/new/grid_core/options_validation/utils.js)
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
exports.throwError = void 0;
var _ui = _interopRequireDefault(require("../../../../../ui/widget/ui.errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const throwError = (errorCode, message) => {
  throw _ui.default.Error(errorCode, message);
};
exports.throwError = throwError;

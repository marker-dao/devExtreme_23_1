/**
* DevExtreme (cjs/__internal/pagination/utils/compatibility_utils.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalizationMessage = getLocalizationMessage;
exports.isGridCompatibilityMode = isGridCompatibilityMode;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _pagination_config_context = require("../common/pagination_config_context");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */

function getPaginationConfig(context) {
  if (context[_pagination_config_context.PaginationConfigContext.id]) {
    return context[_pagination_config_context.PaginationConfigContext.id];
  }
  return _pagination_config_context.PaginationConfigContext.defaultValue;
}
function isGridCompatibilityMode(context) {
  var _getPaginationConfig;
  return !!((_getPaginationConfig = getPaginationConfig(context)) !== null && _getPaginationConfig !== void 0 && _getPaginationConfig.isGridCompatibilityMode);
}
function getLocalizationMessage(context, key) {
  let actualKey = key;
  if (isGridCompatibilityMode(context)) {
    actualKey = key.replace('dxPagination', 'dxPager');
  }
  return _message.default.getFormatter(actualKey)();
}

/**
* DevExtreme (cjs/__internal/ui/scroll_view/utils/get_scroll_top_max.js)
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
exports.getScrollTopMax = getScrollTopMax;
function getScrollTopMax(element) {
  return element.scrollHeight - element.clientHeight;
}

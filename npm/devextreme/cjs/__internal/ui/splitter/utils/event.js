/**
* DevExtreme (cjs/__internal/ui/splitter/utils/event.js)
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
exports.RESIZE_EVENT = exports.ITEM_EXPANDED_EVENT = exports.ITEM_COLLAPSED_EVENT = exports.COLLAPSE_EVENT = void 0;
exports.getActionNameByEventName = getActionNameByEventName;
var _inflector = require("../../../../core/utils/inflector");
function getActionNameByEventName(eventName) {
  return `_${(0, _inflector.camelize)(eventName.replace('on', ''))}Action`;
}
const RESIZE_EVENT = exports.RESIZE_EVENT = {
  onResize: 'onResize',
  onResizeStart: 'onResizeStart',
  onResizeEnd: 'onResizeEnd'
};
const COLLAPSE_EVENT = exports.COLLAPSE_EVENT = {
  onCollapsePrev: 'onCollapsePrev',
  onCollapseNext: 'onCollapseNext'
};
const ITEM_COLLAPSED_EVENT = exports.ITEM_COLLAPSED_EVENT = 'onItemCollapsed';
const ITEM_EXPANDED_EVENT = exports.ITEM_EXPANDED_EVENT = 'onItemExpanded';

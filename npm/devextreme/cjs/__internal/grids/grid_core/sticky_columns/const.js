/**
* DevExtreme (cjs/__internal/grids/grid_core/sticky_columns/const.js)
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
exports.StickyPosition = exports.STICKY_BORDER_WIDTH = exports.CLASSES = void 0;
const STICKY_BORDER_WIDTH = exports.STICKY_BORDER_WIDTH = 2;
var StickyPosition;
(function (StickyPosition) {
  StickyPosition["Left"] = "left";
  StickyPosition["Right"] = "right";
  StickyPosition["Sticky"] = "sticky";
})(StickyPosition || (exports.StickyPosition = StickyPosition = {}));
const CLASSES = exports.CLASSES = {
  stickyColumn: 'sticky-column',
  stickyColumnLeft: 'sticky-column-left',
  stickyColumnRight: 'sticky-column-right',
  stickyColumnBorderRight: 'sticky-column-border-right',
  stickyColumnBorderLeft: 'sticky-column-border-left',
  stickyColumns: 'sticky-columns',
  firstHeader: 'first-header',
  columnNoBorder: 'column-no-border',
  groupRowContainer: 'group-row-container',
  focusedFixedElement: 'dx-focused-fixed-element',
  focused: 'dx-focused',
  hidden: 'dx-hidden'
};

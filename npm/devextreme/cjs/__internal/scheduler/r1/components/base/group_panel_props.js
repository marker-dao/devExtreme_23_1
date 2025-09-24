/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel_props.js)
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
exports.GroupPanelRowDefaultProps = exports.GroupPanelCellDefaultProps = exports.GroupPanelBaseDefaultProps = void 0;
const GroupPanelBaseDefaultProps = exports.GroupPanelBaseDefaultProps = {
  groupPanelData: {
    groupPanelItems: [],
    baseColSpan: 1
  },
  groupByDate: false,
  styles: {}
};
const GroupPanelCellDefaultProps = exports.GroupPanelCellDefaultProps = {
  id: 0,
  text: '',
  data: {
    id: 0
  },
  className: ''
};
const GroupPanelRowDefaultProps = exports.GroupPanelRowDefaultProps = {
  groupItems: [],
  className: ''
};

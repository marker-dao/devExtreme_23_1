/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel_horizontal_row.js)
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
exports.GroupPanelHorizontalRow = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _group_panel_horizontal_cell = require("./group_panel_horizontal_cell");
var _group_panel_props = require("./group_panel_props");
class GroupPanelHorizontalRow extends _index.BaseInfernoComponent {
  render() {
    const {
      cellTemplate,
      className,
      groupItems
    } = this.props;
    return (0, _inferno.createVNode)(1, "tr", `dx-scheduler-group-row ${className}`, groupItems.map((_ref, index) => {
      let {
        colSpan,
        color,
        data,
        id,
        isFirstGroupCell,
        isLastGroupCell,
        key,
        text
      } = _ref;
      return (0, _inferno.createComponentVNode)(2, _group_panel_horizontal_cell.GroupPanelHorizontalCell, {
        "text": text,
        "id": id,
        "data": data,
        "index": index,
        "color": color,
        "colSpan": colSpan ?? _group_panel_horizontal_cell.GroupPanelHorizontalCellDefaultProps.colSpan,
        "isFirstGroupCell": !!isFirstGroupCell,
        "isLastGroupCell": !!isLastGroupCell,
        "cellTemplate": cellTemplate
      }, key);
    }), 0);
  }
}
exports.GroupPanelHorizontalRow = GroupPanelHorizontalRow;
GroupPanelHorizontalRow.defaultProps = _group_panel_props.GroupPanelRowDefaultProps;

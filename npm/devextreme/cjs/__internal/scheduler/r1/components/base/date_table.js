/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/date_table.js)
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
exports.DateTableDefaultProps = exports.DateTable = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _date_table_body = require("./date_table_body");
var _date_table_cell_base = require("./date_table_cell_base");
var _layout_props = require("./layout_props");
var _table = require("./table");
const _excluded = ["viewData", "viewContext", "tableRef", "addDateTableClass", "width", "cellTemplate", "dataCellTemplate", "groupOrientation", "addVerticalSizesClassToRows"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DateTableDefaultProps = exports.DateTableDefaultProps = _extends({}, _layout_props.LayoutDefaultProps, {
  cellTemplate: _date_table_cell_base.DateTableCellBase
});
class DateTable extends _index.InfernoWrapperComponent {
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  render() {
    const _this$props = this.props,
      {
        viewData,
        viewContext,
        tableRef,
        addDateTableClass,
        width,
        cellTemplate,
        dataCellTemplate,
        groupOrientation,
        addVerticalSizesClassToRows
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    const classes = addDateTableClass ? 'dx-scheduler-date-table' : undefined;
    const topVirtualRowHeight = viewData.topVirtualRowHeight ?? 0;
    const bottomVirtualRowHeight = viewData.bottomVirtualRowHeight ?? 0;
    const leftVirtualCellWidth = viewData.leftVirtualCellWidth ?? 0;
    const rightVirtualCellWidth = viewData.rightVirtualCellWidth ?? 0;
    const virtualCellsCount = viewData.groupedData[0].dateTable[0].cells.length;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _table.Table, _extends({}, restProps, {
      "tableRef": tableRef,
      "topVirtualRowHeight": topVirtualRowHeight,
      "bottomVirtualRowHeight": bottomVirtualRowHeight,
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "leftVirtualCellCount": viewData.leftVirtualCellCount,
      "rightVirtualCellCount": viewData.rightVirtualCellCount,
      "virtualCellsCount": virtualCellsCount,
      "className": classes,
      "width": width,
      children: (0, _inferno.createComponentVNode)(2, _date_table_body.DateTableBody, {
        "viewData": viewData,
        "viewContext": viewContext,
        "cellTemplate": cellTemplate,
        "dataCellTemplate": dataCellTemplate,
        "leftVirtualCellWidth": leftVirtualCellWidth,
        "rightVirtualCellWidth": rightVirtualCellWidth,
        "groupOrientation": groupOrientation,
        "addVerticalSizesClassToRows": addVerticalSizesClassToRows,
        "topVirtualRowHeight": _date_table_body.DateTableBodyDefaultProps.topVirtualRowHeight,
        "bottomVirtualRowHeight": _date_table_body.DateTableBodyDefaultProps.bottomVirtualRowHeight,
        "addDateTableClass": _date_table_body.DateTableBodyDefaultProps.addDateTableClass
      })
    })));
  }
}
exports.DateTable = DateTable;
DateTable.defaultProps = DateTableDefaultProps;

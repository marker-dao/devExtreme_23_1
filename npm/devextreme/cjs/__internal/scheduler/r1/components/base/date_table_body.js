/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/date_table_body.js)
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
exports.DateTableBodyDefaultProps = exports.DateTableBody = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../../../scheduler/r1/components/templates/index");
var _render_utils = require("../../../../core/r1/utils/render_utils");
var _const = require("../const");
var _all_day_panel_table_body = require("./all_day_panel_table_body");
var _date_table_cell_base = require("./date_table_cell_base");
var _layout_props = require("./layout_props");
var _row = require("./row");
const DateTableBodyDefaultProps = exports.DateTableBodyDefaultProps = Object.assign({}, _layout_props.LayoutDefaultProps, {
  cellTemplate: _date_table_cell_base.DateTableCellBase
});
class DateTableBody extends _index.BaseInfernoComponent {
  render() {
    const {
      viewData,
      viewContext,
      addVerticalSizesClassToRows,
      cellTemplate,
      dataCellTemplate
    } = this.props;
    const rowClasses = (0, _render_utils.combineClasses)({
      [_const.DATE_TABLE_ROW_CLASS]: true,
      'dx-scheduler-cell-sizes-vertical': addVerticalSizesClassToRows
    });
    return (0, _inferno.createFragment)(viewData.groupedData.map(_ref => {
      let {
        allDayPanel,
        dateTable,
        isGroupedAllDayPanel,
        key: fragmentKey
      } = _ref;
      return (0, _inferno.createFragment)([isGroupedAllDayPanel && (0, _inferno.createComponentVNode)(2, _all_day_panel_table_body.AllDayPanelTableBody, {
        "viewData": allDayPanel ?? _all_day_panel_table_body.AllDayPanelTableBodyDefaultProps.viewData,
        "viewContext": viewContext,
        "dataCellTemplate": dataCellTemplate,
        "isVerticalGroupOrientation": true,
        "leftVirtualCellWidth": viewData.leftVirtualCellWidth ?? _all_day_panel_table_body.AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
        "rightVirtualCellWidth": viewData.rightVirtualCellWidth ?? _all_day_panel_table_body.AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount
      }), dateTable.map(_ref2 => {
        let {
          cells,
          key: rowKey
        } = _ref2;
        return (0, _inferno.createComponentVNode)(2, _row.Row, {
          "className": rowClasses,
          "leftVirtualCellWidth": viewData.leftVirtualCellWidth ?? _row.RowDefaultProps.leftVirtualCellWidth,
          "rightVirtualCellWidth": viewData.rightVirtualCellWidth ?? _row.RowDefaultProps.rightVirtualCellWidth,
          "leftVirtualCellCount": viewData.leftVirtualCellCount,
          "rightVirtualCellCount": viewData.rightVirtualCellCount,
          children: cells.map(_ref3 => {
            let {
              key: cellKey,
              endDate,
              isFirstDayMonthHighlighting,
              groupIndex: cellGroupIndex,
              groups,
              index: cellIndex,
              isFirstGroupCell,
              isFocused,
              isLastGroupCell,
              isSelected,
              otherMonth,
              startDate,
              text,
              today
            } = _ref3;
            return (0, _inferno.createComponentVNode)(2, _index2.PublicTemplate, {
              "template": cellTemplate,
              "templateProps": {
                key: cellKey,
                viewContext,
                isFirstGroupCell,
                isLastGroupCell,
                startDate,
                endDate,
                groups,
                groupIndex: cellGroupIndex,
                index: cellIndex,
                dataCellTemplate,
                text,
                today,
                otherMonth,
                isFirstDayMonthHighlighting,
                isSelected,
                isFocused
              }
            });
          })
        }, rowKey);
      })], 0, fragmentKey);
    }), 0);
  }
}
exports.DateTableBody = DateTableBody;
DateTableBody.defaultProps = DateTableBodyDefaultProps;

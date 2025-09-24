/**
* DevExtreme (cjs/__internal/scheduler/r1/components/month/date_table_month_cell.js)
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
exports.DateTableMonthCell = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _render_utils = require("../../../../core/r1/utils/render_utils");
var _date_table_cell_base = require("../base/date_table_cell_base");
class DateTableMonthCell extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.contentTemplateProps = null;
  }
  getContentTemplateProps() {
    if (this.contentTemplateProps !== null) {
      return this.contentTemplateProps;
    }
    const {
      index,
      text
    } = this.props;
    this.contentTemplateProps = {
      data: {
        text
      },
      index
    };
    return this.contentTemplateProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.index !== nextProps.index || this.props.text !== nextProps.text) {
      this.contentTemplateProps = null;
    }
  }
  render() {
    const {
      viewContext,
      dataCellTemplate,
      endDate,
      groupIndex,
      groups,
      index,
      isFirstGroupCell,
      isFocused,
      isLastGroupCell,
      isSelected,
      startDate,
      text,
      className,
      isFirstDayMonthHighlighting,
      otherMonth,
      today
    } = this.props;
    const classes = (0, _render_utils.combineClasses)({
      'dx-scheduler-date-table-other-month': Boolean(otherMonth),
      'dx-scheduler-date-table-current-date': Boolean(today),
      'dx-scheduler-date-table-first-of-month': Boolean(isFirstDayMonthHighlighting),
      [className ?? '']: Boolean(className)
    });
    const contentTemplateProps = this.getContentTemplateProps();
    return (0, _inferno.createComponentVNode)(2, _date_table_cell_base.DateTableCellBase, {
      "className": classes,
      "viewContext": viewContext,
      "dataCellTemplate": dataCellTemplate,
      "startDate": startDate,
      "endDate": endDate,
      "text": text,
      "groups": groups,
      "groupIndex": groupIndex,
      "index": index,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "isSelected": isSelected,
      "isFocused": isFocused,
      "contentTemplateProps": contentTemplateProps,
      children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-cell-text", text, 0)
    });
  }
}
exports.DateTableMonthCell = DateTableMonthCell;
DateTableMonthCell.defaultProps = _date_table_cell_base.DateTableCallBaseDefaultProps;

/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/time_panel_cell.js)
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
exports.TimePanelCell = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../../../scheduler/r1/components/templates/index");
var _render_utils = require("../../../../core/r1/utils/render_utils");
var _index3 = require("../../utils/index");
var _cell = require("./cell");
class TimePanelCell extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.timeCellTemplateProps = null;
  }
  getTimeCellTemplateProps() {
    if (this.timeCellTemplateProps !== null) {
      return this.timeCellTemplateProps;
    }
    const {
      groupIndex,
      groups,
      index,
      startDate,
      text
    } = this.props;
    this.timeCellTemplateProps = {
      data: {
        date: startDate,
        groups,
        groupIndex,
        text
      },
      index
    };
    return this.timeCellTemplateProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate || this.props.text !== nextProps.text) {
      this.timeCellTemplateProps = null;
    }
  }
  render() {
    const {
      className,
      viewContext,
      highlighted,
      isFirstGroupCell,
      isLastGroupCell,
      text,
      timeCellTemplate
    } = this.props;
    const cellSizeVerticalClass = _index3.renderUtils.getCellSizeVerticalClass(false);
    const classes = (0, _render_utils.combineClasses)({
      'dx-scheduler-time-panel-cell': true,
      [cellSizeVerticalClass]: true,
      'dx-scheduler-time-panel-current-time-cell': !!highlighted,
      [className ?? '']: true
    });
    const timeCellTemplateProps = this.getTimeCellTemplateProps();
    return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
      "className": classes,
      "viewContext": viewContext,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "startDate": _cell.CellBaseDefaultProps.startDate,
      "endDate": _cell.CellBaseDefaultProps.endDate,
      "index": _cell.CellBaseDefaultProps.index,
      children: timeCellTemplate ? (0, _inferno.createComponentVNode)(2, _index2.PublicTemplate, {
        "template": timeCellTemplate,
        "templateProps": {
          index: timeCellTemplateProps.index,
          data: timeCellTemplateProps.data
        }
      }) : (0, _inferno.createVNode)(1, "div", null, text, 0)
    });
  }
}
exports.TimePanelCell = TimePanelCell;
TimePanelCell.defaultProps = _cell.CellBaseDefaultProps;

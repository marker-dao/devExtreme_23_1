/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/cell.js)
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
exports.CellBaseDefaultProps = exports.CellBase = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../utils/index");
const CellBaseDefaultProps = exports.CellBaseDefaultProps = {
  className: '',
  isFirstGroupCell: false,
  isLastGroupCell: false,
  startDate: new Date(),
  endDate: new Date(),
  allDay: false,
  text: '',
  index: 0,
  contentTemplateProps: {
    data: {},
    index: 0
  }
};
class CellBase extends _index.BaseInfernoComponent {
  render() {
    const {
      className,
      isFirstGroupCell,
      isLastGroupCell,
      children,
      ariaLabel
    } = this.props;
    const classes = _index2.renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, className);
    return (0, _inferno.createVNode)(1, "td", classes, children, 0, {
      "aria-label": ariaLabel
    });
  }
}
exports.CellBase = CellBase;
CellBase.defaultProps = CellBaseDefaultProps;

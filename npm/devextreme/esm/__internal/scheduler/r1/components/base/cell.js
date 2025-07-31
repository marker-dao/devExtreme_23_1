/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/cell.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { renderUtils } from '../../utils/index';
export const CellBaseDefaultProps = {
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
export class CellBase extends BaseInfernoComponent {
  render() {
    const {
      className,
      isFirstGroupCell,
      isLastGroupCell,
      children,
      ariaLabel
    } = this.props;
    const classes = renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, className);
    return createVNode(1, "td", classes, children, 0, {
      "aria-label": ariaLabel
    });
  }
}
CellBase.defaultProps = CellBaseDefaultProps;

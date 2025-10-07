/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_vertical_row.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { GroupPanelRowDefaultProps } from './group_panel_props';
import { GroupPanelVerticalCell } from './group_panel_vertical_cell';
export class GroupPanelVerticalRow extends BaseInfernoComponent {
  render() {
    const {
      className,
      groupItems,
      cellTemplate
    } = this.props;
    return createVNode(1, "div", `dx-scheduler-group-row ${className}`, groupItems.map((_ref, index) => {
      let {
        color,
        data,
        id,
        key,
        text
      } = _ref;
      return createComponentVNode(2, GroupPanelVerticalCell, {
        "text": text,
        "id": id,
        "data": data,
        "index": index,
        "color": color,
        "cellTemplate": cellTemplate
      }, key);
    }), 0);
  }
}
GroupPanelVerticalRow.defaultProps = GroupPanelRowDefaultProps;

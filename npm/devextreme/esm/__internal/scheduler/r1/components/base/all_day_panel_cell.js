/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_cell.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { ALL_DAY_PANEL_CELL_CLASS } from '../const';
import { DateTableCallBaseDefaultProps, DateTableCellBase } from './date_table_cell_base';
export class AllDayPanelCell extends BaseInfernoComponent {
  render() {
    const {
      className,
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
      startDate
    } = this.props;
    return createComponentVNode(2, DateTableCellBase, {
      "className": `${ALL_DAY_PANEL_CELL_CLASS} ${className}`,
      "viewContext": viewContext,
      "startDate": startDate,
      "endDate": endDate,
      "groups": groups,
      "groupIndex": groupIndex,
      "allDay": true,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "index": index,
      "dataCellTemplate": dataCellTemplate,
      "isSelected": isSelected,
      "isFocused": isFocused
    });
  }
}
AllDayPanelCell.defaultProps = DateTableCallBaseDefaultProps;

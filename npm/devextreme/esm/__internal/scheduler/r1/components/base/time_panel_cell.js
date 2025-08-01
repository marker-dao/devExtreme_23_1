/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/time_panel_cell.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { PublicTemplate } from '../../../../scheduler/r1/components/templates/index';
import { combineClasses } from '../../../../core/r1/utils/render_utils';
import { renderUtils } from '../../utils/index';
import { CellBase, CellBaseDefaultProps } from './cell';
export class TimePanelCell extends BaseInfernoComponent {
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
    const cellSizeVerticalClass = renderUtils.getCellSizeVerticalClass(false);
    const classes = combineClasses({
      'dx-scheduler-time-panel-cell': true,
      [cellSizeVerticalClass]: true,
      'dx-scheduler-time-panel-current-time-cell': !!highlighted,
      [className ?? '']: true
    });
    const timeCellTemplateProps = this.getTimeCellTemplateProps();
    return createComponentVNode(2, CellBase, {
      "className": classes,
      "viewContext": viewContext,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "startDate": CellBaseDefaultProps.startDate,
      "endDate": CellBaseDefaultProps.endDate,
      "index": CellBaseDefaultProps.index,
      children: timeCellTemplate ? createComponentVNode(2, PublicTemplate, {
        "template": timeCellTemplate,
        "templateProps": {
          index: timeCellTemplateProps.index,
          data: timeCellTemplateProps.data
        }
      }) : createVNode(1, "div", null, text, 0)
    });
  }
}
TimePanelCell.defaultProps = CellBaseDefaultProps;

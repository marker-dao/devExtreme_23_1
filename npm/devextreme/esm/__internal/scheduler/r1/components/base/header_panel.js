/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/header_panel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
import { PublicTemplate } from '../../../../scheduler/r1/components/templates/index';
import { isHorizontalGroupingApplied } from '../../utils/index';
import { DateHeader } from './date_header';
import { GroupPanel, GroupPanelDefaultProps } from './group_panel';
export const HeaderPanelDefaultProps = _extends({}, GroupPanelDefaultProps, {
  isRenderDateHeader: true,
  dateHeaderTemplate: DateHeader
});
export class HeaderPanel extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const {
      viewContext,
      dateHeaderData,
      groupByDate,
      groupOrientation,
      groupPanelData,
      groups,
      isRenderDateHeader,
      dateCellTemplate,
      dateHeaderTemplate,
      resourceCellTemplate,
      timeCellTemplate
    } = this.props;
    const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
    return createVNode(1, "thead", null, [isHorizontalGrouping && !groupByDate && createComponentVNode(2, GroupPanel, {
      "viewContext": viewContext,
      "groupPanelData": groupPanelData,
      "groups": groups,
      "groupByDate": groupByDate,
      "groupOrientation": groupOrientation,
      "resourceCellTemplate": resourceCellTemplate
    }), isRenderDateHeader && createComponentVNode(2, PublicTemplate, {
      "template": dateHeaderTemplate,
      "templateProps": {
        viewContext,
        groupByDate,
        dateHeaderData,
        groupOrientation,
        groups,
        dateCellTemplate,
        timeCellTemplate
      }
    }), groupByDate && createComponentVNode(2, GroupPanel, {
      "viewContext": viewContext,
      "groupPanelData": groupPanelData,
      "groups": groups,
      "groupByDate": groupByDate,
      "groupOrientation": groupOrientation,
      "resourceCellTemplate": resourceCellTemplate
    })], 0);
  }
}
HeaderPanel.defaultProps = HeaderPanelDefaultProps;

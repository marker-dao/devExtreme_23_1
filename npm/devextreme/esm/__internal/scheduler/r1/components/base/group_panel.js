/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
import { VERTICAL_GROUP_ORIENTATION } from '../../../constants';
import { isVerticalGroupingApplied } from '../../utils/index';
import { GroupPanelHorizontal } from './group_panel_horizontal';
import { GroupPanelBaseDefaultProps } from './group_panel_props';
import { GroupPanelVertical } from './group_panel_vertical';
export const GroupPanelDefaultProps = _extends({}, GroupPanelBaseDefaultProps, {
  groups: [],
  groupOrientation: VERTICAL_GROUP_ORIENTATION
});
export class GroupPanel extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const {
      className,
      viewContext,
      elementRef,
      groupPanelData,
      height,
      resourceCellTemplate,
      groupOrientation,
      groups,
      styles
    } = this.props;
    const isVerticalLayout = isVerticalGroupingApplied(groups, groupOrientation);
    const Layout = isVerticalLayout ? GroupPanelVertical : GroupPanelHorizontal;
    return createComponentVNode(2, Layout, {
      "viewContext": viewContext,
      "height": height,
      "resourceCellTemplate": resourceCellTemplate,
      "className": className,
      "groupPanelData": groupPanelData,
      "elementRef": elementRef,
      "styles": styles,
      "groups": GroupPanelDefaultProps.groups,
      "groupOrientation": GroupPanelDefaultProps.groupOrientation,
      "groupByDate": GroupPanelDefaultProps.groupByDate
    });
  }
}
GroupPanel.defaultProps = GroupPanelDefaultProps;

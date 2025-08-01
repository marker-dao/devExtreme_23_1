/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_horizontal.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { GroupPanelHorizontalRow } from './group_panel_horizontal_row';
import { GroupPanelBaseDefaultProps } from './group_panel_props';
export class GroupPanelHorizontal extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this._groupPanelItems = null;
  }
  getGroupPanelItems() {
    if (this._groupPanelItems !== null) {
      return this._groupPanelItems;
    }
    const {
      groupPanelData: {
        baseColSpan,
        groupPanelItems
      }
    } = this.props;
    const colSpans = groupPanelItems.reduceRight((currentColSpans, groupsRow, idx) => {
      const nextColSpans = currentColSpans;
      const currentLevelGroupCount = groupsRow.length;
      const previousColSpan = idx === groupPanelItems.length - 1 ? baseColSpan : currentColSpans[idx + 1];
      const previousLevelGroupCount = idx === groupPanelItems.length - 1 ? currentLevelGroupCount : groupPanelItems[idx + 1].length;
      const groupCountDiff = previousLevelGroupCount / currentLevelGroupCount;
      nextColSpans[idx] = groupCountDiff * previousColSpan;
      return nextColSpans;
    }, [...new Array(groupPanelItems.length)]);
    this._groupPanelItems = groupPanelItems.map((groupsRenderRow, index) => {
      const colSpan = colSpans[index];
      return groupsRenderRow.map(groupItem => _extends({}, groupItem, {
        colSpan
      }));
    });
    return this._groupPanelItems;
  }
  componentWillUpdate(nextProps) {
    if (this.props.groupPanelData !== nextProps.groupPanelData) {
      this._groupPanelItems = null;
    }
  }
  render() {
    const {
      resourceCellTemplate
    } = this.props;
    const groupPanelItems = this.getGroupPanelItems();
    return createFragment(groupPanelItems.map(group => createComponentVNode(2, GroupPanelHorizontalRow, {
      "groupItems": group,
      "cellTemplate": resourceCellTemplate
    }, group[0].key)), 0);
  }
}
GroupPanelHorizontal.defaultProps = GroupPanelBaseDefaultProps;

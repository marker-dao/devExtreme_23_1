/**
* DevExtreme (esm/__internal/grids/new/grid_core/inferno_wrappers/tree_view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["selected"],
  _excluded2 = ["selected"];
import { equalByValue } from '../../../../../core/utils/common';
import dxTreeView from '../../../../../ui/tree_view';
import { InfernoWrapper } from './widget_wrapper';
export class TreeView extends InfernoWrapper {
  getComponentFabric() {
    return dxTreeView;
  }
  updateComponentOptions(prevProps, props) {
    var _this$component, _this$component2;
    const itemsOnlySelectionChanged = this.isItemsOnlySelectionChanged(prevProps, props);
    const propsToUpdate = _extends({}, props);
    if (itemsOnlySelectionChanged) {
      this.updateSelection(props.items ?? []);
      delete propsToUpdate.items;
    }
    const scrollTop = (_this$component = this.component) === null || _this$component === void 0 || (_this$component = _this$component.getScrollable()) === null || _this$component === void 0 ? void 0 : _this$component.scrollTop();
    super.updateComponentOptions(prevProps, propsToUpdate);
    (_this$component2 = this.component) === null || _this$component2 === void 0 || (_this$component2 = _this$component2.getScrollable()) === null || _this$component2 === void 0 || _this$component2.scrollTo({
      top: scrollTop
    });
  }
  isItemsOnlySelectionChanged(prevProps, props) {
    const oldItems = (prevProps.items ?? []).map(_ref => {
      let restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
      return restProps;
    });
    const newItems = (props.items ?? []).map(_ref2 => {
      let restProps = _objectWithoutPropertiesLoose(_ref2, _excluded2);
      return restProps;
    });
    const onlySelectionChanged = equalByValue(oldItems, newItems);
    return onlySelectionChanged;
  }
  updateSelection(items) {
    const treeView = this.component;
    if (!treeView) {
      return;
    }
    const selectedKeys = treeView.getSelectedNodeKeys();
    treeView.beginUpdate();
    items.forEach((item, index) => {
      const isSelected = selectedKeys.includes(item.id);
      if (item.selected && !isSelected) {
        treeView.selectItem(index);
      }
      if (!item.selected && isSelected) {
        treeView.unselectItem(index);
      }
    });
    treeView.endUpdate();
  }
}

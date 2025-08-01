/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/tree_view.js)
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
exports.TreeView = void 0;
var _common = require("../../../../../core/utils/common");
var _tree_view = _interopRequireDefault(require("../../../../../ui/tree_view"));
var _widget_wrapper = require("./widget_wrapper");
const _excluded = ["selected"],
  _excluded2 = ["selected"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class TreeView extends _widget_wrapper.InfernoWrapper {
  getComponentFabric() {
    return _tree_view.default;
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
    const onlySelectionChanged = (0, _common.equalByValue)(oldItems, newItems);
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
exports.TreeView = TreeView;

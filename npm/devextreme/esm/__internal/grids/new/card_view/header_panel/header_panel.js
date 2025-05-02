/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/header_panel.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Scrollable } from '../../../../grids/new/grid_core/inferno_wrappers/scrollable';
import { KbnNavigationContainer, withKbnNavigationItem, withKeyDownHandler } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { Component } from 'inferno';
import { ColumnSortable } from './column_sortable';
import { CLASSES as itemClasses, Item } from './item';
export const CLASSES = {
  headers: 'dx-cardview-headers',
  content: 'dx-cardview-headerpanel-content'
};
const ItemWithKbn = withKbnNavigationItem(withKeyDownHandler(Item));
export class HeaderPanel extends Component {
  render() {
    const HeaderItem = this.props.kbnEnabled ? ItemWithKbn : Item;
    if (!this.props.visible) {
      return createFragment();
    }
    return createVNode(1, "div", CLASSES.headers, normalizeProps(createComponentVNode(2, ColumnSortable, _extends({}, this.props.draggingOptions, {
      "source": "header-panel-main",
      "visibleColumns": this.props.visibleColumns,
      "getColumnByIndex": index => this.props.visibleColumns[index],
      "allowDragging": this.props.allowColumnReordering,
      "columnChooserDragModeOpened": this.props.columnChooserDragModeOpened,
      "onColumnMove": this.props.onColumnMove,
      "columnDragTemplate": Item,
      "itemOrientation": "horizontal",
      "filter": `.${itemClasses.item}`,
      children: createComponentVNode(2, Scrollable, {
        "direction": 'horizontal',
        "showScrollbar": 'never',
        "useNative": false,
        "scrollByContent": true,
        "useKeyboard": false,
        children: createComponentVNode(2, KbnNavigationContainer, {
          "enabled": this.props.kbnEnabled,
          "navigationStrategy": this.props.navigationStrategy,
          children: createVNode(1, "div", CLASSES.content, this.props.visibleColumns.map((column, idx) => createComponentVNode(2, HeaderItem, {
            "navigationIdx": idx,
            "navigationStrategy": this.props.navigationStrategy,
            "showSortIndexes": this.props.showSortIndexes,
            "column": column,
            "template": this.props.itemTemplate,
            "cssClass": this.props.itemCssClass,
            "keyDownConfig": {
              Enter: event => {
                this.props.onColumnSort(column, event);
              },
              'Enter+ctrl': event => {
                this.props.onColumnSort(column, event);
              },
              'Enter+shift': event => {
                this.props.onColumnSort(column, event);
              },
              'ArrowDown+alt': (event, ref) => {
                var _this$props$onHeaderF, _this$props;
                (_this$props$onHeaderF = (_this$props = this.props).onHeaderFilterOpen) === null || _this$props$onHeaderF === void 0 || _this$props$onHeaderF.call(_this$props, ref.current, column, () => {
                  var _ref$current;
                  return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
                });
              },
              'F10+shift': (event, ref) => {
                this.props.showContextMenu(event, column, idx, () => {
                  var _ref$current2;
                  return (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.focus();
                });
              }
            },
            "caughtEventPreventDefault": true,
            "onSortClick": event => {
              this.props.onColumnSort(column, event);
            },
            "onFilterClick": element => {
              var _this$props$onHeaderF2, _this$props2;
              (_this$props$onHeaderF2 = (_this$props2 = this.props).onHeaderFilterOpen) === null || _this$props$onHeaderF2 === void 0 || _this$props$onHeaderF2.call(_this$props2, element, column);
            },
            "onContextMenu": event => {
              this.props.showContextMenu(event, column, idx);
            }
          })), 0)
        })
      })
    }))), 2, {
      "onContextMenu": this.props.showContextMenu
    });
  }
}

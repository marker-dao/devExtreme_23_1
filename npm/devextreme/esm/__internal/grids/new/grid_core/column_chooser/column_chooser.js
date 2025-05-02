/**
* DevExtreme (esm/__internal/grids/new/grid_core/column_chooser/column_chooser.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import $ from '../../../../../core/renderer';
import messageLocalization from '../../../../../localization/message';
import { Component } from 'inferno';
import { ColumnSortable } from '../../card_view/header_panel/column_sortable';
import { Item } from '../../card_view/header_panel/item';
import { Popup } from '../inferno_wrappers/popup';
import { TreeView } from '../inferno_wrappers/tree_view';
export const CLASS = {
  root: 'column-chooser',
  toolbarBtn: 'column-chooser-button',
  list: 'column-chooser-list',
  plain: 'column-chooser-plain',
  dragMode: 'column-chooser-mode-drag',
  selectMode: 'column-chooser-mode-select',
  treeviewItem: 'dx-treeview-item',
  treeviewExpanderIcon: 'dx-treeview-expander-icon-stub',
  hidden: 'dx-hidden'
};
export class ColumnChooser extends Component {
  constructor() {
    super(...arguments);
    this.onShowing = e => {
      const popup = e.component;
      if (this.props.popupConfig.position === undefined) {
        popup.option('position', {
          my: 'right bottom',
          at: 'right bottom',
          // TODO: replace with content view element
          of: '.dx-gridcore-contentview',
          collision: 'fit',
          offset: '-2 -2',
          boundaryOffset: '2 2'
        });
      }
      this.setPopupAttributes(popup);
    };
    this.getColumnByIndex = index => {
      const treeView = this.props.treeViewRef.current;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const column = treeView.getNodes()[index].itemData.column;
      return column;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.onSortablePlaceholderPrepared = e => {
      $(e.placeholderElement).addClass(CLASS.hidden);
    };
  }
  render() {
    const {
      visible,
      popupConfig,
      popupRef
    } = this.props;
    if (!visible) {
      return createFragment();
    }
    const treeView = this.getTreeView();
    return createComponentVNode(2, Popup, {
      "componentRef": popupRef,
      "visible": true,
      "shading": false,
      "dragEnabled": true,
      "resizeEnabled": true,
      "_loopFocus": true,
      "showCloseButton": popupConfig.showCloseButton,
      "toolbarItems": popupConfig.toolbarItems,
      "wrapperAttr": {
        class: this.getPopupWrapperClass()
      },
      "width": popupConfig.width,
      "height": popupConfig.height,
      "container": popupConfig.container,
      "position": popupConfig.position,
      "onHidden": popupConfig.onHidden,
      "onShowing": this.onShowing,
      children: createComponentVNode(2, ColumnSortable, {
        "height": '100%',
        "source": 'column-chooser',
        "filter": `.${CLASS.treeviewItem}`,
        "getColumnByIndex": this.getColumnByIndex,
        "visibleColumns": this.props.visibleColumns,
        "allowDragging": !this.isSelectMode(),
        "columnDragTemplate": Item,
        "onColumnMove": this.props.onColumnMove,
        "onPlaceholderPrepared": this.onSortablePlaceholderPrepared,
        children: treeView
      })
    });
  }
  isSelectMode() {
    return this.props.mode === 'select';
  }
  // TODO: move it to the other place
  addWidgetPrefix(cssClass) {
    return `dx-cardview-${cssClass}`;
  }
  getPopupWrapperClass() {
    const modeSpecificClass = this.isSelectMode() ? CLASS.selectMode : CLASS.dragMode;
    return [this.addWidgetPrefix(CLASS.root), this.addWidgetPrefix(modeSpecificClass)].join(' ');
  }
  setPopupAttributes(popup) {
    // @ts-expect-error
    popup.setAria({
      label: messageLocalization.format('dxDataGrid-columnChooserTitle')
    });
    // @ts-expect-error
    popup.$content().addClass(this.addWidgetPrefix(CLASS.list));
    // @ts-expect-error
    popup.$content().toggleClass(this.addWidgetPrefix(CLASS.plain), !this.props.isBandColumnsUsed);
  }
  getTreeView() {
    const {
      treeViewRef,
      treeViewConfig,
      treeViewSelectModeConfig,
      treeViewDragAndDropModeConfig
    } = this.props;
    return normalizeProps(createComponentVNode(2, TreeView, _extends({
      "componentRef": treeViewRef,
      "dataStructure": 'plain',
      "activeStateEnabled": true,
      "focusStateEnabled": true,
      "hoverStateEnabled": true,
      "rootValue": null,
      "searchEditorOptions": treeViewConfig.searchEditorOptions,
      "searchEnabled": treeViewConfig.searchEnabled,
      "searchTimeout": treeViewConfig.searchTimeout,
      "noDataText": treeViewConfig.noDataText,
      "items": treeViewConfig.items
    }, this.isSelectMode() ? treeViewSelectModeConfig : treeViewDragAndDropModeConfig)));
  }
}

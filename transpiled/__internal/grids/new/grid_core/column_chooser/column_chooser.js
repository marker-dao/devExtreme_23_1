"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnChooser = exports.CLASS = void 0;
var _inferno = require("inferno");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _column_sortable = require("../../card_view/header_panel/column_sortable");
var _item = require("../../card_view/header_panel/item");
var _popup = require("../inferno_wrappers/popup");
var _tree_view = require("../inferno_wrappers/tree_view");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CLASS = exports.CLASS = {
  root: 'column-chooser',
  toolbarBtn: 'column-chooser-button',
  list: 'column-chooser-list',
  plain: 'column-chooser-plain',
  dragMode: 'column-chooser-mode-drag',
  selectMode: 'column-chooser-mode-select',
  treeviewItem: 'dx-treeview-item',
  treeviewExpanderIcon: 'dx-treeview-expander-icon-stub'
};
class ColumnChooser extends _inferno.Component {
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
  }
  render() {
    const {
      visible,
      popupConfig,
      popupRef,
      sortableConfig
    } = this.props;
    if (!visible) {
      return (0, _inferno.createFragment)();
    }
    const treeView = this.getTreeView();
    return (0, _inferno.createComponentVNode)(2, _popup.Popup, {
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
      children: (0, _inferno.createComponentVNode)(2, _column_sortable.ColumnSortable, {
        "height": '100%',
        "source": 'column-chooser',
        "filter": `.${CLASS.treeviewItem}`,
        "getColumnByIndex": this.getColumnByIndex,
        "isColumnDraggable": sortableConfig.isColumnDraggable,
        "visibleColumns": this.props.visibleColumns,
        "allowDragging": !this.isSelectMode(),
        "columnDragTemplate": _item.Item,
        "onColumnMove": this.props.onColumnMove,
        "onDragStart": sortableConfig.onDragStart,
        "onDragEnd": sortableConfig.onDragEnd,
        "onPlaceholderPrepared": sortableConfig.onPlaceholderPrepared,
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
      label: _message.default.format('dxDataGrid-columnChooserTitle')
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
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _tree_view.TreeView, _extends({
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
exports.ColumnChooser = ColumnChooser;
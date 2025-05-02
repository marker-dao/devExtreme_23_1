"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderPanel = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _scrollable = require("../../../../grids/new/grid_core/inferno_wrappers/scrollable");
var _index = require("../../../../grids/new/grid_core/keyboard_navigation/index");
var _column_sortable = require("./column_sortable");
var _item = require("./item");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CLASSES = exports.CLASSES = {
  headers: 'dx-cardview-headers',
  content: 'dx-cardview-headerpanel-content'
};
const ItemWithKbn = (0, _index.withKbnNavigationItem)((0, _index.withKeyDownHandler)(_item.Item));
class HeaderPanel extends _inferno.Component {
  render() {
    const HeaderItem = this.props.kbnEnabled ? ItemWithKbn : _item.Item;
    if (!this.props.visible) {
      return (0, _inferno.createFragment)();
    }
    return (0, _inferno.createVNode)(1, "div", CLASSES.headers, (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _column_sortable.ColumnSortable, _extends({}, this.props.draggingOptions, {
      "source": "header-panel-main",
      "visibleColumns": this.props.visibleColumns,
      "getColumnByIndex": index => this.props.visibleColumns[index],
      "allowDragging": this.props.allowColumnReordering,
      "columnChooserDragModeOpened": this.props.columnChooserDragModeOpened,
      "onColumnMove": this.props.onColumnMove,
      "columnDragTemplate": _item.Item,
      "itemOrientation": "horizontal",
      "filter": `.${_item.CLASSES.item}`,
      children: (0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
        "direction": 'horizontal',
        "showScrollbar": 'never',
        "useNative": false,
        "scrollByContent": true,
        "useKeyboard": false,
        children: (0, _inferno.createComponentVNode)(2, _index.KbnNavigationContainer, {
          "enabled": this.props.kbnEnabled,
          "navigationStrategy": this.props.navigationStrategy,
          children: (0, _inferno.createVNode)(1, "div", CLASSES.content, this.props.visibleColumns.map((column, idx) => (0, _inferno.createComponentVNode)(2, HeaderItem, {
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
exports.HeaderPanel = HeaderPanel;
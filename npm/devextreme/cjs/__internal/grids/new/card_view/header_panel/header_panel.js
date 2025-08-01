/**
* DevExtreme (cjs/__internal/grids/new/card_view/header_panel/header_panel.js)
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
exports.HeaderPanel = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _combine_classes = require("../../../../core/utils/combine_classes");
var _m_utils = require("../../../../filter_builder/m_utils");
var _scrollable = require("../../../../grids/new/grid_core/inferno_wrappers/scrollable");
var _index = require("../../../../grids/new/grid_core/keyboard_navigation/index");
var _utils = require("../../grid_core/filtering/header_filter/utils");
var _column_sortable = require("./column_sortable");
var _item = require("./item");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable
  spellcheck/spell-checker
*/
const CLASSES = exports.CLASSES = {
  link: 'dx-link',
  headers: 'dx-cardview-headers',
  content: 'dx-cardview-headerpanel-content',
  contentHasHeaderItems: 'dx-cardview-headerpanel-content--with-header-items',
  contentEmpty: 'dx-cardview-headerpanel-content--empty',
  headerPanelTextEmpty: 'dx-cardview-headerpanel-text-empty',
  headerItemContainer: 'dx-cardview-header-item-container',
  sortable: 'dx-cardview-sortable',
  sortablePlaceholder: 'dx-cardview-header-item-sort-indicator'
};
const ItemWithKbn = (0, _index.withKbnNavigationItem)((0, _index.withKeyDownHandler)(_item.Item));
const EmptyHeaderPanelText = props => {
  const text = _message.default.format('dxCardView-emptyHeaderPanelText');
  const columnChooserText = _message.default.format('dxCardView-emptyHeaderPanelColumnChooserText');
  const [leftPart, rightPart] = text.split('{0}');
  return (0, _inferno.createVNode)(1, "span", CLASSES.headerPanelTextEmpty, [leftPart, (0, _inferno.createVNode)(1, "a", CLASSES.link, columnChooserText, 0, {
    "onClick": props.openColumnChooser
  }), rightPart], 0, {
    "role": 'menuitem'
  });
};
class HeaderPanel extends _inferno.Component {
  render() {
    const HeaderItem = this.props.kbnEnabled ? ItemWithKbn : _item.Item;
    if (!this.props.visible) {
      return (0, _inferno.createFragment)();
    }
    const {
      sortableConfig
    } = this.props;
    const hasHeaderItems = this.props.visibleColumns.length > 0;
    const contentClassNames = (0, _combine_classes.combineClasses)({
      [CLASSES.content]: true,
      [CLASSES.contentHasHeaderItems]: hasHeaderItems,
      [CLASSES.contentEmpty]: !hasHeaderItems
    });
    return (0, _inferno.createVNode)(1, "div", CLASSES.headers, (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _column_sortable.ColumnSortable, _extends({}, this.props.draggingOptions, {
      "className": CLASSES.sortable,
      "source": "header-panel-main",
      "getColumnByIndex": index => this.props.visibleColumns[index],
      "visibleColumns": this.props.visibleColumns,
      "allowDragging": true,
      "onColumnMove": sortableConfig.onColumnMove,
      "columnDragTemplate": _item.Item,
      "itemOrientation": "horizontal",
      "filter": `.${CLASSES.headerItemContainer}`,
      "isColumnDraggable": sortableConfig.isColumnDraggable,
      "showDropzone": sortableConfig.showDropzone,
      "placeholderClassName": CLASSES.sortablePlaceholder,
      "onPlaceholderPrepared": sortableConfig.onPlaceholderPrepared,
      children: (0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
        "direction": 'horizontal',
        "showScrollbar": 'never',
        "useNative": false,
        "scrollByContent": true,
        "useKeyboard": false,
        children: (0, _inferno.createComponentVNode)(2, _index.KbnNavigationContainer, {
          "enabled": this.props.kbnEnabled,
          "navigationStrategy": this.props.navigationStrategy,
          children: (0, _inferno.createVNode)(1, "div", contentClassNames, [!hasHeaderItems && (0, _inferno.createComponentVNode)(2, EmptyHeaderPanelText, {
            "openColumnChooser": this.props.openColumnChooser
          }), this.props.visibleColumns.map((column, idx) => (0, _inferno.createVNode)(1, "div", CLASSES.headerItemContainer, (0, _inferno.createComponentVNode)(2, HeaderItem, {
            "navigationIdx": idx,
            "navigationStrategy": this.props.navigationStrategy,
            "showSortIndexes": this.props.showSortIndexes,
            "column": column,
            "template": this.props.itemTemplate,
            "cssClass": this.props.itemCssClass,
            "hasFilters": this.itemHasFilters(column, this.props.filterSyncValue),
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
            "onContextMenu": (event, ref) => {
              this.props.showContextMenu(event, column, idx, () => ref === null || ref === void 0 ? void 0 : ref.focus());
            }
          }), 2))], 0, {
            "role": "menubar"
          })
        })
      })
    }))), 2, {
      "onContextMenu": this.props.showContextMenu
    });
  }
  itemHasFilters(column, filterSyncValue) {
    const {
      filterValues
    } = column;
    const columnId = (0, _utils.getColumnIdentifier)(column);
    const hasHeaderFilterValue = !!(filterValues !== null && filterValues !== void 0 && filterValues.length);
    const hasFilterSyncValue = (0, _m_utils.filterHasField)(filterSyncValue, columnId);
    return hasHeaderFilterValue || hasFilterSyncValue;
  }
}
exports.HeaderPanel = HeaderPanel;

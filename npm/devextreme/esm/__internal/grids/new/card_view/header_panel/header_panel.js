/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/header_panel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment, createComponentVNode, normalizeProps } from "inferno";
/* eslint-disable
  spellcheck/spell-checker
*/
import messageLocalization from '../../../../../localization/message';
import { combineClasses } from '../../../../core/utils/combine_classes';
import { filterHasField } from '../../../../filter_builder/m_utils';
import { Scrollable } from '../../../../grids/new/grid_core/inferno_wrappers/scrollable';
import { KbnNavigationContainer, withKbnNavigationItem, withKeyDownHandler } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { Component } from 'inferno';
import { getColumnIdentifier } from '../../grid_core/filtering/header_filter/utils';
import { ColumnSortable } from './column_sortable';
import { Item } from './item';
export const CLASSES = {
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
const ItemWithKbn = withKbnNavigationItem(withKeyDownHandler(Item));
const EmptyHeaderPanelText = props => {
  const text = messageLocalization.format('dxCardView-emptyHeaderPanelText');
  const columnChooserText = messageLocalization.format('dxCardView-emptyHeaderPanelColumnChooserText');
  const [leftPart, rightPart] = text.split('{0}');
  return createVNode(1, "span", CLASSES.headerPanelTextEmpty, [leftPart, createVNode(1, "a", CLASSES.link, columnChooserText, 0, {
    "onClick": props.openColumnChooser
  }), rightPart], 0, {
    "role": 'menuitem'
  });
};
export class HeaderPanel extends Component {
  render() {
    const HeaderItem = this.props.kbnEnabled ? ItemWithKbn : Item;
    if (!this.props.visible) {
      return createFragment();
    }
    const {
      sortableConfig
    } = this.props;
    const hasHeaderItems = this.props.visibleColumns.length > 0;
    const contentClassNames = combineClasses({
      [CLASSES.content]: true,
      [CLASSES.contentHasHeaderItems]: hasHeaderItems,
      [CLASSES.contentEmpty]: !hasHeaderItems
    });
    return createVNode(1, "div", CLASSES.headers, normalizeProps(createComponentVNode(2, ColumnSortable, _extends({}, this.props.draggingOptions, {
      "className": CLASSES.sortable,
      "source": "header-panel-main",
      "getColumnByIndex": index => this.props.visibleColumns[index],
      "visibleColumns": this.props.visibleColumns,
      "allowDragging": true,
      "onColumnMove": sortableConfig.onColumnMove,
      "columnDragTemplate": Item,
      "itemOrientation": "horizontal",
      "filter": `.${CLASSES.headerItemContainer}`,
      "isColumnDraggable": sortableConfig.isColumnDraggable,
      "showDropzone": sortableConfig.showDropzone,
      "placeholderClassName": CLASSES.sortablePlaceholder,
      "onPlaceholderPrepared": sortableConfig.onPlaceholderPrepared,
      children: createComponentVNode(2, Scrollable, {
        "direction": 'horizontal',
        "showScrollbar": 'never',
        "useNative": false,
        "scrollByContent": true,
        "useKeyboard": false,
        children: createComponentVNode(2, KbnNavigationContainer, {
          "enabled": this.props.kbnEnabled,
          "navigationStrategy": this.props.navigationStrategy,
          children: createVNode(1, "div", contentClassNames, [!hasHeaderItems && createComponentVNode(2, EmptyHeaderPanelText, {
            "openColumnChooser": this.props.openColumnChooser
          }), this.props.visibleColumns.map((column, idx) => createVNode(1, "div", CLASSES.headerItemContainer, createComponentVNode(2, HeaderItem, {
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
    const columnId = getColumnIdentifier(column);
    const hasHeaderFilterValue = !!(filterValues !== null && filterValues !== void 0 && filterValues.length);
    const hasFilterSyncValue = filterHasField(filterSyncValue, columnId);
    return hasHeaderFilterValue || hasFilterSyncValue;
  }
}

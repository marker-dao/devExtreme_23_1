/**
* DevExtreme (cjs/__internal/grids/new/card_view/header_panel/item.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _icon = require("../../grid_core/icon");
var _index = require("./a11y/index");
const CLASSES = exports.CLASSES = {
  item: 'dx-cardview-header-item',
  button: 'dx-cardview-header-item-button',
  sorting: {
    container: 'dx-cardview-header-item-sorting',
    order: 'dx-cardview-header-item-sorting-order'
  },
  headerFilter: {
    icon: 'dx-header-filter-icon',
    iconFilled: 'dx-header-filter-icon--selected'
  }
};
function SortIcon(props) {
  return (0, _inferno.createVNode)(1, "div", CLASSES.sorting.container, [props.sortOrder === 'asc' && (0, _inferno.createComponentVNode)(2, _icon.Icon, {
    "name": 'arrowsortup'
  }), props.sortOrder === 'desc' && (0, _inferno.createComponentVNode)(2, _icon.Icon, {
    "name": 'arrowsortdown'
  }), props.showSortIndex && (0, _inferno.createVNode)(1, "div", CLASSES.sorting.order, props.sortIndex, 0)], 0);
}
class Item extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.onFilterClickHandler = event => {
      var _this$props$elementRe;
      event.stopPropagation();
      if ((_this$props$elementRe = this.props.elementRef) !== null && _this$props$elementRe !== void 0 && _this$props$elementRe.current) {
        var _this$props$onFilterC, _this$props;
        (_this$props$onFilterC = (_this$props = this.props).onFilterClick) === null || _this$props$onFilterC === void 0 || _this$props$onFilterC.call(_this$props, this.props.elementRef.current);
      }
    };
    this.onContextMenuHandler = event => {
      var _this$props$elementRe2;
      if ((_this$props$elementRe2 = this.props.elementRef) !== null && _this$props$elementRe2 !== void 0 && _this$props$elementRe2.current) {
        var _this$props$onContext, _this$props2;
        (_this$props$onContext = (_this$props2 = this.props).onContextMenu) === null || _this$props$onContext === void 0 || _this$props$onContext.call(_this$props2, event, this.props.elementRef.current);
      }
    };
  }
  render() {
    const {
      column
    } = this.props;
    const Template = column.headerItemTemplate ?? this.props.template;
    const cssClass = `${CLASSES.item} ${column.headerItemCssClass ?? ''} ${this.props.cssClass ?? ''}`;
    const headerFilterIconClass = [CLASSES.headerFilter.icon, this.props.hasFilters ? CLASSES.headerFilter.iconFilled : ''].join(' ');
    const icon = this.props.status && {
      forbid: (0, _inferno.createComponentVNode)(2, _icon.Icon, {
        "name": 'cursorprohibition'
      }),
      moving: (0, _inferno.createComponentVNode)(2, _icon.Icon, {
        "name": 'cursormove'
      }),
      none: undefined
    }[this.props.status];
    const showSortIcon = !this.props.isDragging && column.sortOrder !== undefined;
    const showHeaderFilterIcon = !this.props.isDragging && (column === null || column === void 0 ? void 0 : column.allowHeaderFiltering);
    const ariaLabel = (0, _index.getHeaderItemA11yLabel)(column.caption, {
      hasHeaderFilterValue: this.props.hasFilters,
      sortOrder: column.sortOrder,
      sortIndex: column.sortIndex
    });
    return (0, _inferno.createVNode)(1, "div", cssClass, [icon, Template && (0, _inferno.createComponentVNode)(2, Template, {
      "column": this.props.column
    }), !Template && this.props.column.caption, showSortIcon && (0, _inferno.createComponentVNode)(2, SortIcon, {
      "sortIndex": this.props.column.sortIndex + 1,
      "sortOrder": this.props.column.sortOrder,
      "showSortIndex": this.props.showSortIndexes ?? false
    }), showHeaderFilterIcon && (0, _inferno.createComponentVNode)(2, _icon.Icon, {
      "name": 'filter',
      "className": headerFilterIconClass,
      "onClick": this.onFilterClickHandler
    })], 0, {
      "tabindex": this.props.tabIndex,
      "role": this.props.isDragging ? undefined : 'menuitem',
      "aria-label": ariaLabel,
      "onClick": this.props.onSortClick,
      "onKeyDown": this.props.onKeyDown,
      "onContextMenu": this.onContextMenuHandler
    }, null, this.props.elementRef);
  }
}
exports.Item = Item;

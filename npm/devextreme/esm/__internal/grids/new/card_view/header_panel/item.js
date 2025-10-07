/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/item.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { Component } from 'inferno';
import { Icon } from '../../grid_core/icon';
import { getHeaderItemA11yLabel } from './a11y/index';
export const CLASSES = {
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
  return createVNode(1, "div", CLASSES.sorting.container, [props.sortOrder === 'asc' && createComponentVNode(2, Icon, {
    "name": 'arrowsortup'
  }), props.sortOrder === 'desc' && createComponentVNode(2, Icon, {
    "name": 'arrowsortdown'
  }), props.showSortIndex && createVNode(1, "div", CLASSES.sorting.order, props.sortIndex, 0)], 0);
}
export class Item extends Component {
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
      forbid: createComponentVNode(2, Icon, {
        "name": 'cursorprohibition'
      }),
      moving: createComponentVNode(2, Icon, {
        "name": 'cursormove'
      }),
      none: undefined
    }[this.props.status];
    const showSortIcon = !this.props.isDragging && column.sortOrder !== undefined;
    const showHeaderFilterIcon = !this.props.isDragging && (column === null || column === void 0 ? void 0 : column.allowHeaderFiltering);
    const ariaLabel = getHeaderItemA11yLabel(column.caption, {
      hasHeaderFilterValue: this.props.hasFilters,
      sortOrder: column.sortOrder,
      sortIndex: column.sortIndex
    });
    return createVNode(1, "div", cssClass, [icon, Template && createComponentVNode(2, Template, {
      "column": this.props.column
    }), !Template && this.props.column.caption, showSortIcon && createComponentVNode(2, SortIcon, {
      "sortIndex": this.props.column.sortIndex + 1,
      "sortOrder": this.props.column.sortOrder,
      "showSortIndex": this.props.showSortIndexes ?? false
    }), showHeaderFilterIcon && createComponentVNode(2, Icon, {
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
